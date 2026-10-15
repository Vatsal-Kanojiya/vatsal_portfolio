// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Set SITE_URL at build time (deploy/.env); the fallback is a placeholder until the domain is final
  site: process.env.SITE_URL ?? 'https://vatsalkanojiya.dev',
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404/') })],
  // CSS is ~14 KB gzipped: inlining it removes a render-blocking request on first visit
  build: { inlineStylesheets: 'always' },
  // No code blocks in the content yet; Shiki's inline styles would conflict with the CSP below
  markdown: { syntaxHighlight: false },
  // Strict Content-Security-Policy as a <meta> tag: every script and stylesheet Astro emits is
  // hashed, so nothing injected can run. Inline style attributes (animation delays) are allowed;
  // they can't execute code. frame-ancestors and other header-only rules live in deploy/Caddyfile.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self' data:", // Vite inlines the tiniest font subsets as data: URLs
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
      styleDirective: { resources: ["'self'", { resource: "'unsafe-inline'", kind: 'attribute' }] },
    },
  },
  vite: { plugins: [tailwindcss()] },
});
