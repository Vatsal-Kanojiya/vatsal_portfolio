// Minimal static server for the e2e tests: serves dist/ like the production Caddy config
// (directory index.html, 404.html with a real 404 status). No dependencies.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = join(import.meta.dirname, '..', 'dist');
const port = Number(process.env.PORT ?? 4321);
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2',
  '.woff': 'font/woff', '.pdf': 'application/pdf', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
};

async function resolve(urlPath) {
  const path = normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, '');
  for (const candidate of [join(root, path), join(root, path, 'index.html')]) {
    try { if ((await stat(candidate)).isFile()) return candidate; } catch {}
  }
  return null;
}

createServer(async (req, res) => {
  const file = await resolve(new URL(req.url ?? '/', 'http://x').pathname);
  const status = file ? 200 : 404;
  const body = await readFile(file ?? join(root, '404.html'));
  res.writeHead(status, { 'content-type': file ? (types[extname(file)] ?? 'application/octet-stream') : types['.html'] });
  res.end(body);
}).listen(port, () => console.log(`serving dist/ on http://localhost:${port}`));
