"""Generate the printable handwriting template (A4 PDF).

Each cell has guide lines (cap height, x-height, baseline, descender) in very
light grey so the scanner step can drop them, plus four solid corner markers
per page so a phone photo can be straightened automatically.

    .venv/bin/python make_template.py   ->  template.pdf
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

from charset import COLS, ROWS, pages

# Geometry (mm) — shared with the scanner via layout.py
from layout import (
    CELL_H, CELL_W, GRID_X, GRID_Y, LABEL_H, MARK, MARK_INSET,
    GUIDE_ASC, GUIDE_X, GUIDE_BASE, PAGE_H, PAGE_W,
)

LIGHT = (0.80, 0.80, 0.80)
LABEL = (0.55, 0.55, 0.55)

# A font that has ₹ and → for the cell labels
for path in ("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",):
    try:
        pdfmetrics.registerFont(TTFont("Label", path))
        LABEL_FONT = "Label"
        break
    except Exception:
        LABEL_FONT = "Helvetica"


def y_top(y_from_top_mm: float) -> float:
    """reportlab's origin is bottom-left; layout uses top-left."""
    return (PAGE_H - y_from_top_mm) * mm


def draw_page(c: canvas.Canvas, cells, page_no: int, total: int) -> None:
    # Corner markers
    for x, y in [(MARK_INSET, MARK_INSET), (PAGE_W - MARK_INSET - MARK, MARK_INSET),
                 (MARK_INSET, PAGE_H - MARK_INSET - MARK), (PAGE_W - MARK_INSET - MARK, PAGE_H - MARK_INSET - MARK)]:
        c.setFillColorRGB(0, 0, 0)
        c.rect(x * mm, y_top(y + MARK), MARK * mm, MARK * mm, stroke=0, fill=1)

    c.setFillColorRGB(*LABEL)
    c.setFont("Helvetica", 8)
    c.drawString(GRID_X * mm, y_top(GRID_Y - 4), f"Handwriting template · page {page_no}/{total} · black pen, write inside the box, sit letters on the baseline")

    for i, (ch, variant) in enumerate(cells):
        col, row = i % COLS, i // COLS
        x0, y0 = GRID_X + col * CELL_W, GRID_Y + row * CELL_H

        # Cell border + label strip
        c.setStrokeColorRGB(*LIGHT)
        c.setLineWidth(0.4)
        c.rect(x0 * mm, y_top(y0 + CELL_H), CELL_W * mm, CELL_H * mm, stroke=1, fill=0)
        c.line(x0 * mm, y_top(y0 + LABEL_H), (x0 + CELL_W) * mm, y_top(y0 + LABEL_H))

        c.setFillColorRGB(*LABEL)
        c.setFont(LABEL_FONT, 7)
        c.drawString((x0 + 1.5) * mm, y_top(y0 + LABEL_H - 1.4), ch + ("" if variant == 0 else f"  ·{variant + 1}"))

        # Guide lines inside the writing area
        for frac, dash, width in [(GUIDE_ASC, (1, 2), 0.3), (GUIDE_X, (2, 2), 0.3), (GUIDE_BASE, None, 0.6)]:
            yy = y0 + LABEL_H + frac * (CELL_H - LABEL_H)
            c.setDash(*dash) if dash else c.setDash()
            c.setLineWidth(width)
            c.line((x0 + 1) * mm, y_top(yy), (x0 + CELL_W - 1) * mm, y_top(yy))
        c.setDash()


def main() -> None:
    all_pages = pages()
    c = canvas.Canvas("template.pdf", pagesize=A4)
    c.setTitle("Handwriting font template")
    for n, cells in enumerate(all_pages, 1):
        draw_page(c, cells, n, len(all_pages))
        c.showPage()
    c.save()
    print(f"template.pdf: {len(all_pages)} pages, {sum(map(len, all_pages))} cells")


if __name__ == "__main__":
    main()
