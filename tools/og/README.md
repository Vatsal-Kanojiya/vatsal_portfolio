# Link-preview image

`og.html` is the 1200×630 card shown when the site is shared (LinkedIn, WhatsApp, Slack…).
After editing it, re-render with any headless Chrome, e.g.:

```bash
google-chrome --headless=new --hide-scrollbars --window-size=1200,630 --virtual-time-budget=3000 \
  --screenshot=public/og.png tools/og/og.html
```
