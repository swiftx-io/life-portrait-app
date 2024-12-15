import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { useAuth } from '../../src/hooks/useAuth';
import { ThemedText } from '../../components/ThemedText';
import { ThemedButton } from '../../components/ThemedButton';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from 'react-native';
import { router } from 'expo-router';

export default function RegisterScreen() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const handleRegister = async () => {
    try {
      setLoading(true);
      await login(); // Auth0 handles registration through the same flow
    } catch (error) {
      Alert.alert(
        'Registration Failed',
        'Unable to complete registration. Please try again.'
      );
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.accent,
      padding: 20
    }}>
      <ThemedText
        type="title"
        style={{ marginBottom: 20 }}
      >
        Create Your Account
      </ThemedText>

      <ThemedText
        type="subtitle"
        style={{ marginBottom: 40, textAlign: 'center' }}
      >
        Join Life Portrait to start your journey of self-discovery and growth
      </ThemedText>

      <ThemedButton
        title="Sign Up with Auth0"
        onPress={handleRegister}
        loading={loading}
        variant="primary"
        style={{ marginBottom: 20, width: '100%' }}
      />

      <ThemedText
        type="link"
        onPress={() => router.replace('/auth/login')}
        style={{ marginTop: 20 }}
      >
        Already have an account? Log in
      </ThemedText>
    </View>
  );
}
