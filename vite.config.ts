import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/pokedex-vite-react-ts/dist",
  plugins: [react()],
});
