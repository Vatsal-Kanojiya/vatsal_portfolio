# Deploying

One server runs everything behind **Caddy**, which handles HTTPS certificates automatically:

```
yourdomain.com, www.        →  portfolio (static files)
notes.yourdomain.com        →  Super Notes      (phase 2)
expenses.yourdomain.com     →  Expense Tracker  (phase 2)
```

## 1. Server

Any Ubuntu VPS or EC2 instance. The portfolio alone needs very little. With both Django apps (Postgres, Redis, Celery), plan for **2 GB RAM or more**.
Open ports **80** and **443** (security group / firewall).

## 2. DNS

At your domain registrar, add **A records** pointing to the server's public IP:

| Name | Type | Value |
|---|---|---|
| `@` | A | server IP |
| `www` | A | server IP |
| `notes` | A | server IP (phase 2) |
| `expenses` | A | server IP (phase 2) |

## 3. First deploy

```bash
# on the server
curl -fsSL https://get.docker.com | sh          # Docker + Compose
git clone https://github.com/Vatsal-Kanojiya/vatsal_portfolio.git && cd vatsal_portfolio
cp deploy/.env.example deploy/.env && nano deploy/.env   # DOMAIN=yourdomain.com
docker compose -f deploy/compose.yaml --env-file deploy/.env up -d --build
```

Open `https://yourdomain.com`. The first visit may take a few seconds while Caddy gets the certificate.

## 4. Updating

```bash
git pull && docker compose -f deploy/compose.yaml --env-file deploy/.env up -d --build
```

## 5. Phase 2: adding a Django app

1. In the app's own compose file, put its web service on the shared network and **don't publish its port**. Caddy reaches it privately:
   ```yaml
   services:
     api:                       # the Django/uvicorn service
       networks: [default, edge]
       # no "ports:" — only Caddy talks to it
   networks:
     edge:
       external: true
   ```
2. Give it the name Caddy expects (`supernotes-api` / `expense-web`) with `container_name:` or a network alias. Otherwise, change the name in `deploy/Caddyfile`.
3. Set the app's production settings: `ALLOWED_HOSTS` / `CSRF_TRUSTED_ORIGINS` for its subdomain, `DEBUG=False`, and real secrets.
4. Uncomment its block in `deploy/Caddyfile` and re-run the update command.
5. Add `live: https://notes.yourdomain.com` to the project's file in `src/content/projects/`. The "Open live app" button appears automatically.

Super Notes' streaming answers need the `flush_interval -1` line already in its Caddy block, and uploads need the 10.4 MB body limit (both are from its README).
