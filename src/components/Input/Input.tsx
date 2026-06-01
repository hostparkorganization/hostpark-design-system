import React, { forwardRef, useState } from 'react';
import {
  TextInput,
  View,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '../../theme/ThemeContext';
import { radii, spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { Text } from '../Text';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  /** Label rendered above the input. */
  label?: string;
  /** Error message rendered below — switches border to destructive. */
  error?: string;
  /** Helper text rendered below (only shown when no error). */
  helper?: string;
  /** Container wrapper override. */
  containerStyle?: ViewStyle;
  /** Field wrapper override (the bordered box). */
  fieldStyle?: ViewStyle;
  /** Leading slot (e.g. an Ionicon). */
  leading?: React.ReactNode;
  /** Trailing slot (e.g. an eye toggle). */
  trailing?: React.ReactNode;
}

/**
 * Text field with label, focus ring, optional error/helper text, and
 * leading/trailing slots. Default height 50px per round-2 spec.
 *
 * @example
 *   <Input
 *     label="E-mail"
 *     placeholder="voce@email.com"
 *     keyboardType="email-address"
 *     error={errors.email?.message}
 *   />
 */
export const Input = forwardRef<TextInput, InputProps>(function Input(
  {
    label,
    error,
    helper,
    containerStyle,
    fieldStyle,
    leading,
    trailing,
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
    paddingHorizontal: spacing[3],
    opacity: editable ? 1 : 0.55,
  };

  return (
    <View style={containerStyle}>
      {label ? (
        <Text
          role="label"
          color="foregroundMuted"
          style={{ marginBottom: spacing[1] + 2 }}
        >
          {label}
        </Text>
      ) : null}
      <View style={[fieldWrap, fieldStyle]}>
        {leading ? <View style={{ marginRight: spacing[2] }}>{leading}</View> : null}
        <TextInput
          ref={ref}
          editable={editable}
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
            ...typography.body,
            color: colors.foreground,
          }}
          {...rest}
        />
        {trailing ? <View style={{ marginLeft: spacing[2] }}>{trailing}</View> : null}
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
