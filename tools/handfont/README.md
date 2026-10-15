# Handwriting font pipeline

> **Parked.** v1 did not look good enough. The Paper view uses Caveat + Reenie Beanie instead (see `docs/ROADMAP.md`). Kept for a possible v2.

Turns a filled-in template into **Vatsal Hand**, a web font of Vatsal's own handwriting.

```bash
cd tools/handfont
uv venv .venv && uv pip install --python .venv/bin/python reportlab opencv-python-headless numpy "fonttools[woff]" potracer

.venv/bin/python make_template.py                    # 1. template.pdf, 3 A4 pages, 179 boxes
# 2. fill it in (tablet + stylus, or print and write) and save it as scans/filled.pdf
pdftoppm -r 300 -png scans/filled.pdf scans/page     # 3. render pages
.venv/bin/python scan.py scans/page-*.png            # 4. cut and clean cells -> out/cells, out/contact.png
.venv/bin/python build.py                            # 5. trace and build -> out/VatsalHand.otf / .woff2
```

- `scans/` and `out/` are git-ignored, so raw handwriting and the built font never leave the machine.
- Lowercase letters have 3 variants and capitals/digits have 2. The `calt` feature rotates them so repeated letters differ.
- Open `out/specimen.html` in a browser to preview.
- Tuning knobs are in `build.py`: `SIDE_BEARING` (letter spacing), `SPACE_WIDTH`, `STROKE_GROW_PX` (ink weight).

**Ideas for v2:** pair kerning (e.g. after K), a few common ligatures (th, ll), a second weight.
