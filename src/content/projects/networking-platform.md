---
title: Networking Platform
tagline: Re-platformed an undocumented Laravel networking app onto Frappe, then added what it never had.
summary: A membership platform for a professional membership community. Guests join, become members, attend small-group meetups, large paid gatherings and online sessions, and earn participation points and tiers for taking part. One backend serves a mobile app, a web portal and an admin desk.
kind: showcase
year: "2026"
platforms: [Android and iOS app, Web portal, Admin desk]
stack: [Python, Frappe, MariaDB, Flutter, Vue, Video API, Firebase]
order: 2
status: in-progress
statusLabel: In production · client work
points:
  - "Reverse-engineered the legacy system with no source access, by driving the app and watching the database, then designed the replacement schema."
  - "Attendance verified three ways (venue geofence, host confirmation, video-call time-in-meeting ≥ 85%), with points created, moved and reversed by hooks as activities change."
  - "Platform-tagged sessions with a per-platform cap and least-recently-used eviction. Record-creating actions are guarded by a dialog lock plus SELECT … FOR UPDATE, so a double click on approval can't create a second invoice or membership."
highlights:
  - { value: "~300", label: "API endpoints behind three front ends" }
  - { value: "10", label: "modules, from sign-in to notifications" }
  - { value: "2", label: "versions in use, a third in development" }
features:
  - { title: "A member's whole journey", text: "Guest, member, dormant, ex-member. Payments and nightly attendance checks move people along, and renewal reminders go out by email, SMS and push." }
  - { title: "Online payments and invoices", text: "Gateway payments are reconciled, and invoices are generated once, with the right tax split. Admins can also record manual payments." }
  - { title: "Participation points and tiers", text: "Taking part earns points. Nightly jobs turn rolling averages into ranked badges and decide who may host." }
  - { title: "Small-group meetups", text: "Location-aware meetups with check-in only when you are actually there, and ratings for hosts." }
  - { title: "Gatherings and online sessions", text: "Large paid gatherings with GPS attendance and ID cards, and video-call attendance that turns into points." }
  - { title: "Notifications that respect you", text: "Push, SMS, email and in-app alerts, with a per-member opt-out. Push history doubles as an inbox." }
  - { title: "Files, handled properly", text: "Uploads go to cloud storage, private files get short-lived links, and ID cards and flyers are rendered on demand." }
  - { title: "One backend, three front ends", text: "A Flutter app, a Vue web portal and an admin desk all call the same API, next to a public website." }
---

## Under the hood, briefly

- **Business rules live in one place.** A single app owns every rule. The apps for messaging, video calls and storage only send, store or fetch.
- **A points ledger that stays honest.** Points are credit and debit entries: redemptions against membership fees are recorded as debits, admins can exclude an entry without deleting it, and scores are kept in sync with the activities behind them through hooks.
- **Safe to retry.** Invoice generation is idempotent, so a repeated payment callback never creates a second invoice.
- **A handbook of the system.** A full reverse-engineered guide covers rules, flows, endpoints and settings, with a traceability matrix generated from the code.

## Problems worth telling

- **Double payments from late callbacks.** The payment gateway's callback sometimes arrived about 15 minutes late, so a paid order still looked unpaid and people paid again. Now a new attempt first fetches the live status of any existing order for the same purchase: never attempted, it's cancelled and replaced; in flight, the user waits 30 minutes; captured, the record is synced. Five layers (callback, return to portal, next attempt, a 30-minute check and a nightly sync of unclear orders only) make every order's status converge, and each one fetches the live status from the gateway.
- **A full disk from cloud storage.** Files were offloaded to S3, but the local copies were never deleted and the server's disk filled up, with some files not linked to any record at all. I turned on S3 versioning first as a safety net, then built a maintenance job that removed local copies already in S3 and cleaned up the orphans, with no production data lost.
- **Images from templates.** Event backgrounds, flyers and testimonial cards started on Pillow and moved to HTML/CSS templates rendered in headless Chromium with Playwright, trading some generation time for print-quality output.

## My role

I designed the schema, the architecture and the features, and built about 75% of the backend with one other developer. I also handle small fixes on its Vue web app.
