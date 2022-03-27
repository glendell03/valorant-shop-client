import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import macrosPlugin from "vite-plugin-babel-macros";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), macrosPlugin(), ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
