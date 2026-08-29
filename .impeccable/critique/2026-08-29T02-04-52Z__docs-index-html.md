---
target: the homepage (docs/index.html)
total_score: 19
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
timestamp: 2026-08-29T02-04-52Z
slug: docs-index-html
---
# Design Critique — williampark.org homepage (docs/index.html), run 2

Method: dual-agent (A: design review · B: detector/browser evidence). Mode: Persuade.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Hover/focus/press sync excellent; nav has no current-section state |
| 2 | Match System / Real World | 3 | Native to hardware hiring managers; "R500" and the CPI/MHz line mean nothing to an HR screener |
| 3 | User Control and Freedom | 2 | Blocks and row bodies navigate via window.location — Ctrl/Cmd-click opens in the same tab, no right-click/new-tab, no URL preview |
| 4 | Consistency and Standards | 2 | Die says ROBOTIC HAND / LINE-FOLLOWING ROBOT, index says Robot Hand / Line-Follower Robot; "Click" on touch; Email/GitHub duplicated header+footer |
| 5 | Error Prevention | 2 | Drag-selecting text inside an index row (e.g. copying the R500 numbers) fires the row click and navigates away — verified |
| 6 | Recognition Rather Than Recall | 2 | No identity/positioning line; discipline, school, and availability must be inferred from a below-the-fold timeline |
| 7 | Flexibility and Efficiency | n/a | Single-visit Persuade surface |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained and beautiful; ~300px left-column void at 1440 and die/index redundancy hold it from a 4 |
| 9 | Error Recovery | 2 | No docs/404.html — a mistyped link drops out of the world into GitHub's default page |
| 10 | Help and Documentation | n/a | The single instruction line is all the help needed |
| **Total** | | **19/32 (59%)** | **Acceptable** |

## Design Specificity Verdict

Unmistakably authored: a pad-ringed die with corner keys, the CPU project literally in the core, rotated labels on tall blocks, plot-paper ground, one mono size, dashed/solid status marks — swap in a web developer's projects and the form stops making sense. Two missed opportunities: the drawing encodes nothing the index beside it doesn't (block areas are layout artifacts, not data), and the page never says who the person is.

Deterministic scan: CLI 1 finding (cramped-padding on .head-bar) — verified false positive (the mobile query removing the border also zeroes the padding; browser computed styles confirm). Runtime detector: 3 line-length flags on .trav-summary at 1280 — verified false positive (actual max 68 chars/line; the tool assumes a 0.5em glyph on a 0.71em mono face). Console clean at both widths, no overflow, fonts load, keyboard order nav → index links → footer with visible focus rings; no skip link.

## Priority Issues

1. **[P1] Drag-select in an index row navigates away.** The whole-row click handler fires after any mousedown/mouseup in the row, so selecting the metric text to copy bounces the recruiter into the write-up (verified). Fix: ignore clicks when a text selection exists or the pointer moved. → /impeccable harden
2. **[P1] No identity line anywhere on the page.** After the intro card's removal, nothing says program / school / what you're seeking; the strongest credentials sit two screens down. A recruiter's first question goes unanswered in the first second. Fix, if you want it: one secondary-ink line (≤52ch) under the head-bar or under the PROJECT FLOORPLAN caption — no card, no size change. → /impeccable clarify
3. **[P2] Desktop void in the left column.** With the readout and card gone, the die ends ~300px above the index bottom at 1440 (~380px at 1024) — an unfinished-looking gap in the persuading viewport. Fix: put the identity line there, or tighten index row padding / vertically center the die. → /impeccable layout
4. **[P2] Two names per project.** Die labels (ROBOTIC HAND, LINE-FOLLOWING ROBOT) don't match index titles (Robot Hand, Line-Follower Robot); the screener reconciles two vocabularies for half the items. Fix: make the block labels match the titles (or vice versa). → /impeccable clarify
5. **[P3] Blocks aren't real links; no 404 page.** Middle/Ctrl-click can't open a project in a new tab from the die; a dead link leaves the world. Fix: wrap each block in an SVG <a tabindex="-1">; add docs/404.html on site.css. → /impeccable harden

## Persona Red Flags

**Jordan (HR screener):** "R500" and "57 MHz · 1.23 CPI · 96.5%" are jargon with no "so what"; no student/program/availability line to fill a screening form from; "Click a block" — she reads the die as a chart and looks for a key; Email in the nav hides the address until clicked.
**Riley (stress tester):** drag-select navigates (verified); Ctrl-click on a block stays in-tab; no-JS leaves the left column empty with the caption hidden; no 404; keyboard, back-navigation (pageshow reset, instant hash jump) and resize all solid.
**Casey (mobile):** the instruction mentions a block that sits ~800px below it and says "Click" on touch; the two-row nav takes 137px before content; SOURCE ↗ targets are 25px tall; Work Experience is two screens down; fallback mono shows briefly before the webfont.

## Cognitive Load

3 of 8 failed: chunking (5-link nav), visual hierarchy (brand, section heads, and org names all share the same 800/caps treatment — identity isn't on top), minimal choices (first viewport offers ~16 targets to 8 destinations). Decision points >4: head nav (5); first viewport.

## Minor Observations

- Block lettering contrast: ink on blue ≈3.0:1, on red ≈3.4:1 — below AA for the label size (visual only; the SVG is aria-hidden). The rotated ANS label on blue is the least legible element.
- Date styles differ: index "JUN 2025", timeline "Sept 2025".
- Robot Hand and Line-Follower Robot share one Source repo (parkwilliamy/Projects).
- The PROJECT FLOORPLAN caption is a fourth display treatment (700/0.16em).
- The load "register" animation plays off-screen on mobile (die is below the index).
- Kiwi Charge's "98%" is the timeline's only number, buried at paragraph end.

## Questions to Consider

1. If the die encoded something true (area ∝ months of work, or shipped vs in-progress), would it teach a hiring manager more in one glance than the index does in ten seconds?
2. "Measured results over adjectives" rests on one row of four — add a real number to each remaining project, or let the index say plainly which are measured?
3. Is opening with PROJECTS and no sentence about the person a principle, or the one place the document metaphor overrules the recruiter's first question?
