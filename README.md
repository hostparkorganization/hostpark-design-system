# hostpark-design-system

Design tokens + React Native component library shared by the Hostpark Mobile app
(native iOS/Android + Expo Web build).

> **Status:** scaffolding — the brief is in [DESIGN_BRIEF.md](./DESIGN_BRIEF.md).
> Visual iteration happens on [claude.ai/design](https://claude.ai/design); locked
> decisions land in this repo as code.

## Consumers
- `hostpark-mobile` (native + Expo Web `/app` build)

Not consumed by `hostpark-web` (admin back-office — different system, follows
Material Design 3).

## Distribution
This package is **not** published to a registry. Consumers reference it by git
URL with a version tag:

```json
{
  "dependencies": {
    "@hostpark/design-system": "github:hostparkorganization/hostpark-design-system#v1.0.0"
  }
}
```

## Layout (planned)
```
hostpark-design-system/
├── DESIGN_BRIEF.md          ← the prompt for claude.ai/design
├── README.md                ← you are here
├── assets/                  ← brand assets (logos, icon)
├── src/
│   ├── tokens/              ← colors, spacing, typography, radii, shadows, motion
│   ├── components/          ← Button, Input, Card, Badge, etc.
│   │                        ←   .web.tsx variants co-located per file
│   └── theme/               ← ThemeContext + useTheme
└── package.json
```

## Workflow
1. Refine the brief in `DESIGN_BRIEF.md`.
2. Paste into claude.ai/design with the logo assets attached.
3. Iterate visually until we have a token + component set we agree on.
4. Translate decisions into code under `src/tokens/` and `src/components/`.
5. Tag a version (e.g., `v0.1.0`), bump the dep in `hostpark-mobile`.
