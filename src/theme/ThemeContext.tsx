import React, { createContext, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';

import { lightColors, darkColors } from '../tokens/colors';
import { lightElevation, darkElevation } from '../tokens/elevation';
import type { ThemeContextValue, ThemeMode } from './types';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  /** Initial mode. Defaults to 'system' (follow OS). */
  initialMode?: ThemeMode;
  children: React.ReactNode;
}

export function ThemeProvider({ initialMode = 'system', children }: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(initialMode);

  const isDark = mode === 'system' ? systemScheme === 'dark' : mode === 'dark';
  const colors = isDark ? darkColors : lightColors;
  const elevation = isDark ? darkElevation : lightElevation;

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      isDark,
      colors,
      elevation,
      setMode,
      toggle: () =>
        setMode((prev) => {
          if (prev === 'system') return isDark ? 'light' : 'dark';
          return prev === 'dark' ? 'light' : 'dark';
        }),
    }),
    [mode, isDark, colors, elevation],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a <ThemeProvider>');
  }
  return ctx;
}
