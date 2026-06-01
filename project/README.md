# Hostpark — Mobile Design System

> **Hostpark** is a Brazilian peer-to-peer parking-space marketplace for
> residential condominiums (*condomínios*). Residents rent out their unused
> parking spaces (*vagas*) to neighbors in the same building. Small amounts of
> money change hands frequently, so **trust matters more than excitement**.

This repository is the **foundation set** for Hostpark's mobile design system —
tokens plus three anchor screens — built to be evaluated before commissioning
the full component library.

- **Platform:** Mobile-first (iOS + Android), also shipped as an **Expo-Web**
  build inside a centered **624px** desktop column.
- **Canonical canvas:** phone, **390–430px** wide (designs use **390px**).
- **Language:** Portuguese (pt-BR). Strings run **~20% longer** than English —
  layouts never clip `Confirmar reserva`, `Aprovar associação`,
  `Transferir propriedade`.
- **Themes:** Light **and** dark, defined side-by-side from day one.
- **Accessibility:** every color pair targets **WCAG AA**; body text **AAA**.

---

## Source material

This system was created from brand assets only — there was **no existing
codebase or Figma file** to import. If you have access to additional sources,
add links here:

- `assets/hostpark-logo.png` — full color wordmark (green "Host" + grey "park")
- `assets/hostpark-logo-white.png` — wordmark for dark/photographic backgrounds
- `assets/hostpark-icon.png` — app icon / standalone "H" mark
- Codebase: _none provided_ · Figma: _none provided_

Brand colors were sampled directly from the logo (vivid green averaged
`#66e78c`; the spec-mandated primary is **`#55DE85`**; wordmark grey ≈ `#7e7b78`,
which seeded the warm-neutral palette).

---

## Brand personality

**Trustworthy + calm. Residential-services, not consumer-tech.**

Hostpark is closer to a *modern building intranet* than to a ride-share or a
hotel app. Mature, restrained, quiet confidence. Solid shapes over decorative
gradients. Photographs over illustrations. The bar for every screen:

> *"It should look like a calm, slightly under-designed residential app — not
> something that pops on Dribbble."*

---

## CONTENT FUNDAMENTALS

How Hostpark writes. Copy is **Portuguese (pt-BR)**, warm but efficient — the
tone of a helpful building manager (*síndico*), never a hype marketer.

- **Voice & person.** Speak **to** the resident as **"você"** (never the formal
  *o senhor/a senhora* — too stiff; never *tu* — too regional). The app refers
  to itself in the third person ("O Hostpark confirma sua reserva"), not "we".
- **Tone.** Calm, plain, reassuring. Short declarative sentences. We explain
  *what happens next* and *what it costs* before asking for confirmation. No
  exclamation marks in transactional flows; a single warm one is OK in
  empty-states or onboarding.
- **Casing.** **Sentence case everywhere** — buttons, titles, menu items, tabs.
  (`Reservar vaga`, not `Reservar Vaga` or `RESERVAR VAGA`.) Reserve ALL-CAPS for
  tiny overline labels only (`DISPONÍVEL`, `VERIFICADO`), tracked +6%.
- **Money & numbers.** Brazilian format: `R$ 12,00` / `R$ 1.250,00` (comma
  decimal, period thousands, space after `R$`). Per-day pricing reads
  `R$ 12 /dia`. Dates `dd/mm`; times 24h (`14:00`).
- **Buttons = verbs.** Action-first and specific: `Reservar vaga`,
  `Confirmar reserva`, `Entrar`, `Criar conta`, `Aprovar associação`. Avoid bare
  `OK` / `Enviar`.
- **Trust language.** Lean on concrete, verifiable words: *verificado*,
  *morador confirmado*, *mesmo condomínio*, *pagamento protegido*. Never
  superlatives (*incrível*, *imperdível*).
- **Emoji:** **none** in product UI. Trust signals are badges and icons, not
  emoji.
- **Terminology (canonical pt-BR):** condomínio (building/community), vaga
  (parking space), morador (resident), síndico (building manager/admin),
  reserva (booking), mural (community board/feed), anfitrião/host (space owner).

**Microcopy examples**
- Sign-in subtitle: *"Acesse sua conta para gerenciar suas vagas e reservas."*
- Empty home hero: *"O que você gostaria de fazer?"*
- Verified host chip: *"Morador verificado"*
- Booking CTA confirmation: *"Você reserva a vaga de Marina por R$ 12 /dia.
  O valor só é cobrado após a confirmação do anfitrião."*

---

## VISUAL FOUNDATIONS

The look is **quiet, solid, and warm-neutral**, with green used as a precise
accent rather than a flood.

- **Color vibe.** A warm off-white canvas (`#F6F8F6`) and pure-white cards in
  light mode; a warm green-black canvas (`#0E1411`) in dark. Greens carry a
  slight warmth; neutrals are warm greys descended from the wordmark — never
  cold/blue greys. The brand green is used **sparingly** — primarily on the one
  key action per screen, selected states, and the verified mark.
- **Green is precious.** `#55DE85` is bright and light, so it is a *background
  for dark-green text* (`#06371D`, ~9:1) — never a text color on white, and
  never carrying white text. For green text on light surfaces use the deeper
  `--accent` (`#1F8A5B`).
- **Type.** Display = **Hanken Grotesk** (warm humanist grotesque, 600–800) for
  headings and hero. Body = **IBM Plex Sans** (institutional, legible, full
  Latin-Extended for diacritics). Codes/IDs in **IBM Plex Mono**. Headings sit
  tight (`-0.01/-0.02em`); body is comfortable (1.5 line-height).
- **Spacing.** 4px base scale; screen gutters are `--space-5` (20px), card
  padding `--space-4`–`--space-5`. Generous vertical rhythm — calm needs air.
- **Corner radii.** Soft but not bubbly. Inputs/buttons `--radius-md` (10px),
  cards `--radius-lg` (14px), sheets/hero cards `--radius-xl` (20px), avatars &
  pills `--radius-full`. The logo's rounded-rectangle "H" sets this language.
- **Cards.** White (light) / `#161D19` (dark), `--radius-lg`, hairline
  `--border` in light mode, and **`--elev-subtle`** shadow. Dark-mode cards lean
  on a *lighter surface tone* + border to read as raised, not on shadow.
- **Elevation — 3 tiers.** `subtle` (resting cards), `raised` (menus, popovers,
  the sticky bottom CTA bar), `floating` (bottom sheets, dialogs). Shadows are
  soft, low-spread, warm-tinted (`rgba(16,28,20,…)`); dark mode adds near-black
  shadows and relies more on tone.
- **Backgrounds.** Flat solid fills. **No decorative gradients.** The *only*
  gradient is a functional **protection scrim** (`--scrim`) under text laid over
  photographs (e.g. vaga detail header). No repeating patterns, no textures, no
  noise.
- **Imagery.** Real **photographs** of garages, buildings, parking spaces —
  natural daylight, neutral-to-warm, true-to-life color (no heavy filters, no
  duotone, no b&w). Photos sit in `--radius-lg` containers, often full-bleed at
  the top of a detail screen with the scrim for legibility.
- **Borders.** Hairline 1px `--border`; `--border-strong` for emphasis/hover.
  Dividers are full-bleed hairlines, not heavy rules.
- **Transparency & blur.** Sparingly. A `backdrop-blur` + translucent surface is
  acceptable on the **sticky bottom CTA bar** and a sheet scrim overlay. Bodies
  of content stay opaque for legibility.
- **Motion.** Restrained and quick. Durations **150–220ms**, easing
  `cubic-bezier(0.2, 0, 0, 1)` (ease-out). **Fades and short slides** (sheets
  rise 12–16px). **No bounce, no spring overshoot, no parallax.** Calm = things
  settle, they don't perform.
- **Hover (web build).** Subtle: surfaces shift to `--surface-2`, primary
  darkens to `--primary-hover`. **Press (mobile):** a quick scale to `0.98` +
  the same darken; ~120ms. Never a heavy ripple.
- **Focus.** Always visible: 2px `--ring` outline with a 2px offset. Inputs show
  a `--ring` border + faint ring halo on focus.
- **Layout rules.** Fixed top app bar (logo + actions) and a fixed bottom tab
  bar / sticky CTA. Content scrolls between them with safe-area padding. On the
  Expo-Web build the phone column is centered at **624px** max-width.

---

## ICONOGRAPHY

- **Icon set: Ionicons** (the project standard, matching Expo/React-Native).
  Outline style for inactive/secondary, solid (filled) style for active/selected
  (e.g. the active bottom-tab icon). Default stroke metaphor: rounded, friendly,
  ~1.5–2px optical weight at 24px. Standard sizes **20 / 24 / 28px**.
  - In these HTML previews Ionicons is loaded from CDN as a web component:
    `<script type="module" src="https://cdn.jsdelivr.net/npm/ionicons@7.4.0/dist/ionicons/ionicons.esm.js"></script>`
    then `<ion-icon name="notifications-outline"></ion-icon>`.
  - Common names in use: `notifications-outline`, `home`/`home-outline`,
    `chatbubbles-outline` (Mural), `calendar-outline` (Reservas),
    `person-outline` (Perfil), `checkmark-circle` (verified/success),
    `location-outline`, `logo-google`, `lock-closed-outline`, `chevron-forward`.
- **Logo & mark.** The wordmark ("Host" green + "park" grey) is the primary
  brand lockup. The standalone **"H" icon** (a rounded-rectangle H with a
  parking-bay gap) is the app icon and compact mark. Use `hostpark-logo.png` on
  light surfaces, `hostpark-logo-white.png` on dark/photographic surfaces.
  Never recolor the wordmark, never add effects, keep clear space ≈ the height
  of the "H".
- **Emoji:** never used in product UI.
- **Unicode as icons:** avoid; use Ionicons. (Exception: `R$` is text, not an
  icon.)
- **No hand-drawn SVG illustrations.** Trust signals are real photos + the
  verified badge, not spot illustrations.

---

## VISUAL FOUNDATIONS — quick reference

| Token group | Where defined | Notes |
|---|---|---|
| Color (light + dark) | `colors_and_type.css` | semantic roles, both themes, AA+ |
| Type scale | `colors_and_type.css` | 12 → 48; Hanken Grotesk + IBM Plex Sans/Mono |
| Spacing | `colors_and_type.css` | 4px base, `--space-*` |
| Radii | `colors_and_type.css` | sm 6 / md 10 / lg 14 / xl 20 / full |
| Elevation | `colors_and_type.css` | `--elev-subtle / -raised / -floating` |

---

## Index / manifest

**Root**
- `README.md` — this file: context, content + visual foundations, iconography.
- `colors_and_type.css` — the single source of truth for all tokens (import it).
- `SKILL.md` — Agent-Skill front-matter so this folder is usable in Claude Code.

**Folders**
- `assets/` — logos & app icon (`hostpark-logo.png`, `hostpark-logo-white.png`,
  `hostpark-icon.png`).
- `preview/` — small specimen cards that populate the Design System tab
  (colors, type, spacing, radii, elevation, button states).
- `ui_kits/mobile/` — the mobile UI kit: 3 anchor screens (Sign-in,
  Decision-home, Vaga detail) + reusable JSX components. Open
  `ui_kits/mobile/index.html` for the interactive walkthrough.

---

## Font substitution note

Hostpark had no licensed brand typeface specified, so this system pairs two
open Google Fonts chosen for a calm, trustworthy residential feel:
**Hanken Grotesk** (display) + **IBM Plex Sans** / **IBM Plex Mono** (body/mono).
If Hostpark adopts (or already owns) a brand typeface, send the files and we'll
swap them in — the type tokens are centralized in `colors_and_type.css`.
