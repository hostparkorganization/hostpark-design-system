# Round 2 — Manrope + Inter swap, 3 more screens, component completeness

Paste this into the **same claude.ai/design project** as round 1 (so it has the
previous context). Upload the 9 TTFs from `assets/fonts/` (Manrope 400-800,
Inter 400-700).

---

Round 1 looks good — keep the palette, elevation tokens, scrim, content
fundamentals, microcopy spec, the studio shell, and the existing 3 screens
exactly as they are. Round 2 makes 3 changes.

## Change 1 — Swap the type system to Manrope + Inter

Replace **Hanken Grotesk → Manrope** (display) and **IBM Plex Sans → Inter**
(body). Use the uploaded TTFs via `@font-face` (not Google Fonts CDN — we ship
these locally). The TTF files are:

- `Manrope-Regular.ttf` 400, `Manrope-Medium.ttf` 500, `Manrope-SemiBold.ttf` 600,
  `Manrope-Bold.ttf` 700, `Manrope-ExtraBold.ttf` 800
- `Inter-Regular.ttf` 400, `Inter-Medium.ttf` 500, `Inter-SemiBold.ttf` 600,
  `Inter-Bold.ttf` 700

Update `colors_and_type.css`:

```css
@font-face { font-family: "Manrope"; src: url("../assets/fonts/Manrope-Regular.ttf") format("truetype"); font-weight: 400; }
/* ...one block per weight... */

:root {
  --font-display: "Manrope", system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-body:    "Inter",   system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-mono:    ui-monospace, "SF Mono", Menlo, monospace;  /* system fallback only — no 3rd family */
}
```

**Drop IBM Plex Mono entirely.** Mono codes (invite codes, vaga numbers,
license plates) use the system mono fallback. Don't ship a 3rd font family.

The weight ladder, type roles (`.ds-h1` ... `.ds-mono`), size scale, and
tracking values stay as round 1 specified — only the family names change.

Re-render every preview card under `preview/` and every screen in
`ui_kits/mobile/` with the new fonts. Re-check headings still read tight at
`--track-tight: -0.02em` (Manrope has more humanist warmth than Hanken).

## Change 2 — Add 3 more screens to the mobile UI kit

Same phone frame, same screen switcher, same theme toggle. Add these three
screens after the existing three:

### Screen 4 — Onboarding: "Verify your residence"
The resident has signed up but hasn't yet joined a condomínio. They've entered
the condo code and uploaded ID. This step asks them to upload **proof of
residence** (a utility bill, lease, condo declaration) so a síndico can
approve their membership.

- Top app bar: back button + step indicator "Passo 3 de 3"
- Hero: `Comprovante de residência` + lede *"Anexe um comprovante recente em
  seu nome para que o síndico aprove sua entrada."*
- A **drop/tap-to-upload zone** (radius `--radius-lg`, dashed border
  `--border-strong`, surface `--surface-2`, cloud-upload icon, copy
  *"Toque para anexar PDF, JPG ou PNG (máx. 10 MB)"*) in resting state.
- Below the zone: **uploaded-file preview** state for an example file (file
  icon, "Conta de luz — março.pdf", "1,2 MB", a small destructive "Remover"
  link). This shows the populated state alongside the empty zone.
- A trust-row below: lock icon + *"Seu documento é visto apenas pelo síndico do
  seu condomínio. Não é compartilhado com outros moradores."*
- Sticky bottom CTA: `Enviar para análise` primary, full-width.

### Screen 5 — Active-condo home (post-Stage 1 dashboard)
Same TopBar as Decision-home. This is what the resident sees once their
membership is **Active**: they can rent, list, chat, etc.

- Overline `Bom dia, Marina` (or `Boa tarde` / `Boa noite` per time of day —
  pick one; this is a static mock so just `Boa tarde`)
- H1: `Edifício Aurora` (the condo name — strong, claims the screen)
- Below name: `Apto 304 · 2 vagas anunciadas` (subtle, `--foreground-muted`)
- **Card: Próxima reserva** (elevation `--elev-subtle`)
  - Small calendar tile (date 14 + month abr) on the left
  - Title `Vaga 12 · Subsolo` + subtitle `Anfitrião: Carlos M.`
  - Right side: status chip `Confirmada` (success)
  - Bottom row: `R$ 24 /dia` + small action `Ver detalhes` (text-link style)
- **Section header** `Suas vagas anunciadas`
- Horizontal scroll of **mini vaga cards** (~160px wide): photo placeholder,
  vaga number, status chip (Disponível / Reservada / Pausada), price. 3 cards.
- **Section header** `Atalhos`
- A row of 3 **quick-action chips**: `Encontrar vaga` (search icon),
  `Anunciar vaga` (plus icon), `Mural do condomínio` (chat icon)
- Bottom tab bar: all 4 tabs active (Home selected). No locked state on
  this screen — user is past the Decision-home gate.

### Screen 6 — List view: "Membros do condomínio" (síndico surface)
This is a Síndico/Concierge-only view of all members in their condomínio.
Tests the system on dense data + tabs + status badges.

- TopBar: back button (left), title `Membros` (center), search icon (right)
- A **segmented status filter** below the bar: `Ativos (28)` (selected) ·
  `Pendentes (3)` · `Removidos (4)` — pills, `--radius-full`
- A **filter button row**: `Função: Todos ▾` and `Bloco: Todos ▾` (small
  outlined chips with chevron)
- The **list**: 6 list items. Each:
  - Avatar (initial + tint based on hash — use existing `--accent-subtle`)
  - Two-line text: bold name (`--foreground`) + subtitle "Apto 304 · Bloco A"
  - Right cluster: role badge (`Morador`, `Síndico`, `Porteiro`) + an
    overflow `⋯` icon button
- Two of the rows should show a `Verificado` chip-success next to the name
  to demonstrate the verified treatment in a list context
- One row should be **pressed/selected state** to show interaction
- A separator divider every 3 rows would be too noisy — use a clean hairline
  between every item, no zebra striping
- No sticky CTA on this screen — list scrolls to bottom

Also render the **empty state** for the `Pendentes (0)` tab: centered icon
(`people-outline`), title `Nenhum cadastro pendente`, subtitle
*"Você está em dia. Novos pedidos aparecerão aqui."*, no CTA. This goes in
the `preview/` folder, not on its own phone screen — just a self-contained
card.

## Change 3 — Component sheet (in `preview/` as new specimen cards)

Round 1 shipped Button states. Round 2 fills out the rest. Each becomes a
specimen card following the same pattern (700×*px*, group-tagged
"Components"):

- **Input states** — text, with prefix icon, with suffix icon, with error,
  disabled, focused. Light + dark.
- **Phone input** — flag + country code prefix + masked digits.
- **Document input** — empty (drop zone) + populated (file row).
- **Card variants** — outlined (border only), elevated (shadow), pressable
  (active state visible).
- **Badge / chip variants** — default, success, warning, destructive, driver
  (blue), muted, verified (with checkmark icon). Light + dark.
- **Bottom Sheet** — header with grab-handle + title + close, body with a
  list of options, sticky footer CTA. Half-height.
- **Modal (centered)** — for confirmations: title, body, two-button footer
  (destructive + secondary). Phone-width-bounded.
- **List Item** — avatar + 2-line text + trailing action (3 variants:
  chevron, switch, text button).
- **Empty state** — generic template: icon, title, subtitle, optional CTA.
- **Loading state** — skeleton card (animated shimmer or static), and a
  spinner-with-helper variant.
- **Error state** — icon (destructive tint), title, body, retry CTA.

## What stays the same as round 1
- Color palette (both themes), elevation tokens, scrim, radii scale, spacing
  scale, weight ladder, type roles, content fundamentals, microcopy spec,
  iconography (Ionicons), motion timings, focus rings, the phone frame, the
  studio shell, the screen-switcher and theme-toggle UI.

## What to NOT do
- Don't ship a 3rd font family (no IBM Plex Mono, no JetBrains Mono).
- Don't redesign the round-1 screens — only re-render with the new fonts.
- Don't add new icon styles beyond Ionicons outline/solid.
- Don't introduce new color tokens unless a use case in this round genuinely
  needs them.

## Acceptance bar
A round 2 is "good" if:
1. The 3 new screens feel like they belong to the same system as the 3 old
   screens — no visual seams between sets.
2. Manrope reads warmer than Hanken Grotesk but still trustworthy/calm; the
   `-0.01em` heading tracking is right (re-judge after the swap).
3. The 11 new component specimens collectively make the system "buildable" —
   a competent coder could implement the mobile app from this set without
   needing to invent visuals.

Fonts attached.
