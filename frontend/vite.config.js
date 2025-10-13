import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path" // ✨ ADD THIS IMPORT

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // ✨ ADD THIS RESOLVE BLOCK
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})