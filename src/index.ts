/**
 * @hostpark/design-system — root barrel.
 *
 * Public surface:
 *   - tokens         : colors, spacing, radii, typography, elevation, motion
 *   - theme          : ThemeProvider, useTheme, ThemeMode
 *   - components     : primitives + actions + containers + layout + overlays + states
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
  // Primitives
  Text,
  Avatar,
  Skeleton,
  // Action / input
  Button,
  Input,
  PhoneInput,
  DocumentInput,
  // Containers / display
  Card,
  CardRail,
  Badge,
  ListItem,
  ListGroup,
  // Layout
  Header,
  HeaderIconButton,
  ScreenWrapper,
  // Overlays
  BottomSheet,
  Modal,
  // Status / state templates
  EmptyState,
  LoadingState,
  ErrorState,
  // Types
  type TextProps,
  type AvatarProps,
  type SkeletonProps,
  type ButtonProps,
  type ButtonVariant,
  type ButtonSize,
  type InputProps,
  type PhoneInputProps,
  type DocumentInputProps,
  type DocumentInputFile,
  type CardProps,
  type CardVariant,
  type CardRailProps,
  type CardRailItem,
  type BadgeProps,
  type BadgeVariant,
  type ListItemProps,
  type ListGroupProps,
  type HeaderProps,
  type HeaderIconButtonProps,
  type ScreenWrapperProps,
  type BottomSheetProps,
  type BottomSheetHeaderProps,
  type ModalProps,
  type EmptyStateProps,
  type LoadingStateProps,
  type ErrorStateProps,
} from './components';

// Fonts (consumer must load via expo-font)
export { fonts } from './fonts';
