# vatsal_portfolio

Personal portfolio of Vatsal Kanojiya. Built with **Astro + React + Tailwind CSS**, plus Motion for the scroll timeline.

```bash
nvm use          # Node 24 (see .nvmrc)
npm install
npm run dev      # http://localhost:4321
npm run build    # static site → dist/
```

## Updating content (no component changes needed)

Everything on the site is driven by files. Edit, add or hide entries:

| What | Where |
|---|---|
| Name, headline, intro, stats, skills, "How I work", links | `src/data/profile.json` |
| Journey timeline | `src/content/journey/*.md` (one file per milestone, ordered by `order`) |
| Work experience + highlight cards | `src/content/experience/*.md` |
| Projects + their case-study pages | `src/content/projects/*.md` (filename = URL: `/projects/<name>/`) |
| Résumé PDF | `public/Vatsal_Kanojiya_Resume.pdf` |

- **Hide anything** without deleting it: add `hidden: true` to its frontmatter.
- **Years of experience** is calculated automatically from `careerStart` in `profile.json`.

## Adding photos

Put images in `src/assets/photos/`. They are optimised automatically at build time.

- **Hero portrait:** name the file `portrait.jpg` (or `.png` / `.webp`). It appears automatically.
- **Journey photo:** in the milestone's `.md` file, add
  ```yaml
  image: ../../assets/photos/godrej.jpg
  imageAlt: Team photo at Godrej Interio, Raipur
  ```
- **Project cover and screenshots:** in the project's `.md` file, add
  ```yaml
  cover: ../../assets/photos/super-notes-cover.png
  gallery:
    - { src: ../../assets/photos/super-notes-chat.png, caption: Asking a question with citations }
  ```
- **Live demo button:** add `live: https://notes.yourdomain.com` and set `status: live`.

Until real images exist, projects show a generated line-art cover.
