---
title: Institute ERP
tagline: From first enquiry to teacher payout.
summary: An ERP for a coaching institute on Frappe and ERPNext. Enquiries, enrolment, instalment fees, class scheduling, attendance and visiting-faculty pay all live in one system, on top of ERPNext's accounting engine.
kind: showcase
year: "2025"
platforms: [Web]
stack: [Python, Frappe, ERPNext, MariaDB, Redis]
order: 6
status: in-progress
highlights:
  - { value: "32", label: "document types in a custom academic layer" }
  - { value: "10", label: "reports" }
  - { value: "1-click", label: "fee collection posts the full accounting trail" }
features:
  - { title: "No lead goes cold", text: "Every enquiry creates a follow-up. One follow-up engine serves admissions, payment chasing and referrals, with a board for what is overdue, due today or due this week." }
  - { title: "Fees in instalments", text: "Plans split into one, two or three instalments with payment links and reminders. The form refuses to save if the instalments do not add up." }
  - { title: "Accounting without the paperwork", text: "Collecting a fee posts the order, receipt, invoice and GST in one step, so front-desk staff never touch accounting documents." }
  - { title: "Referral discounts you can audit", text: "Each discount is recorded against the person who referred." }
  - { title: "Visiting faculty paid from rate cards", text: "Timesheets are approved against each teacher's agreed activities and rates, then invoiced and paid in parts. Teachers see only their own hours and pay." }
  - { title: "Fair attendance", text: "Attendance counts from a student's joining date, so mid-batch joiners are not penalised." }
  - { title: "Schedules without clashes", text: "Scheduling rejects overlapping classes for a batch." }
  - { title: "Staff task dashboard", text: "KPIs, a leaderboard, Excel export and a monthly emailed summary." }
---

## Under the hood, briefly

- **An academic layer on an accounting engine.** Students automatically become customers and teachers become suppliers, so ERPNext's accounting does the heavy lifting.
- **Evidence-based documentation.** The codebase was reverse-engineered into a spec in which every statement is labelled with its evidence, plus a defect register and a hardening plan for reuse across institutes.

<!-- TODO(Vatsal): confirm your role and year. The docs' SOW is an unsigned draft and the pitch is a sales document; only the as-is docs describe real code. Usage looked low in April 2025 (scheduling, attendance, payouts barely used), so no usage claims are made. Confirm 32 document types / 10 reports are OK to publish. -->
