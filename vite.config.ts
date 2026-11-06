import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// En GitHub Pages el workflow define VITE_BASE_PATH=/<nombre-del-repo>/
export default defineConfig({
   base: process.env.VITE_BASE_PATH || "/",
   plugins: [react()],
});
