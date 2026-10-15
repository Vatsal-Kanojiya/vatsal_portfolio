# CLAUDE.md

Personal portfolio of Vatsal Kanojiya, a Python backend engineer (Django, Frappe/ERPNext). The audience is recruiters and engineering managers. The site has to read as professional by default, with personality available on request.

## Commands

```bash
nvm use            # Node 24 (.nvmrc). The system default Node 18 is too old for Astro 7.
npm install
npm run dev        # http://localhost:4321
npm run build      # must pass before every commit
```

## Stack

Astro 7 (static output) + Tailwind CSS v4 (`@tailwindcss/vite`) + React islands only where interactivity needs it (`src/components/JourneyTrack.tsx`, using `motion`). Fonts come from `@fontsource-variable/*`. Cross-page transitions use native CSS `@view-transition`. Switchable views are described under **Views** below. Everything else is plain Astro components with small inline `<script>`s.

## Layout

- `src/data/profile.json`: name, headline, stats, skills, the "How I work" steps, links
- `src/content/{journey,experience,projects}/*.md`: one file per entry. The schema is in `src/content.config.ts`. `hidden: true` hides an entry.
  - Projects with `kind: showcase` get a page at `/projects/<file-name>/`. `kind: early` are 2023 projects shown as small cards linking to GitHub.
- `src/components/`: one component per home-page section. `src/pages/projects/[slug].astro` is the project page.
- `src/styles/global.css`: **design tokens**. Colours are CSS variables on `:root` and `[data-theme="dark"]`, mapped to Tailwind via `@theme inline` (`bg-bg`, `text-ink`, `text-muted`, `border-line`, `text-accent`, `bg-band`, …). Always use tokens, never hard-coded colours, so themes and views keep working.
- `src/layouts/Base.astro`: sets the theme before paint (localStorage `theme`, else the system preference), adds the `js` class, and runs the `[data-reveal]` scroll-reveal observer.
- `docs/ROADMAP.md`: what's next and the parked ideas. **Read it before starting feature work.**
- `tools/handfont/`: a parked experiment (custom handwriting font). Don't use it for the site.

## Content rules

- No client names. Describe client work in anonymised form ("a pan-India vending ERP").
- No phone number anywhere on the site.
- Facts come from Vatsal's résumé, his repos or him. Don't invent achievements, numbers or story details. If something is missing, leave a clear TODO and ask.
- Write feature descriptions in plain user terms. Keep technical depth to a short "under the hood" section.

## Views (switchable looks over the same content)

Built: **Editorial** (default) and **Paper** (handwritten notebook). Planned: Terminal and Display (see `docs/ROADMAP.md`).

- **Editorial** is the default and must stay unchanged for anyone who doesn't switch.
- `src/lib/views.ts` is the registry (id, label, hint, preview font, fonts to fetch, preload).
- `Base.astro` sets `data-view` on `<html>` before paint: `?view=` first (and remembers it), then localStorage `view`, else the default. Every storage access is in try/catch. It also generates the `data-only` rules from the registry.
- `src/styles/views/<id>.css` overrides the tokens under `:root[data-view="<id>"]` and `:root[data-view="<id>"][data-theme="dark"]`, including fonts (`--ff-sans`, `--ff-display`, `--ff-mono`, `--ff-code`) and `--grain`. Tailwind's `font-*` utilities read these.
- `ViewSwitch.astro` (in the nav) lists the registry.
- `data-only="<id>"` shows an element only in that view (e.g. the flow-field canvas is `editorial`, `PaperSketch` and `Scribble` are `paper`).
- View-agnostic hook classes in components, styled per view: `ui-card`, `ui-pill`, `ui-btn`, `ui-index`, `ui-dot`, `ui-tape`, `ui-photo`, `doodle-underline`. Editorial doesn't style them.

**Adding a view:** add an entry to `views.ts`, add `src/styles/views/<id>.css` and import it in `global.css`, add any hero decoration as a `data-only="<id>"` component. JS animations should pause when their view isn't showing (see the flow-field script in `Hero.astro`).

**Paper specifics** (all in `src/styles/views/paper.css` unless noted):
- Caveat for text and headings, Reenie Beanie for short margin scribbles only. Body uses `font-size-adjust` so Caveat matches Editorial's x-height.
- Page pattern is one token, `--page`: `--pattern-dots` (current), `--pattern-ruled`, `--pattern-grid` or `--pattern-plain`.
- Margin-note wording is in `profile.json` → `paper.notes`. The hero sketch is `PaperSketch.astro`.
- Dark theme = black paper with gel-pen inks. The band (`bg-band`) becomes kraft paper.

Guardrails for every view:
- Readable contrast in light and dark (WCAG AA for text).
- Display or handwriting fonts must not make paragraphs hard to read.
- Respect `prefers-reduced-motion`.
- No horizontal scroll at 390px width.
- Check desktop + mobile, light + dark, before calling it done.

## Git

Other Claude Code sessions work on this repo in parallel. `git pull` before starting, then commit **and push** each finished, build-passing step so everyone sees the current state. Small, focused commits with descriptive messages. Never commit `tools/handfont/scans/` or `out/` (they hold raw handwriting and are git-ignored).
