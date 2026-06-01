/**
 * @hostpark/design-system — root barrel.
 *
 * Public surface:
 *   - tokens         : colors, spacing, radii, typography, elevation, motion
 *   - theme          : ThemeProvider, useTheme, ThemeMode
 *   - components     : Text (more arrive in subsequent versions)
 *   - fonts          : require-map for expo-font.loadAsync
 */

// Tokens
export {
  brandConstants,
  lightColors,
  darkColors,
  spacing,
  radii,
  layout,
  fontFamilies,
  fontSizes,
  lineHeights,
  fontWeights,
  tracking,
  typography,
  lightElevation,
  darkElevation,
  scrim,
  motion,
  type ColorTokens,
  type TypographyRole,
  type ElevationTokens,
} from './tokens';

// Theme
export {
  ThemeProvider,
  useTheme,
  type Theme,
  type ThemeContextValue,
  type ThemeMode,
  type ThemeProviderProps,
} from './theme';

// Components
export { Text, type TextProps } from './components';

// Fonts (consumer must load via expo-font)
export { fonts } from './fonts';
