import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Relative asset URLs let the same build run at GitHub Pages' repository
  // path and from any ordinary local static server.
  base: './',
  plugins: [react()],
  server: { port: 5173 },
  build: { sourcemap: true },
})
