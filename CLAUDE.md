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

Astro 7 (static output) + Tailwind CSS v4 (`@tailwindcss/vite`) + React islands only where interactivity needs it (`src/components/JourneyTrack.tsx`, using `motion`). Fonts come from `@fontsource-variable/*`. Cross-page transitions use native CSS `@view-transition`. Everything else is plain Astro components with small inline `<script>`s.

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

## Next feature: switchable views, starting with **Paper**

The spec is in `docs/ROADMAP.md`. In short:

- **Editorial** (the current design) is the default and must stay unchanged for anyone who doesn't switch.
- **Paper** is a handwritten-notebook look over the same content: paper texture (ruled or dotted page, slight grain), ink colours, margin notes and doodled underlines. **Caveat** (400–700) for text and headings. **Reenie Beanie** for short margin scribbles only, because it gets unreadable in long text. Both are on Fontsource (`@fontsource-variable/caveat`, `@fontsource/reenie-beanie`).
- Later views: Terminal and Display (see the roadmap). Build the switch so adding a view is mostly a new token set.

Suggested mechanism (adjust if something better fits):
- A `data-view="editorial|paper"` attribute on `<html>`, set before paint in `Base.astro` next to the theme script. Read it from `?view=` first, then localStorage `view`, else `editorial`. Wrap every storage access in try/catch.
- Per-view tokens in `global.css` (`[data-view="paper"]`, plus `[data-view="paper"][data-theme="dark"]`), including font tokens (`--font-display`, `--font-sans`).
- A small view switcher in `Nav.astro` next to the theme toggle.
- View-specific decoration (hero animation, textures) toggled by the attribute. The Editorial flow-field canvas can be hidden or replaced in Paper.

Guardrails for every view:
- Readable contrast in light and dark.
- Display or handwriting fonts must not make paragraphs hard to read.
- Respect `prefers-reduced-motion`.
- No horizontal scroll at 390px width.
- Check desktop + mobile, light + dark, before calling it done.

## Git

Other Claude Code sessions work on this repo in parallel. `git pull` before starting, then commit **and push** each finished, build-passing step so everyone sees the current state. Small, focused commits with descriptive messages. Never commit `tools/handfont/scans/` or `out/` (they hold raw handwriting and are git-ignored).
