import React from 'react';
import { ActivityIndicator, View, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme/ThemeContext';
import { spacing } from '../../tokens/spacing';
import { Text } from '../Text';

export interface LoadingStateProps {
  /** Optional helper text shown below the spinner. */
  message?: string;
  size?: 'small' | 'large';
  style?: ViewStyle;
}

/**
 * Centered spinner with optional helper copy. Use for blocking screens; for
 * inline placeholders prefer `Skeleton`.
 */
export function LoadingState({ message, size = 'large', style }: LoadingStateProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: spacing[6],
          paddingVertical: spacing[8],
          gap: spacing[3],
        },
        style,
      ]}
    >
      <ActivityIndicator size={size} color={colors.primary} />
      {message ? (
        <Text role="small" color="foregroundMuted" align="center">
          {message}
        </Text>
      ) : null}
    </View>
  );
}
