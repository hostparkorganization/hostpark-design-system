/**
 * Color tokens — ported verbatim from project/colors_and_type.css (round 2).
 *
 * Brand DNA: primary #55DE85 (Hostpark logo green). The green appears as
 * --primary in both themes; foregrounds on top of it use #06371D so contrast
 * stays AAA. For green text on light surfaces use --accent (#1F8A5B) which
 * passes AA against white.
 */

export const brandConstants = {
  green: '#55DE85',
  green600: '#2BB673',
  green700: '#1F8A5B',
  grey: '#7E7B78',
} as const;

export const lightColors = {
  background: '#F6F8F6',
  surface: '#FFFFFF',
  surface2: '#EFF2EF',
  surfaceRaised: '#FFFFFF',

  foreground: '#15201A',
  foregroundMuted: '#5C635D',
  muted: '#828A83',

  border: '#E1E6E1',
  borderStrong: '#CBD2CC',
  ring: '#2BB673',

  primary: '#55DE85',
  primaryHover: '#43CD75',
  primaryForeground: '#06371D',
  primarySubtle: '#E4F8EC',

  accent: '#1F8A5B',
  accentForeground: '#FFFFFF',
  accentSubtle: '#E0F2E9',

  success: '#1F9D57',
  successForeground: '#FFFFFF',
  successSubtle: '#E2F4E9',

  warning: '#B5740F',
  warningForeground: '#FFFFFF',
  warningSubtle: '#FAEEDB',

  destructive: '#C8403F',
  destructiveForeground: '#FFFFFF',
  destructiveSubtle: '#FBE6E5',

  info: '#2C6FD6',
  infoForeground: '#FFFFFF',
  infoSubtle: '#E2ECFB',
} as const;

export const darkColors: typeof lightColors = {
  background: '#0E1411',
  surface: '#161D19',
  surface2: '#1F2722',
  surfaceRaised: '#1F2722',

  foreground: '#EAEFEA',
  foregroundMuted: '#A6AEA7',
  muted: '#7C857E',

  border: '#29322C',
  borderStrong: '#3A453E',
  ring: '#55DE85',

  primary: '#55DE85',
  primaryHover: '#6BE795',
  primaryForeground: '#05291A',
  primarySubtle: '#16271D',

  accent: '#5FE89A',
  accentForeground: '#05291A',
  accentSubtle: '#16271D',

  success: '#4FD98A',
  successForeground: '#05291A',
  successSubtle: '#15271C',

  warning: '#E2A64A',
  warningForeground: '#221704',
  warningSubtle: '#2A2113',

  destructive: '#F0706E',
  destructiveForeground: '#2A0E0E',
  destructiveSubtle: '#2C1817',

  info: '#6BA3F2',
  infoForeground: '#0A1626',
  infoSubtle: '#16202E',
};

export type ColorTokens = typeof lightColors;
