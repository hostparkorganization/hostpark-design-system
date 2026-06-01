import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  type ScrollViewProps,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../../theme/ThemeContext';
import { layout } from '../../tokens/spacing';

export interface ScreenWrapperProps {
  children: React.ReactNode;
  /** Wrap content in a ScrollView. Defaults to true. */
  scroll?: boolean;
  /** Apply horizontal+top padding (`screenPaddingHorizontal` / `screenPaddingTop`). Defaults to true. */
  padded?: boolean;
  /** Reserve space at the bottom for the bottom-nav (72px + safe inset). Defaults to true. */
  safeBottom?: boolean;
  /** Override the background color. Defaults to theme `background`. */
  background?: string;
  /** Forward to the inner ScrollView. */
  scrollProps?: Omit<ScrollViewProps, 'children' | 'contentContainerStyle'>;
  /** Container style override. */
  style?: ViewStyle;
}

/**
 * Screen-level shell — handles background, safe-area, scroll, and
 * keyboard-avoidance.
 *
 * Web column clamp (centering the phone-width column on desktop) is NOT
 * applied here — that lives at the app's root layout so it wraps the whole
 * tree once instead of every screen.
 */
export function ScreenWrapper({
  children,
  scroll = true,
  padded = true,
  safeBottom = true,
  background,
  scrollProps,
  style,
}: ScreenWrapperProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: background ?? colors.background,
  };

  const contentStyle: ViewStyle = {
    ...(padded
      ? {
          paddingHorizontal: layout.screenPaddingHorizontal,
          paddingTop: layout.screenPaddingTop,
        }
      : null),
    ...(safeBottom
      ? { paddingBottom: insets.bottom + layout.bottomNavHeight }
      : null),
  };

  const inner = scroll ? (
    <ScrollView
      contentContainerStyle={contentStyle}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      {...scrollProps}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[{ flex: 1 }, contentStyle]}>{children}</View>
  );

  return (
    <KeyboardAvoidingView
      style={[containerStyle, style]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {inner}
    </KeyboardAvoidingView>
  );
}
