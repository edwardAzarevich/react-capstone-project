import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 5590 },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
  },
  alias: {
    jest: "vitest",
  },
  deps: {
    optimizer: {
      web: {
        include: ["@testing-library/jest-dom"],
      },
    },
  },
});
