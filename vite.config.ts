/// <reference types="vitest" />

import { defineConfig, mergeConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/

export default mergeConfig(
  defineConfig({
    plugins: [react(), tailwindcss()],
  }),
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/__tests__/setup.ts'],
      clearMocks: true,
    },
  })
)
