import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    target: 'esnext',
    sourcemap: true,
  },
  server: {
    open: true,
  },
});
