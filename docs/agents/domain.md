# Domain docs

How the engineering skills consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

- **`GLOSSARY.md`** at the repo root.
- **`docs/DECISIONS.md`**: read the decisions that touch the area you are about to work in (grep for
  the app or feature name).

If something does not exist yet, proceed silently. `/domain-modeling` (reached via `/grill-with-docs`)
adds terms and decisions when they are actually resolved.

## Layout

Single context. Decisions are one append-only file, not a directory of ADRs.

```
/
├── GLOSSARY.md
└── docs/
    └── DECISIONS.md      ### Dnnn. Title (date) / **Decided:** / **Alternative:**
```

## Use the glossary's vocabulary

When your output names a domain concept (a ticket title, a test name, a refactor proposal), use the term
as defined in `GLOSSARY.md`; don't drift to a synonym listed under _Avoid_. A missing term is a signal:
either you are inventing language the project does not use, or there is a real gap to note for
`/domain-modeling`.

## Flag decision conflicts

If your output contradicts an entry in `docs/DECISIONS.md`, say so explicitly rather than silently
overriding it:

> _Contradicts D3 (static output), but worth reopening because..._

A decision that is replaced gets `**Superseded by Dnnn.**` appended to its entry (format in
`.claude/skills/domain-modeling/DECISION-FORMAT.md`).
