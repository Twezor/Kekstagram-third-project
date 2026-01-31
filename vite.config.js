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
      name: 'copy-static-assets',
      closeBundle() {
        // Копируем vendor
        cpSync('vendor/nouislider', 'dist/vendor/nouislider', { recursive: true });
        cpSync('vendor/pristine', 'dist/vendor/pristine', { recursive: true });
        // Копируем картинки
        cpSync('img', 'dist/img', { recursive: true });
        cpSync('photos', 'dist/photos', { recursive: true });
        // Копируем fonts если есть
        // eslint-disable-next-line no-undef
        if (fs.existsSync('fonts')) {
          cpSync('fonts', 'dist/fonts', { recursive: true });
        }
      }
    }
  ]
});
