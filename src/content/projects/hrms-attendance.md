---
title: HR Layer
tagline: The HR features stock HRMS lacks, installed per client.
summary: The company's own HR app on top of Frappe HRMS v15, installed for each client that runs HR on it. It adds absence regularisation, rule-based shifts, geofenced and biometric check-in, overtime and comp-off, dashboards and reports, without replacing a single core table.
kind: app
year: "2025–26"
platforms: [Desk, Mobile API, Dashboards]
stack: [Python, Frappe, ERPNext HRMS, MariaDB]
order: 8
status: live
statusLabel: In production · installed per client · lead developer
points:
  - "One settings form drives behaviour per client (check-in channel per employee, geofence per branch, auto-attendance shifts, half-day shifts, go-live date), so a new client is configuration, not code."
  - "An absence regularisation engine scores every employee-day in a range and lists only the days that need action, with a plain reason and a one-click fix. Month-end HR chasing became a self-service worklist."
  - "Rule-based bulk shift assignment with an overlap pre-check and a savepoint per assignment, so one bad row doesn't sink the batch."
highlights:
  - { value: "48", label: "API endpoints for the mobile app, desk and dashboards" }
  - { value: "11", label: "live action cards on the HR and employee workspaces" }
  - { value: "6", label: "attendance and payroll reports" }
features:
  - { title: "Days that need action, nothing else", text: "For any date range, each employee-day is checked against approved leave, on-duty requests and hours worked. Only the days that need a fix are listed, with the reason in plain words and one click to apply leave or on-duty." }
  - { title: "Shift rules HRMS can't express", text: "Assign shifts in bulk with rules like \"2nd and 4th Saturday\". Overlaps are caught before anything is saved, and rolling back is refused once attendance depends on it." }
  - { title: "Check-in the right way per person", text: "Each employee punches by biometric device or by mobile, and a mobile punch counts only from inside their branch's geofence." }
  - { title: "Attendance that fills itself in", text: "Nightly jobs close missed punches and mark no-punch shifts present, so there are no false absent days." }
  - { title: "Dashboards for today", text: "Who is in, first in and last out, breaks and lateness, pending leaves with approve shortcuts, on-duty requests, holidays and celebrations." }
  - { title: "Reports payroll can trust", text: "Attendance against shift, a monthly matrix and calendar, a salary estimate that lists its blockers, the salary register, and an overtime and comp-off register." }
---

## Under the hood, briefly

- **Extended, not forked.** Everything hooks in through overrides, document events, settings and nightly jobs. Custom fields are created on migrate, so installing it on a new site is one step and core upgrades stay possible.
- **Fast over a whole month.** The absence engine prefetches everything it needs in bulk: seven queries for the whole date range, not one per employee-day.
- **Safe batches.** Bulk shift assignment runs each row in its own savepoint and checks overlaps first.

I'm the lead developer, with the majority of the app's commits from November 2025 to September 2026.
