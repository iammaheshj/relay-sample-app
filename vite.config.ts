/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  test: {
    include: ["src/**/*.test.ts"],
    reporters: ["default", "junit"],
    outputFile: { junit: "reports/unit-junit.xml" },
  },
});
