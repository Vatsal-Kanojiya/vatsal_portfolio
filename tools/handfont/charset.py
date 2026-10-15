"""Which characters go on the template, and how many hand-written variants of each.

More variants = more natural text (repeated letters won't look copy-pasted),
so the most frequent characters get the most.
"""

LOWER = "abcdefghijklmnopqrstuvwxyz"
UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
DIGITS = "0123456789"
PUNCT = ".,:;!?'\"-()[]/&@#%+=*_<>₹→$|~"

CELLS: list[tuple[str, int]] = (
    [(c, v) for c in LOWER for v in range(3)]
    + [(c, v) for c in UPPER for v in range(2)]
    + [(c, v) for c in DIGITS for v in range(2)]
    + [(c, 0) for c in PUNCT]
)

# Page grid
COLS, ROWS = 8, 10
PER_PAGE = COLS * ROWS


def pages() -> list[list[tuple[str, int]]]:
    return [CELLS[i : i + PER_PAGE] for i in range(0, len(CELLS), PER_PAGE)]


def glyph_name(ch: str) -> str:
    from fontTools.agl import UV2AGL

    cp = ord(ch)
    return UV2AGL.get(cp, f"uni{cp:04X}")
