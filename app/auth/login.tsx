import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#E2725B', // Terracotta - Primary Color
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#F5F5DC', // Creamy White - Accent Color
    fontSize: 18,
    fontWeight: '600',
  },
});

export default function LoginScreen() {
  const handleAuth0Login = async () => {
    // Auth0 login will be implemented in next step
    // For now, we're just setting up the UI structure
  };

  return (
    <ThemedView style={styles.container} lightColor="#F5F5DC">
      <Stack.Screen
        options={{
          title: 'Welcome',
          headerStyle: {
            backgroundColor: '#E2725B',
          },
          headerTintColor: '#F5F5DC',
        }}
      />

      <ThemedText style={styles.title} lightColor="#E2725B">
        Welcome Back
      </ThemedText>

      <TouchableOpacity onPress={handleAuth0Login} style={styles.button}>
        <ThemedText style={styles.buttonText}>Continue with Auth0</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}
