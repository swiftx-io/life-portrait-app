import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { Platform } from 'react-native';
import { router } from 'expo-router';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';
const CONFIG_KEY = 'auth_config';

// Initialize WebBrowser for Auth0
WebBrowser.maybeCompleteAuthSession();

interface Auth0Config {
  domain: string;
  clientId: string;
  apiUrl: string;
}

interface UserProfile {
  sub: string;
  email: string;
  name?: string;
  picture?: string;
  email_verified: boolean;
  updated_at: string;
}

type AuthSessionResultType = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string;
    error?: string;
  };
};

export class AuthService {
  private static config: Auth0Config | null = null;
  private static userProfile: UserProfile | null = null;

  static async getAuth0Config(): Promise<Auth0Config> {
    try {
      if (this.config) return this.config;

      // Try to get cached config first
      const cachedConfig = await SecureStore.getItemAsync(CONFIG_KEY);
      if (cachedConfig) {
        const parsedConfig = JSON.parse(cachedConfig) as Auth0Config;
        this.config = parsedConfig;
        return parsedConfig;
      }

      // If no cached config, fetch from backend
      // Using a default development URL that will be immediately replaced
      const devUrl = 'http://localhost:8000';
      const response = await axios.get<Auth0Config>(`${devUrl}/api/auth/config`);
      const config = response.data;

      // Validate config structure
      if (!config.domain || !config.clientId || !config.apiUrl) {
        throw new Error('Invalid configuration received from server');
      }

      this.config = config;
      // Cache the config
      await SecureStore.setItemAsync(CONFIG_KEY, JSON.stringify(config));
      return config;
    } catch (error) {
      console.error('Failed to fetch Auth0 configuration:', error);
      throw new Error('Authentication configuration unavailable');
    }
  }

  static async login(): Promise<void> {
    try {
      const config = await this.getAuth0Config();

      const scheme = 'life-portrait';
      const redirectUri = AuthSession.makeRedirectUri({
        scheme,
        path: 'auth',
        ...(Platform.OS === 'web' ? { preferLocalhost: true } : {}),
      });

      const authRequestOptions: AuthSession.AuthRequestConfig = {
        responseType: AuthSession.ResponseType.Token,
        clientId: config.clientId,
        redirectUri,
        scopes: ['openid', 'profile', 'email'],
        extraParams: {
          audience: `https://${config.domain}/api/v2/`,
        },
      };

      const discovery = await AuthSession.fetchDiscoveryAsync(`https://${config.domain}`);
      const request = new AuthSession.AuthRequest(authRequestOptions);

      const result = (await request.promptAsync(discovery)) as AuthSessionResultType;

      if (result.type === 'success' && result.params.access_token) {
        await this.handleAuthenticationSuccess(result.params.access_token);
        router.replace('/(tabs)');
      } else {
        throw new Error(result.params.error || 'Authentication failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  static async logout(): Promise<void> {
    try {
      const config = await this.getAuth0Config();
      const token = await this.getToken();

      if (token) {
        // Call backend logout endpoint
        await axios.post(`${config.apiUrl}/api/auth/logout`, null, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      // Clear local storage
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_KEY);
      this.userProfile = null;
      router.replace('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  static async getUserProfile(): Promise<UserProfile | null> {
    try {
      if (this.userProfile) return this.userProfile;

      const storedProfile = await SecureStore.getItemAsync(USER_KEY);
      if (storedProfile) {
        this.userProfile = JSON.parse(storedProfile);
        return this.userProfile;
      }

      const token = await this.getToken();
      if (!token) return null;

      const config = await this.getAuth0Config();
      const response = await axios.get<UserProfile>(`${config.apiUrl}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      this.userProfile = response.data;
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(this.userProfile));
      return this.userProfile;
    } catch (error) {
      console.error('Failed to get user profile:', error);
      return null;
    }
  }

  static async getToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(TOKEN_KEY);
    } catch (error) {
      console.error('Failed to get token:', error);
      return null;
    }
  }

  private static async handleAuthenticationSuccess(accessToken: string): Promise<void> {
    await SecureStore.setItemAsync(TOKEN_KEY, accessToken);
    await this.getUserProfile(); // Fetch and cache user profile
  }
}

export type { UserProfile, Auth0Config };
