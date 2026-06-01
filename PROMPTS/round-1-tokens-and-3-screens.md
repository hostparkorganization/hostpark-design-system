# Round 1 — tokens + 3 anchor screens

Paste this into claude.ai/design. Attach the 3 logo files
(`hostpark-logo.png`, `hostpark-logo-white.png`, `hostpark-icon.png`).

---

Design the foundation of a mobile design system for **Hostpark**, a Brazilian
peer-to-peer parking-space marketplace for residential condominiums. Residents
rent out unused parking spaces to neighbors. Mobile-first; also runs as an
Expo-Web build in a centered 624px desktop column.

## Audience
Primary user is a **resident** — adult 25-60, urban Brazilian apartment dweller,
moderate-to-high mobile fluency, transacting small amounts of money frequently.
Trust matters more than excitement.

## Brand personality
**Trustworthy + calm. Residential-services, not consumer-tech.** Not a ride-share,
not a hotel — closer to a modern building intranet. Mature, restrained, quiet
confidence. Solid shapes over decorative gradients. Photographs over illustrations.

## Hard constraints
- **Primary brand color is `#55DE85`** (Hostpark logo green) — this is the
  brand DNA. Shades and supporting hues are open, but the green stays.
- **Light AND dark mode** from the start, defined side-by-side.
- **WCAG AA contrast** on every color pair. AAA preferred for body text.
- **Phone-first.** Canonical canvas is 390-430px wide.
- **Portuguese strings run ~20% longer than English** — buttons, badges, and
  inputs must not clip "Confirmar Reserva", "Aprovar associação",
  "Transferir propriedade".

## What to design in this round
A **foundation set** I can evaluate before commissioning the full library:

### 1. Token system (numbers, not just visuals)
- Color palette with semantic roles: background, surface/card, foreground,
  muted, primary + foreground, accent, success, warning, destructive, info.
  **Specify hex values for both themes** (not just swatches).
- Typography pair: a display font + a body font. Show 7 size steps
  (12/14/16/18/20/24/30) with line-heights and the weight ladder.
- Spacing scale: 4px-based, list the steps you choose.
- Radii: sm/md/lg/xl/full.
- A 3-tier elevation system (subtle/raised/floating) that works in both themes.

### 2. Three anchor screens (light + dark, side by side)
1. **Sign-in screen** — logo, email + password, primary CTA, "sign in with
   Google" secondary action, link to "Create account". Calm and confident.
2. **Decision-screen home** — user is logged in but has not joined a condo yet.
   Header with logo + bell icon. Hero ("What would you like to do?"), two large
   action cards: "Joinar um condomínio" (with code) and "Cadastrar um condomínio"
   (as owner). Bottom tab bar (Home / Mural / Reservas / Perfil) with the locked
   non-Home tabs visually subdued.
3. **Parking-space detail** — photo at top, price/day, location string, host
   name + avatar, availability calendar preview, a sticky bottom CTA
   "Reservar vaga". Includes a "Verified" badge near the host name.

### 3. Bonus — show the same Button component in 5 states
Default, hover (or pressed for mobile), focus, disabled, loading. Light and dark.

## What I do NOT want this round
- Full component sheets (input variants, modals, bottom sheets, etc.) — later.
- More than 3 screens — keep the focus tight.
- Decorative illustrations or icon sets — Ionicons is what we use.

## Tone of the visual proposal
**Trust over flash.** I'd rather see something that looks like a calm,
slightly under-designed residential app than something that pops on Dribbble.

Logo files attached.
