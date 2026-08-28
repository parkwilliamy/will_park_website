---
target: the homepage (docs/index.html)
total_score: 21
max_score: 28
na_heuristics: 7,9,10
p0_count: 0
p1_count: 2
timestamp: 2026-08-28T16-49-17Z
slug: docs-index-html
---
# Design Critique — williampark.org homepage (docs/index.html)

Method: dual-agent (A: design review · B: detector/browser evidence). Mode: Persuade.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | No pressed/active feedback on die-block tap; slow connections feel frozen after tapping |
| 2 | Match System / Real World | 3 | Status line is a jargon wall for non-technical screeners; "SRC ↗" is insider shorthand |
| 3 | User Control and Freedom | 3 | Solid — no traps, externals marked ↗, back always works |
| 4 | Consistency and Standards | 2 | Copy promises "click… a row" but legend rows only accept clicks on the title link; primary action lands in the legacy dark world |
| 5 | Error Prevention | 3 | Hover tint invites a row click that does nothing (false affordance) |
| 6 | Recognition Rather Than Recall | 3 | Mobile splits die codes (ANS/HAND/LFR) from the decoding index by a full viewport |
| 7 | Flexibility and Efficiency | n/a | Persuade surface; single linear first-visit task |
| 8 | Aesthetic and Minimalist Design | 4 | One size, two inks, no boxes; the restraint is the character |
| 9 | Error Recovery | n/a | No forms/error states; noscript fallback exists |
| 10 | Help and Documentation | n/a | Persuade surface; one micro-instruction is the right amount |
| **Total** | | **21/28 (75%)** | **Good** |

## Design Specificity Verdict

Authored, not interchangeable: a computer-architecture student's homepage as a placed-and-routed die (pad ring, guillotine tiling, cell rows, hatched reserved area, mark-form status) that no adjacent portfolio could truthfully wear. Discipline holds top to bottom; the metaphor is drawn, never named. The specificity leak: the click the page is engineered to earn lands in the refused legacy dark world of the interior pages.

Deterministic scan: CLI detect.mjs on index.html = 0 findings. Runtime in-browser detector = 4 `line-length` findings at 1280px: `.status-line` ~149 chars/line (index.html:85) and the three `.trav-summary` blocks ~97 chars/line — the latter despite a styled 68ch cap, worth verifying. No console errors; injection preflight succeeded; no human-visible overlay possible (headless-only environment).

## Priority Issues

1. **[P1] Legend rows advertise a click they don't accept.** Section note says "Click a block or a row"; rows tint on hover, but clicks outside the title link do nothing (floorplan.js binds navigation only on planRoot). Dead tap during the page's one core action. Fix: delegate click on legendRoot + `cursor: pointer` on `.legend-row` (or soften the copy). → /impeccable polish
2. **[P1] The primary action lands off-world.** Every path off the homepage ends in the legacy dark world. Migrate the flagship write-up (r500.html) into the floorplan world first — it takes most recruiter clicks. → /impeccable shape
3. **[P2] Mobile leads with the decoration, not the action.** At 390px the aria-hidden die + readout consume a viewport before the first real link. Fix: order the index before the die in the stacked layout, or cap the stacked die shorter. → /impeccable adapt
4. **[P2] Only one of four rows delivers the promised bare metric.** LFR has honest numbers trapped in its tagline; ANS/Robot Hand need real measured figures from their write-ups (never invented). → /impeccable clarify
5. **[P2] The status line is both jargon-dense and set at ~149 chars/line.** A's jargon-wall finding and B's worst measured line converge on the same element. Fix: cap its measure (~70ch) and add a plain-language first clause for non-technical screeners. → /impeccable typeset

## Persona Red Flags

**Jordan (non-technical HR screener):** first sentence on the page is opaque deep-tech; readout speaks instrument ("DASHED", "HATCHED"); "SRC ↗" misreadable; RESUME ↗ is clear and first-viewport (good).
**Riley (stress tester):** dead legend-row click; no-JS leaves a stray empty readout box and empty © year; `scroll-behavior: smooth` unguarded by prefers-reduced-motion; keyboard support genuinely good (2px ink focus ring, synced dimming, no duplicate tab stops).
**Casey (distracted mobile):** first projects content is non-tappable-feeling die with unexplained codes; tap on a block gives zero pressed feedback on 3G; 2×2 nav targets are text-height (~24px); three font weights cause visible fallback swap on slow connections; tiny total payload otherwise excellent.

## Cognitive Load

2 of 8 checklist items failed, both soft: minimal-choices (head nav is a 5-option decision point) and working-memory (mobile only — codes decoded a viewport away).

## Minor Observations

- No-JS residue: empty readout box renders; footer year empty (hardcode year, let JS update).
- `scroll-behavior: smooth` not wrapped in prefers-reduced-motion.
- Naming drift: home.css line 1 and projects.js comments still say "wafer map"; DESIGN.md canonized "Chip Floorplan".
- Dead CSS: `.id-links` hover rules and `.id-cell + .id-cell` divider match reduced markup.
- Direction-contract comment ships in production HTML — view-source is a recruiter behavior for this audience; charm or noise, decide.
- og:image is the R500 screenshot; a rendered floorplan image would carry the identity into link previews.
- Contrast passes AA throughout (secondary ink ≈5.8:1); yellow block correctly flips to dark lettering.

## Questions to Consider

1. If the write-ups are the product, should any further budget go to homepage polish at all — or entirely to migrating r500.html out of the world this system refuses?
2. On mobile, is the identity artifact allowed to cost the primary action a full screen of thumb travel, or should the crawlable index lead when the two can't sit side by side?
3. Is "measured results over adjectives" a principle or an R500 feature — what honest number does each remaining project deserve?
