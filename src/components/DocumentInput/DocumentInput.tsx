import React from 'react';
import { Pressable, View, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../theme/ThemeContext';
import { radii, spacing } from '../../tokens/spacing';
import { Text } from '../Text';

export interface DocumentInputFile {
  name: string;
  /** Pretty size string, e.g. "1,2 MB". The consumer formats this. */
  size?: string;
}

export interface DocumentInputProps {
  label?: string;
  error?: string;
  helper?: string;
  /** Currently attached file. When set the component renders the file row instead of the drop zone. */
  file?: DocumentInputFile | null;
  /** Called when the user taps the drop zone. Consumer opens the file picker. */
  onPickPress: () => void;
  /** Called when the user removes the file. */
  onRemove?: () => void;
  /** Drop zone label override. */
  dropZoneTitle?: string;
  /** Drop zone helper override. */
  dropZoneHelper?: string;
  containerStyle?: ViewStyle;
}

/**
 * Document upload field — toggles between an empty "drop zone" and a populated
 * file row based on `file`. The component is presentation-only; wire your file
 * picker (e.g. `expo-document-picker`) via `onPickPress` and call `onRemove`
 * to clear.
 *
 * @example
 *   const [file, setFile] = useState<DocumentInputFile | null>(null);
 *   <DocumentInput
 *     label="Comprovante de residência"
 *     file={file}
 *     onPickPress={async () => {
 *       const res = await DocumentPicker.getDocumentAsync({ type: ['application/pdf', 'image/*'] });
 *       if (res.assets?.[0]) setFile({ name: res.assets[0].name, size: formatBytes(res.assets[0].size) });
 *     }}
 *     onRemove={() => setFile(null)}
 *   />
 */
export function DocumentInput({
  label,
  error,
  helper,
  file,
  onPickPress,
  onRemove,
  dropZoneTitle = 'Toque para anexar',
  dropZoneHelper = 'PDF, JPG ou PNG (máx. 10 MB)',
  containerStyle,
}: DocumentInputProps) {
  const { colors } = useTheme();

  const dropZone = (
    <Pressable
      onPress={onPickPress}
      accessibilityRole="button"
      accessibilityLabel={dropZoneTitle}
      style={({ pressed }) => [
        {
          padding: spacing[5],
          borderRadius: radii.lg,
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor: colors.borderStrong,
          backgroundColor: colors.surface2,
          alignItems: 'center',
          gap: spacing[1],
        } as ViewStyle,
        pressed && { opacity: 0.9 },
      ]}
    >
      <Ionicons name="cloud-upload-outline" size={28} color={colors.foregroundMuted} />
      <Text role="bodyMedium" align="center">
        {dropZoneTitle}
      </Text>
      <Text role="caption" color="foregroundMuted" align="center">
        {dropZoneHelper}
      </Text>
    </Pressable>
  );

  const fileRow = file ? (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing[3],
        padding: spacing[3] + 2,
        borderRadius: radii.md,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: radii.md,
          backgroundColor: colors.accentSubtle,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons name="document-text-outline" size={22} color={colors.accent} />
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text role="bodyMedium" numberOfLines={1}>
          {file.name}
        </Text>
        {file.size ? (
          <Text role="caption" color="foregroundMuted">
            {file.size}
          </Text>
        ) : null}
      </View>
      {onRemove ? (
        <Pressable
          onPress={onRemove}
          accessibilityRole="button"
          accessibilityLabel="Remover arquivo"
          style={({ pressed }) => [{ padding: spacing[1] }, pressed && { opacity: 0.7 }]}
        >
          <Text role="small" color="destructive">
            Remover
          </Text>
        </Pressable>
      ) : null}
    </View>
  ) : null;

  return (
    <View style={containerStyle}>
      {label ? (
        <Text role="label" color="foregroundMuted" style={{ marginBottom: spacing[1] + 2 }}>
          {label}
        </Text>
      ) : null}
      {file ? fileRow : dropZone}
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
}
