import { defineConfig } from 'vite';
import { resolve } from 'path';
import { cpSync } from 'fs';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        // eslint-disable-next-line no-undef
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  plugins: [
    {
      name: 'copy-vendor-files',
      closeBundle() {
        // Копируем vendor файлы в dist
        cpSync('vendor/nouislider', 'dist/vendor/nouislider', { recursive: true });
        cpSync('vendor/pristine', 'dist/vendor/pristine', { recursive: true });
      }
    }
  ]
});
