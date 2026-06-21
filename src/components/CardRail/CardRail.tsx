import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  View,
  useWindowDimensions,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../theme/ThemeContext';
import { radii, spacing } from '../../tokens/spacing';
import { Text } from '../Text';

export interface CardRailItem {
  /** Stable list key. */
  key: string;
  /** Optional Ionicons glyph, shown in a tinted square at the top of the tile. */
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  /**
   * Status accent for the tile border + icon. `'default'` = hairline border + muted icon;
   * `'success'` = green (e.g. an active/confirmed item); `'warning'` = amber (e.g. pending).
   */
  tone?: 'default' | 'success' | 'warning';
}

export interface CardRailProps {
  items: CardRailItem[];
  /** When set, a trailing "+ {addLabel}" tile is appended. */
  onAdd?: () => void;
  /** Label for the add tile. Defaults to "Adicionar". */
  addLabel?: string;
  /** Tile width in px. Default 180 (room for a condo name up to 3 lines). */
  cardWidth?: number;
  /**
   * Navigation arrows. `'auto'` (default) shows them only on **web** at a wide
   * viewport (≥768px) and when the content overflows; touch/narrow uses swipe and
   * never shows arrows. Pass `true`/`false` to force.
   */
  arrows?: 'auto' | boolean;
}

const WIDE_BREAKPOINT = 768;

/**
 * Horizontal, swipeable rail of card tiles (icon + title + subtitle), with an
 * optional trailing "add" tile and — on wide web — left/right navigation arrows.
 *
 * @example
 *   <CardRail
 *     items={condos.map((c) => ({ key: c.id, icon: 'business', title: c.name, subtitle: c.apto, onPress: () => open(c) }))}
 *     onAdd={goToFindCondo}
 *   />
 */
export function CardRail({
  items,
  onAdd,
  addLabel = 'Adicionar',
  cardWidth = 180,
  arrows = 'auto',
}: CardRailProps) {
  const { colors, elevation, isDark } = useTheme();
  const { width: viewportWidth } = useWindowDimensions();

  const scrollRef = useRef<ScrollView>(null);
  const offsetRef = useRef(0);
  const [containerW, setContainerW] = useState(0);
  const [contentW, setContentW] = useState(0);
  const [offset, setOffset] = useState(0);

  // Hide the scrollbar on web — RNW's showsHorizontalScrollIndicator={false} doesn't suppress the
  // OS scrollbar on WebKit. The rail stays scrollable (swipe / trackpad / the nav arrows). We inject
  // a global rule once and add its class to the *actual* scrollable DOM node (via the ScrollView's
  // getScrollableNode) — attaching it to the ScrollView props doesn't reach the right element.
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;
    const id = 'hp-cardrail-scrollbar-style';
    if (!document.getElementById(id)) {
      const styleEl = document.createElement('style');
      styleEl.id = id;
      styleEl.textContent =
        '.hp-rail-scroll{scrollbar-width:none!important;-ms-overflow-style:none!important;}' +
        '.hp-rail-scroll::-webkit-scrollbar{display:none!important;width:0!important;height:0!important;}';
      document.head.appendChild(styleEl);
    }
    const ref = scrollRef.current as unknown as { getScrollableNode?: () => HTMLElement } | null;
    const node = ref?.getScrollableNode?.();
    if (node?.classList) node.classList.add('hp-rail-scroll');
  }, []);

  const overflowing = contentW > containerW + 1;
  const arrowsEnabled =
    arrows === true ||
    (arrows === 'auto' &&
      Platform.OS === 'web' &&
      viewportWidth >= WIDE_BREAKPOINT &&
      overflowing);

  const step = cardWidth + spacing[3];
  const maxOffset = Math.max(0, contentW - containerW);
  const canLeft = offset > 1;
  const canRight = offset < maxOffset - 1;

  const scrollBy = useCallback(
    (dir: -1 | 1) => {
      const next = Math.max(0, Math.min(offsetRef.current + dir * step, maxOffset));
      scrollRef.current?.scrollTo({ x: next, animated: true });
    },
    [step, maxOffset],
  );

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    offsetRef.current = x;
    setOffset(x);
  };

  const surfaceBorder: ViewStyle = isDark
    ? {}
    : { borderWidth: 1, borderColor: colors.border };

  const toneStyles: Record<
    NonNullable<CardRailItem['tone']>,
    { border?: string; iconBg: string; icon: string }
  > = {
    default: { iconBg: colors.surface2, icon: colors.foregroundMuted },
    success: { border: colors.success, iconBg: colors.successSubtle, icon: colors.success },
    warning: { border: colors.warning, iconBg: colors.warningSubtle, icon: colors.warning },
  };

  const tileBase: ViewStyle = {
    width: cardWidth,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing[4],
    gap: spacing[2],
    ...elevation.subtle,
    ...surfaceBorder,
  };

  const renderArrow = (dir: -1 | 1, disabled: boolean) => (
    <Pressable
      onPress={() => scrollBy(dir)}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={dir < 0 ? 'Anterior' : 'Próximo'}
      style={{
        position: 'absolute',
        top: '50%',
        transform: [{ translateY: -18 }],
        left: dir < 0 ? -6 : undefined,
        right: dir > 0 ? -6 : undefined,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0 : 1,
        zIndex: 2,
        ...elevation.subtle,
        ...surfaceBorder,
      }}
    >
      <Ionicons
        name={dir < 0 ? 'chevron-back' : 'chevron-forward'}
        size={20}
        color={colors.foreground}
      />
    </Pressable>
  );

  return (
    <View
      style={{ position: 'relative' }}
      onLayout={(e: LayoutChangeEvent) => setContainerW(e.nativeEvent.layout.width)}
    >
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onContentSizeChange={(w) => setContentW(w)}
        // `stretch` equalizes tile heights to the tallest so the row stays tidy.
        contentContainerStyle={{ gap: spacing[3], paddingVertical: spacing[1], alignItems: 'stretch' }}
      >
        {items.map((item) => {
          const tone = toneStyles[item.tone ?? 'default'];
          return (
            <Pressable
              key={item.key}
              onPress={item.onPress}
              disabled={!item.onPress}
              accessibilityRole={item.onPress ? 'button' : undefined}
              style={({ pressed }) => [
                tileBase,
                tone.border ? { borderWidth: 1, borderColor: tone.border } : null,
                pressed && item.onPress ? { opacity: 0.92 } : null,
              ]}
            >
              {item.icon ? (
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: radii.md,
                    backgroundColor: tone.iconBg,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Ionicons name={item.icon} size={22} color={tone.icon} />
                </View>
              ) : null}
              <Text role="bodyMedium" numberOfLines={3}>
                {item.title}
              </Text>
              {item.subtitle ? (
                <Text role="small" color="foregroundMuted" numberOfLines={1}>
                  {item.subtitle}
                </Text>
              ) : null}
            </Pressable>
          );
        })}

        {onAdd ? (
          <Pressable
            onPress={onAdd}
            accessibilityRole="button"
            accessibilityLabel={addLabel}
            style={({ pressed }) => [
              {
                width: cardWidth,
                borderRadius: radii.lg,
                borderWidth: 1,
                borderColor: colors.border,
                borderStyle: 'dashed',
                alignItems: 'center',
                justifyContent: 'center',
                gap: spacing[2],
                padding: spacing[4],
              } as ViewStyle,
              pressed ? { opacity: 0.92 } : null,
            ]}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: colors.primarySubtle,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="add" size={24} color={colors.accent} />
            </View>
            <Text role="small" color="accent">
              {addLabel}
            </Text>
          </Pressable>
        ) : null}
      </ScrollView>

      {arrowsEnabled ? (
        <>
          {renderArrow(-1, !canLeft)}
          {renderArrow(1, !canRight)}
        </>
      ) : null}
    </View>
  );
}
