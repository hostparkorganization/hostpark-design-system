# Hostpark — Mobile UI Kit

High-fidelity, interactive recreation of Hostpark's three **anchor screens**,
built on the design-system tokens (`../../colors_and_type.css`). This is a
visual + interaction reference, not production code.

## Run it
Open `index.html`. Use the top toolbar to switch screens (**Entrar / Início /
Vaga**) and toggle **light / dark**. Flow shortcuts: the **Entrar** button on
sign-in advances to the home screen; the primary action card on home opens the
vaga-detail screen; the back arrow returns.

## Screens
1. **Sign-in** (`SignIn`) — logo, e-mail + senha (with reveal), "Esqueceu a
   senha?", primary **Entrar**, Google secondary action, "Criar conta" footer.
2. **Decision-screen home** (`DecisionHome`) — logged in, no condo joined yet.
   Top bar (logo + bell), hero "O que você gostaria de fazer?", two large action
   cards, and a bottom tab bar where the locked tabs (Mural, Reservas) are
   subdued with a lock glyph.
3. **Vaga detail** (`VagaDetail`) — photo header with scrim, price/day, location,
   verified host row, availability week strip, and a sticky **Reservar vaga**
   CTA bar.
4. **Verify residence** (`VerifyResidence`, in `screens2.jsx`) — onboarding step
   3/3. Back + step indicator, drop/tap upload zone, populated file-row state,
   privacy trust-row, sticky **Enviar para análise** CTA.
5. **Active-condo home** (`ActiveHome`) — post-approval dashboard. Condo name
   hero, "Próxima reserva" card, horizontal scroll of mini vaga cards, quick
   actions, and the bottom tab bar with all tabs unlocked.
6. **Members list** (`MembersList`) — síndico surface. Titled top bar, status
   filter pills, function/bloco filter chips, dense member list with role
   badges, verified chips, and a selected-row state.

## Components (`components.jsx`)
`Button` (primary/secondary · lg/md · loading · block · icon), `Field`
(with password reveal), `StatusBar`, `TopBar`, `BottomTabs` (`allUnlocked`
prop), `Chip` (success/warning/destructive/info/muted/default), `HomeIndicator`.
Screens live in `screens.jsx` (1–3) and `screens2.jsx` (4–6); the phone frame +
router + theme toggle in `app.jsx`. The full component sheet (inputs, sheet,
modal, list items, states) is in `../../preview/comp-*.html`.

## Icons
**Ionicons 7** via CDN web component (`<ion-icon name="…">`). This is Hostpark's
standard set. Active tab uses the solid variant; everything else uses `-outline`.

## Notes / placeholders
- The vaga photo is a **styled placeholder** ("Foto · garagem coberta") — no real
  photography was provided. Drop real garage/building photos into a `photos/`
  folder and replace the `.hero-photo` block.
- Copy for the home action cards reads **"Entrar em um condomínio"** /
  **"Cadastrar um condomínio"** (calm pt-BR). The original brief shorthand said
  *"Joinar um condomínio"* — swap if that anglicism is intentional.
