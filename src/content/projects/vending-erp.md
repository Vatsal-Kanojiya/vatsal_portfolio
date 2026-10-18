---
title: Vending ERP
tagline: From the machine on site to the monthly invoice.
summary: The operations core of an ERP for a pan-India B2B vending operator. Coffee and tea machines sit at client sites, and the system tracks their stock, checks what was used, and builds each month's invoice for review.
kind: showcase
year: "2026"
platforms: [Web, Mobile backend]
stack: [Python, Frappe, ERPNext, MariaDB, Redis]
order: 3
status: in-progress
highlights:
  - { value: "12", label: "modules, from contracts to dashboards" }
  - { value: "446", label: "business rules documented and checked against the code" }
  - { value: "4", label: "billing models: cup, litre, kg, flat package" }
features:
  - { title: "One contract per site", text: "Machines, prices, recipes and commitments live in one contract, which locks once it is active." }
  - { title: "Four ways to bill", text: "Per cup, per litre, per kg delivered or a flat package, with machine rental and minimum-order rules on top." }
  - { title: "Stock you can trace", text: "Stock is followed from head office, through transit, to the site, with a delivery challan at each step." }
  - { title: "Counts checked against recipes", text: "Physical counts and meter readings are compared with what the recipes say should have been used. Interchangeable ingredients are treated as one pool." }
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
- **Six cooperating apps.** Operations, CRM, mobile backend, push notifications, WhatsApp and invoice customisation sit on top of Frappe and ERPNext.

<!-- TODO(Vatsal): confirm role wording (docs say sole developer of the vending app) and whether it is in production use; docs only show go-live planned for 9-10 Oct 2026. -->
