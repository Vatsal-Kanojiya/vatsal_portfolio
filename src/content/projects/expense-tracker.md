---
title: Expense Tracker
tagline: Track spending, split bills, settle up.
summary: Personal and shared expenses in one place. Split a bill evenly or item by item, see who owes whom, and settle up. Or just photograph the bill and let AI fill in the form.
kind: showcase
year: "2026"
platforms: [Web, API]
stack: [Django, DRF, PostgreSQL, Celery, Redis, Docker, GitHub Actions]
order: 2
status: in-progress
repo: https://github.com/Vatsal-Kanojiya/expense_management
highlights:
  - { value: "980+", label: "automated tests, 95% coverage floor" }
  - { value: "16", label: "build phases, each tagged in git" }
  - { value: "1", label: "command to run the whole stack" }
features:
  - { title: "Spending at a glance", text: "Expenses by category, with a dashboard showing where the money goes." }
  - { title: "Split any bill", text: "Share a bill evenly, or line by line when everyone ordered something different." }
  - { title: "Balances and settle-up", text: "Always know who owes whom. Settling up stays correct even if two people do it at the same moment." }
  - { title: "Scan a bill", text: "Photograph a receipt and AI reads it into the form. Nothing is saved until you check it and press Save." }
  - { title: "Exports and monthly digest", text: "Get your expenses as a CSV by email, plus a monthly summary in your inbox." }
  - { title: "Account security", text: "Google sign-in, two-factor authentication with an authenticator app, and limits on login attempts." }
  - { title: "Ready for any frontend", text: "Everything the web pages do is also available as a documented API, ready for a React or mobile app." }
---

## Under the hood, briefly

- **Correct under pressure.** The database itself enforces that splits add up and data stays consistent, and settle-up locks the rows it touches so simultaneous requests can't double-count.
- **Fast pages, proven by tests.** Database queries are batched, and tests fail if a page starts making more queries than it should.
- **Background jobs** handle exports, bill scanning and the monthly digest, and only start once the data they depend on is safely saved.
- **Production-like from day one.** Docker Compose runs the web app, workers, scheduler, Redis and Postgres together, and CI runs the full test suite on every push.

Built in 16 phases, with every decision and its rejected alternative written down. It was my reference project for learning Django properly, end to end.
