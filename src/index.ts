/**
 * @hostpark/design-system — root barrel.
 *
 * Public surface:
 *   - tokens         : colors, spacing, radii, typography, elevation, motion
 *   - theme          : ThemeProvider, useTheme, ThemeMode
 *   - components     : Text, Button, Card, Badge, Input, Header, ScreenWrapper
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
export {
  Text,
  Button,
  Card,
  Badge,
  Input,
  Header,
  HeaderIconButton,
  ScreenWrapper,
  type TextProps,
  type ButtonProps,
  type ButtonVariant,
  type ButtonSize,
  type CardProps,
  type CardVariant,
  type BadgeProps,
  type BadgeVariant,
  type InputProps,
  type HeaderProps,
  type HeaderIconButtonProps,
  type ScreenWrapperProps,
} from './components';

// Fonts (consumer must load via expo-font)
export { fonts } from './fonts';
