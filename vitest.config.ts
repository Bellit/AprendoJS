import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['js/**/*.test.ts'],
    environment: 'jsdom',
    setupFiles: ['js/setup.ts'],
    coverage: {
      provider: 'v8',
      include: ['js/**/*.ts'],
      exclude: ['js/**/*.test.ts', 'js/lessons.ts'],
    },
  },
});
