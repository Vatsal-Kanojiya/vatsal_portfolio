// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // TODO: replace with your real domain once it's pointed at the host
  site: 'https://vatsalkanojiya.dev',
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
});
