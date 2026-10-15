"""Page geometry in millimetres, measured from the top-left of an A4 page.
Shared by make_template.py (drawing) and scan.py (cutting cells out)."""

PAGE_W, PAGE_H = 210.0, 297.0

MARK = 8.0          # corner marker size
MARK_INSET = 8.0    # distance from page edge

GRID_X, GRID_Y = 17.0, 30.0
CELL_W, CELL_H = 22.0, 25.0
LABEL_H = 4.0       # strip at the top of each cell holding the printed label

# Guide lines as a fraction of the writing area's height (below the label strip)
GUIDE_ASC = 0.12    # cap / ascender height
GUIDE_X = 0.40      # x-height
GUIDE_BASE = 0.72   # baseline — descenders go below it
