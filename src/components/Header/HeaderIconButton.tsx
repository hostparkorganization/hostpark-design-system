import React from 'react';
import { Pressable, View, type PressableProps, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../theme/ThemeContext';
import { radii } from '../../tokens/spacing';

export interface HeaderIconButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  /** Ionicons glyph name. */
  icon: keyof typeof Ionicons.glyphMap;
  /** Show a small destructive dot at top-right (notifications). */
  hasBadge?: boolean;
  /** Accessibility label — required since the button is icon-only. */
  accessibilityLabel: string;
  size?: number;
  style?: ViewStyle;
}

/**
 * Circular outlined icon button used in headers and toolbars. The badge dot
 * appears at top-right when `hasBadge` is true.
 */
export function HeaderIconButton({
  icon,
  hasBadge = false,
  size = 40,
  accessibilityLabel,
  style,
  ...rest
}: HeaderIconButtonProps) {
  const { colors } = useTheme();

  const container: ViewStyle = {
    width: size,
    height: size,
    borderRadius: radii.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [container, pressed && { opacity: 0.85 }, style]}
      {...rest}
    >
      <Ionicons name={icon} size={size * 0.5} color={colors.foreground} />
      {hasBadge ? (
        <View
          style={{
            position: 'absolute',
            top: size * 0.2,
            right: size * 0.22,
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: colors.destructive,
            borderWidth: 2,
            borderColor: colors.surface,
          }}
        />
      ) : null}
    </Pressable>
  );
}
