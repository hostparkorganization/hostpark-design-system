import React, { Children, isValidElement, cloneElement } from 'react';
import {
  Pressable,
  View,
  type PressableProps,
  type ViewProps,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '../../theme/ThemeContext';
import { radii, spacing } from '../../tokens/spacing';
import { Text } from '../Text';

export interface ListItemProps extends Omit<PressableProps, 'children' | 'style'> {
  /** Leading slot — typically an Avatar or an icon. */
  leading?: React.ReactNode;
  /** Bold first line. */
  title: string;
  /** Optional muted second line. */
  subtitle?: string;
  /** Trailing slot — typically a chevron, switch, or small Button. */
  trailing?: React.ReactNode;
  /** Render with a bottom border (consumed by ListGroup). */
  showBorder?: boolean;
  style?: ViewStyle;
}

/**
 * A single row inside a list. Wrap multiple `ListItem`s in a `ListGroup` and
 * the group handles the rounded container + dividers automatically.
 *
 * For standalone rows (e.g. a single tap target in a settings sheet), use
 * `<ListItem>` directly — it'll skip the divider unless `showBorder` is set.
 */
export function ListItem({
  leading,
  title,
  subtitle,
  trailing,
  showBorder = false,
  onPress,
  style,
  ...rest
}: ListItemProps) {
  const { colors } = useTheme();

  const row: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderBottomWidth: showBorder ? 1 : 0,
    borderBottomColor: colors.border,
  };

  const content = (
    <>
      {leading ? <View style={{ marginRight: spacing[3] }}>{leading}</View> : null}
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text role="bodyMedium" numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text role="small" color="foregroundMuted" numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {trailing ? <View style={{ marginLeft: spacing[3] }}>{trailing}</View> : null}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [row, pressed && { backgroundColor: colors.surface2 }, style]}
        {...rest}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={[row, style]}>{content}</View>;
}

export interface ListGroupProps extends ViewProps {
  /** Show a hairline divider between items (default true). */
  dividers?: boolean;
}

/**
 * Container that styles a stack of `ListItem`s as a single rounded card with
 * dividers between items. Pass plain `<ListItem>` children — the group injects
 * `showBorder` on all but the last child.
 */
export function ListGroup({ dividers = true, children, style, ...rest }: ListGroupProps) {
  const { colors } = useTheme();
  const items = Children.toArray(children);

  const wrapped = items.map((child, index) => {
    if (!isValidElement(child)) return child;
    const isLast = index === items.length - 1;
    return cloneElement(child as React.ReactElement<ListItemProps>, {
      showBorder: dividers && !isLast,
    });
  });

  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radii.lg,
          overflow: 'hidden',
        },
        style,
      ]}
      {...rest}
    >
      {wrapped}
    </View>
  );
}
