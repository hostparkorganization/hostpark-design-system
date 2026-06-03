import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../theme/ThemeContext';
import { radii, spacing } from '../../tokens/spacing';
import { Button } from '../Button';
import { Text } from '../Text';

export interface ErrorStateProps {
  title?: string;
  description?: string;
  /** Optional retry CTA. */
  retryLabel?: string;
  onRetry?: () => void;
  /** Override the default `alert-circle-outline` icon. */
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
}

/**
 * Centered destructive-tinted icon + title + body + optional retry CTA. Use
 * after a failed fetch or other recoverable error.
 */
export function ErrorState({
  title = 'Algo deu errado',
  description = 'Tente novamente em instantes.',
  retryLabel,
  onRetry,
  icon = 'alert-circle-outline',
  style,
}: ErrorStateProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          alignItems: 'center',
          paddingHorizontal: spacing[6],
          paddingVertical: spacing[8],
          gap: spacing[2] + 2,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: radii.full,
          backgroundColor: colors.destructiveSubtle,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: spacing[1],
        }}
      >
        <Ionicons name={icon} size={30} color={colors.destructive} />
      </View>
      <Text role="h4" align="center">
        {title}
      </Text>
      <Text role="small" color="foregroundMuted" align="center" style={{ maxWidth: 300 }}>
        {description}
      </Text>
      {retryLabel && onRetry ? (
        <View style={{ marginTop: spacing[2] }}>
          <Button title={retryLabel} variant="secondary" onPress={onRetry} />
        </View>
      ) : null}
    </View>
  );
}
