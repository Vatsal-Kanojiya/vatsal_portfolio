---
title: HR and Attendance
tagline: Attendance that fills itself in overnight.
summary: A customisation layer on Frappe and ERPNext HRMS for a services company with a mixed workforce. Staff punch in by biometric device or mobile, and the system turns raw punches into correct attendance without HR chasing it.
kind: more
year: "2026"
platforms: [Web, Mobile API]
stack: [Python, Frappe, ERPNext HRMS, MariaDB]
order: 5
status: in-progress
statusLabel: In production · client work
points:
  - "Overnight jobs turn raw biometric and mobile punches into attendance, closing missing punches and handling leave and half-days."
  - "Device punches are logged first and are safe to retry, so a repeated biometric message never double-counts."
  - "Corrections keep what they replaced, so cancelling one restores the day exactly. All of it sits in hooks and overrides, with no changes to the framework core."
highlights:
  - { value: "23", label: "documented business rules" }
  - { value: "3", label: "scheduled jobs that run overnight" }
  - { value: "0", label: "changes to the framework's core code" }
features:
  - { title: "Attendance fills itself", text: "Overnight jobs mark attendance, close missing punches and handle leave and half-days, so there are no false Absent days." }
  - { title: "A punch policy per employee", text: "Each person can follow biometric, mobile or manual punching, as their role needs." }
  - { title: "Mobile punches checked by location", text: "A mobile punch is accepted only when it is made from the right branch." }
  - { title: "Fix a day in one step", text: "An approved correction rewrites that day's records. Cancelling it restores them exactly." }
  - { title: "Approvals with an owner", text: "Each request goes to the person's named manager, with an HR admin as fallback, and every step is logged." }
  - { title: "A dashboard that explains itself", text: "Employees see why a day looks wrong and can raise a fix themselves." }
  - { title: "Biometric devices, safely", text: "Device punches are logged first and are safe to retry, so a repeated message never double-counts." }
---

## Under the hood, briefly

- **Extended, not forked.** Behaviour is added through controller overrides, document hooks and scheduled jobs, so the framework's own code stays untouched and upgrades stay possible.
- **Reversible by design.** Corrections keep what they replaced, which is how cancelling can restore a day exactly.
- **Known issues are written down.** The project keeps a documented defect register next to its requirements.

<!-- TODO(Vatsal): confirm your role, dates, team size, headcount/branches and whether it is live. Docs hold scope counts only, no outcomes. The "0 core changes" highlight comes from the docs' stance; confirm. -->
