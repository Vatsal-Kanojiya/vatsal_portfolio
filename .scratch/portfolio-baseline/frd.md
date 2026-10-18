# FRD: portfolio as built (reverse-engineered, 2026-10-19)

Stack: Astro 7 static, Tailwind v4, one React island (`JourneyTrack.tsx`, `motion`), Fontsource fonts. IDs are stable so tickets can cite them.

## 1. Content model (`src/content.config.ts`, `src/data/profile.json`)
- FR-1.1 Three collections, one markdown file per entry: `projects`, `journey`, `experience`. `hidden: true` removes an entry everywhere (`visible()` in `src/lib/site.ts`).
- FR-1.2 `projects`: title, tagline, summary, stack, order, kind (`showcase`|`early`), year, platforms, features[title,text], status (`live`|`in-progress`|`archived`), optional repo, live, cover image, highlights[value,label], gallery[src,caption].
- FR-1.3 `journey`: period, title, place?, kind (`foundation`|`work`|`pivot`|`now`), order, image?, imageAlt?.
- FR-1.4 `experience`: role, company, place, period, order, intro?, highlights[title,text,tags].
- FR-1.5 `profile.json` holds name, role, location, headline, intro, careerStart, email, links, openTo, stats, skills groups, process steps.
- FR-1.6 Stat value `{years}` is replaced at build time with years since `careerStart`, one decimal (`yearsOfExperience`).
- FR-1.7 Lists sort by `order` ascending.

## 2. Page shell (`Base.astro`, `Nav`, `Footer`, `global.css`)
- FR-2.1 Every page has title (`<page> · Vatsal Kanojiya` or `name — role`), description (defaults to intro), canonical, Open Graph and Twitter tags using `/og.png`, favicon, sitemap link, and Person JSON-LD.
- FR-2.2 Theme is set before first paint: localStorage `theme`, else system preference; `js` class added to `<html>`. Storage access is in try/catch.
- FR-2.3 Skip-to-content link; `<main id="main">`.
- FR-2.4 Fixed pill nav: logo "vatsal." to `/`, links Journey, Work, Projects, Contact (anchors on home, hidden below `sm`), theme toggle. **(?Q6)**
- FR-2.5 Theme toggle flips light/dark, persists to localStorage, shows moon/sun icon.
- FR-2.6 Elements with `data-reveal` fade in once when scrolled into view (IntersectionObserver); `--d` sets a stagger delay.
- FR-2.7 Cross-page transitions via CSS `@view-transition` (disabled under reduced motion).
- FR-2.8 Footer: © current year, name, "Built with Astro", location.
- FR-2.9 Tokens: `--bg --surface --ink --muted --line --accent --accent-soft --warm --band --band-ink`, light and `[data-theme="dark"]`; fonts Inter (sans), Fraunces (display), JetBrains Mono (mono). `<meta theme-color>` is a fixed light value. **(?Q7)**

## 3. Home page order (`index.astro`)
Hero, Stats, Journey (01), Experience "Work" (02), Projects (03), Process "How I work" (04), Skills "Toolkit" (05), Contact (06).

## 4. Hero
- FR-4.1 Availability pill from `openTo`; name as letter-by-letter animated H1 (first name, then last name in accent italic); role · city · live IST clock (HH:MM, refreshed every 20s); headline; intro.
- FR-4.2 Buttons: "See my projects" (to `#projects`), "Download résumé" (PDF).
- FR-4.3 Optional portrait: shown only if `src/assets/photos/portrait.(jpg|jpeg|png|webp)` exists; otherwise the column is empty. Currently the folder is empty. **(?Q5)**
- FR-4.4 Background canvas "flow field": particles drift on a vector field, swirl near the cursor, draw in the accent colour, recolour on theme change.
- FR-4.5 Flow field starts after page load/idle, pauses when off-screen or tab hidden, caps particles at 420, lowers resolution on narrow screens; under reduced motion it renders one still frame and the name animation is skipped.

## 5. Stats
- FR-5.1 Four stats in a grid (2 columns on mobile, 4 on desktop). Current values: years of experience (computed), "5–6 concurrent client projects owned", "5s → 1s report time", "50+ technical interviews conducted". **(?Q1)**

## 6. Journey
- FR-6.1 Vertical timeline of non-hidden journey entries: period, title, place, markdown body, optional image. Dot style depends on `kind`.
- FR-6.2 The timeline line fills as the user scrolls (React island, `client:visible`, spring-smoothed; fully filled under reduced motion).

## 7. Work (experience)
- FR-7.1 One block per role: role, company · place, period, optional intro, highlight cards (title, text, tag chips). Client names withheld by copy, not by code.

## 8. Projects
- FR-8.1 Showcase cards (large, link to `/projects/<id>/`): cover or generated visual, status chip (Live / In progress / Archived), platform chips, title, tagline, summary, first 6 feature titles, "See everything it does".
- FR-8.2 "Three years of growth" strip: four fixed steps (To-Do List 2023, VBlog 2023, Expense Tracker 2026, Super Notes 2026). Hard-coded in `Projects.astro`, not in content. **(?Q4)**
- FR-8.3 Early projects (`kind: early`) as dashed cards that open the GitHub repo in a new tab, with year, tagline, summary, stack.
- FR-8.4 `ProjectVisual` is a generated placeholder graphic seeded per project, used when no cover image.

## 9. Project page (`/projects/<id>/`, showcase only)
- FR-9.1 Static path per visible showcase project, sorted by `order`.
- FR-9.2 Sections, in order: back link to `/#projects`; title, tagline, summary; platform chips (filled) and stack chips (outlined); actions "Open live app" if `live` else a dashed "Live demo coming soon", plus GitHub button if `repo`; cover or visual; highlights grid (if any); "What it does" feature cards (if any); markdown body in `.prose` (the "under the hood" text); "Screens" gallery with captions (if any); "Next project" link that wraps around (hidden if only one project).
- FR-9.3 Page title and description come from the project's title and summary.

## 10. Process, Skills, Contact
- FR-10.1 Process: dark band, four numbered steps from `profile.process` (Spec, Build, Verify, Review), with the heading "AI agents write code. I own what ships."
- FR-10.2 Skills: grouped chips from `profile.skills` (Languages, Frameworks, Backend, Data, Tooling, Integrations).
- FR-10.3 Contact: headline, `openTo` + "I reply to every message." **(?Q3)**, "Say hello" mailto button, link tiles for Email, LinkedIn, GitHub (new tab), Résumé (download). No form.

## 11. Other routes and files
- FR-11.1 `404.astro`: "This page drifted off." with a Back home link.
- FR-11.2 `/robots.txt` allows all and points to `sitemap-index.xml`. Sitemap integration excludes the 404 page.

## 12. Build and deploy
- NFR-1 Static output; `SITE_URL` env sets the canonical host, fallback `https://vatsalkanojiya.dev` is a placeholder. **(?Q2)**
- NFR-2 CI (`.github/workflows/build.yml`) on push to main and PRs: `npm ci`, `npx astro check`, `npm run build`. **(?Q9)**
- NFR-3 `deploy/`: Dockerfile + `compose.yaml` + Caddy (auto HTTPS, zstd/gzip, immutable cache for `/_astro/*`, `www` redirects to apex, custom 404). Django app subdomains (`notes.`, `expenses.`) are commented out for phase 2.
- NFR-4 Node 24 required (`.nvmrc`).

## 13. Not built yet (from ROADMAP and CLAUDE.md)
- Views: `data-view` attribute, per-view tokens, nav view switcher, `?view=` and localStorage `view`; Paper first (Caveat, Reenie Beanie); Terminal and Display later.
- VBlog v2 showcase; live demos on subdomains; real photos and screenshots; copy review.
