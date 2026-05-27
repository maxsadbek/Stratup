import react from "@vitejs/plugin-react";
// @ts-ignore
import path, { dirname } from "path";
// @ts-ignore
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

// @ts-ignore
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
