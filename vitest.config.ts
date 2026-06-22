import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['**/*.{test,spec}.{ts,tsx}'],  // Sửa lại đường dẫn
    exclude: ['node_modules', 'dist', 'out', 'build'],
    transformMode: {
      web: [/\.[jt]sx?$/],
    },
  },
});