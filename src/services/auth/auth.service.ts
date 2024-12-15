import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';
import { Platform } from 'react-native';
import { router } from 'expo-router';

const API_URL = 'http://localhost:8000';

// Initialize WebBrowser for Auth0
WebBrowser.maybeCompleteAuthSession();

interface Auth0Config {
  domain: string;
  clientId: string;
}

type AuthSessionResultType = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string;
    error?: string;
  };
};

export class AuthService {
  private static config: Auth0Config | null = null;

  static async getAuth0Config(): Promise<Auth0Config> {
    try {
      if (this.config) return this.config;

      const response = await axios.get<Auth0Config>(`${API_URL}/api/auth/config`);
      this.config = response.data;
      return this.config;
    } catch (error) {
      console.error('Failed to fetch Auth0 configuration:', error);
      throw new Error('Authentication configuration unavailable');
    }
  }

  static async login(): Promise<void> {
    try {
      const config = await this.getAuth0Config();

      // Create redirect URI based on platform
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

  private static async handleAuthenticationSuccess(accessToken: string): Promise<void> {
    console.log('Authentication successful');
  }
}
