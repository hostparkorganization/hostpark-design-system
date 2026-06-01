import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../../theme/ThemeContext';
import { spacing } from '../../tokens/spacing';
import { Text } from '../Text';

export interface HeaderProps {
  /** Left slot (typically a back button). */
  left?: React.ReactNode;
  /** Center slot — pass a string for a title or any node for a logo/custom. */
  center?: React.ReactNode;
  /** Right slot (typically an action button). */
  right?: React.ReactNode;
  /** Override the default top safe-area handling. Pass 0 to disable. */
  topInset?: number;
  /** Container style override. */
  style?: ViewStyle;
}

const SLOT_WIDTH = 40;

/**
 * Three-slot top app bar that handles its own safe-area top padding.
 * Slots are exact width 40px on left/right so the center stays optically
 * centered regardless of what's in the side slots.
 *
 * For the typical buttons, compose with `HeaderIconButton` from the same module.
 */
export function Header({ left, center, right, topInset, style }: HeaderProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const top = topInset ?? insets.top + spacing[2];

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: spacing[5],
          paddingTop: top,
          paddingBottom: spacing[3],
          backgroundColor: colors.background,
        },
        style,
      ]}
    >
      <View style={{ width: SLOT_WIDTH, alignItems: 'flex-start' }}>{left}</View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        {typeof center === 'string' ? (
          <Text role="bodyMedium" numberOfLines={1}>
            {center}
          </Text>
        ) : (
          center
        )}
      </View>
      <View style={{ width: SLOT_WIDTH, alignItems: 'flex-end' }}>{right}</View>
    </View>
  );
}
