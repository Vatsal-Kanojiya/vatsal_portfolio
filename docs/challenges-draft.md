# Challenge ladder: candidates (DRAFT, not on the site)

Raw material for the planned `/challenges` page and for "what's the hardest problem you've solved?" in interviews. Each candidate comes from the projects' own build logs (`docs/BUILD_LOG.md`, `docs/DECISIONS.md`) and is ordered from easier to harder.

**For Vatsal to do:** tick the ones you can explain fully from memory. Mark anything you'd rather not show. Add the client-work stories at the bottom (only you know those). Several of these were found by agents or tests during review. That still counts, but only if you can walk through the *why* without notes.

Format per entry: **Problem → What made it hard → Fix → Lesson → Evidence**

---

## Level 1 — "the tests said it was fine"

### 1. Comments that showed up on the page
*Expense Tracker · shipped in phase 3, found ~4 phases later*
- **Problem:** eleven multi-line `{# … #}` template comments rendered as visible text on live pages.
- **Hard because:** every test passed and coverage was 100%. Views returned 200 with correct context, but nothing ever *read the HTML*.
- **Fix:** converted them to `{% comment %}`, and added a test that fetches every page and fails if any template syntax reaches the browser.
- **Lesson:** coverage measures that lines ran, not that their output was right.
- **Evidence:** expense_management `docs/BUILD_LOG.md`, "A bug that shipped in phase 3 and survived four phases".

### 2. Ten sessions of "works on my machine"
*Expense Tracker · session 18*
- **Problem:** the first CI run failed immediately because `celery` had been missing from `requirements.txt` since session 7.
- **Hard because:** everything worked locally for ten sessions, since the virtualenv had it installed by hand. A follow-up check also falsely reported success because `cmd | tail -1` returns *tail's* exit code.
- **Fix:** added the dependency, rebuilt a throwaway venv from the requirements file alone and replayed every CI step, then checked exit codes directly.
- **Lesson:** a dependency file is only tested by a machine that has never seen your laptop.
- **Evidence:** expense `BUILD_LOG.md`, session 18.

## Level 2 — data and security correctness

### 3. Line items vanishing on a form error
*Expense Tracker · session 22*
- **Problem:** fill in the line items, leave one required field blank, submit, and every line item was gone.
- **Hard because:** Django's `CreateView` has two exits (`form_valid` / `form_invalid`) that share no code. The invalid path rebuilt an empty formset, and a misleading code comment let it survive review since phase 8.
- **Fix:** `form_invalid` re-binds the formset to the POST data, so all errors show in one response. Deliberately no draft storage, since a second copy of state can disagree with what was submitted.
- **Lesson:** re-render from the request. Also a process lesson: a data-losing bug gets fixed directly, not handed off.
- **Evidence:** expense `BUILD_LOG.md`, session 22. Commit `0e1e602`.

### 4. "Every row in the table", six times
*Expense Tracker · phases 3, 8, 10 and the handoff review*
- **Problem:** Django form and DRF relation fields default to querying *all* rows, so one user could pick or submit another user's categories or participants.
- **Hard because:** it recurred in different field types, and the API version has no dropdown where you'd notice it.
- **Fix:** every relation field is scoped to the owner, with permission tests that try to reach another user's data.
- **Lesson:** user scoping is a property you test for, not a habit you trust.
- **Evidence:** expense `BUILD_LOG.md`, "The scoping lesson recurred five times" (and a sixth in the handoff review).

## Level 3 — concurrency and transactions

### 5. A bug no ordinary test could catch
*Expense Tracker · phase 6, monthly digest*
- **Problem:** the digest job crashed on the second user (`InterfaceError`).
- **Hard because:** all 16 tests passed with the bug present. It iterated with a server-side cursor while committing inside the loop, and Django's `TestCase` wraps each test in a transaction, so nothing really commits.
- **Fix:** materialise the ids before the loop. Pinned with a `TransactionTestCase` that fails if the bug comes back.
- **Lesson:** why `TestCase` and `TransactionTestCase` both exist. Run the real thing against a real database.
- **Evidence:** expense `BUILD_LOG.md`, phase 6.

### 6. A ₹150 debt repaid twice
*Expense Tracker · phase 13*
- **Problem:** two simultaneous settle-up requests both read "150 outstanding", and 300 got repaid.
- **Hard because:** no database constraint can catch it, since two genuine settlements are legal. The protected value is derived from four tables and has no row of its own.
- **Fix:** `select_for_update` on the participant row, used purely as a lock. The race test was verified *both ways*: it passes with the lock and fails with the line removed.
- **Lesson:** a concurrency test that has never been seen to fail is not evidence of anything.
- **Evidence:** expense `BUILD_LOG.md`, phase 13.

### 7. A paste that froze the server
*Super Notes · smart paste*
- **Problem:** pasting 100,000 `[` characters took 26 s in format detection, and deeply nested brackets crashed the JSON reader with `RecursionError`.
- **Hard because:** pasted content is untrusted input from anywhere (web pages, chat exports, code), so it has to survive anything.
- **Fix:** detection reads a sample instead of the whole input, recursion errors are caught, and unsafe links are refused.
- **Lesson:** every parser is an attack surface. Test with pathological input, not just realistic input.
- **Evidence:** super_notes `docs/BUILD_LOG.md`, "V2 item 12 — Smart paste".

## Level 4 — systems under real load

### 8. Never charge a retry twice
*Super Notes · AI usage limits*
- **Problem:** monthly AI quotas per user plus system-wide caps, and a client retry must never be charged twice.
- **Hard because:** per-user counts need row locks, system caps need Postgres advisory locks, and the test that forces the race initially *deadlocked* by pausing threads inside the system lock.
- **Fix:** one limits layer, with an Idempotency-Key replay. The race test pauses only on the per-user count, and it's proven to fail with the lock removed.
- **Evidence:** super_notes `BUILD_LOG.md`, phase 5 and V2 0c. Decisions D84, D91.

### 9. Streaming answers that held the database hostage
*Super Notes · V2 streaming review*
- **Problem:** each live answer stream pinned a Postgres connection for up to five minutes, and a client reconnect could duplicate text.
- **Hard because:** server-sent events are long-lived, so ordinary per-request habits don't apply. It only showed up in a whole-system review.
- **Fix:** the connection is closed between reads, there's a per-user stream cap, and stream deltas carry offsets so reconnects resume instead of repeating.
- **Evidence:** super_notes `BUILD_LOG.md`, V2 review majors. Decisions D510–D511.

### 10. Old clients silently deleting new content
*Super Notes · smart paste design*
- **Problem:** the web editor silently drops node types it doesn't recognise, so an older web build would delete future image blocks when saving a note.
- **Hard because:** nothing fails. The data just disappears on save, on a version you've already shipped.
- **Fix:** a guard against unknown content became part of the feature, before the image node exists.
- **Lesson:** design for forward compatibility before the first client ships.
- **Evidence:** super_notes `BUILD_LOG.md`, "Smart paste requirement captured".

## Level 5 — search quality (optional, more specialised)

### 11. Empty results from a vector index
*Super Notes · memory facts*
- **Problem:** "nearest facts" came back empty for some users.
- **Hard because:** an HNSW index returns its top candidates *before* the per-user filter is applied, so with many users the right rows can be filtered out entirely.
- **Evidence:** super_notes Decision D517. **Needs Vatsal's explanation of the fix.**

---

## Client work: stories only Vatsal can tell (fill in)

Anonymised; no client names or business rules. Candidates from the résumé:
- [ ] **Reports from ~5 s to ~1 s:** finding and batching N+1 queries in payroll/executive reports.
- [ ] **Billing a quantity above the top slab at ₹0:** caught while reviewing an agent's diff.
- [ ] **Idempotent stock transfers:** approve / cancel / re-approve without double-depleting stock.
- [ ] **Razorpay status drift:** expired links, partial settlement, payments whose status changed later.
- [ ] **One router for two incompatible WhatsApp vendors:** 12 call sites moved; switching vendors is now a setting.
- [ ] **Specifying a replacement for an undocumented legacy platform.**

For each: what was the situation, what made it hard, what did you try first, what fixed it, and what would you do differently?
