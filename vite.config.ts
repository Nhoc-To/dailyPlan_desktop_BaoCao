import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: './', // Using relative paths for Electron
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  root: path.resolve(__dirname, 'src/renderer'),
  server: {
    port: 5173,
    strictPort: true, // Fail if port is occupied
  },
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
  },
});
