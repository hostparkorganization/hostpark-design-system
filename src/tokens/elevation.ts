/**
 * Elevation tokens — 3-tier system from project/colors_and_type.css (round 2).
 *
 * Shadows translated from CSS box-shadow to React Native's ShadowStyleIOS +
 * Android elevation. Light/dark variants because dark-mode shadows need to be
 * darker (rgba 0,0,0,0.4+) to read at all; light-mode shadows use the warm
 * tint rgba(16,28,20,…).
 *
 * Usage:
 *   const { elevation } = useTheme();
 *   <View style={[styles.card, elevation.subtle]} />
 */

import type { ViewStyle } from 'react-native';

type Elevation = {
  subtle: ViewStyle;
  raised: ViewStyle;
  floating: ViewStyle;
};

export const lightElevation: Elevation = {
  subtle: {
    shadowColor: 'rgb(16, 28, 20)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  raised: {
    shadowColor: 'rgb(16, 28, 20)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  floating: {
    shadowColor: 'rgb(16, 28, 20)',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.2,
    shadowRadius: 36,
    elevation: 12,
  },
};

export const darkElevation: Elevation = {
  subtle: {
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 2,
  },
  raised: {
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.45,
    shadowRadius: 8,
    elevation: 6,
  },
  floating: {
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.65,
    shadowRadius: 40,
    elevation: 16,
  },
};

export type ElevationTokens = Elevation;

/**
 * Scrim — protection gradient over photos. Returned as the two color stops
 * the consumer can plug into expo-linear-gradient or any gradient library
 * (we don't ship a gradient implementation; consumers already have one).
 */
export const scrim = {
  light: {
    colors: ['rgba(8,16,11,0)', 'rgba(8,16,11,0.55)'] as const,
    locations: [0, 1] as const,
  },
  dark: {
    colors: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.65)'] as const,
    locations: [0, 1] as const,
  },
} as const;
