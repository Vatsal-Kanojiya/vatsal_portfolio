# Issue tracker: local files, committed

Specs and tickets for this repo live as markdown files in `.scratch/`, committed on purpose
(`.scratch/README.md`). There is no GitHub issue board and no label vocabulary: status lives in the
ticket file and in the queue.

## Conventions

- One feature per directory: `.scratch/<feature-slug>/`
- The spec is `.scratch/<feature-slug>/spec.md` (written by `/to-spec`)
- Tickets are one file each at `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01` in
  dependency order, never a single combined file (written by `/to-tickets`)
- **Status** is a `Status:` line in the ticket file: `open`, `in progress` or `done`. The acceptance
  criteria are a checkbox list in the same file. No labels.
- **Blocking** is a `Blocked by:` line (ticket numbers/titles, or "None"). A ticket can start when every
  ticket it lists is `done`.
- Comments and conversation history append to the bottom of the file under a `## Comments` heading.

## When a skill says "write to the issue tracker"

Create the file under `.scratch/<feature-slug>/` (create the directory if needed).

## When a skill says "fetch the relevant ticket"

Read the file at the referenced path. The user will normally pass the path or the ticket number.

## How it feeds our process

```
/grill-me  (or /grill-with-docs: also updates GLOSSARY.md and docs/DECISIONS.md)
   -> /to-spec      .scratch/<feature>/spec.md
   -> /to-tickets   .scratch/<feature>/issues/01-....md, 02-....md   (2-4 broad vertical slices)
   -> owner approves, then build; set the ticket's Status to done
   -> /review-spec-standards before merging, then /retro
```

`docs/ROADMAP.md` holds what is next. Tickets are the refined input; keep their Status in step.
