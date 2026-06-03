import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../theme/ThemeContext';
import { radii, spacing } from '../../tokens/spacing';
import { Button } from '../Button';
import { Text } from '../Text';

export interface EmptyStateProps {
  /** Ionicons glyph name shown inside the circle. */
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  /** Optional muted body copy. Wraps at ~300px width. */
  description?: string;
  /** Optional primary CTA. */
  actionLabel?: string;
  onActionPress?: () => void;
  style?: ViewStyle;
}

/**
 * Centered icon-in-circle + title + muted body + optional CTA. Used for
 * "no items here yet" surfaces (empty lists, empty notifications, etc.).
 */
export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onActionPress,
  style,
}: EmptyStateProps) {
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
          backgroundColor: colors.surface2,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: spacing[1],
        }}
      >
        <Ionicons name={icon} size={30} color={colors.foregroundMuted} />
      </View>
      <Text role="h4" align="center">
        {title}
      </Text>
      {description ? (
        <Text role="small" color="foregroundMuted" align="center" style={{ maxWidth: 300 }}>
          {description}
        </Text>
      ) : null}
      {actionLabel && onActionPress ? (
        <View style={{ marginTop: spacing[2] }}>
          <Button title={actionLabel} onPress={onActionPress} />
        </View>
      ) : null}
    </View>
  );
}
