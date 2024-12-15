import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { ThemedText } from '../../components/ThemedText';
import { ThemedButton } from '../../components/ThemedButton';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../src/hooks/useAuth';
import { useColorScheme } from 'react-native';

export default function LoginScreen() {
  const { login } = useAuth();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth0Login = async () => {
    try {
      setIsLoading(true);
      await login();
    } catch (error) {
      console.error('Failed to login:', error);
      Alert.alert('Login Failed', 'Unable to log in. Please try again later.', [{ text: 'OK' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Welcome',
          headerShown: false,
        }}
      />

      <View style={styles.content}>
        <ThemedText style={styles.title} type="title">
          Welcome to Life Portrait
        </ThemedText>
        <ThemedText style={styles.subtitle} type="subtitle">
          Sign in to continue your journey of personal growth
        </ThemedText>

        <ThemedButton
          title="Sign in with Auth0"
          onPress={handleAuth0Login}
          loading={isLoading}
          variant="primary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 32,
    textAlign: 'center',
    opacity: 0.8,
  },
});
