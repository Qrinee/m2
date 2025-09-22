import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['m2notarialnie-frontend-eatobk-c2d579-51-75-160-15.traefik.me']
  }
})
