---
title: Vending ERP
tagline: Billing and operations ERP for a pan-India B2B vending operator.
summary: The operations core of an ERP for a pan-India B2B vending operator. Beverage machines sit at client sites, and the system tracks their stock, checks what was used, and builds each month's invoice for review.
kind: showcase
year: "2026"
platforms: [Web, Mobile backend]
stack: [Python, Frappe, ERPNext, MariaDB, Redis]
order: 1
status: in-progress
statusLabel: In production · client work · sole developer
points:
  - "Contracts become immutable once active. A change creates a new version cloned from the last, so every invoice traces back to the exact rules it was billed under."
  - "Invoices claim meter readings by link and release them on cancel, so cancelling and regenerating an invoice can never bill a reading twice."
  - "Two kinds of meter (unit counters, and volume × yield) feed one consumption-formula model per item group, reconciled against actual stock movement to bill or waive each deviation."
highlights:
  - { value: "12", label: "modules, from contracts to dashboards" }
  - { value: "446", label: "business rules documented and checked against the code" }
  - { value: "4", label: "billing models: per unit served, per volume, per weight, flat package" }
features:
  - { title: "One contract per site", text: "Machines, prices, consumption formulas and commitments live in one contract, which locks once it is active." }
  - { title: "Four ways to bill", text: "Per unit served, per volume, per weight delivered or a flat package, with machine rental and minimum-order rules on top." }
  - { title: "Stock you can trace", text: "Stock is followed from head office, through transit, to the site, with a delivery challan at each step." }
  - { title: "Counts checked against formulas", text: "Physical counts and meter readings are compared with what the consumption formulas say should have been used. Interchangeable ingredients are treated as one pool." }
  - { title: "Invoices built for you", text: "Each month's draft invoice comes from approved readings or deliveries. An accountant reviews it line by line before it is submitted." }
  - { title: "Machines through their life", text: "Dispatch, delivery, install, maintenance and return are tracked per machine, with undo and safety checks." }
  - { title: "Separate who counts, approves and invoices", text: "Roles keep those jobs apart, and profitability is visible to management only." }
  - { title: "Dashboards that say what to do", text: "Operations sees stock cover per site and machines in transit. Accounts sees what is ready to bill this month." }
  - { title: "Safe bulk imports", text: "Import tools preview first. They run the real checks, roll back, and isolate errors per row." }
---

## Under the hood, briefly

- **The server decides.** Rules are enforced on the server, not only in the form. Ambiguous data is refused rather than guessed, and stock changes only through one audited path.
- **Every invoice is a draft first.** The system proposes, including charges for excess consumption, and a person accepts or skips each line.
- **Built for changing requirements.** About 390 dated changes in roughly six months, so each rule is traced to the change that introduced it, and a rule catalogue is verified against the code.
- **Six cooperating apps.** Operations, CRM, mobile backend, push notifications, messaging and invoice customisation sit on top of Frappe and ERPNext.

## More of the design

- **Machines through a ~12-state lifecycle**, from dispatched to installed, flagged for maintenance, ready for pickup and returned. Spare parts are stock consumed through maintenance readings on the machine.
- **Stock-out projection.** Daily burn from the contracted quantity, the last count and the last dispatch tells operations "by now this should be over", before the site runs dry.
- **A CRM that can't lose a lead.** Hooks enforce that an activity is never just closed: a contact is closed with a reason or converted to a lead, and a lead is converted or lost. A "call back in a year" follow-up resurfaces on its own date.
- **Field sales on mobile.** A Flutter app, built by the team's mobile developer, lets the sales team create contacts, leads and activities from the field.

