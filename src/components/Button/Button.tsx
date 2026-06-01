import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  View,
  type PressableProps,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '../../theme/ThemeContext';
import { spacing, radii } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { Text } from '../Text';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'style' | 'children'> {
  /** Button label. */
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Show spinner instead of label; also disables press. */
  loading?: boolean;
  /** Expand to fill the parent's width. */
  fullWidth?: boolean;
  /** Optional leading icon. Rendered with `spacing[2]` gap before the title. */
  icon?: React.ReactNode;
  style?: ViewStyle;
}

const HEIGHT: Record<ButtonSize, number> = { sm: 36, md: 44, lg: 52 };
const PADDING_X: Record<ButtonSize, number> = { sm: spacing[3], md: spacing[4], lg: spacing[5] };
const FONT_SIZE: Record<ButtonSize, number> = { sm: 14, md: 15, lg: 16 };

/**
 * Primary action element. Defaults to `primary` / `md`.
 *
 * Press feedback is a small opacity dip + the consumer can pass `onPressIn`
 * for haptics. Loading swaps the label for a spinner without changing width.
 */
export function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  icon,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const { colors } = useTheme();

  const palette: Record<ButtonVariant, { bg: string; text: string; border?: string }> = {
    primary: { bg: colors.primary, text: colors.primaryForeground },
    secondary: { bg: colors.surface, text: colors.foreground, border: colors.borderStrong },
    outline: { bg: 'transparent', text: colors.foreground, border: colors.borderStrong },
    ghost: { bg: 'transparent', text: colors.foreground },
    destructive: { bg: colors.destructive, text: colors.destructiveForeground },
  };

  const p = palette[variant];
  const isInactive = disabled || loading;

  const containerStyle: ViewStyle = {
    backgroundColor: p.bg,
    height: HEIGHT[size],
    paddingHorizontal: PADDING_X[size],
    borderRadius: radii.md,
    borderWidth: p.border ? 1 : 0,
    borderColor: p.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...(fullWidth ? { width: '100%' } : {}),
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isInactive, busy: loading }}
      disabled={isInactive}
      style={({ pressed }) => [
        containerStyle,
        pressed && !isInactive && { opacity: 0.85 },
        isInactive && { opacity: 0.5 },
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={p.text} />
      ) : (
        <>
          {icon ? <View style={{ marginRight: spacing[2] }}>{icon}</View> : null}
          <Text
            role="button"
            style={[
              { ...typography.button, fontSize: FONT_SIZE[size], color: p.text },
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
}
