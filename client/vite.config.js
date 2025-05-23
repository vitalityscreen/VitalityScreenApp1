import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: ['vitalityscreenapp1-1-front-end.onrender.com']
  },
  build: {
    outDir: 'dist'
  }
});
