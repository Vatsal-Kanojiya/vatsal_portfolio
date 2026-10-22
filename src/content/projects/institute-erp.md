---
title: Institute ERP
tagline: From first enquiry to teacher payout.
summary: An ERP for a coaching institute on Frappe and ERPNext. Enquiries, enrolment, instalment fees, class scheduling, attendance and visiting-faculty pay all live in one system, on top of ERPNext's accounting engine.
kind: more
year: "2025"
platforms: [Web]
stack: [Python, Frappe, ERPNext, MariaDB, Redis]
order: 6
status: in-progress
statusLabel: In production · client work
points:
  - "A single send of 50–70k WhatsApp result links overloaded the server, because every click rendered a heavy PDF on request. A server upgrade didn't help, which ruled out capacity, and I traced it to the synchronous rendering."
  - "Fixed overnight: one background job per student renders the PDF in memory, uploads it to S3 and stores a pre-signed link, so the result link only redirects and the server does a lookup instead of a render."
  - "Fees, enquiries, scheduling and faculty pay sit on ERPNext's accounting: collecting a fee posts the order, receipt, invoice and GST in one step."
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

## The results incident

The institute sends each student a monthly report of the tests they took. The send went out in a single batch: 50–70k WhatsApp messages at once, each with a link to the student's result PDF.

- **What broke.** Each link hit an endpoint that rendered the PDF on request, and each PDF cost one to two seconds of SQL queries and API calls. At normal traffic that was fine. With everyone clicking within the same hour, the workers were exhausted and the site went down.
- **Finding the cause.** The messaging vendor blamed bandwidth. The server was upgraded and it still failed, which ruled out raw capacity. I measured the per-PDF cost on a local bench and confirmed that synchronous rendering alone was enough to exhaust the workers.
- **Containment.** The site went into maintenance mode to stop the overload.
- **The fix, overnight.** Rendering 50k PDFs one after another would take 13–26 hours, so I raised the long-queue worker count and queued one background job per student. Each job renders the PDF in memory, uploads it to S3 and stores a pre-signed link on the student's record. The result link now only looks up that record and redirects, so the server never renders on click. Downloads worked the next morning.
- **What I'd do before the next blast.** Precompute expensive output before a mass send, keep heavy work in background jobs, and roll out in stages (say a thousand first) or load-test the endpoint first.

<!-- TODO(Vatsal): confirm your role and year. The docs' SOW is an unsigned draft and the pitch is a sales document; only the as-is docs describe real code. Usage looked low in April 2025 (scheduling, attendance, payouts barely used), so no usage claims are made. Confirm 32 document types / 10 reports are OK to publish. -->
