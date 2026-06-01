import React from 'react';
import { Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';

import { typography, type TypographyRole } from '../../tokens/typography';
import { useTheme } from '../../theme/ThemeContext';
import type { ColorTokens } from '../../tokens/colors';

type ColorToken = keyof ColorTokens;

export interface TextProps extends RNTextProps {
  /** Semantic type role (h1-h4, body, small, caption, overline, etc.). Defaults to "body". */
  role?: TypographyRole;
  /** Theme color token to apply. Defaults to "foreground". */
  color?: ColorToken;
  /** Number of lines before truncation. */
  numberOfLines?: number;
  /** Override the role's textAlign. */
  align?: TextStyle['textAlign'];
}

/**
 * Theme-aware Text primitive bound to the design system's type roles.
 *
 * Use `role` to pick a semantic style (h1, body, overline...) and `color` to
 * pick a theme color token. For one-off styles, pass `style` directly.
 *
 * @example
 *   <Text role="h1">Edifício Aurora</Text>
 *   <Text role="overline" color="foregroundMuted">Bom dia, Marina</Text>
 */
export function Text({ role = 'body', color = 'foreground', align, style, ...rest }: TextProps) {
  const { colors } = useTheme();
  const roleStyle = typography[role];

  return (
    <RNText
      style={[
        roleStyle,
        { color: colors[color] },
        align ? { textAlign: align } : null,
        style,
      ]}
      {...rest}
    />
  );
}
