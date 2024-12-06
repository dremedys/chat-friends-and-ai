import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
// @ts-expect-error See https://github.com/gxmari007/vite-plugin-eslint/issues/79
import eslint from 'vite-plugin-eslint'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), eslint({ lintOnStart: true, failOnError: false })],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    outDir: 'build',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/shared/config/tests/setup.ts',
    css: true,
  },
})
