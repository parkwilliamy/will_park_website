# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: co-op/internship recruiters and hiring managers screening William Park
as a candidate for electrical/computer engineering internships. They arrive with
limited time, often from a resume link or LinkedIn, and are deciding whether he
is worth an interview.

Secondary (unconfirmed, inferred from content): fellow engineers and peers who
find the project write-ups through the community.

## Product Purpose

Personal portfolio site for William Park (williampark.org). It exists to prove
technical depth to recruiters. Success is a visitor reading a project deep-dive
(e.g. the R500 write-up) — the write-ups are the core evidence of skill, more
than the resume or the overview.

## Positioning

Most student portfolios list projects; this site demonstrates them with
full engineering write-ups — architecture diagrams, measured results
(R500: 57 MHz, 1.23 CPI, 96.5% branch prediction accuracy), utilization
reports, and honest discussion of trade-offs and future work. The claim a
neighboring portfolio could not truthfully copy is the depth and rigor of
the documented hardware work (FPGA CPU, ray-tracing ASIC on Tiny Tapeout,
gem5 prefetcher research).

## Operating Context

- Deployed via GitHub Pages from `docs/` on `main`, custom domain
  `williampark.org` (CNAME present).
- Local preview: `cd docs && python3 -m http.server 8000`.
- Content workflow: projects are added by appending to `window.PROJECTS` in
  `docs/js/projects.js` and creating a matching `docs/projects/<slug>.html`
  page; the hub page renders cards from that array. `docs/js/projects.js` is
  the single source of truth for the project list.
- Resume is replaced by overwriting `docs/assets/resume.pdf` (all Resume
  links point there).

## Capabilities and Constraints

- **Confirmed constraint: keep the no-build setup.** Plain HTML/CSS/JS, no
  frameworks, no bundler — the site must stay editable by hand and deploy
  as-is from `docs/`.
- All styling lives in `docs/css/style.css`; the palette is CSS custom
  properties at the top of the file.
- Site structure: hub page (`index.html`) with about/hero, project cards,
  and work experience; one HTML page per project under `docs/projects/`.
- Top-level `WilliamPark.html` and similar files are saved-page archives
  kept for reference, untracked/ignored by the deployed site.

## Evidence on Hand

- Four full project write-ups with images: `docs/projects/r500.html`
  (RV32I CPU on Artix-7), `autonomous-navigation-system.html` (ROS2),
  `robot-hand.html` (MediaPipe + servos), `line-follower-robot.html`.
- Measured results in the R500 write-up (57 MHz, 1.23 CPI, 96.5% branch
  prediction) with architecture diagrams and Vivado utilization reports in
  `docs/assets/img/`.
- Resume PDF at `docs/assets/resume.pdf`.
- Work experience with logos: University of Waterloo (Undergraduate Research
  Co-op, May 2026 – Present, gem5/RISC-V prefetcher research), UWASIC
  (Digital Team Lead, Oct 2025 – Present, ray-tracing ASIC on Tiny Tapeout),
  Kiwi Charge (Electrical Engineering Intern, Sept 2025 – Dec 2025).
- GitHub repos linked per project (e.g. github.com/parkwilliamy/R500).
- No testimonials, press, or third-party endorsements — future work must
  not fabricate any.

## Product Principles

1. **The write-ups are the product.** Every design decision should shorten
   the path from landing to reading a project deep-dive.
2. **Measured results over adjectives.** Claims on the site are backed by
   numbers, diagrams, and reports already on hand; never invent metrics.
3. **Recruiter-speed scanning.** A screener with two minutes must grasp
   breadth (projects, experience) without digging; depth is one click away.
4. **Hand-editable forever.** No change may introduce a build step or make
   adding a project harder than the current append-and-copy workflow.
