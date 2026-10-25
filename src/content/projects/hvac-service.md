---
title: HVAC Service Operations
tagline: From installed unit to service visit to spares, for an HVAC sales-and-service company.
summary: Service operations for a company that sells and maintains HVAC units. Each customer's installed equipment is registered, maintenance contracts are sold per unit, the contract generates its own visit schedule, and technicians file a digital service report and issue spares from their own van stock.
kind: more
year: "2025"
platforms: [Desk, Dashboards, Reports]
stack: [Python, Frappe, ERPNext, MariaDB]
order: 8
status: in-progress
statusLabel: Pilot · in refinement
points:
  - "Operations: annual maintenance contracts are sold per unit and generate their own visit schedule; spares are billed or free by contract type and issued from each technician's own van warehouse."
  - "Dashboards: a technician board of open visits with equipment, address and warranty source, and a manager Customer 360 with contracts, warrantied units and history."
  - "Engineering: an overlap guard stops two contracts covering the same unit, visits are created only once per scheduled date, and each visit knows its type (installation, contract or warranty) automatically."
features:
  - { title: "An equipment registry per customer", text: "Every installed unit is recorded by serial number, so contracts, visits and warranty claims all hang off the unit." }
  - { title: "Contracts that schedule themselves", text: "A maintenance contract, with or without spares, generates its visit schedule when it is created." }
  - { title: "Controlled visits", text: "One visit per scheduled date, and the visit type (installation, contract or warranty) is worked out automatically." }
  - { title: "A digital service report", text: "Technicians fill in a printable report with the readings the job needs, including electrical phase readings." }
  - { title: "Spares from the van", text: "Each technician gets their own warehouse automatically, and spares are issued from it, billed or free depending on the contract." }
  - { title: "Traceable from any form", text: "Order, schedule, visit, claim, customer and item link to each other, so any record leads to the rest." }
---

## Dashboards and reports

- **Technician dashboard.** My open visits, with equipment, address and whether the job comes from an installation or a warranty. Managers can switch between technicians.
- **Customer 360.** Equipment and contracts with Active or Expired badges, warrantied units and the service history.
- **Five reports.** Contract status (active, expiring in 90 days, expired, visits done and pending), a visit and schedule SLA report including pending installations, installation and warranty by serial number, and a visit report with spares value.

<!-- TODO(Vatsal): status is "Pilot · in refinement" per your decision; update when it goes to production. Confirm your role on it. -->
