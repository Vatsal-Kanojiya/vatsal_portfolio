# Decision Format

Decisions live in one file, `docs/DECISIONS.md`, appended in order. There is no `docs/adr/`.

## Template

Append at the end of the file, continuing the numbering (read the last `### Dnnn.` heading and add one):

```md
### D632. Short title of the decision (2026-10-17)
**Decided:** 1-3 sentences: what we decided, and why.
**Alternative:** what we rejected, in a line.
```

That's it. A decision can be a few lines. The value is in recording *that* a decision was made and *why*, not in filling out sections. Match the tone and length of the last few entries.

## Superseded decisions

Never delete or rewrite an old entry. When a later decision replaces it, append `**Superseded by Dnnn.**` to the old entry, and have the new entry say what it replaces.

## Numbering

Scan `docs/DECISIONS.md` for the highest `### Dnnn.` and increment by one. Another session may have claimed numbers: pull first, and re-check before pushing.

## Which ones to mark **Key**

Most entries are small judgement calls and need no mark. Mark a decision **Key** (put `**Key.**` at the start of its **Decided:** line) only when all three are true:

1. **Hard to reverse**: the cost of changing your mind later is meaningful
2. **Surprising without context**: a future reader will look at the code and wonder "why on earth did they do it this way?"
3. **The result of a real trade-off**: there were genuine alternatives and you picked one for specific reasons

If a decision is easy to reverse, it needs no mark: you'll just reverse it. If it's not surprising, nobody will wonder why. If there was no real alternative, there's nothing to record beyond "we did the obvious thing."

### What qualifies

- **Architectural shape.** "The write model is event-sourced, the read model is projected into Postgres."
- **Integration patterns between parts.** "These two apps talk through signals, not direct calls."
- **Technology choices that carry lock-in.** Database, queue, auth provider, deployment target. Not every library: just the ones that would take a quarter to swap out.
- **Boundary and scope decisions.** "Customer data is owned by one app; others reference it by ID only." The explicit no-s are as valuable as the yes-s.
- **Deliberate deviations from the obvious path.** "Manual SQL instead of the ORM because X." Anything where a reasonable reader would assume the opposite. These stop the next engineer from "fixing" something that was deliberate.
- **Constraints not visible in the code.** Compliance rules, partner contracts, owner requirements.
- **Rejected alternatives when the rejection is non-obvious.** If you considered GraphQL and picked REST for subtle reasons, record it; otherwise someone will suggest GraphQL again in six months.
