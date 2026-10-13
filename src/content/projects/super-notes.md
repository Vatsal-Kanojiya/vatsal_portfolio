---
title: Super Notes
tagline: Ask your notes a question. Get an answer with citations.
summary: A synced notes app with RAG built in. Hybrid retrieval, multi-device sync with optimistic locking, and metered LLM features that never double-charge a retry.
stack: [Django, DRF, PostgreSQL, pgvector, Celery, Redis, Vue 3]
order: 1
status: in-progress
repo: https://github.com/Vatsal-Kanojiya/super_notes
highlights:
  - { value: "Hybrid", label: "vector + full-text retrieval, fused by RRF" }
  - { value: "409", label: "conflict on stale edits, never silent overwrite" }
  - { value: "0", label: "double charges on retried LLM calls" }
---

## The problem

Notes are easy to write and hard to use later. Super Notes lets you ask a question in plain language and answers it **from your own notes**, citing the notes it used, so you can check every answer.

It's also a multi-device app, which brings the classic sync problem: two devices editing the same note.

## Retrieval: two signals, one ranking

Pure vector search misses exact terms like names, codes and acronyms. Pure keyword search misses meaning. Super Notes uses both:

- **pgvector HNSW** similarity search for semantic matches
- **Postgres full-text search** for exact terms
- The two ranked lists are merged with **reciprocal rank fusion**

Results are **filtered to the owner in SQL**, inside the query rather than afterwards in Python, so another user's note can never leak into an answer. A management command reports **recall@5 and MRR**, so retrieval changes are measured, not guessed.

## Sync without lost edits

Each user has a revision counter, issued under a `select_for_update` row lock. Devices sync deltas since their last revision. If a device edits a stale copy, the server answers **409 Conflict** with its current version. Nothing is silently overwritten.

## Metering LLM usage safely

All LLM features go through one limits layer:

- **Per-user quotas** enforced under row locks
- **System-wide caps** under Postgres advisory locks
- **Idempotency-Key** replay, so a retried request returns the original result and is never charged twice

## How it was built

Built with Claude Code agents under a spec-first workflow. I wrote the specs and reviewed every diff.
