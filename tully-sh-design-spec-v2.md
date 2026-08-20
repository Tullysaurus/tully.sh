# tully.sh — Design Specification v2 (multi-page, broadened positioning)

Builds directly on the original single-page spec. Same visual system throughout — colors, type, the `$ eyebrow` pattern, button styles, section rhythm — nothing about the *look* changes. What changes is the **information architecture**: one page becomes three, and the copy direction shifts from "website builder for small businesses" to "developer for hire, websites being one proven track."

Content is still placeholder-level guidance, not final copy — you're locking that in separately.

---

## 0. What's unchanged from v1

Carry over exactly as specified before:
- Color tokens (`--ink`, `--panel`, `--panel-line`, `--text`, `--text-muted`, `--brass`, `--brass-dim`, `--green`)
- Type system (Space Grotesk / Inter / JetBrains Mono)
- The `$ eyebrow` label pattern above every section heading
- Header (sticky, blurred, logo + nav + CTA pill)
- Button styles (solid brass primary, ghost secondary)
- Section rhythm (90px padding, 1px bottom border, section-head block)
- Footer
- All motion/accessibility rules (reduced-motion, focus-visible, no shadows, 0.15s hover transitions)

Everything below describes what's **new or restructured**.

---

## 1. Site map

```
/            → Homepage: identity + router. Short. Not a pitch.
/hire        → The service offer: capability categories, process, case study, contact.
/projects    → Portfolio in the broad sense: open source, personal builds, "other things."
```

Nav updates from 4 in-page anchors to 3 real routes: **Hire me · Projects · About** (About can live on the homepage or its own section — see §2). Contact stays reachable from the header CTA on every page, pointing to `/hire#contact` (or its own `/contact` if you'd rather keep the form off `/hire`).

---

## 2. Homepage (`/`)

Purpose: let a visitor self-sort in one scroll. No service cards, no process steps, no case study here — those all belong on `/hire`.

**Structure, top to bottom:**

1. **Hero** — same layout as v1 (terminal-line eyebrow, large H1, lead paragraph, two-button CTA row) but repositioned copy:
   - H1 direction: leads with *developer/builder identity*, not "websites." Something in the shape of: "I build software — [em]sites, tools, systems[/em] — and see it through to something running in production." The brass-highlighted span should land on a word that signals breadth (e.g. "systems" or "production"), not "websites."
   - Lead paragraph: one sentence naming the range (web, apps, automation, infra) without turning into a bullet list — save specifics for `/hire`.
   - CTA row: **primary** button → "Hire me" (routes to `/hire`). **Ghost** button → "See my work" (routes to `/projects`). This pair *is* the router — both paths get equal visual weight, primary just reflects that inbound business inquiries are the priority.

2. **Router section** (new — replaces the old services grid on the homepage) — a 2-up grid, same hairline-bordered card treatment as the old services cards, but only two cards instead of four:
   - Card 1: "Hire me" — one or two lines on what working together looks like, links to `/hire`.
   - Card 2: "Projects" — one or two lines on personal/open-source work, links to `/projects`.
   This is the section that does the self-sorting work. Keep both cards honest and short — this is signage, not sales copy.

3. **Brief about strip** — much shorter than the old About section. A couple sentences (self-taught, years of experience, what you care about) with the stat row (7+ yrs / Full-stack / etc.) carried over from v1. No avatar block needed here if you want to save it for `/projects` or a dedicated About area — your call, but don't duplicate a full About section on both homepage and `/hire`.

4. **Footer.**

That's the whole homepage — noticeably shorter than the current single-pager. If it feels too thin once real copy is in, the fix is better copy, not more sections.

---

## 3. `/hire` — the service offer

This absorbs almost everything that used to be on the v1 homepage, restructured around broader capability instead of "websites" specifically.

1. **Page hero** (smaller than the homepage hero — this is a sub-page, not a landing page). Direction: names what hiring you gets someone — an end-to-end build, not just design. Primary CTA here can be the actual contact anchor/button rather than a route.

2. **Capability section** (replaces the 4 website-specific service cards) — same 2×2 hairline-grid card treatment, but the four cards become broader categories:
   1. **Websites & web apps** — the concrete, proven lane. This is where domain/hosting/SEO/branding — everything from the old v1 cards — lives now, folded in as the detail *inside* this one card rather than four separate top-level offers.
   2. **Backend, APIs & integrations**
   3. **Automation & tooling**
   4. **Infra, deployment & hosting**
   Keep each card's body copy honest about proof level — it's fine for card 1 to sound more concrete/proven than the others; don't inflate 2–4 to match.

3. **Process section** — same left-rail 4-step layout as v1, but generalized:
   - Step 1 "Message me" — unchanged.
   - Step 2 "Design & build" — unchanged, already generic enough.
   - Step 3 — was "Domain & hosting"; generalize to something like **"Ship it"** covering deployment broadly (domain/hosting mentioned as a detail only when the project is a website).
   - Step 4 "Launch & support" — unchanged.

4. **Case study section** — same "browser chrome" window component from v1, unchanged in layout. Keep the Mercurie case study exactly as specified before. Framing note: since this page now sits under a broader "capability" pitch, keep the case study's own copy narrowly accurate ("here's a site I built") rather than trying to stretch its language to imply broader scope than it has — the capability section above already carries the broader claim; the case study's job is just to be credible proof of *one* lane.
   - Build this section as a repeatable card/grid from the start (even with one card in it now) so a second and third project can be added later without restructuring.

5. **Contact section** — same as v1, unchanged.

---

## 4. `/projects` — portfolio

This is where the "other things I do" content goes — the part that got squeezed out when the homepage went business-first. Think of it as the home for range and personality rather than a hiring pitch.

**Structure:**

1. **Short page intro** — eyebrow + heading + one line, same section-head pattern as everywhere else. No hero-scale treatment needed; this page doesn't need to convert anyone, just show work.

2. **Projects grid** — a new component, not directly inherited from v1. Suggested shape: cards in a responsive grid (2–3 columns desktop, 1 mobile), each styled with the same hairline-border treatment as the capability cards for visual consistency. Each card:
   - Project name (H3)
   - One or two lines on what it is / what problem it solves
   - A small mono-font tag row (e.g. tech stack or category) — reuses the mono-label visual language from elsewhere on the site
   - A link out (GitHub, live demo, etc.) styled like the case-study's arrow link
   Open-source projects, personal tools, experiments — whatever's real. This is also a fine place for the old "timeline" content (first laptop, joined GitHub, etc.) if you want to keep it — as a compact secondary section below the grid rather than the page's main focus, since a timeline of learning milestones reads differently once the site's primary job is showing finished work.

3. **Footer.**

---

## 5. Cross-page consistency notes

- The 2×2 hairline-card grid (from v1's services section) is now a **reusable pattern**, not a one-off: it shows up on the homepage (router cards, 2-up), `/hire` (capability cards, 4-up), and `/projects` (project cards, 2–3 up). Build it once as a shared component with a variable column count.
- Every page keeps the same header/nav and footer — no page-specific chrome.
- The brass accent word-highlight technique (used in the v1 hero H1) is worth reusing sparingly on the `/hire` and `/projects` page heros too, for visual continuity — but only one highlighted word/phrase per page, not per section, or it stops reading as emphasis.
