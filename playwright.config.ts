import { defineConfig, devices } from '@playwright/test';

// End-to-end checks against the built site (run `npm run build` first).
export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: { baseURL: 'http://localhost:4321', ...devices['Desktop Chrome'] },
  webServer: { command: 'node tests/serve.mjs', url: 'http://localhost:4321', reuseExistingServer: !process.env.CI, timeout: 60_000 },
});
