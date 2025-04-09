import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    setupNodeEvents(on, config) {
      // Implement Node event listeners here
    },
    baseUrl: "http://localhost:3000", // Default Vite URL
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
