/**
 * Font require-map for consumer apps.
 *
 * Hostpark Mobile (and any other consumer) must call expo-font's loadAsync
 * with this map before any <Text role="h1"> renders — otherwise React Native
 * falls back to the platform default font and the design language breaks.
 *
 * @example
 *   import * as Font from 'expo-font';
 *   import { fonts } from '@hostpark/design-system/fonts';
 *
 *   await Font.loadAsync(fonts);
 *
 * On web the same call registers @font-face declarations automatically; no
 * extra wiring is needed for Expo Web.
 */

export const fonts = {
  'Manrope-Regular': require('../assets/fonts/Manrope-Regular.ttf'),
  'Manrope-Medium': require('../assets/fonts/Manrope-Medium.ttf'),
  'Manrope-SemiBold': require('../assets/fonts/Manrope-SemiBold.ttf'),
  'Manrope-Bold': require('../assets/fonts/Manrope-Bold.ttf'),
  'Manrope-ExtraBold': require('../assets/fonts/Manrope-ExtraBold.ttf'),
  'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
  'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
  'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
  'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
};
