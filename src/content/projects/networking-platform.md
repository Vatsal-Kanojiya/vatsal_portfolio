---
title: Networking Platform
tagline: A paid community that rewards showing up.
summary: A membership platform for a business-networking community. Guests join, become members, attend coffee meets, events and Zoom sessions, and earn points and badges for taking part. One backend serves a mobile app, a web portal and an admin desk.
kind: showcase
year: "2026"
platforms: [Android and iOS app, Web portal, Admin desk]
stack: [Python, Frappe, MariaDB, Flutter, Vue, Zoom, Firebase]
order: 4
status: in-progress
highlights:
  - { value: "~300", label: "API endpoints behind three front ends" }
  - { value: "10", label: "modules, from sign-in to notifications" }
  - { value: "2", label: "versions in use, a third in development" }
features:
  - { title: "A member's whole journey", text: "Guest, member, dormant, ex-member. Payments and nightly attendance checks move people along, and renewal reminders go out by email, SMS and push." }
  - { title: "Online payments and invoices", text: "Gateway payments are reconciled, and invoices are generated once, with the right tax split. Admins can also record manual payments." }
  - { title: "Points and badges", text: "Taking part earns points. Nightly jobs turn rolling averages into ranked badges and decide who may host." }
  - { title: "Coffee meets", text: "Location-aware meets with check-in only when you are actually there, and ratings for hosts." }
  - { title: "Events and Zoom", text: "Paid events with GPS attendance and ID cards, and Zoom attendance that turns into points." }
  - { title: "Notifications that respect you", text: "Push, SMS, email and in-app alerts, with a per-member opt-out. Push history doubles as an inbox." }
  - { title: "Files, handled properly", text: "Uploads go to cloud storage, private files get short-lived links, and ID cards and flyers are rendered on demand." }
  - { title: "One backend, three front ends", text: "A Flutter app, a Vue web portal and an admin desk all call the same API, next to a public website." }
---

## Under the hood, briefly

- **Business rules live in one place.** A single app owns every rule. The apps for messaging, Zoom and storage only send, store or fetch.
- **Ledgers you can audit.** Points are an append-only ledger, so scores and badges can always be explained.
- **Safe to retry.** Invoice generation is idempotent, so a repeated payment callback never creates a second invoice.
- **A handbook of the system.** A full reverse-engineered guide covers rules, flows, endpoints and settings, with a traceability matrix generated from the code.

<!-- TODO(Vatsal): confirm your role per version (not stated in the docs) and whether "in use" wording and the ~300 endpoint figure are OK to publish. -->
