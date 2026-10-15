"""Cut every filled cell out of the scanned pages and clean the ink.

    pdftoppm -r 300 -png scans/filled.pdf scans/page     # tablet PDF -> PNGs
    .venv/bin/python scan.py scans/page-*.png           # -> out/cells/*.png + out/contact.png

Pages are straightened using the four black corner markers, so phone photos of
paper work too. Grey guide lines and labels are dropped by thresholding, and
tiny stray specks are removed (except where small marks are the glyph: i, j,
punctuation).
"""

import sys
from pathlib import Path

import cv2
import numpy as np

from charset import COLS, glyph_name, pages
from layout import CELL_H, CELL_W, GRID_X, GRID_Y, LABEL_H, MARK, MARK_INSET, PAGE_H, PAGE_W

PX_PER_MM = 300 / 25.4
INK_THRESHOLD = 110          # 0..255; guide lines (~204) and labels (~140) fall above it
SPECK_FRACTION = 0.004       # components smaller than this share of the cell are specks
KEEP_SMALL_MARKS = set(".,:;!?'\"%ij")

OUT = Path("out")


def to_mm_space(img: np.ndarray) -> np.ndarray:
    """Warp the page so marker centres land exactly where the template drew them."""
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    W, H = int(PAGE_W * PX_PER_MM), int(PAGE_H * PX_PER_MM)
    _, bw = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
    contours, _ = cv2.findContours(bw, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Marker candidates: solid, roughly square blobs of the expected relative size
    page_area = gray.shape[0] * gray.shape[1]
    expected = (MARK / PAGE_W) * (MARK / PAGE_H) * page_area
    squares = []
    for c in contours:
        x, y, w, h = cv2.boundingRect(c)
        area = cv2.contourArea(c)
        if 0.4 * expected < area < 2.5 * expected and 0.7 < w / h < 1.4 and area / (w * h) > 0.85:
            squares.append((x + w / 2, y + h / 2))
    if len(squares) < 4:
        print("  ! corner markers not found — assuming the page is already straight")
        return cv2.resize(gray, (W, H), interpolation=cv2.INTER_AREA)

    pts = np.array(squares, dtype=np.float32)
    s, d = pts.sum(1), np.diff(pts, axis=1).ravel()
    src = np.array([pts[s.argmin()], pts[d.argmin()], pts[s.argmax()], pts[d.argmax()]], dtype=np.float32)
    c0, c1 = MARK_INSET + MARK / 2, None
    dst_mm = [(c0, c0), (PAGE_W - c0, c0), (PAGE_W - c0, PAGE_H - c0), (c0, PAGE_H - c0)]
    dst = np.array(dst_mm, dtype=np.float32) * PX_PER_MM
    M = cv2.getPerspectiveTransform(src, dst)
    return cv2.warpPerspective(gray, M, (W, H), flags=cv2.INTER_CUBIC, borderValue=255)


def clean(cell: np.ndarray, ch: str) -> np.ndarray:
    """Return a binary ink mask (uint8 0/255) with specks removed."""
    ink = (cell < INK_THRESHOLD).astype(np.uint8) * 255
    n, labels, stats, _ = cv2.connectedComponentsWithStats(ink, connectivity=8)
    if n <= 1:
        return ink
    min_area = SPECK_FRACTION * cell.size
    keep = np.zeros(n, dtype=bool)
    biggest = stats[1:, cv2.CC_STAT_AREA].max()
    for i in range(1, n):
        area = stats[i, cv2.CC_STAT_AREA]
        if area >= min_area or (ch in KEEP_SMALL_MARKS and area >= 0.15 * min_area and area >= 0.02 * biggest):
            keep[i] = True
    return np.where(keep[labels], 255, 0).astype(np.uint8)


def main(paths: list[str]) -> None:
    layout = pages()
    if len(paths) != len(layout):
        sys.exit(f"expected {len(layout)} page images, got {len(paths)}")
    (OUT / "cells").mkdir(parents=True, exist_ok=True)

    inset = 0.8  # mm, stay clear of the cell border
    crops = []
    for path, cells in zip(sorted(paths), layout):
        print(path)
        page = to_mm_space(cv2.imread(path))
        for i, (ch, variant) in enumerate(cells):
            col, row = i % COLS, i // COLS
            x0 = GRID_X + col * CELL_W + inset
            y0 = GRID_Y + row * CELL_H + LABEL_H + inset
            x1 = GRID_X + (col + 1) * CELL_W - inset
            y1 = GRID_Y + (row + 1) * CELL_H - inset
            cell = page[int(y0 * PX_PER_MM):int(y1 * PX_PER_MM), int(x0 * PX_PER_MM):int(x1 * PX_PER_MM)]
            ink = clean(cell, ch)
            name = glyph_name(ch) + (f".alt{variant}" if variant else "")
            cv2.imwrite(str(OUT / "cells" / f"{name}.png"), 255 - ink)
            crops.append((name, 255 - ink))
            if not ink.any():
                print(f"  ! empty cell: {ch!r} variant {variant + 1}")

    # Contact sheet for a quick visual check
    h, w = crops[0][1].shape
    cols = 16
    sheet = np.full(((len(crops) + cols - 1) // cols * (h + 4), cols * (w + 4)), 200, np.uint8)
    for k, (_, img) in enumerate(crops):
        r, c = divmod(k, cols)
        sheet[r * (h + 4):r * (h + 4) + h, c * (w + 4):c * (w + 4) + w] = img[:h, :w]
    cv2.imwrite(str(OUT / "contact.png"), sheet)
    print(f"{len(crops)} cells -> out/cells, sheet -> out/contact.png")


if __name__ == "__main__":
    main(sys.argv[1:])
