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
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1MB
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('video.js') || id.includes('hls.js') || id.includes('dash.js') || id.includes('dashjs')) {
            return 'video';
          }
          if (id.includes('lucide-react') || id.includes('@radix-ui') || id.includes('tailwindcss')) {
            return 'ui';
          }
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
            return 'react';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
