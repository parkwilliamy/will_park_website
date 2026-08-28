---
name: williampark.org
description: The Chip Floorplan — a personal portfolio rendered as an annotated die floorplan on plot paper.
colors:
  plot-paper: "#edefe8"
  plot-paper-deep: "#e3e6dd"
  graphite-ink: "#22262a"
  graphite-ink-secondary: "#555c64"
  hairline-rule: "#b9beb2"
  bin-green: "#2f9e44"
  bin-blue: "#1971c2"
  bin-yellow: "#f5c518"
  bin-red: "#e03131"
typography:
  display:
    fontFamily: "Martian Mono, Courier New, monospace"
    fontSize: "0.875rem"
    fontWeight: 800
    lineHeight: 1.7
    letterSpacing: "0.22em"
  headline:
    fontFamily: "Martian Mono, Courier New, monospace"
    fontSize: "0.875rem"
    fontWeight: 800
    lineHeight: 1.7
    letterSpacing: "0.2em"
  title:
    fontFamily: "Martian Mono, Courier New, monospace"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.7
    letterSpacing: "0.04em"
  body:
    fontFamily: "Martian Mono, Courier New, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0.02em"
  label:
    fontFamily: "Martian Mono, Courier New, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0.08em"
rounded:
  none: "0"
spacing:
  cell-y: "12px"
  cell-x: "16px"
  row-gap: "16px"
  page-pad: "clamp(18px, 4vw, 40px)"
  section-gap: "clamp(32px, 5vw, 48px)"
components:
  nav-link:
    textColor: "{colors.graphite-ink-secondary}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.graphite-ink}"
  legend-link:
    textColor: "{colors.graphite-ink}"
    typography: "{typography.title}"
  chip-in-progress:
    textColor: "{colors.graphite-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "1px 7px"
  swatch:
    backgroundColor: "{colors.bin-green}"
    rounded: "{rounded.none}"
    size: "18px"
  metric-cell:
    textColor: "{colors.graphite-ink}"
    typography: "{typography.headline}"
    padding: "12px 16px"
---

# Design System: The Chip Floorplan (williampark.org)

## Overview

**Creative North Star: "The Annotated Chip Floorplan"**

The site presents William Park's work as a placed-and-routed die: each project
is a labeled IP block on a pad-ringed chip floorplan, carrying a real measured
result, the blocks tiling the die edge-to-edge with no gaps. The world is a light
engineering document — plot-paper ground, graphite ink, hairline rules — with
color reserved almost entirely for the saturated block fills that identify
projects. It explicitly refuses the dark neon card-grid developer portfolio.

The world governs the **entire site**. The homepage is its Persuade surface
(the drawn die, the index, the timeline); the project pages are its Read
surfaces (ruled write-ups with figure plates and data tables). The die is
drawn by one engine (`docs/js/plan-lib.js` + `js/floorplan.js`).
The legacy dark stylesheet (`css/style.css`) has been deleted; nothing outside
this world exists anywhere on the site.

The silicon world stays **implicit in form**: the drawing does the talking,
and the copy never names the metaphor. There are no report-form labels
anywhere — no "wafer", "process", "lot", "device", "bin", no `MEAS:` prefixes.
Measured numbers stand bare in running copy; on Read surfaces they may sit in
ruled readouts (a metrics strip, a data table) whose plain uppercase headers
are instrument labeling, not metaphor dressing. Structure comes from ruled
lines and grids, not boxes or shadows; hierarchy comes from weight, tracking,
ink value, and spacing, never from type size. Status is expressed in mark form
(solid = shipped, dashed = in progress on the index swatches and timeline
nodes; the die's block outlines stay solid) rather than in prose badges.

The site is hand-editable static HTML/CSS/JS deployed from `docs/` via GitHub
Pages with no build step — a hard, permanent constraint. New projects append
via `js/projects.js` (plus the `<noscript>` list). Every raster in
`docs/assets/img` carries embedded provenance (`impeccable:prompt` metadata);
video posters are ffmpeg-extracted first frames of the site owner's own demo
videos — real artifacts, never stock or invention.

**Key Characteristics:**
- Light plot-paper ground with graphite ink; color only in block fills
- The silicon metaphor is drawn, never written: no report-form vocabulary in copy
- One monospaced type size everywhere; hierarchy by weight/tracking/ink/spacing
- Hairline rules and 2px section rules structure the page; no cards, no shadows
- Status is drawn, not written: solid vs. dashed marks
- Measured numbers are real and tabular; bare in copy, ruled into readouts on Read surfaces

## Colors

A near-monochrome document palette with four saturated block fills doing all
the color work. Tokens live as CSS custom properties on `:root` in
`docs/css/site.css` (`--paper`, `--paper-deep`, `--ink`, `--ink-2`, `--rule`,
`--rule-strong`, `--bin-*`).

### Primary
- **Block Green** (#2f9e44): the flagship project's block fill on the
  floorplan and its index swatch. Block colors are identity fills, not UI
  accents — they never color text, links, or buttons.
- **Block Blue** (#1971c2), **Block Yellow** (#f5c518), **Block Red**
  (#e03131): the remaining block fills, assigned to projects in list order.
  The renderer reserves #7048e8 and #0c8599 as fifth and sixth fills if the
  list grows. Block lettering is always graphite ink (#22262a) with a halo in
  the block's own fill color, so labels read dark on every fill.

### Neutral
- **Plot Paper** (#edefe8): the page ground. A cool paper-green, not white.
- **Plot Paper Deep** (#e3e6dd): the deeper paper tone for recessed surfaces —
  figure-plate grounds on project pages; the drawn die substrate (#dde1d6)
  sits on the same silicon-adjacent tones inside the drawing.
- **Graphite Ink** (#22262a): primary text, strong 2px rules, block outlines,
  focus outline, selection background.
- **Graphite Ink Secondary** (#555c64): labels, metadata, dates, taglines,
  the I/O pads (at 35% opacity) — the quieter half of the two-ink hierarchy.
- **Hairline Rule** (#b9beb2): 1px dividers, borders, default link underlines,
  reserved-block outlines, the scrollbar thumb.

### Named Rules
**The Two-Ink Rule.** All text is one of two inks: #22262a for content,
#555c64 for labels and metadata. Emphasis is a change of ink or weight, never
a change of color.

**The Block-Fill Rule.** Saturated color appears only as a project's identity
fill (floorplan blocks and index swatches).
Interface chrome — links, nav, chips, rules, focus — is ink on paper.

## Typography

**Display/Body/Label Font:** Martian Mono (with "Courier New", monospace
fallback), weights 400 / 700 / 800 only. One family for everything;
`font-variant-numeric: tabular-nums` on the body so measured numbers align
(the data table right-aligns its numeric columns).

**Character:** Technical, instrument-like, and calm — the voice of an
engineering drawing. Uppercase-plus-tracking is the display device; the size
never moves.

### Hierarchy
- **Display** (800, 0.875rem, 0.22em tracking, uppercase): the brand in the
  head-bar (the homepage `<h1>`) and each project page's `<h1>` title.
- **Headline** (800, 0.875rem, 0.2em tracking, uppercase): section headings
  over a 2px ink rule — homepage section heads and write-up panel `<h2>`s;
  org names in the timeline run 800 at 0.1em; metric values run 800 at
  0.04em.
- **Title** (700, 0.875rem, 0.04em): index project links, bold readout lines,
  data-table headers (700, tracked, uppercase), the active TOC link.
- **Body** (400, 0.875rem, 1.7, ~0.02–0.03em): prose. Measures are capped:
  write-up prose and lists ~72ch, the status lede 72ch, subtitles 64ch,
  summaries 68ch, taglines 52ch.
- **Label** (400, 0.875rem, 0.08em tracking, uppercase, secondary ink): nav
  links, back link, chips, dates, meta-bar entries, metric labels.

The sole exception to the one HTML size: SVG block lettering (block codes,
700 weight, auto-fitted up to 17px inside the viewBox with a halo stroke in
the block's fill color under the glyphs via `paint-order: stroke`) is drawing
annotation and scales with the floorplan — lettering on the artifact, not
page type.

### Named Rules
**The One Size Rule.** All HTML text is 0.875rem. Hierarchy is weight (400 /
700 / 800), tracking, uppercase, ink value, and spacing — never font size.

**The Bare Number Rule.** Copy never names the silicon metaphor and never
dresses data in report vocabulary — no "wafer", "process", "lot", "device",
"bin", no `MEAS:`-style prefixes. In running copy and index rows a measured
result stands bare ("57 MHz · 1.23 CPI · 96.5% branch prediction"). Ruled
readouts on Read surfaces — the metrics strip and data tables — carry plain
uppercase labels and column headers ("Clock Speed", "Resource"): that is
native instrument labeling of a table, not metaphor vocabulary in prose.

## Layout

A single centered sheet, max-width 1120px, page padding `clamp(18px, 4vw,
40px)`; sections separated by `clamp(32px, 5vw, 48px)`. Shared chrome lives in
`docs/css/site.css`: the ruled head-bar (2px rule above, 1px below; brand
left, nav right — on project pages the brand is a home link and the nav
carries the same five links), section heads over a 2px rule with a
right-aligned secondary-ink note, and the 2px-ruled footer.

**Homepage** (`docs/css/home.css`): a hairline-bordered eyebrow line (12px
16px cells), the status lede in its own hairline band (max 72ch), then the
projects section as a two-column grid (floorplan ~1.08fr, index 1fr,
`clamp(24px, 4vw, 48px)` gap). Under 920px it stacks with the **index first**
(`order: -1` — the real action leads) and the die following, capped at 560px.
The timeline is a three-column grid (150px right-aligned date / 28px axis /
body) that folds the date above the body under 640px, where the nav becomes a
2×2 ruled grid and section heads stack.

**Project pages** (`docs/css/project.css`): back link, then a hairline
title-grid (2px top rule) holding the title cell (h1 + 64ch subtitle) and a
a meta bar below it (date · tools · `Source ↗`) closing
the frame. Write-up content is JS-wrapped into `.panel` sections with ruled
`<h2>`s; prose runs ~72ch. A fixed on-page TOC rail (190px, hairline left
border) sits at the right and appears only ≥1500px. Under 640px the
title-grid stacks and the metrics strip folds to 2×2.

Rows and cells are divided by 1px hairlines; grouping is done by rules and
whitespace, never by boxes or background panels (the only background fills are
the active index row's 5% ink tint, its pressed 9% tint, and the paper-deep
figure plates). Smooth scrolling is enabled only under
`prefers-reduced-motion: no-preference`.

## Elevation & Depth

Flat, always. No box-shadows anywhere; the page is a sheet of paper and stays
one. The die is drawn flat — substrate fill (#dde1d6), 2px ink edge, no sheen,
no gradients, and project blocks are flat solid fills with no texture.
Recession is a paper shift:
figure plates sit on Plot Paper Deep inside a hairline frame. Interactive
depth is conveyed by dimming: hovering a block or index row drops all other
blocks to 30% opacity; a pressed block drops to 70%.

### Named Rules
**The Flat Sheet Rule.** No shadows, no lifted surfaces, no gradients. State
is shown by opacity, ink shifts, and border changes on the same plane.

## Shapes

Square everything: 0 radius on every HTML element and on every rect in the
drawing. Borders are the form language — 2px solid ink for strong structure
(top of the sheet, section rules, panel-h2 rules, footer rule, data-table
header rule, swatch borders, die edge, block outlines), 1px hairline (#b9beb2)
for cell dividers, quiet link underlines, table cells, figure frames, and the
TOC rail. The floorplan's geometry is a core-and-periphery placement shared via
`window.PlanLib`: a 560×440 landscape die with an I/O pad ring, a 1px core
outline (ink at 45%), and blocks separated by an 8-unit routing channel.
Block outlines are always solid 2px ink; the die drawing itself stays
status-neutral. In-progress status is carried by border style — **solid =
shipped, dashed = in progress** — on the index swatches and the timeline
nodes, plus the "Present" date text.

### Named Rules
**The Mark-Form Rule.** In-progress status is always drawn as a dashed stroke
on the element's existing outline, never as a colored badge or icon.

**The One Plan Rule.** There is one floorplan. Every die on the site — the
homepage floorplan — is tiled by the same
`PlanLib` placement from the same `PROJECTS` data, so block positions match
everywhere. Never hand-place or redraw the plan.

## Components

### Navigation (head-bar / footer)
- **Style:** uppercase label type, no underline; secondary ink resting,
  primary ink + 1px ink bottom border on hover. Footer links rest with a
  hairline bottom border that darkens to ink on hover.
- Shared on every page from `site.css`; on project pages the brand links home
  and the nav's anchors point back to homepage sections.
- Below 640px the head nav becomes a 2×2 ruled grid (hairline above, 2px rule
  below, even links right-aligned, fifth link full-width).
- Links to project pages are plain text; external links carry a literal "↗".

### Links (in prose)
- Ink text, underlined with the hairline color (#b9beb2), 4px underline
  offset; underline darkens to ink on hover. Focus is a 2px ink outline,
  2px offset (global).

### Chips

### Index Row (signature list item)
- Grid of 18px color swatch (2px solid ink border; dashed when live) +
  content: 700-weight project link with hairline underline-border, uppercase
  date in secondary ink, tagline (max 52ch, secondary ink), optional bare
  metric line, then actions (flag + `Source ↗`, uppercase-rendered). Rows
  divided by 1px hairlines; the whole row is clickable (cursor: pointer) with
  a 5% ink tint when active and a 9% tint on `:active`. The index is the
  accessible, crawlable list — real `<a>` links, focusin/focusout sync with
  the floorplan, and a `<noscript>` list fallback.

### Chip Floorplan (signature component)
- SVG rendered by `docs/js/floorplan.js` from `window.PROJECTS` via `PlanLib`;
  `aria-hidden`, pointer-only enhancement over the index (no duplicate tab
  stops). Landscape die (560×440 viewBox): flat substrate (#dde1d6) with a
  2px ink edge, I/O pad ring (secondary ink at 35%), and a core-and-periphery
  placement — the first project as the central core block (the die's CPU),
  the rest ringing it in edge bands like memory/IO blocks — full-height
  side columns and a top band that split evenly among their occupants, so
  the core stays covered gaplessly as the project list grows. Project blocks carry flat fills and haloed block
  codes; fills are flat solid color and block outlines are solid 2px ink.
  Clicking a block navigates to the project page.

### Write-Up Page Head
- **Back link:** "← Back to projects", label type, secondary ink, ink +
  bottom border on hover.
- **Title-grid:** hairline frame with a 2px top rule; title cell (Display h1
  + 64ch secondary-ink subtitle). Single-column.
- **Meta bar:** hairline-framed row (no top border, closing the title-grid):
  date span, tools span (secondary ink, "·"-separated), and an uppercase
  `Source ↗` link with hairline underline-border.

### Metrics Strip (Read-surface readout)
- 4-column hairline-framed grid (`.metrics`), one measurement per cell
  (12px 16px padding, 1px hairline between cells): uppercase tracked label in
  secondary ink over an 800-weight value. Folds to 2×2 under 640px. Only ever
  holds genuine measurements.

### Data Table (Read-surface readout)
- `.data-table` in a horizontally scrollable wrap (min-width 480px):
  hairline outer border and cell dividers, 2px ink rule under 700-weight
  uppercase tracked headers, 8px 16px cell padding, numeric columns
  right-aligned (tabular figures), and a bottom-side caption in secondary ink
  that links the source raster ("original ↗"). The world-native way to ship a
  tabular report — never a screenshot of one.

### Figure Plates
- `<figure>` as a plate: 1px hairline frame, Plot Paper Deep ground, 12px
  padding, centered image or video, secondary-ink caption below. Images are
  click-to-zoom (JS wraps them in a full-res link); videos carry real
  ffmpeg-extracted poster frames. `.fig-grid` places plates 2-up (18px gap),
  stacking under 640px.

### Page TOC (project pages)
- Fixed right rail (190px, 1px hairline left border, 14px inset) built by
  `project-page.js` from the panel `<h2>`s; shown only ≥1500px. Links are
  secondary ink, darkening on hover; the active section's link is ink at 700.
  Scroll-tracked, never overlapping the sheet.

### Timeline (work history)
- Dated vertical axis: 1px hairline line, 11px square nodes (solid ink =
  done, paper-fill dashed = current), right-aligned dates in secondary ink,
  800-weight uppercase org names beside 26px hairline-bordered logos.

### Motion
- One authored moment: on load, homepage blocks register one-by-one
  (opacity-in, 0.24s `cubic-bezier(0.16, 0.84, 0.3, 1)`, per-block `--d`
  delay of 110ms × block order), guarded by `prefers-reduced-motion`.
  Everything else is 0.18s ease-out opacity/background transitions on hover
  and press. Smooth anchor scrolling only under reduced-motion
  no-preference, and suppressed when arriving from a project page. No
  movement, no scaling, no scroll effects.

## Do's and Don'ts

### Do:
- **Do** keep all HTML text at 0.875rem Martian Mono; build hierarchy with
  weight (400/700/800), 0.08–0.22em tracking, uppercase, and the two inks.
- **Do** structure new surfaces with rules and grids: 2px ink for section
  structure, 1px #b9beb2 hairlines for dividers; recessed material sits on
  Plot Paper Deep inside a hairline frame.
- **Do** draw in-progress status as a dashed stroke on the element's existing
  outline, and shipped as solid.
- **Do** show real measured numbers (tabular figures): bare in copy and index
  rows; in a ruled metrics strip or data table on Read surfaces. A `metric`
  field is only ever a genuine measurement.
- **Do** render every die through `PlanLib` from `PROJECTS` so block
  placement matches site-wide; keep drawn SVGs `aria-hidden` enhancements
  over real links, with focus sync and noscript fallbacks.
- **Do** keep files hand-editable plain HTML/CSS/JS — no build step, ever;
  new projects append via `js/projects.js` plus the noscript list.
- **Do** use only the owner's real artifacts: rasters carry embedded
  provenance, video posters are extracted first frames of the actual demos.

### Don't:
- **Don't** introduce a second type size, a second typeface, or a dark
  background — this world is the refusal of the dark neon card portfolio,
  and the legacy dark stylesheet is deleted, not dormant.
- **Don't** use report-form vocabulary in copy: no "wafer", "process", "lot",
  "device", "bin", no `MEAS:`-style prefixes in prose. The silicon world
  lives in the drawing, not the words.
- **Don't** use box-shadows, gradients, sheen, rounded corners (radius is 0),
  or card containers; grouping is rules and whitespace and the die is drawn
  flat.
- **Don't** put block colors on text, links, buttons, or chrome; they exist
  only as project identity fills.
- **Don't** invent metrics, and don't replace the mark-form status language
  with colored badges or icons.
- **Don't** paste screenshots of tabular data; transcribe them into a
  `.data-table` and link the source raster from the caption.

---

**Scope.** This world governs the entire site: `docs/index.html` (Persuade)
and every `docs/projects/*.html` write-up (Read), through `css/site.css`
(shared chrome) + `css/home.css` / `css/project.css`, drawn by
`js/plan-lib.js` + `js/floorplan.js` from `js/projects.js`.
The former dark world (`css/style.css`) no longer exists in the codebase.
