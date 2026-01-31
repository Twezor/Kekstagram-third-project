import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // важно для корректных путей на GitHub Pages
  build: {
    outDir: 'dist'
  }
});

