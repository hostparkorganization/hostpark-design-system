import React from 'react';
import { Modal as RNModal, Pressable, View, type ViewProps, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme/ThemeContext';
import { radii, spacing } from '../../tokens/spacing';
import { Text } from '../Text';

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Tap on the scrim closes the dialog. Defaults to true. */
  dismissOnScrim?: boolean;
}

/**
 * Centered confirmation dialog — for "are you sure?" / "remove?" patterns.
 * For action menus or longer content prefer `BottomSheet`.
 *
 * @example
 *   <Modal visible={open} onClose={close}>
 *     <Modal.Title>Remover vaga?</Modal.Title>
 *     <Modal.Body>Esta ação não pode ser desfeita.</Modal.Body>
 *     <Modal.Actions>
 *       <Button title="Cancelar" variant="secondary" onPress={close} />
 *       <Button title="Remover" variant="destructive" onPress={remove} />
 *     </Modal.Actions>
 *   </Modal>
 */
export function Modal({ visible, onClose, children, dismissOnScrim = true }: ModalProps) {
  const { colors, elevation } = useTheme();

  return (
    <RNModal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable
        accessibilityRole={dismissOnScrim ? 'button' : undefined}
        accessibilityLabel={dismissOnScrim ? 'Fechar' : undefined}
        onPress={dismissOnScrim ? onClose : undefined}
        style={{
          flex: 1,
          backgroundColor: 'rgba(8, 16, 11, 0.45)',
          alignItems: 'center',
          justifyContent: 'center',
          padding: spacing[6],
        }}
      >
        <Pressable
          onPress={() => undefined}
          style={[
            {
              width: '100%',
              maxWidth: 360,
              backgroundColor: colors.surface,
              borderRadius: radii.lg,
              padding: spacing[5],
              gap: spacing[3],
            },
            elevation.floating,
          ]}
        >
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

function ModalTitle({ children, style, ...rest }: ViewProps & { children: React.ReactNode }) {
  return (
    <View style={style} {...rest}>
      <Text role="h3">{children as string}</Text>
    </View>
  );
}

function ModalBody({ children, style, ...rest }: ViewProps & { children: React.ReactNode }) {
  if (typeof children === 'string') {
    return (
      <View style={style} {...rest}>
        <Text role="body" color="foregroundMuted">
          {children}
        </Text>
      </View>
    );
  }
  return (
    <View style={style} {...rest}>
      {children}
    </View>
  );
}

function ModalActions({ children, style, ...rest }: ViewProps) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          gap: spacing[2],
          marginTop: spacing[2],
        } as ViewStyle,
        style,
      ]}
      {...rest}
    >
      {React.Children.map(children, (child) => (
        <View style={{ flex: 1 }}>{child}</View>
      ))}
    </View>
  );
}

Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Actions = ModalActions;
