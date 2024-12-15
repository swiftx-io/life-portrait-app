import { Stack, router } from 'expo-router';
import React, { useEffect } from 'react';
import { AuthService } from '../../src/services/auth/auth.service';

export default function AuthLayout() {
  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      try {
        const token = await AuthService.getToken();
        if (token) {
          // If authenticated, redirect to main app
          router.replace('/(tabs)');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };

    checkAuth();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
