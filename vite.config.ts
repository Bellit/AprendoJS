import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: '/AprendoJS/',
  build: {
    outDir: 'dist',
    target: 'esnext',
    sourcemap: true,
  },
  server: {
    open: true,
  },
});
