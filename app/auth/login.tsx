import React from 'react';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
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
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAuth0Login = async () => {
    try {
      setIsLoading(true);
      await AuthService.login();
    } catch (error) {
      console.error('Failed to login:', error);
      Alert.alert(
        'Login Failed',
        'Unable to log in. Please try again later.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
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
        style={[styles.button, { backgroundColor: Colors.light.primary }, isLoading && { opacity: 0.7 }]}
        disabled={isLoading}
      >
        <ThemedText style={styles.buttonText} lightColor={Colors.light.accent}>
          {isLoading ? 'Logging in...' : 'Continue with Auth0'}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}
