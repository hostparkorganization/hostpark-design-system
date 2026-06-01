# Design system brief — Hostpark Mobile

## Product
Hostpark is a Brazilian peer-to-peer **parking-space marketplace inside residential
condominiums**. Residents rent out their unused parking spaces to other residents or
approved guests. Building staff (síndicos/concierges) approve memberships;
doormen control physical access on entry. Mobile-first; an Expo-Web build of the
same app is also served on the desktop.

## Audience priority (designs should feel "made for them first")
1. **Residents** (primary) — adults aged 25-60, urban Brazilian apartment dwellers,
   moderate-to-high mobile fluency, transacting small amounts of money frequently.
2. Owners / síndicos — building leadership, do approvals + management; tablet-y.
3. Doormen / porteiros — operational, fast-access UI, often older or less digital.
4. Admins — internal team, rarely use the app.

Generate everything tuned for the resident; trust the same system to scale to the
others without dedicated re-skinning.

## Brand personality
- **Trustworthy + calm.** Residential-services category, not consumer-tech.
- We are not a ride-share. We are not a hotel. Closer to a building intranet
  reimagined as a modern app.
- Mature, reliable, restrained. Photographs over illustrations. Solid shapes
  over decorative gradients. Quiet confidence.

## Non-negotiable constraints
- **Primary brand color is `#55DE85`** (Hostpark logo green). This is the
  brand DNA — every variant must build around it. Shades, tints, and supporting
  hues are open, but the green stays.
- **Dark mode is required from the start**, not an afterthought. Every token
  and component must define both light and dark.
- **WCAG AA contrast minimum** on every used color pair. AAA preferred for
  body copy on background.
- **Phone-first.** Designs assume a 390-430px viewport as the canonical canvas.
  Web build clamps to a centered 624px column — treat as a phone layout
  centered on a desktop background, not a desktop redesign.
- **Portuguese strings run ~20% longer** than English. Component sizing
  (button labels, form fields, badges) must not clip ("Confirmar Reserva",
  "Aprovar associação", "Transferir propriedade").

## What to deliver

### 1. Token system
- **Color palette** with semantic roles: background, surface (card),
  foreground, muted, primary + foreground, accent, success, warning,
  destructive, info, "driver" (the role-tinted blue we use for non-host
  residents). Specify hex values for both themes.
- **Typography scale**: display + body font pair. Default suggestion is
  Manrope (display) + Inter (body), but feel free to propose alternatives if
  they fit "trustworthy + calm" better. Size scale: 12/14/16/18/20/24/30 with
  corresponding line-heights. Weight ladder.
- **Spacing scale**: 4px-based, 0/4/8/12/16/20/24/28/32/40/48/64.
- **Border radii**: sm/md/lg/xl/full. Currently 6/10/16/24/9999.
- **Elevation / shadow**: 3-tier system (subtle/raised/floating) defined
  for both themes. Dark mode shadows are usually too soft — define explicit
  surface-lightness ladder as an alternative (we already use this).
- **Motion**: 3 timing tokens (fast/base/slow) + 2 easing tokens
  (standard/emphasized). Used for press feedback, sheet slide-up, list reveal.

### 2. Component library
For each, design **default + interactive states (hover/press/focus/disabled/loading/error)** in both themes:
- Button (variants: primary, secondary, outline, ghost, destructive; sizes: sm/md/lg; with/without icon; loading)
- Input (text, phone with country picker, document upload, with label + helper + error)
- Card (elevated, outlined, interactive/pressable)
- Badge (default, success, warning, destructive, driver, muted)
- Header (back / title / right action — accounting for safe-area top inset)
- ScreenWrapper (background, padding, with/without scroll)
- List Item (avatar + title + subtitle + chevron, with optional badge/action)
- Bottom Sheet / Modal (with handle, scrim, sticky CTA)
- Tab Bar (bottom nav, 4-5 items, with active indicator)
- Empty / loading / error states (3 generic templates)

### 3. Screen patterns
Mockup 6 reference screens that exercise the system:
1. Login / sign-in
2. Onboarding step (e.g., "verify your residence")
3. Decision-screen home (logged in, no condo yet) — the "what now?" hub
4. Active-condo home (dashboard with reservations + parking-spaces)
5. List view (members / invitations / parking-spaces)
6. Detail view (a parking-space detail with booking CTA)

### 4. Theming mechanism
Show the dark/light pair side-by-side for at least one full screen + one full
component set so the relationship between the two is unambiguous.

## Comparison baseline (the current system to riff on and beat)
- Background: `#E3E2DB` (warm light gray) / `#1A1A1A` (10% lightness dark gray)
- Primary: `#55DE85` over `#1B3321` foreground
- Destructive: `#B23A5C` (rose) light / `#EF4444` red dark
- Typography: Manrope (display) + Inter (body)
- Spacing: 4px base
- Component shape: medium radii (Card = 16px, Button = 10px), soft shadows
- Logo files attached: `hostpark-logo.png` (color), `hostpark-logo-white.png`,
  `hostpark-icon.png`

## Success criteria
A take is "good" if:
1. The green still feels like Hostpark's green.
2. A first-time resident user feels "this is a residential service I can trust",
   not "this is a flashy startup".
3. Dark mode looks intentional, not a recolor of light mode.
4. The same system survives unchanged when applied to the dashboard-heavy
   síndico / admin surfaces.
5. Buttons, inputs, and CTAs feel obvious without being shouty.
6. Nothing breaks in a 624px-wide centered column on a desktop browser.
