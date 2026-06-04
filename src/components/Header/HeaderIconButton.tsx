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
 * Circular icon button used in headers and toolbars. Transparent by default
 * — the host page's MD3 state-layer CSS provides a subtle ::after overlay
 * on hover/press, and the keyboard-focus ring comes from the same global
 * stylesheet. This keeps the header visually clean and lets the icon read
 * as the affordance rather than the button frame.
 *
 * Consumers that need a visible chip (e.g. a floating back button over a
 * hero photo where the surface contrast is gone) can pass `backgroundColor`
 * and `borderColor` through the `style` prop.
 *
 * The badge dot (when `hasBadge`) sits at the top-right and uses
 * `colors.background` for its halo so it reads cleanly against the page
 * background (the host element is transparent now, so a `colors.surface`
 * halo would no longer ring against anything visible).
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
            borderColor: colors.background,
          }}
        />
      ) : null}
    </Pressable>
  );
}
