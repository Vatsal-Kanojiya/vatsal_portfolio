---
title: Super Notes
tagline: Notes that answer back.
summary: A notes app you can talk to. Ask a question in plain language and get an answer written from your own notes, with links to the exact notes it came from. On the web today, with a native Android app on the way.
kind: showcase
year: "2026"
platforms: [Web, Android (first build)]
stack: [Django, DRF, PostgreSQL, pgvector, Celery, Redis, Vue 3, Flutter]
order: 1
status: in-progress
repo: https://github.com/Vatsal-Kanojiya/super_notes
highlights:
  - { value: "1,900+", label: "automated tests, backend and web" }
  - { value: "38", label: "API paths, one documented contract" }
  - { value: "340+", label: "design decisions written down" }
features:
  - { title: "Ask your notes", text: "Ask anything in plain language. The answer comes only from your notes, with sources you can click to check." }
  - { title: "Real conversations", text: "Follow-up questions just work. It remembers what you were talking about." }
  - { title: "Answers that stream in", text: "Replies appear word by word as they're written. No staring at a spinner." }
  - { title: "Memory you control", text: "It learns small facts about you from chats. You can see every one, and delete any." }
  - { title: "Format my note", text: "One tap turns a messy note into a tidy one. You preview the change and accept or reject it." }
  - { title: "Smart paste", text: "Paste a web page, a table, code or a whole chat transcript and it lands as a clean, well-structured note. No AI needed, free on every plan." }
  - { title: "Reminders and calendar", text: "Put a due date on a note and get heads-ups by email and push in the days before, plus a calendar view." }
  - { title: "Files that are searchable", text: "Attach images and PDFs. Their text is read, made searchable and summarised." }
  - { title: "Sync without lost edits", text: "Write on the web, continue on your phone. If two devices edit at once, nothing is silently overwritten." }
  - { title: "Private by design", text: "Google sign-in, at most two devices per account, and every query is limited to your own notes." }
---

## Under the hood, briefly

- **Finding the right notes.** Search combines *meaning* (vector similarity) with *exact words* (full-text search), then merges both rankings. Retrieval quality is measured with a labelled question set rather than judged by eye.
- **Slow work runs in the background.** Reading files, indexing notes and writing answers happen in background jobs, so the app stays fast.
- **Safe usage limits.** Every AI feature goes through one limits layer. Monthly quotas per user and system-wide caps are editable without a deploy, and a retried request is never counted twice.
- **Built in versions.** V1 covered notes, sync, search and Ask. V2 added conversations, streaming, memory, formatting, smart paste, reminders and attachments. V3 is a native Flutter Android app, whose first build is done.

Built with Claude Code agents under a spec-first workflow: I wrote the plans and acceptance criteria, and reviewed every diff.
