import { defineConfig } from "vite";
import wasm from "vite-plugin-wasm";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [wasm(), nodePolyfills()],
  build: {
    rollupOptions: {
      input: "index.js",
      output: {
        format: "esm",
      },
    },
    // Target environment that supports top-level await
    target: "es2022",
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2022",
    },
  },
});
