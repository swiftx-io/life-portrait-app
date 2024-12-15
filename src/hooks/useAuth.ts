import { useState, useEffect } from 'react';
import { AuthService, UserProfile } from '../services/auth/auth.service';

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const profile = await AuthService.getUserProfile();
      setUser(profile);
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    await AuthService.login();
    await loadUser();
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    logout,
  };
}
