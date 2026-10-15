// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Set SITE_URL at build time (deploy/.env); the fallback is a placeholder until the domain is final
  site: process.env.SITE_URL ?? 'https://vatsalkanojiya.dev',
  integrations: [react(), sitemap({ filter: (page) => !page.endsWith('/404/') })],
  vite: { plugins: [tailwindcss()] },
});
