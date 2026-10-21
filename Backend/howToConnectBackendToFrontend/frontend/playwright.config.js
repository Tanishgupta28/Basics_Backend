import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: {
    browserName: 'chromium',
    // Use an installed browser when requested; otherwise use Playwright Chromium.
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    baseURL: 'http://localhost:5173',
  },
  webServer: [
    {
      command: 'node ../backend/server.js',
      env: { PORT: '3000' },
      url: 'http://localhost:3000/api/jokes',
      reuseExistingServer: false,
    },
    {
      command: 'npm run dev -- --host localhost --port 5173 --strictPort',
      url: 'http://localhost:5173',
      reuseExistingServer: false,
    },
  ],
});
