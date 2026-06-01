/**
 * Spacing scale — 4px base, ported from project/colors_and_type.css (round 2).
 *
 * Accessor patterns:
 *   spacing[4]      // 16px — common "card padding"
 *   spacing[5]      // 20px — common "screen gutter"
 *   spacing['0.5']  // 2px  — sub-unit, rarely needed
 */

export const spacing = {
  0: 0,
  '0.5': 2,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
} as const;

export const radii = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 9999,
} as const;

export const layout = {
  bottomNavHeight: 72,
  screenPaddingHorizontal: spacing[4],
  screenPaddingTop: spacing[4],
  cardPadding: spacing[4],
  phoneWebMaxWidth: 624,
} as const;
