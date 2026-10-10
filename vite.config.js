import {defineConfig} from "vite";
import {resolve} from "path";

const root = resolve(import.meta.dirname, "src/pages");

export default defineConfig({
  root,
  publicDir: resolve(import.meta.dirname, "public"),
  resolve: {
    alias: {
      "@public": resolve(import.meta.dirname, "./public"),
      "/src": resolve(import.meta.dirname, "src"),
    },
  },
  build: {
    outDir: resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(root, "index.html"),
        location: resolve(root, "location.html"),
      },
    },
  },
  server: {
    open: "/index.html",
  },
});