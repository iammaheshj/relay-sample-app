import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  retries: 0,
  reporter: [
    ["list"],
    ["junit", { outputFile: "reports/e2e-junit.xml" }],
    ["html", { outputFolder: "reports/e2e-html", open: "never" }],
  ],
  use: { baseURL: "http://localhost:4173" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run build && npm run preview",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
  },
});
