import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://127.0.0.1:4174";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  workers: 2,
  forbidOnly: Boolean(process.env.CI),
  use: { baseURL, ...devices["Desktop Chrome"], trace: "retain-on-failure" },
  webServer: [
    {
      command: "node tests/serve-static.mjs 4174",
      url: baseURL,
      reuseExistingServer: false,
    },
    {
      command: "npm run dev -- --hostname 127.0.0.1 --port 4175",
      url: "http://127.0.0.1:4175",
      env: { PORTFOLIO_E2E: "1" },
      reuseExistingServer: false,
      timeout: 60_000,
    },
  ],
});
