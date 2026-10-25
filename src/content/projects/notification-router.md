---
title: Notification Router
tagline: Switch WhatsApp or SMS vendors from settings, not code.
summary: One messaging layer used across the company's client projects. Project code asks for a WhatsApp, SMS, email or push message, and the router decides which vendor sends it, based on admin settings.
kind: app
year: "2025" # TODO(Vatsal): confirm year
platforms: [Shared Frappe app]
stack: [Python, Frappe, Messaging APIs, Push notifications, Email]
order: 7
status: live
statusLabel: In production · used across client projects
points:
  - "Project code calls one interface, and a thin Frappe app per vendor sits behind it and normalises that vendor's response, so switching WhatsApp or SMS vendors is a setting, not a code change."
  - "Test mode is detected from the site URL: restored production backups on dev servers send every message to a test recipient, or only log it, so real clients are never messaged and SMS costs are avoided."
  - "Bulk sends of hundreds to thousands of messages run as background jobs, and the router infers the message type from its arguments so callers never pick a vendor API."
features:
  - { title: "One call for every channel", text: "WhatsApp, SMS, email and push all go through the same interface." }
  - { title: "Vendors are a setting", text: "Admins pick the vendor per channel. Changing it needs no deploy." }
  - { title: "Safe on test servers", text: "A copy of production on a dev server never messages real people." }
  - { title: "Built for bulk", text: "Large sends run in the background and failures are logged for follow-up." }
---

## Under the hood, briefly

- **Three layers.** Project app → router app → one small Frappe app per vendor, installable on any site. Each vendor app is like a Postman collection in code, and converts its vendor's response into one standard shape.
- **Why it exists.** Vendor calls used to sit inside each project app, so switching vendors meant editing every call site. Twelve call sites moved onto the router.
- **Test mode.** The router compares the current site URL with the production URL stored in its settings. When they differ, every message goes to a configured test email, number or device token, with an optional log-only switch.

## The other integration apps

The same pattern, one small app per vendor or service, each switched on through settings:

- **Video meetings.** Integrates a video-conferencing API: recurring meetings, participant reports and time-in-meeting, which client projects use for attendance.
- **Push notifications.** Mobile push as one more channel behind the router.
- **File storage paths.** Extends the open-source S3 attachments app so each project decides the path its files are stored under.
