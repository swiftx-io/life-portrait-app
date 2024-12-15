import axios from 'axios';

const API_URL = 'http://localhost:8000'; // This will be replaced with environment variable in production

interface Auth0Config {
  domain: string;
  clientId: string;
}

export class AuthService {
  private static config: Auth0Config | null = null;

  static async getAuth0Config(): Promise<Auth0Config> {
    try {
      if (this.config) return this.config;

      const response = await axios.get(`${API_URL}/api/auth/config`);
      this.config = response.data;
      return this.config;
    } catch (error) {
      console.error('Failed to fetch Auth0 configuration:', error);
      throw new Error('Authentication configuration unavailable');
    }
  }

  static async login() {
    try {
      const config = await this.getAuth0Config();
      // Auth0 login implementation will go here
      console.log('Logging in with config:', config);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }
}
