---
name: hostpark-design
description: Use this skill to generate well-branded interfaces and assets for Hostpark, a Brazilian peer-to-peer parking-space marketplace for residential condominiums, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy
assets out and create static HTML files for the user to view. If working on
production code, you can copy assets and read the rules here to become an expert
in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they
want to build or design, ask some questions, and act as an expert designer who
outputs HTML artifacts _or_ production code, depending on the need.

## What's here
- `README.md` — brand context, content fundamentals, visual foundations, iconography.
- `colors_and_type.css` — single source of truth for tokens (color light+dark,
  type, spacing, radii, elevation). Import it, then set `data-theme="dark"` for dark mode.
- `assets/` — logos (`hostpark-logo.png`, `hostpark-logo-white.png`) and app icon.
- `preview/` — specimen cards for every token group.
- `ui_kits/mobile/` — interactive recreation of the 3 anchor screens + reusable
  JSX components (`components.jsx`, `screens.jsx`). Phone-first, 390px canvas.

## Non-negotiables
- Primary brand color is **#55DE85** and never changes. It is a *background* for
  dark-green text (`#06371D`), never a text color on white and never under white text.
- Trustworthy + calm, residential-services tone. Solid shapes, no decorative
  gradients, photographs over illustrations, no emoji in product UI.
- Portuguese (pt-BR) strings run ~20% longer than English — never let buttons,
  badges, or inputs clip. Sentence case everywhere.
- Light AND dark themes, WCAG AA minimum (AAA for body text).
- Icons: Ionicons (outline default, solid for active states).
