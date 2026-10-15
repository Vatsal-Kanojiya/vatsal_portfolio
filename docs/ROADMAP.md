# Roadmap & ideas log

Ideas are logged here so they aren't lost. The current focus is **content and deployment first**; the experiments come after.

## Now: main content

- [ ] Review and refine all copy (hero, journey, work, projects) with Vatsal
- [ ] Add real photos and project screenshots as they become available
- [ ] Decide domain + server, then deploy the portfolio
- [ ] Deploy Django apps on subdomains (`notes.<domain>`, `expense.<domain>`) and link them via `live:` in each project file

## Later: VBlog v2, the public-facing project

Upgrade the 2023 VBlog into a fourth showcase project, so the line-up covers a utility app (Expense Tracker), an AI app (Super Notes) and a public-facing publishing app.
- Rich-text editor (reuse the TipTap work from Super Notes), code snippets with syntax highlighting, proper tags
- Image uploads and handling (covers, inline images): this is where media matters most
- Keep the social layer (follows, likes, comments, saves) and the Razorpay VIP plan, rebuilt to current standards

## Later: switchable "views"

One site, same content, several complete atmospheres (fonts, colours, hero animation, details). A small switch in the nav changes the view. The choice is remembered per visitor, and `?view=<name>` gives a shareable link.

**Rules for every view**
- **Editorial** is always the default. Every other view is opt-in.
- Display fonts are for headings and numbers only. Body text stays readable.
- Respect `prefers-reduced-motion`: animations become a still frame.
- Readable contrast in light and dark.

| View | Status | Idea |
|---|---|---|
| **Editorial** | ✅ built (current site) | Professional and modern. Fraunces serif + Inter, warm off-white / forest-ink themes, flow-field streamlines in the hero. |
| **Terminal** | 💡 planned | Matrix / cyberpunk terminal. VT323 headings, JetBrains Mono body, phosphor green on black, scanlines and glow, blinking cursor, section titles like `$ cat journey.md`. Hero "code rain" built from the real stack (`SELECT`, `select_for_update`, `@shared_task`, `409`, …). Easter egg: typing `matrix` switches to this view. |
| **Display** | 💡 planned | LED / LCD segment displays. DSEG 7/14-segment font for headings and numbers, with faint "ghost 8s" behind digits. Hero: a big live IST clock. Stats as LCD readouts. Light = calculator LCD, dark = amber train-board LED. |
| **Paper** | 💡 planned (most personal) | A handwritten notebook. Paper texture (ruled or dotted page, slight grain, maybe margin notes and doodled underlines). **Fonts chosen:** Caveat (text and headings, 400–700) + Reenie Beanie (short margin scribbles and annotations only). The custom handwriting font is parked; see below. |

## Parked: Vatsal's own handwriting font

> v1 was built from tablet writing (`tools/handfont/`) but didn't look good enough. Caveat + Reenie Beanie are used instead. Revisit only with better input and time for kerning.

Goal: a real web font generated from Vatsal's handwriting, so the Paper view reads as if he wrote it.

1. **Capture.** Write every glyph (A–Z, a–z, 0–9, punctuation, ₹ → etc.) on a printed grid template, 2–3 variants of common letters. Scan or photograph flat at 300+ DPI. Existing notes can serve as style reference.
2. **Extract.** Script slices the grid into one image per glyph, then cleans and thresholds it.
3. **Vectorise.** Trace each glyph to outlines (potrace).
4. **Build the font.** Assemble with FontForge / fontTools: metrics, spacing, kerning for common pairs.
5. **Make it feel hand-written.** Store the variants as OpenType alternates and cycle them with contextual alternates (`calt`), so repeated letters (like the "ll" in "hello") never look copy-pasted.
6. **Ship.** Export WOFF2, subset to the characters the site uses, and load it only when Paper is active.
7. **Bonus.** A small "how I made my font" note on the site. The process itself is a showcase.

Fallback if the full pipeline is too much at first: generate a quick version with a template-based service, then replace it with the custom pipeline later.
