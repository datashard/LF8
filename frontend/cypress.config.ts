import { defineConfig } from "cypress";

export default defineConfig({
  // @ts-ignore
  snapshot: {
    asFolders: true,
    updateSnapshots: false,
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
