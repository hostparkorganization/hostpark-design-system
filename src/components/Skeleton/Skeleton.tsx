import React, { useEffect, useRef } from 'react';
import { Animated, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme/ThemeContext';
import { radii } from '../../tokens/spacing';

export interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number;
  radius?: number;
  style?: ViewStyle;
}

/**
 * Shimmering placeholder block. The opacity pulses between 0.5 and 1 on a
 * 1.2s loop — softer than a moving gradient and uses no extra libs.
 */
export function Skeleton({ width = '100%', height = 16, radius = radii.sm, style }: SkeletonProps) {
  const { colors } = useTheme();
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.5, duration: 600, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        { width, height, borderRadius: radius, backgroundColor: colors.surface2, opacity },
        style,
      ]}
    />
  );
}
