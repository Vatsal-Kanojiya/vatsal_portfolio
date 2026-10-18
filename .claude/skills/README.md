# Agent skills (vatsal_portfolio, 2026-10-19)

Project skills for Claude Code, adapted from **mattpocock/skills**
(https://github.com/mattpocock/skills, commit `49dd158`), MIT licence, "Copyright (c) 2026 Matt Pocock".
Each installed `SKILL.md` starts with a line saying so.

## Installed

| Skill | Use |
|---|---|
| `/grill-me` | Relentless interview to sharpen an idea or plan (calls `grilling`). |
| `/grilling` | The interview method itself (design tree, rounds, recommended answers). |
| `/grill-with-docs` | Grill, and also update `GLOSSARY.md` and `docs/DECISIONS.md` as terms and decisions settle (`grilling` + `domain-modeling`). |
| `/domain-modeling` | Build the glossary and record decisions (`GLOSSARY-FORMAT.md`, `DECISION-FORMAT.md`). |
| `/to-spec` | Turn the conversation into `.scratch/<feature>/spec.md`. |
| `/to-tickets` | Break a spec into 2-4 broad vertical-slice tickets under `.scratch/<feature>/issues/`. |
| `/prototype` | Throwaway prototype for a logic or UI question, before building. |
| `/retro` | Retrospective after an item: turn lessons into checks and doc edits. |
| `/review-spec-standards` | Two-axis review (standards and spec) of a diff, by read-only sub-agents. |

Flow and files: `docs/agents/issue-tracker.md`, `docs/agents/domain.md`, `GLOSSARY.md`, `.scratch/README.md`.

## What we changed, and why

- **Tracker = local committed files** in `.scratch/` (no GitHub issues, no labels), because state lives in the repo.
- **Decisions go to `docs/DECISIONS.md`**, not `docs/adr/`: `ADR-FORMAT.md` became `DECISION-FORMAT.md` in our
  `### Dnnn.` format. The "hard to reverse, surprising, real trade-off" filter picks which entries are marked **Key**.
- **`to-tickets` sizing**: broad vertical slices, 2-4 per feature, as big as one agent session and one review
  sitting allow (upstream sizes to a small context window). Blocking edges, the quiz step and expand-contract kept.
- **`code-review` renamed `review-spec-standards`** so it does not clash with the built-in `/code-review`. Standards
  sources are `CLAUDE.md`, `GLOSSARY.md` and `docs/DECISIONS.md`; spec sources are the
  brief and `.scratch/`. It does not replace the project's own checks. Its sub-agents review only.
- **`retro`** points at our files (`CLAUDE.md`, `docs/ROADMAP.md`) and drops the
  `writing-for-agents` dependency.
- References to skills we do not install (`/setup-matt-pocock-skills`, triage labels such as `ready-for-agent`) were
  rewritten or removed. Each skill's `agents/openai.yaml` (Codex-only) was dropped.

## Deliberately not installed

- `implement`, `implement-spec`: they have agents build, commit and merge themselves. `CLAUDE.md` says sub-agents
  never commit, push or merge, and the conductor reviews every result and pushes after each sub-task.
- `triage` and its labels, `setup-matt-pocock-skills`: we have no label-based tracker.
- `git-guardrails`, `setup-pre-commit`: we already have pre-commit and our own git rules in `CLAUDE.md`.
- Everything else upstream (misc, in-progress, deprecated): not needed. Installing any of them adds no
  dependency, but a new skill is a change to how we work, so ask the owner first.
