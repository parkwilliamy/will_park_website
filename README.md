# William Park — personal website

Static personal website. Source lives in [`docs/`](./docs/).
No build step — plain HTML, CSS, and a small `projects.js` for content.

```
docs/
├── index.html                  Hub page (about + project list)
├── css/style.css               All styles
├── js/projects.js              Project metadata (the only file you edit to add projects)
├── projects/                   One HTML page per project
│   ├── r500.html
│   ├── autonomous-navigation-system.html
│   ├── robot-hand.html
│   └── line-follower-robot.html
└── assets/
    ├── resume.pdf              Linked from "Resume" buttons site-wide
    └── img/                    All images used by the site
```

## Local preview

From the repo root:

```bash
cd docs
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Deploy: GitHub Pages (recommended)

GitHub Pages is the natural fit for this site — static files, free, supports the
custom domain `williampark.org`.

1. Push this repo to GitHub.
2. In the repo on github.com, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to *Deploy from a branch*.
   - Branch: `main`
   - Folder: `/docs` (the site lives there; the reference `Website1*`/`Website2*`/`WilliamPark*`
     captures stay at the repo root and are ignored by Pages).
4. Save. GitHub will give you a `*.github.io` URL once the first deploy finishes.

### Custom domain (`williampark.org`)

1. In **Settings → Pages**, enter `williampark.org` under "Custom domain". This writes
   a `CNAME` file to the repo.
2. At your DNS registrar, add these records pointing to GitHub Pages:
   - `A` records on `@` to:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` on `www` to `<your-github-username>.github.io`
3. Back in **Settings → Pages**, enable **Enforce HTTPS** once the cert provisions
   (can take up to ~24h).

### Note on Google Sites

The CLAUDE.md mentioned Google Sites as a possible target. Google Sites can't host
arbitrary HTML/CSS/JS files — you'd have to paste a single HTML blob into an
"Embed code" block, which loses the multi-page structure. GitHub Pages (above)
is the recommended path. If you do want to switch later, ask and we'll either
flatten the site to one page or build it as a Google Sites embed.

## Common edits

### Replacing the resume

Drop the new PDF in at `docs/assets/resume.pdf` (same filename).
Every "Resume" link points there.

```bash
cp /path/to/new-resume.pdf docs/assets/resume.pdf
```

### Adding a new project

1. Add an entry to the `PROJECTS` array in `docs/js/projects.js`:

   ```js
   {
     slug: "my-new-project",
     title: "My New Project",
     tagline: "One-sentence summary that shows on the hub page.",
     date: "Jan 2026 – Mar 2026",
     year: 2026,
     thumb: "assets/img/my-new-project.png",
     tags: ["Tag1", "Tag2"]
   }
   ```

2. Drop the thumbnail at `docs/assets/img/my-new-project.png` (matches the
   `thumb` path above).

3. Create `docs/projects/my-new-project.html` — copy any existing project
   page (e.g. `robot-hand.html`) and edit. The `slug` in step 1 must match the
   filename (`my-new-project`).

That's it — the hub page picks up the new entry automatically.

### Editing existing project content

Each project's body lives in its own file under `docs/projects/`. Open
the file and edit normally.

### Tweaking the look

All styling is in `docs/css/style.css`. The palette is defined in CSS
custom properties at the top of the file — change those to retheme the whole
site.

## What is in the rest of the repo

The top-level `Website1.html`, `Website2.html`, `WilliamPark.html`,
`LineFollowerRobot.html`, `RobotHand.html`, `ANS.html`, and `R500.html` files
(plus their `*_files/` directories) are saved-page archives kept for reference.
They're not used by the deployed site and can be deleted once you're happy with
the new design.
