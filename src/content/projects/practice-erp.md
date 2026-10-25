---
title: Practice ERP
tagline: A tax and accounting practice, run end to end on ERPNext.
summary: The whole business of a tax and accounting practice on ERPNext. Client service files per type of statutory filing set the recurring price, generate the projects and tasks for each filing period, turn work logs into timesheets, and flow into billing, collection, follow-up and management reporting.
kind: more
year: "2025–26"
platforms: [Desk, Dashboards, Reports]
stack: [Python, Frappe, ERPNext, MariaDB]
order: 7
status: live
statusLabel: In production · client work
note: Co-built with one other developer. We each built and fixed parts of the other's work.
points:
  - "Operations: projects and tasks are generated per filing period from templates, and work logs build timesheets automatically, so billable work is captured without re-entry."
  - "Reports: a bill-gap report expands each recurring service into its billing cycles (monthly, quarterly, half-yearly, yearly) and shows which periods are billed, missing or over-billed, with the amount pending."
  - "Engineering: every bill line is tied to the exact service period it covers, and the server blocks billing a period twice (within or across bills) or leaving a gap."
highlights:
  - { value: "14", label: "script reports" }
  - { value: "32", label: "dashboard blocks" }
  - { value: "220", label: "custom fields on top of ERPNext" }
features:
  - { title: "One file per client service", text: "Each client's services are set up per type of statutory filing, with the recurring price that drives everything after it." }
  - { title: "Work that schedules itself", text: "Projects and tasks are created for every filing period from templates, with follow-up calendars and a daily follow-up email." }
  - { title: "Billing without gaps or doubles", text: "Every bill line names the period it covers, and the server refuses a period that is already billed or a gap in the sequence." }
  - { title: "Revenue leakage, made visible", text: "The bill-gap report shows, per client and service, which months are billed, missing or over-billed, and what is pending." }
  - { title: "Rate changes on a timeline", text: "Preview a rate change, then schedule it from an effective date or apply it now. Both can be reverted, and cancelling is blocked while a change is pending." }
  - { title: "Customer 360", text: "Dues, open and paid bills, the financial-year summary, active services with a red flag where billing is missing, tasks and issues on one screen." }
  - { title: "A management digest", text: "A seven-section PDF covering profitability, CRM, operations, accounts, bank reconciliation, expenses and HR, generated in the background and sent by download, email or message." }
  - { title: "Data that stays inside", text: "Every export path goes through a role check, with row-level visibility on projects, tasks and the knowledge base." }
---

## Dashboards and reports

- **Bill-gap report.** Recurring services expanded into billing cycles by frequency, so missing and duplicate billing is visible per client.
- **Customer 360.** One screen per client for dues, bills, services and open work.
- **Management digest.** A background-generated PDF across seven areas of the business.
- **Daily follow-up workbook.** An email listing who needs a call today.

## Under the hood, briefly

- **Integrity on the server.** Period overlaps and gaps are checked in the server, within a bill and across bills, so no form or import can slip past them.
- **Scheduled rate changes.** A monthly job applies rate changes from their effective date, and both paths can be reverted.
- **Heavy reports in the background.** The management digest is built in a background job and delivered when ready.
