import React from 'react';
import {
  Modal as RNModal,
  Pressable,
  View,
  type ViewProps,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../theme/ThemeContext';
import { radii, spacing } from '../../tokens/spacing';
import { Text } from '../Text';

export interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Tap on the scrim closes the sheet. Defaults to true. */
  dismissOnScrim?: boolean;
}

/**
 * Slide-up sheet anchored to the bottom of the screen. Uses RN's native
 * Modal so the OS handles back-press dismissal on Android. The grab handle
 * and rounded top corners are baked in; pair with `BottomSheet.Header`,
 * `BottomSheet.Body`, and `BottomSheet.Footer` to compose the content.
 *
 * @example
 *   <BottomSheet visible={open} onClose={close}>
 *     <BottomSheet.Header title="Ações da vaga" onClose={close} />
 *     <BottomSheet.Body>
 *       <ListItem title="Editar anúncio" leading={<Ionicons name="create-outline" />} />
 *     </BottomSheet.Body>
 *     <BottomSheet.Footer>
 *       <Button title="Confirmar" fullWidth onPress={...} />
 *     </BottomSheet.Footer>
 *   </BottomSheet>
 */
export function BottomSheet({
  visible,
  onClose,
  children,
  dismissOnScrim = true,
}: BottomSheetProps) {
  const { colors, elevation } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable
        accessibilityRole={dismissOnScrim ? 'button' : undefined}
        accessibilityLabel={dismissOnScrim ? 'Fechar' : undefined}
        onPress={dismissOnScrim ? onClose : undefined}
        style={{ flex: 1, backgroundColor: 'rgba(8, 16, 11, 0.34)', justifyContent: 'flex-end' }}
      >
        <Pressable
          // Stop propagation so taps inside the sheet don't close it.
          onPress={() => undefined}
          style={[
            {
              backgroundColor: colors.surface,
              borderTopLeftRadius: radii.xl,
              borderTopRightRadius: radii.xl,
              paddingBottom: insets.bottom + spacing[2],
            },
            elevation.floating,
          ]}
        >
          <View
            style={{
              alignSelf: 'center',
              width: 38,
              height: 4,
              borderRadius: 99,
              backgroundColor: colors.borderStrong,
              marginTop: spacing[2] + 2,
              marginBottom: spacing[1],
            }}
          />
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

export interface BottomSheetHeaderProps {
  title: string;
  onClose?: () => void;
}

function BottomSheetHeader({ title, onClose }: BottomSheetHeaderProps) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: spacing[2],
        paddingBottom: spacing[3],
        paddingHorizontal: spacing[5],
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      <Text role="h4">{title}</Text>
      {onClose ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Fechar"
          onPress={onClose}
          style={({ pressed }) => [{ padding: 4 }, pressed && { opacity: 0.7 }]}
        >
          <Ionicons name="close" size={22} color={colors.muted} />
        </Pressable>
      ) : null}
    </View>
  );
}

function BottomSheetBody({ children, style, ...rest }: ViewProps) {
  return (
    <View style={[{ paddingVertical: spacing[1] }, style]} {...rest}>
      {children}
    </View>
  );
}

function BottomSheetFooter({ children, style, ...rest }: ViewProps) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        {
          paddingTop: spacing[3],
          paddingBottom: spacing[4],
          paddingHorizontal: spacing[5],
          borderTopWidth: 1,
          borderTopColor: colors.border,
        } as ViewStyle,
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

BottomSheet.Header = BottomSheetHeader;
BottomSheet.Body = BottomSheetBody;
BottomSheet.Footer = BottomSheetFooter;
