---
title: Expense Tracker
tagline: Track spending, split bills, settle up.
summary: Personal and shared expenses in one place. Split a bill evenly or item by item, see who owes whom, and settle up. Or just photograph the bill and let AI fill in the form.
kind: showcase
year: "2026"
platforms: [Web, API]
stack: [Django, DRF, PostgreSQL, Celery, Redis, Docker, GitHub Actions]
order: 3
status: in-progress
statusLabel: AI-assisted · hand rebuild in progress
note: "Built with heavy AI assistance while I drove the design. Every decision and its rejected alternative is in docs/DECISIONS.md. I'm now rebuilding it by hand."
points:
  - "Database constraints make splits add up, and every query is scoped to its owner, so one account can never read or change another's records."
  - "Settle-up locks the rows it touches with select_for_update, so two people settling at the same moment can't double-count a balance."
  - "Celery jobs are queued with transaction.on_commit, so exports, the monthly digest and vision-LLM bill scanning never run against half-saved data."
repo: https://github.com/Vatsal-Kanojiya/expense_management
highlights:
  - { value: "22", label: "build phases, each planned and logged" }
  - { value: "70/70", label: "OWASP ASVS Level 1 requirements met (self-assessed)" }
features:
  - { title: "Spending at a glance", text: "Expenses by category, with a dashboard showing where the money goes." }
  - { title: "Split any bill", text: "Share a bill evenly, or line by line when everyone ordered something different." }
  - { title: "Balances and settle-up", text: "Always know who owes whom. Settling up stays correct even if two people do it at the same moment." }
  - { title: "Scan a bill", text: "Photograph a receipt and AI reads it into the form. Nothing is saved until you check it and press Save." }
  - { title: "Exports and monthly digest", text: "Get your expenses as a CSV by email, plus a monthly summary in your inbox." }
  - { title: "Account security", text: "Google sign-in, two-step sign-in with an authenticator app, at most two signed-in devices, and limits on login attempts." }
  - { title: "Your data, your call", text: "Each account sees only its own records, and you can delete your account and everything in it." }
  - { title: "Ready for any frontend", text: "Everything the web pages do is also available as a documented API, ready for a React or mobile app." }
---

## Under the hood, briefly

- **Correct under pressure.** The database itself enforces that splits add up and data stays consistent, and settle-up locks the rows it touches so simultaneous requests can't double-count.
- **Fast pages, proven by tests.** Database queries are batched, and tests fail if a page starts making more queries than it should.
- **Background jobs** handle exports, bill scanning and the monthly digest, and only start once the data they depend on is safely saved.
- **Production-like from day one.** Docker Compose runs the web app, workers, scheduler, Redis and Postgres together with one command, and CI runs the full test suite on every push.

Built in 22 phases, with every decision and its rejected alternative written down, and walked line by line against the OWASP ASVS Level 1 security checklist. It was my reference project for learning Django properly, end to end.
