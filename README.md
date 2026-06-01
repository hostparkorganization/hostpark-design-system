# @hostpark/design-system

Design tokens + React Native component library for the Hostpark mobile app
(native iOS/Android + Expo Web build at `/app`).

> **Status:** `0.1.0-dev` — Phase A shipped (tokens, theme, `Text` primitive).
> Core components (`Button`, `Input`, `Card`, `Badge`, `Header`, `ScreenWrapper`)
> arrive in `0.2.0-dev`. First tagged release will be **`v1.0.0`** once the
> mobile app is wired and smoke-passing.

## Consumers

- `hostpark-mobile` (native + Expo Web `/app` build)

Not consumed by `hostpark-web` (admin back-office — different system, follows
Material Design 3).

## Install

```jsonc
// hostpark-mobile/package.json
{
  "dependencies": {
    "@hostpark/design-system": "github:hostparkorganization/hostpark-design-system#v1.0.0"
  }
}
```

Peer deps the consumer must have installed (hostpark-mobile already does):
`react`, `react-native`, `@expo/vector-icons`, `expo-font`,
`react-native-safe-area-context`.

## Use

### 1. Load the fonts

Fonts are bundled in the package but must be registered with React Native by
the consumer. Do this once at app boot:

```ts
// app/_layout.tsx
import * as Font from 'expo-font';
import { fonts } from '@hostpark/design-system/fonts';

const [loaded] = Font.useFonts(fonts);
if (!loaded) return null;
```

### 2. Wrap the app in `ThemeProvider`

```tsx
// app/_layout.tsx
import { ThemeProvider } from '@hostpark/design-system';

export default function RootLayout() {
  return (
    <ThemeProvider initialMode="system">
      <Stack />
    </ThemeProvider>
  );
}
```

### 3. Consume tokens and components

```tsx
import { View } from 'react-native';
import { useTheme, Text, spacing, radii } from '@hostpark/design-system';

export function Greeting({ name }: { name: string }) {
  const { colors, elevation } = useTheme();
  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: radii.lg,
        padding: spacing[4],
        ...elevation.subtle,
      }}
    >
      <Text role="overline" color="foregroundMuted">Bom dia</Text>
      <Text role="h1">{name}</Text>
    </View>
  );
}
```

## Package surface

```
@hostpark/design-system
├── tokens   ← brandConstants, lightColors, darkColors, spacing, radii,
│              layout, fontFamilies, fontSizes, lineHeights, fontWeights,
│              tracking, typography, lightElevation, darkElevation, scrim,
│              motion
├── theme    ← ThemeProvider, useTheme, Theme, ThemeMode
├── Text     ← (more components coming in 0.2.0)
└── fonts    ← require-map for expo-font.loadAsync
```

Imports work via the package root for convenience:

```ts
import { useTheme, Text, spacing, lightColors } from '@hostpark/design-system';
```

Sub-path imports are also available for tree-shaking-conscious bundlers:

```ts
import { spacing } from '@hostpark/design-system/tokens';
import { useTheme } from '@hostpark/design-system/theme';
import { fonts } from '@hostpark/design-system/fonts';
```

## Repository layout

```
hostpark-design-system/
├── README.md                ← you are here
├── DESIGN_BRIEF.md          ← full brief (claude.ai/design source of truth)
├── PROMPTS/                 ← per-round prompts fed into claude.ai/design
├── chats/                   ← claude.ai/design conversation transcripts
├── project/                 ← claude.ai/design output (HTML/CSS/JSX prototypes)
│   ├── README.md            ← brand guide: content fundamentals, visual foundations, iconography
│   ├── SKILL.md             ← Claude Code skill front-matter
│   ├── colors_and_type.css  ← canonical CSS tokens (the source we ported from)
│   ├── preview/             ← specimen cards (tokens + component states)
│   ├── ui_kits/mobile/      ← interactive prototype (6 screens, theme toggle)
│   ├── fonts/               ← TTFs used by the prototype
│   └── assets/              ← brand logos (mirrored from /assets)
├── assets/
│   ├── fonts/               ← TTFs bundled in the npm package (consumer loads via expo-font)
│   └── *.png                ← brand logos
└── src/                     ← THE PACKAGE — TypeScript source consumed by Metro
    ├── index.ts             ← root barrel
    ├── fonts.ts             ← font require-map
    ├── tokens/              ← colors, spacing, typography, elevation, motion
    ├── theme/               ← ThemeProvider, useTheme
    └── components/          ← Text (more coming)
```

The `project/` folder is the **visual source of truth**. The `src/` folder is
the **code source of truth** — what consumers actually import. They should
stay in sync; if you change tokens in `src/tokens/colors.ts`, also update
`project/colors_and_type.css` (or vice versa) and the preview HTML.

## Versioning

| Version | Status | Contents |
|---|---|---|
| `0.1.0-dev` | **current** | Tokens + theme + `Text` |
| `0.2.0-dev` | next | + Button, Input, Card, Badge, Header, ScreenWrapper |
| `0.3.0-dev` | following | + PhoneInput, DocumentInput, BottomSheet, Modal, ListItem, state templates |
| `v1.0.0`  | first tagged release | Full library, mobile app wired |

Consumers reference tagged versions only (e.g. `github:hostparkorganization/hostpark-design-system#v1.0.0`).

## Iterating on the design

To run another round on [claude.ai/design](https://claude.ai/design):

1. Open the same project (so it has full context).
2. Upload any new fonts/assets if needed.
3. Paste a new prompt under `PROMPTS/round-N-*.md`.
4. Export the bundle and overlay it into this repo's `project/` folder.
5. Re-port any changed tokens into `src/tokens/` and bump the version.

## Preview the prototype

```powershell
npx serve c:\workspace\hostpark\hostpark-design-system
```

Then open:
- http://localhost:3000/project/ui_kits/mobile/ — interactive 6-screen kit
- http://localhost:3000/project/preview/ — specimen cards
