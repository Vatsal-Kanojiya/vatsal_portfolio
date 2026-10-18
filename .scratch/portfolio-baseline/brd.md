# BRD: Vatsal Kanojiya portfolio (reverse-engineered from code, 2026-10-19)

Source of truth: the code at commit d79465b plus `CLAUDE.md` and `docs/ROADMAP.md`. Items marked **(?)** are in `open-questions.md`.

## 1. Purpose
A personal site that lets recruiters and engineering managers judge Vatsal as a Python backend engineer (Django, Frappe/ERPNext) in a few minutes, and contact him.

## 2. Audience
- Primary: recruiters, engineering managers. Secondary: peers who read the project pages.
- Needs: who he is, what he has shipped, how he works, proof of depth, a fast route to contact or résumé.

## 3. Business goals
| ID | Goal |
|---|---|
| G1 | Read as professional by default; personality only on request (future "views"). |
| G2 | Show real production experience without naming clients (anonymised). |
| G3 | Show personal projects built to production standards, each with its own page. |
| G4 | Explain the spec-first, AI-agent-assisted way of working honestly. |
| G5 | Convert a visit into contact: email, LinkedIn, GitHub, résumé download. |
| G6 | Cheap to run and to update: content in files, static hosting, no backend. |

## 4. Scope
**In:** single-page home (8 sections), one page per showcase project, 404, SEO metadata, light/dark theme, static deploy on one server behind Caddy.
**Out (today):** contact form, blog, CMS, analytics, i18n, accounts. **(?Q8)**
**Planned (not built):** switchable views (Paper next; Terminal, Display later), VBlog v2 showcase, live demos of Django apps on subdomains.

## 5. Constraints and rules
- C1 No client names; no phone number anywhere.
- C2 Facts only from résumé, repos or Vatsal; no invented numbers. Gaps become TODOs.
- C3 Feature descriptions in plain user terms; technical depth kept short.
- C4 Colours only via design tokens so themes/views keep working.
- C5 Accessibility and comfort: readable contrast in light and dark, `prefers-reduced-motion` respected, no horizontal scroll at 390px.
- C6 `npm run build` must pass before every commit; commit and push each finished step (parallel sessions).

## 6. Success measures (inferred, none instrumented)
Site deployed on own domain; all copy reviewed by Vatsal; project pages link to live demos where they exist; Lighthouse-style basics (SEO meta, sitemap, OG image) in place.

## 7. Status snapshot
- Built: everything in FRD §2–§9.
- Not done: domain and server decision, deployment, real photos/screenshots, copy review, live demo links (ROADMAP "Now").
- Next feature: Paper view (ROADMAP "Later").
