---
title: Expense Tracker
tagline: Shared expenses that settle up correctly, even under concurrent requests.
summary: Shared expenses with per-participant splits, database-level integrity and a settle-up flow that is safe under concurrency. Tested down to the query count.
stack: [Django, DRF, PostgreSQL, Celery, Redis, Docker, GitHub Actions]
order: 2
status: in-progress
repo: https://github.com/Vatsal-Kanojiya/expense_management
highlights:
  - { value: "DB", label: "constraints guard every split" }
  - { value: "N+1", label: "removed, with tests that assert query counts" }
  - { value: "CI", label: "Docker Compose + GitHub Actions" }
---

## The problem

Splitting expenses looks simple until two people settle up at the same moment, or a split stops adding up to the total. This project treats those cases as first-class.

## Integrity in the database, not just the code

Shared expenses and per-participant splits are modelled with **database-level constraints**. Invalid states are rejected by Postgres itself, whichever code path writes them.

## Settle-up under concurrency

Settle-up runs inside `transaction.atomic` with `select_for_update`, so concurrent requests are serialised on the rows they touch. Follow-up work is queued to **Celery via `transaction.on_commit`**, so jobs never fire for a transaction that rolled back.

## Performance you can test

N+1 queries were removed with `select_related` / `prefetch_related`, and **tests assert the query count**. A regression fails CI instead of quietly slowing down production.

## Shipping

Docker Compose for local and production parity, with GitHub Actions running the test suite on every push.
