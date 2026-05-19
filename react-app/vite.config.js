import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8005,
    open: false,
  },
  // Serve everything in public/ at the root path
  publicDir: 'public',
})
