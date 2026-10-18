# 03 Switchable views, with Paper as the first alternative

Status: open
Blocked by: None (run `/grill-with-docs` first; spec lives in ROADMAP and CLAUDE.md)

## What
Add the view mechanism (`data-view`, set before paint from `?view=`, then localStorage `view`, else `editorial`; nav switcher; per-view tokens including fonts) and ship Paper (Caveat, Reenie Beanie for margin scribbles only, paper texture, doodled underlines, flow field hidden or replaced). Editorial must stay pixel-identical for people who do not switch.

## Acceptance criteria
- [ ] Editorial unchanged by default; Paper opt-in via switcher and `?view=paper`.
- [ ] Adding a view needs mostly a new token set.
- [ ] Contrast OK in light and dark; paragraphs readable; reduced motion respected; no horizontal scroll at 390px.
- [ ] Storage reads and writes wrapped in try/catch; `npm run build` passes.

## Comments
Reference: BRD G1, C4, C5; FRD §2.2, §2.9, §13.
