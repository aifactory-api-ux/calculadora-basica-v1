import { defineConfig } from 'vite';
import path from 'path';

/**
 * Vite configuration for Calculadora Básica v1 frontend
 * Serves static files and handles environment variables
 */
export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'public/index.html')
    }
  },
  server: {
    port: 3000,
    open: false
  },
  preview: {
    port: 3001
  }
});
