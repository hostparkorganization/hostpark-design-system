import React from 'react';
import { Image, View, type ImageSourcePropType, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme/ThemeContext';
import { radii } from '../../tokens/spacing';
import { Text } from '../Text';

export interface AvatarProps {
  /** Image source (overrides initials if provided). */
  source?: ImageSourcePropType;
  /** Fallback initials (1-2 characters). Required if no source. */
  initials?: string;
  size?: number;
  style?: ViewStyle;
}

/**
 * Circular avatar — image if provided, otherwise tinted initials. Defaults
 * to 42px (the list-item size in the round-2 specimens).
 */
export function Avatar({ source, initials, size = 42, style }: AvatarProps) {
  const { colors } = useTheme();

  const container: ViewStyle = {
    width: size,
    height: size,
    borderRadius: radii.full,
    backgroundColor: colors.accentSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  };

  if (source) {
    return (
      <View style={[container, style]}>
        <Image source={source} style={{ width: size, height: size }} />
      </View>
    );
  }

  return (
    <View style={[container, style]}>
      <Text
        role="h4"
        color="accent"
        style={{ fontSize: Math.round(size * 0.36), lineHeight: size }}
      >
        {(initials ?? '?').slice(0, 2).toUpperCase()}
      </Text>
    </View>
  );
}
