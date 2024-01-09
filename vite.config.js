/** @format */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const BASE_URL = "http://localhost:5175";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    BASE_URL: JSON.stringify(BASE_URL),
  },
});
