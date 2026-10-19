/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // CurrencyBeacon sends no CORS headers,
    // so proxy API calls through the dev server
    proxy: {
      '/api': {
        target: 'https://api.currencybeacon.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    // Undo vi.spyOn / vi.stubEnv after every test automatically
    restoreMocks: true,
    unstubEnvs: true,
  },
})
