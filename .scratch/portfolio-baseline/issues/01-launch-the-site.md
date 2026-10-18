# 01 Launch the site on its own domain

Status: open
Blocked by: Q2 (domain) answered by owner

## What
Pick the domain and server, set `SITE_URL` and `DOMAIN`, deploy with `deploy/compose.yaml`, and verify HTTPS, www redirect, 404 page, `robots.txt`, sitemap and Open Graph preview on the real URL.

## Acceptance criteria
- [ ] Site reachable over HTTPS at the final domain; `www` redirects to apex.
- [ ] Canonical, OG and sitemap URLs use the final domain.
- [ ] CI is green (resolve Q9 first, with approval for any new dependency).
- [ ] ROADMAP "Now" boxes for domain and deploy ticked.

## Comments
Reference: BRD G6, FRD NFR-1..3, `deploy/README.md`.
