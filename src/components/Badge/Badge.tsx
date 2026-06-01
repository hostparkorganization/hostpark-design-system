import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../theme/ThemeContext';
import { radii, spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { Text } from '../Text';
import type { ColorTokens } from '../../tokens/colors';

export type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'destructive'
  | 'driver'
  | 'muted'
  | 'verified';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  /** Optional leading icon name (Ionicons). Implicit for `verified` (checkmark). */
  icon?: keyof typeof Ionicons.glyphMap;
}

type Palette = { bg: keyof ColorTokens; fg: keyof ColorTokens };

const PALETTE: Record<BadgeVariant, Palette> = {
  default: { bg: 'primarySubtle', fg: 'accent' },
  success: { bg: 'successSubtle', fg: 'success' },
  warning: { bg: 'warningSubtle', fg: 'warning' },
  destructive: { bg: 'destructiveSubtle', fg: 'destructive' },
  driver: { bg: 'infoSubtle', fg: 'driver' },
  muted: { bg: 'surface2', fg: 'foregroundMuted' },
  verified: { bg: 'accentSubtle', fg: 'accent' },
};

/**
 * Small status/role indicator pill. Defaults to subtle background + colored
 * text per the round-2 chip style (uppercase, +6% tracking, weight 600).
 *
 * `verified` is the trust signal — auto-prepends a checkmark icon.
 */
export function Badge({ label, variant = 'default', icon }: BadgeProps) {
  const { colors } = useTheme();
  const p = PALETTE[variant];

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors[p.bg],
    borderRadius: radii.full,
    paddingHorizontal: spacing[2] + 2,
    paddingVertical: 4,
  };

  const effectiveIcon = icon ?? (variant === 'verified' ? 'checkmark-circle' : undefined);

  return (
    <View style={containerStyle}>
      {effectiveIcon ? (
        <Ionicons
          name={effectiveIcon}
          size={12}
          color={colors[p.fg]}
          style={{ marginRight: 4 }}
        />
      ) : null}
      <Text
        role="overline"
        color={p.fg}
        style={{ ...typography.overline, fontSize: 11 }}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
}
