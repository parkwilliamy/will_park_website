---
version: 1
slug: "docs-index-html"
primary_target: "docs/index.html"
related_targets: ["docs/css/site.css","docs/css/home.css","docs/css/project.css","docs/js/floorplan.js","docs/js/locator.js","docs/js/plan-lib.js","docs/js/projects.js"]
---

# Surface brief: homepage (docs/index.html)

Scope: the hub page at williampark.org. Visitor mode: Persuade.

Audience & job: co-op/internship recruiters (~2 min screen) deciding whether
William is worth an interview; secondary, engineers exploring the write-ups.
Primary action: click into a project deep-dive; secondary: resume, GitHub, email.
Proof: measured results only (R500: 57 MHz · 1.23 CPI · 96.5% branch prediction);
no testimonials exist — never invent any.

Chosen direction (seed 7f679b8b, code-led; wafer-map direction locked
2026-08-28, then user-steered the same day to a quieter carrier): "Chip
floorplan" — a pad-ringed rectangular die, guillotine-tiled with labeled IP
blocks (one per project, flagship weighted larger), hatched reserved filler
areas, standard-cell row texture. **User-pinned: no literal report-form
vocabulary** (no "wafer bin map", "process", "lot", "device" field labels) —
the silicon world stays implicit in form, not named in copy. The legend/index
beside the die is the real crawlable project list; experience is a dated
vertical timeline. Memorable moment: hovering a block dims the rest and the
readout answers with the project's real measured numbers.

Constraints: no build step; projects append via docs/js/projects.js
(floorplan.js renders die + index from it; noscript list in index.html needs
the same link); one HTML type size (hierarchy = weight/tracking/ink/spacing;
SVG die lettering is drawing annotation and scales with the map); status is
mark form (solid outline shipped, dashed in progress); metaphor never precedes
scanability. Anti-goals: flashy/gimmicky, corporate/generic, slow/heavy.

Resolved 2026-08-28: the world now covers the whole site — projects/*.html
migrated (css/site.css shared chrome + css/project.css; js/locator.js draws a
mini "you are here" die per page; old css/style.css deleted). Unresolved: dark
variant deliberately not built (recruiter daylight scene forces light ground).
