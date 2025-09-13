import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'gzip', // Compresses files to .gz
      ext: '.gz',        // Gzip file extension
    }),
  ],
  build: {
    sourcemap: false, // Disable sourcemaps to avoid exposing source code
  },
});
