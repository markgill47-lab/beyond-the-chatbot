import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' keeps asset paths relative so the built deck can be hosted from any
// subpath (GitHub Pages, a folder on a static host, etc.) without reconfiguring.
export default defineConfig({
  plugins: [react()],
  base: './',
})
