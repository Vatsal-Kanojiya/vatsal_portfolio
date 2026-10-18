# Parked questions (from reverse engineering; answer when you are back)

Each has my working assumption, so nothing is blocked.

| # | Question | Where in code | Assumption used |
|---|---|---|---|
| Q1 | Are the stats and skill claims verified against your résumé: "5–6 concurrent client projects", "5s → 1s report time", "50+ interviews", AWS EC2/S3, WhatsApp Business API, Zoom, FCM, biometric devices? | `profile.json` | Taken as true; documented as-is. CLAUDE.md forbids invented numbers. |
| Q2 | Final domain? The fallback `vatsalkanojiya.dev` is a placeholder; canonical, OG and sitemap URLs depend on it. | `astro.config.mjs` | Undecided; ROADMAP "Now". |
| Q3 | "I reply to every message." is a promise with no form or SLA. Keep? | `Contact.astro` | Kept. |
| Q4 | The "Three years of growth" steps are hard-coded in the component, unlike everything else which is content-driven. Move to a content file / profile.json? | `Projects.astro` | Left in place; noted as a ticket candidate. |
| Q5 | No portrait or screenshots exist yet (`src/assets/photos/` empty, no project covers). Is a photo wanted at all, and when will screenshots arrive? | `Hero.astro`, projects | Site works without; generated visuals shown. |
| Q6 | Nav omits "How I work" and "Toolkit" sections and has no mobile menu (links hidden below `sm`). Intentional? | `Nav.astro` | Treated as intentional. |
| Q7 | `theme-color` meta is a fixed light colour, so mobile browser chrome stays light in dark mode. Fix? | `Base.astro` | Minor; left. |
| Q8 | No analytics, no contact form. Intentional (privacy, simplicity)? | whole site | Treated as intentional. |
| Q9 | CI runs `npx astro check` but `@astrojs/check` is not in `package.json` (only `typescript`). Does CI pass today? Adding the dependency needs your approval. | `build.yml`, `package.json` | Not verified (did not run). |
| Q10 | Project status: five showcases are all "in-progress"; should any be "live" once deployed, and should client-work pages (Vending ERP etc.) stay without repo/live links? | `src/content/projects` | Yes, no links for client work. |
