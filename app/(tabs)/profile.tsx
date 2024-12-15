import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../../src/hooks/useAuth';
import { ThemedText } from '../../components/ThemedText';
import { ThemedButton } from '../../components/ThemedButton';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { UserProfile } from '../../src/services/auth/auth.service';

export default function ProfileScreen() {
  const { logout, getUserProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const userProfile = await getUserProfile();
      setProfile(userProfile);
    } catch (error) {
      console.error('Failed to load user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      router.replace('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={{
      flex: 1,
      padding: 20,
      backgroundColor: colors.accent,
    }}>
      <View style={{ alignItems: 'center', marginBottom: 30 }}>
        {profile?.picture && (
          <View style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: colors.secondary,
            marginBottom: 16,
            overflow: 'hidden'
          }}>
            {/* Avatar implementation will be added later */}
          </View>
        )}
        <ThemedText type="title">
          {profile?.name || 'User Profile'}
        </ThemedText>
        <ThemedText type="subtitle" style={{ marginTop: 8 }}>
          {profile?.email || 'No email available'}
        </ThemedText>
      </View>

      <View style={{ marginTop: 'auto' }}>
        <ThemedButton
          title="Logout"
          onPress={handleLogout}
          loading={loading}
          variant="secondary"
          style={{ marginBottom: 20 }}
        />
      </View>
    </View>
  );
}
