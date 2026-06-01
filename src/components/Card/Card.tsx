import React from 'react';
import { Pressable, View, type PressableProps, type ViewProps, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme/ThemeContext';
import { radii, spacing } from '../../tokens/spacing';

export type CardVariant = 'elevated' | 'outlined' | 'pressable';

export interface CardProps extends ViewProps {
  /** Visual treatment. */
  variant?: CardVariant;
  /** Press handler — switches the variant to `pressable` automatically. */
  onPress?: PressableProps['onPress'];
  /** Override the default `spacing[4]` (16px) padding. */
  padding?: number;
}

/**
 * Container surface — defaults to `elevated` (subtle shadow, white surface in
 * light mode). Use `outlined` for inline groupings where shadow would be busy,
 * and `pressable` (or pass `onPress`) for tap targets.
 */
export function Card({
  variant: variantProp,
  onPress,
  padding = spacing[4],
  children,
  style,
  ...rest
}: CardProps) {
  const { colors, elevation, isDark } = useTheme();

  const variant: CardVariant = variantProp ?? (onPress ? 'pressable' : 'elevated');

  const base: ViewStyle = {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding,
  };

  const variantStyle: ViewStyle = {
    elevated: {
      ...elevation.subtle,
      // In light mode also draw a hairline border so the white card edge
      // stays defined on the off-white background.
      ...(isDark ? null : { borderWidth: 1, borderColor: colors.border }),
    },
    outlined: { borderWidth: 1, borderColor: colors.border },
    pressable: {
      ...elevation.subtle,
      ...(isDark ? null : { borderWidth: 1, borderColor: colors.border }),
    },
  }[variant];

  if (variant === 'pressable' || onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [base, variantStyle, pressed && { opacity: 0.92 }, style as ViewStyle]}
        {...(rest as object)}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={[base, variantStyle, style]} {...rest}>
      {children}
    </View>
  );
}
