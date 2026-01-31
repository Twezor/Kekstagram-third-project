import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'vendor/nouislider/**/*', dest: 'vendor/nouislider' },
        { src: 'vendor/pristine/**/*', dest: 'vendor/pristine' },
        { src: 'img/**/*', dest: 'img' },
        { src: 'photos/**/*', dest: 'photos' },
        { src: 'fonts/**/*', dest: 'fonts' }
      ]
    })
  ]
});
