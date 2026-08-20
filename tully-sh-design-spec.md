# tully.sh — Design Specification

Purpose of this doc: describe the layout, tokens, and behavior precisely enough to rebuild the page in your own Next.js/TypeScript components from scratch. Content (copy) is intentionally left as placeholders — you're handling that separately.

---

## 1. Design tokens

**Colors**
| Token | Hex | Used for |
|---|---|---|
| `--ink` | `#0F191C` | Page background |
| `--panel` | `#16242A` | Slightly-raised surfaces (case study card) |
| `--panel-line` | `#29393F` | Borders, dividers, grid lines |
| `--text` | `#ECE8E0` | Primary text (warm off-white, not pure white) |
| `--text-muted` | `#9FB0AF` | Secondary/body copy, labels |
| `--brass` | `#C79A45` | Primary accent — links, buttons, highlighted words |
| `--brass-dim` | `#8A6D33` | Secondary accent — borders, numbering, less prominent accents |
| `--green` | `#7FB77E` | Sparingly — terminal cursor, the `$` prefix on eyebrow labels only |

Dark background throughout. No light sections. The accent is warm brass/gold, not the more common terracotta/orange — deliberately picked to avoid the generic "AI-dark-mode" look.

**Typography — three-font system**
- **Display** (headings h1–h3): `Space Grotesk`, weight 600, letter-spacing -0.01em. Geometric, slightly technical feel.
- **Body** (paragraphs): `Inter`, regular weight, line-height 1.6.
- **Mono** (nav links, buttons, labels, "eyebrow" tags, stats numbers): `JetBrains Mono`. This is the signature touch — mono type shows up anywhere the copy is functional/labeling rather than narrative, echoing the `.sh` domain.

**Radius & spacing**
- Border radius: mostly sharp — `3px` on buttons/pills, `6px` on larger card containers (case study window, avatar block). Nothing pill-shaped or heavily rounded.
- Page content max-width: `1100px`, centered, `28px` side padding on the wrapper.
- Section vertical rhythm: every `<section>` gets `90px` top/bottom padding and a `1px solid var(--panel-line)` bottom border — this border is what visually separates sections instead of background-color changes or shadows.

**The "eyebrow" label pattern**
Every section has a small mono-font label above its heading, styled like a shell prompt:
```
$ services
$ process
$ case-study
$ about
$ contact
```
The `$ ` prefix is rendered in green (`--green`), the label text itself in brass. This is the single most repeated signature element on the page — don't drop it, it's what ties the visual language to a developer/`.sh` identity without being a full retro-terminal pastiche.

---

## 2. Header

- **Position**: sticky to top of viewport, `z-index` above content.
- **Background**: page ink color at ~88% opacity + backdrop blur (frosted-glass effect as content scrolls beneath it).
- **Bottom border**: 1px, `--panel-line`.
- **Layout**: single row, flex, space-between. Three zones:
  1. Left: logotype — mono font, "tully" in primary text color + ".sh" in brass.
  2. Center-right: horizontal nav links (mono font, small, muted color, brass on hover) — Services / Work / About / Contact, each an in-page anchor.
  3. Right: a bordered pill-button CTA ("Start a project" or equivalent), brass text, brass-dim border, fills solid brass with dark text on hover.
- **Mobile (<760px)**: nav links and the CTA button both hide; replaced by a single hamburger-style toggle button on the right (visual only in the spec — wire up the actual menu behavior yourself).

---

## 3. Hero section

- Top padding noticeably larger than other sections (`120px` vs `90px`) since it's the first thing seen; bottom padding `90px`; bottom border like every other section.
- **Order top to bottom, left-aligned, no image**:
  1. A small mono-font "terminal line" ABOVE the headline — e.g. a line of muted text ending in a blinking block cursor (an animated `::` or similar; 1.1s blink interval, respects `prefers-reduced-motion`).
  2. **H1**: large, clamped between 34px (mobile) and 58px (desktop) using `clamp()`, tight line-height (1.08), max-width ~820px so it doesn't stretch full-bleed on wide screens. One word or short phrase within the headline is set in the brass accent color to draw the eye (via an inline styled span, not a whole-line color change).
  3. **Lead paragraph**: muted color, 18px, max-width ~560px (narrower than the H1 — intentionally a tighter column for readability).
  4. **CTA row**: two buttons side by side, gap 16px, wraps on small screens.
     - Primary button: solid brass background, dark text, mono font, medium weight.
     - Secondary/ghost button: transparent, thin border in the muted divider color, brightens border+text to brass on hover.

---

## 4. Services section

- Standard section head pattern (eyebrow + H2 + one-line muted description, max-width 640px, 48px bottom margin before the content grid).
- **Layout**: a 2×2 grid of service cards. The grid itself has NO gap in the traditional sense — instead, a 1px background color (the divider color) shows through as hairline seams between cards, so cards appear to share borders (grid `gap: 1px` with a colored grid background, cards set to the page background color). This reads as a clean bordered table rather than four separate floating boxes.
- **Each card**: generous padding (~32px), contains:
  1. A two-digit index number (01, 02, 03, 04) in mono font, dim brass, small.
  2. Service title as H3.
  3. One short paragraph in muted body text.
- Collapses to a single column below 700px.

---

## 5. Process section

- Same section-head pattern.
- **Layout**: 4 steps in a single row (grid, 4 equal columns), each a distinct visual "step" rather than cards — no boxes/borders around each, instead each step has only a **left border** (2px solid, dim brass) acting as a rail/divider, with content indented from it via padding-left.
- Each step: numbered label (mono, brass) → step title (H3, small ~17px) → one-line muted description.
- This is the one place a numbered sequence is justified — it's an actual ordered process, not decorative numbering.
- Responsive: 4 columns → 2 columns (~800px) → 1 column (~480px).

---

## 6. Case study / work section

This is the most distinct component on the page — a stylized "browser window" card, not a plain content block.

- Outer container: bordered (1px, divider color), 6px radius, background slightly lighter than the page (`--panel`), `overflow: hidden` so children respect the rounded corners.
- **"Chrome" bar** (top strip, mimics a browser title bar):
  - Darker background than the panel.
  - Three small circular dots, left-aligned, in the divider color (a muted nod to macOS-style window controls — NOT colored red/yellow/green, keep them monochrome/subtle so it doesn't read as a literal OS chrome ripoff).
  - The site's URL in small mono text next to the dots.
  - Bottom border separating chrome from body.
- **Body**: two-column grid (roughly 55/45 split), gap 40px, generous padding (40px, reduces to ~28px on mobile where it also stacks to one column).
  - **Left column**: a small mono "role/context" label in brass → project name as H3 → 2 short paragraphs of muted body text describing the work → a text link with an arrow ("→") in brass, mono font, pointing to the live project.
  - **Right column**: a plain unordered list acting as a spec sheet — each row is a bold inline label (e.g. "Scope", "Stack") followed by muted detail text, rows separated by a thin top border (no border on the first row).

---

## 7. About section

- Standard section head.
- **Layout**: asymmetric two-column grid (roughly 0.8fr / 1.2fr), gap ~56px, columns align to the top (not vertically centered).
  - **Left column**: a square block (aspect-ratio 1:1) — a placeholder avatar treatment: soft diagonal gradient background (dark teal tones, subtly lighter than the page background), thin border, large single-letter monogram centered in it (mono font, ~52px, dim brass color). This stands in for a real photo — swap for an actual image if/when you have one, keeping the same square proportions and border.
  - **Right column**: 2–3 short paragraphs of muted body text (personal/professional bio), followed by a **stat row**: 3 stat blocks side by side (flex, gap ~36px, wraps on small screens), each with a bold display-font number/label on top (brass color, ~26px) and a small muted caption underneath.
- Collapses to single column (avatar on top) below 760px.

---

## 8. Contact section

- No bottom border (it's the last section before the footer).
- Left-aligned, NOT centered — deliberately breaks from a typical centered "final CTA" pattern to stay consistent with the rest of the page's left alignment.
- Content constrained to max-width 640px (doesn't span the full 1100px wrap).
- Order: eyebrow → H2 (slightly larger than other section H2s, clamp 26–40px) → one paragraph of muted supporting text → the same two-button CTA row pattern from the hero (primary = direct contact method e.g. email button, ghost = secondary link e.g. GitHub) → a row of small mono-font secondary links below (social/profile links), muted color, brass on hover.

---

## 9. Footer

- Minimal. Padding ~32px vertical, no top border needed beyond the contact section's own boundary.
- Single row, flex space-between (wraps on mobile): copyright text on the left, site name on the right. Both small (12px), mono font, muted color.

---

## 10. Global behavioral notes

- `scroll-behavior: smooth` on the root, but disabled entirely under `prefers-reduced-motion: reduce` (along with collapsing all animation/transition durations to near-zero) — don't skip this, it's an accessibility requirement, not a nice-to-have.
- All interactive elements (links, buttons) get a visible `focus-visible` outline in the brass color with offset — don't rely on default browser focus styles, but don't remove focus indication either.
- Hover states throughout are simple color/background transitions (~0.15s ease), no scale/transform effects — the page's motion language is quiet everywhere except the one deliberate hero cursor-blink.
- Nothing on the page uses drop shadows. Depth comes entirely from the 1px borders and subtle background-color steps (ink → panel → darker chrome bar).

---

## What to reuse vs. rebuild

Reusable almost verbatim: color tokens, font stack, the eyebrow/`$` pattern, section rhythm (padding + border-bottom), button styles.

Worth re-evaluating once you're doing this for real in Next.js: the case-study "browser chrome" card only works well with one project in it — once you have 2–3 real client projects, consider turning `#work` into a repeatable card component (same chrome-window treatment) in a grid or carousel, rather than one large static block.
