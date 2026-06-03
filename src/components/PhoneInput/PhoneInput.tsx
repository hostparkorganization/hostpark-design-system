import React, { forwardRef, useState } from 'react';
import {
  Pressable,
  TextInput,
  View,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../theme/ThemeContext';
import { radii, spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { Text } from '../Text';

export interface PhoneInputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  helper?: string;
  /** Country emoji flag (e.g. "🇧🇷"). Defaults to a globe placeholder. */
  flag?: string;
  /** International dial code without the plus (e.g. "55" for Brazil). */
  dialCode: string;
  /** Called when the user taps the country prefix. Consumer opens the picker. */
  onCountryPress?: () => void;
  containerStyle?: ViewStyle;
}

/**
 * Phone input with a tappable country prefix. The design system is
 * presentation-only — the consumer wires the country picker and the
 * masking. Pass current `flag` + `dialCode` and respond to `onCountryPress`
 * to open whatever picker UI you prefer.
 */
export const PhoneInput = forwardRef<TextInput, PhoneInputProps>(function PhoneInput(
  {
    label,
    error,
    helper,
    flag,
    dialCode,
    onCountryPress,
    containerStyle,
    editable = true,
    onFocus,
    onBlur,
    ...rest
  },
  ref,
) {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? colors.destructive
    : focused
      ? colors.ring
      : colors.border;

  const fieldWrap: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    opacity: editable ? 1 : 0.55,
    overflow: 'hidden',
  };

  return (
    <View style={containerStyle}>
      {label ? (
        <Text role="label" color="foregroundMuted" style={{ marginBottom: spacing[1] + 2 }}>
          {label}
        </Text>
      ) : null}
      <View style={fieldWrap}>
        <Pressable
          onPress={onCountryPress}
          disabled={!onCountryPress || !editable}
          accessibilityRole="button"
          accessibilityLabel="Selecionar país"
          style={({ pressed }) => [
            {
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: spacing[3],
              height: '100%',
              borderRightWidth: 1,
              borderRightColor: colors.border,
              backgroundColor: colors.surface2,
              gap: spacing[1],
            },
            pressed && { opacity: 0.85 },
          ]}
        >
          <Text role="body" style={{ fontSize: 18 }}>
            {flag ?? '🌐'}
          </Text>
          <Text role="bodyMedium">+{dialCode}</Text>
          {onCountryPress ? (
            <Ionicons name="chevron-down" size={14} color={colors.muted} />
          ) : null}
        </Pressable>
        <TextInput
          ref={ref}
          editable={editable}
          keyboardType="phone-pad"
          placeholderTextColor={colors.muted}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          style={{
            flex: 1,
            paddingHorizontal: spacing[3],
            ...typography.body,
            color: colors.foreground,
          }}
          {...rest}
        />
      </View>
      {error ? (
        <Text role="caption" color="destructive" style={{ marginTop: spacing[1] + 2 }}>
          {error}
        </Text>
      ) : helper ? (
        <Text role="caption" color="foregroundMuted" style={{ marginTop: spacing[1] + 2 }}>
          {helper}
        </Text>
      ) : null}
    </View>
  );
});
