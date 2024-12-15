import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { Colors } from '../../constants/Colors';
import { AuthService } from '../../src/services/auth/auth.service';

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
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default function LoginScreen() {
  const handleAuth0Login = async () => {
    try {
      await AuthService.login();
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Welcome',
          headerStyle: {
            backgroundColor: Colors.light.primary,
          },
          headerTintColor: Colors.light.accent,
        }}
      />

      <ThemedText style={styles.title} lightColor={Colors.light.primary}>
        Welcome Back
      </ThemedText>

      <TouchableOpacity
        onPress={handleAuth0Login}
        style={[styles.button, { backgroundColor: Colors.light.primary }]}>
        <ThemedText style={styles.buttonText} lightColor={Colors.light.accent}>
          Continue with Auth0
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}
