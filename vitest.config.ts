import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // Enables `expect`, `test` globally
    environment: "node",
  },
});
