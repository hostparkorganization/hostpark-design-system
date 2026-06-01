import type { ColorTokens } from '../tokens/colors';
import type { ElevationTokens } from '../tokens/elevation';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface Theme {
  /** Whether dark mode is currently active (after resolving 'system'). */
  isDark: boolean;
  /** The current color palette, light or dark. */
  colors: ColorTokens;
  /** The current elevation/shadow set, light or dark. */
  elevation: ElevationTokens;
}

export interface ThemeContextValue extends Theme {
  /** The user's setting ('system' means follow OS). */
  mode: ThemeMode;
  /** Set the user's preference. */
  setMode: (mode: ThemeMode) => void;
  /** Cycle between light and dark (ignores 'system' setting after the toggle). */
  toggle: () => void;
}
