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
  vite: { plugins: [tailwindcss()] },
});
