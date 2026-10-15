"""Trace the cleaned cells and assemble the font.

    .venv/bin/python build.py      # reads out/cells/*.png -> out/VatsalHand.otf + .woff2

Every cell shares the template's guide lines, so vertical placement comes for
free: the baseline in the box is the baseline in the font. Horizontal spacing is
the ink's own width plus fixed side bearings.

Variants (a, a.alt1, a.alt2) rotate automatically through the `calt` feature,
so a repeated letter never looks copy-pasted.
"""

from pathlib import Path

import cv2
import numpy as np
import potrace
from fontTools.feaLib.builder import addOpenTypeFeaturesFromString
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.t2CharStringPen import T2CharStringPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen

from charset import CELLS, glyph_name
from layout import CELL_H, LABEL_H, GUIDE_ASC, GUIDE_BASE, GUIDE_X

FAMILY = "Vatsal Hand"
PS_NAME = "VatsalHand-Regular"
OUT = Path("out")

PX_PER_MM = 300 / 25.4
INSET_MM = 0.8                      # must match scan.py's crop inset
UPM = 1000
CAP = 700                           # cap height in font units

# Writing-area geometry (mm, from the top of the cropped cell)
AREA_H = CELL_H - LABEL_H
BASE_MM = GUIDE_BASE * AREA_H - INSET_MM
UNITS_PER_MM = CAP / ((GUIDE_BASE - GUIDE_ASC) * AREA_H)
SCALE = UNITS_PER_MM / PX_PER_MM    # font units per pixel

SIDE_BEARING = 18
SPACE_WIDTH = 270
STROKE_GROW_PX = 2                  # tablet ink is thin; fatten slightly for screen

# Keep only the right-hand mark where both quote forms were written in one box
RIGHTMOST_ONLY = {"'", '"'}


def load_mask(path: Path, ch: str) -> np.ndarray:
    img = cv2.imread(str(path), cv2.IMREAD_GRAYSCALE)
    ink = (img < 128).astype(np.uint8)
    if ch in RIGHTMOST_ONLY:
        # Group marks into clusters by x; keep the rightmost cluster
        n, labels, stats, cent = cv2.connectedComponentsWithStats(ink, connectivity=8)
        if n > 2:
            xs = sorted(range(1, n), key=lambda i: cent[i][0])
            gaps = [cent[xs[k + 1]][0] - cent[xs[k]][0] for k in range(len(xs) - 1)]
            split = int(np.argmax(gaps)) + 1
            keep = set(xs[split:])
            ink = np.isin(labels, list(keep)).astype(np.uint8)
    if STROKE_GROW_PX:
        k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * STROKE_GROW_PX + 1,) * 2)
        ink = cv2.dilate(ink, k)
    return ink.astype(bool)


def trace(mask: np.ndarray, pen) -> None:
    """Draw potrace curves into a fontTools pen (pixel coordinates, y down)."""
    xy = lambda p: (p.x, p.y)
    for curve in potrace.Bitmap(~mask).trace(turdsize=8, alphamax=1.0, opticurve=True, opttolerance=0.4):
        pen.moveTo(xy(curve.start_point))
        for seg in curve.segments:
            if seg.is_corner:
                pen.lineTo(xy(seg.c))
                pen.lineTo(xy(seg.end_point))
            else:
                pen.curveTo(xy(seg.c1), xy(seg.c2), xy(seg.end_point))
        pen.closePath()


def make_glyph(path: Path, ch: str):
    mask = load_mask(path, ch)
    ys, xs = np.nonzero(mask)
    if not len(xs):
        return None, SPACE_WIDTH, 0
    left, right = xs.min(), xs.max() + 1
    base_px = BASE_MM * PX_PER_MM
    # px -> font units: shift ink to the left side bearing, flip y around the baseline
    transform = (SCALE, 0, 0, -SCALE, SIDE_BEARING - left * SCALE, base_px * SCALE)
    advance = round((right - left) * SCALE + 2 * SIDE_BEARING)
    pen, bounds = T2CharStringPen(advance, None), BoundsPen(None)
    trace(mask, TransformPen(pen, transform))
    trace(mask, TransformPen(bounds, transform))
    return pen, advance, round(bounds.bounds[0]) if bounds.bounds else SIDE_BEARING


def calt_feature(variants: dict[str, int]) -> str:
    three = sorted(g for g, n in variants.items() if n == 3)
    two = sorted(g for g, n in variants.items() if n == 2)
    every = sorted(variants)

    def cls(names, suffix=""):
        return "[" + " ".join(n + suffix for n in names) + "]"

    return f"""
@ANY0 = {cls(every)};
@ANY1 = {cls(every, '.alt1')};
@T0 = {cls(three)};  @T1 = {cls(three, '.alt1')};  @T2 = {cls(three, '.alt2')};
@D0 = {cls(two)};    @D1 = {cls(two, '.alt1')};

lookup Rotate {{
    sub @ANY1 @T0' by @T2;
    sub @ANY0 @T0' by @T1;
    sub @ANY0 @D0' by @D1;
}} Rotate;

feature calt {{ lookup Rotate; }} calt;
"""


def main() -> None:
    order = [".notdef", "space"]
    cmap = {0x20: "space"}
    charstrings, metrics = {}, {}

    empty = T2CharStringPen(SPACE_WIDTH, None)
    charstrings["space"], metrics["space"] = empty.getCharString(), (SPACE_WIDTH, 0)

    notdef = T2CharStringPen(500, None)
    for (x0, y0, x1, y1) in [(50, 0, 450, 700), (100, 50, 400, 650)]:
        pts = [(x0, y0), (x1, y0), (x1, y1), (x0, y1)]
        if y0 == 50:
            pts.reverse()
        notdef.moveTo(pts[0]); [notdef.lineTo(p) for p in pts[1:]]; notdef.closePath()
    charstrings[".notdef"], metrics[".notdef"] = notdef.getCharString(), (500, 50)

    variants: dict[str, int] = {}
    for ch, v in CELLS:
        base = glyph_name(ch)
        name = base + (f".alt{v}" if v else "")
        pen, adv, lsb = make_glyph(OUT / "cells" / f"{name}.png", ch)
        if pen is None:
            print(f"  ! skipped empty {name}")
            continue
        charstrings[name] = pen.getCharString()
        metrics[name] = (adv, lsb)
        order.append(name)
        if v == 0:
            cmap[ord(ch)] = name
        variants[base] = variants.get(base, 0) + 1

    # Only letters and digits rotate
    rotating = {g: n for g, n in variants.items() if n > 1}

    fb = FontBuilder(UPM, isTTF=False)
    fb.setupGlyphOrder(order)
    fb.setupCharacterMap(cmap)
    fb.setupCFF(PS_NAME, {"FullName": FAMILY}, charstrings, {})
    fb.setupHorizontalMetrics(metrics)
    ascent, descent = round(BASE_MM * UNITS_PER_MM) + 60, round((AREA_H - BASE_MM - 2 * INSET_MM) * UNITS_PER_MM) + 40
    fb.setupHorizontalHeader(ascent=ascent, descent=-descent)
    fb.setupNameTable({"familyName": FAMILY, "styleName": "Regular"})
    fb.setupOS2(
        version=4, sTypoAscender=ascent, sTypoDescender=-descent, sTypoLineGap=0,
        usWinAscent=ascent, usWinDescent=descent,
        sxHeight=round((GUIDE_BASE - GUIDE_X) * AREA_H * UNITS_PER_MM), sCapHeight=CAP,
        fsSelection=0x40 | 0x80,  # REGULAR, USE_TYPO_METRICS
    )
    fb.setupPost()
    addOpenTypeFeaturesFromString(fb.font, calt_feature(rotating))

    fb.save(OUT / "VatsalHand.otf")
    fb.font.flavor = "woff2"
    fb.save(OUT / "VatsalHand.woff2")
    print(f"{len(order)} glyphs · ascent {ascent} · descent {descent} -> out/VatsalHand.otf / .woff2")


if __name__ == "__main__":
    main()
