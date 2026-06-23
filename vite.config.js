import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// `base` must match the GitHub Pages sub-path where the app is deployed.
// package.json#homepage → https://vgratsilev.github.io/SnapShot
export default defineConfig({
  base: "/SnapShot/",
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: "dist"
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js"
  }
});
