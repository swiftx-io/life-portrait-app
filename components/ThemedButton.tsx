import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { Colors } from '../constants/Colors';
import { useColorScheme } from 'react-native';
import { ThemedText } from './ThemedText';

interface ThemedButtonProps {
  onPress: () => void;
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  style?: ViewStyle;
}

export function ThemedButton({
  onPress,
  title,
  loading = false,
  variant = 'primary',
  disabled = false,
  style
}: ThemedButtonProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const buttonStyle = [
    styles.button,
    variant === 'primary' ? { backgroundColor: colors.primary } : { backgroundColor: colors.secondary },
    disabled && styles.disabled,
    style
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={colors.accent} />
      ) : (
        <ThemedText style={styles.text} type="defaultSemiBold">
          {title}
        </ThemedText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
    marginVertical: 8,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.6,
  },
});
