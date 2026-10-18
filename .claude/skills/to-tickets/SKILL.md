---
name: to-tickets
description: Break a plan, spec, or the current conversation into a few broad vertical-slice tickets, each declaring its blocking edges, written as one file per ticket under .scratch/<feature>/issues/.
disable-model-invocation: true
---

Adapted from mattpocock/skills (MIT) for the portfolio — see .claude/skills/README.md.

# To Tickets

Break a plan, spec, or conversation into a set of **tickets**: tracer-bullet vertical slices, each declaring the tickets that **block** it.

Tickets live in the local tracker described in `docs/agents/issue-tracker.md`. Read that file first. The approved tickets become the Sub-tasks of an item's brief (`CLAUDE.md` section A, step 2).

## Process

### 1. Gather context

Work from whatever is already in the conversation context. If the user passes a reference (a spec path, an issue number or URL) as an argument, fetch it and read its full body and comments.

### 2. Explore the codebase (optional)

If you have not already explored the codebase, do so to understand the current state of the code. Ticket titles and descriptions should use the vocabulary in `GLOSSARY.md`, and respect the decisions in `docs/DECISIONS.md` for the area you're touching.

Look for opportunities to prefactor the code to make the implementation easier. "Make the change easy, then make the easy change."

### 3. Draft vertical slices

Break the work into a few **broad vertical-slice** tickets.

<vertical-slice-rules>

- Each slice is one **demoable capability, end to end**: data, API, client and tests together. Vertical, NOT a horizontal slice of one layer
- A completed slice is demoable or verifiable on its own
- **Size: broad.** A ticket is as large as one agent can finish in one session and the conductor can review in one sitting. A feature is typically **2-4 tickets**, rarely more. Do not split below that: no one-layer or one-file tickets, no ticket per endpoint, no separate "tests" or "docs" ticket
- Any prefactoring that a later slice needs goes in the first ticket that needs it, or in its own ticket only if it is large

</vertical-slice-rules>

Give each ticket its **blocking edges**: the other tickets that must complete before it can start. A ticket with no blockers can start immediately.

**Wide refactors are the exception to vertical slicing.** A **wide refactor** is one mechanical change (rename a column, retype a shared symbol) whose **blast radius** fans across the whole codebase, so a single edit breaks thousands of call sites at once and no vertical slice can land green. Don't force it into a tracer bullet; sequence it as **expand–contract**. First expand: add the new form beside the old so nothing breaks. Then migrate the call sites over in batches sized by blast radius (per package, per directory), each batch its own ticket blocked by the expand, keeping CI green batch to batch because the old form still exists. Finally contract: delete the old form once no caller remains, in a ticket blocked by every migrate batch. When even the batches can't stay green alone, keep the sequence but let them share an integration branch that all block a final integrate-and-verify ticket; green is promised only there.

### 4. Quiz the user

Present the proposed breakdown as a numbered list. For each ticket, show:

- **Title**: short descriptive name
- **Blocked by**: which other tickets (if any) must complete first
- **What it delivers**: the end-to-end behaviour this ticket makes work

Ask the user:

- Does the granularity feel right? (too coarse / too fine; remember the target is 2-4 broad tickets)
- Are the blocking edges correct: does each ticket only depend on tickets that genuinely gate it?
- Should any tickets be merged or split further?

Iterate until the user approves the breakdown.

### 5. Write the tickets

Write the approved tickets as one file per ticket under `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01` in dependency order (blockers first). Each file's "Blocked by" lists the numbers/titles it depends on. Use the template below: one ticket per file, never a single combined file.

Work the **frontier**: any ticket whose blockers are all done. For a purely linear chain that means top to bottom.

Do NOT queue the work yourself: the conductor turns the approved tickets into a queue item and a brief (see `docs/agents/issue-tracker.md`).

<local-ticket-template>

# <NN>: <Ticket title>

**What to build:** the end-to-end behaviour this ticket makes work, from the user's perspective, not a layer-by-layer implementation list.

**Blocked by:** the numbers/titles of the tickets that gate this one, or "None (can start immediately)".

**Status:** open  (open | in progress | done)

- [ ] Acceptance criterion 1
- [ ] Acceptance criterion 2

</local-ticket-template>

Avoid specific file paths or code snippets: they go stale fast. Exception: if a prototype produced a snippet that encodes a decision more precisely than prose can (state machine, reducer, schema, type shape), inline it and note briefly that it came from a prototype. Trim to the decision-rich parts, not a working demo, just the important bits.
