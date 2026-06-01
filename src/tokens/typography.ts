/**
 * Typography tokens — ported from project/colors_and_type.css (round 2).
 *
 * Display = Manrope (humanist grotesque, 400-800).
 * Body    = Inter (institutional, 400-700, includes Latin Extended for diacritics).
 * Mono    = system fallback only (no 3rd font family shipped).
 *
 * Font family strings match the names registered by expo-font in the consumer
 * app. The consumer is responsible for registering the actual TTFs via
 * `loadDesignSystemFonts()` (see ../fonts.ts).
 */

import { TextStyle } from 'react-native';

export const fontFamilies = {
  manropeRegular: 'Manrope-Regular',
  manropeMedium: 'Manrope-Medium',
  manropeSemiBold: 'Manrope-SemiBold',
  manropeBold: 'Manrope-Bold',
  manropeExtraBold: 'Manrope-ExtraBold',

  interRegular: 'Inter-Regular',
  interMedium: 'Inter-Medium',
  interSemiBold: 'Inter-SemiBold',
  interBold: 'Inter-Bold',
} as const;

export const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
} as const;

export const lineHeights = {
  xs: 16,
  sm: 20,
  base: 24,
  lg: 26,
  xl: 28,
  '2xl': 32,
  '3xl': 38,
  '4xl': 42,
  '5xl': 52,
} as const;

export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const;

/**
 * Letter spacing values in EM-equivalent (RN uses px, but we treat these as
 * approximate em ratios applied via letterSpacing on the parent fontSize).
 * For exact em behavior, components should compute `fontSize * tracking`.
 */
export const tracking = {
  tight: -0.02,
  snug: -0.01,
  normal: 0,
  wide: 0.06,
} as const;

const compute = (size: number, ratio: number) => size * ratio;

/**
 * Semantic type roles — one named style per design-system role. Use these
 * via the <Text role="h1"> primitive rather than re-stating fontFamily/size
 * per call site.
 */
export const typography = {
  displayXL: {
    fontFamily: fontFamilies.manropeExtraBold,
    fontSize: fontSizes['5xl'],
    lineHeight: lineHeights['5xl'],
    letterSpacing: compute(fontSizes['5xl'], tracking.tight),
  } satisfies TextStyle,

  h1: {
    fontFamily: fontFamilies.manropeBold,
    fontSize: fontSizes['4xl'],
    lineHeight: lineHeights['4xl'],
    letterSpacing: compute(fontSizes['4xl'], tracking.tight),
  } satisfies TextStyle,

  h2: {
    fontFamily: fontFamilies.manropeBold,
    fontSize: fontSizes['3xl'],
    lineHeight: lineHeights['3xl'],
    letterSpacing: compute(fontSizes['3xl'], tracking.snug),
  } satisfies TextStyle,

  h3: {
    fontFamily: fontFamilies.manropeSemiBold,
    fontSize: fontSizes['2xl'],
    lineHeight: lineHeights['2xl'],
    letterSpacing: compute(fontSizes['2xl'], tracking.snug),
  } satisfies TextStyle,

  h4: {
    fontFamily: fontFamilies.manropeSemiBold,
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.xl,
    letterSpacing: compute(fontSizes.xl, tracking.snug),
  } satisfies TextStyle,

  lead: {
    fontFamily: fontFamilies.interRegular,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
  } satisfies TextStyle,

  body: {
    fontFamily: fontFamilies.interRegular,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.base,
  } satisfies TextStyle,

  bodyMedium: {
    fontFamily: fontFamilies.interMedium,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.base,
  } satisfies TextStyle,

  small: {
    fontFamily: fontFamilies.interRegular,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  } satisfies TextStyle,

  label: {
    fontFamily: fontFamilies.interMedium,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  } satisfies TextStyle,

  caption: {
    fontFamily: fontFamilies.interRegular,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  } satisfies TextStyle,

  overline: {
    fontFamily: fontFamilies.interSemiBold,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    letterSpacing: compute(fontSizes.xs, tracking.wide),
    textTransform: 'uppercase',
  } satisfies TextStyle,

  button: {
    fontFamily: fontFamilies.manropeSemiBold,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.base,
  } satisfies TextStyle,

  mono: {
    fontFamily: 'monospace',
    fontSize: fontSizes.base,
    lineHeight: lineHeights.base,
    letterSpacing: 0.6,
  } satisfies TextStyle,
} as const;

export type TypographyRole = keyof typeof typography;
