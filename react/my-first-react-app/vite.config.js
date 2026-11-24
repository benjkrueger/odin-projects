import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    // Force a strict relative URL lookup using import.meta.url
    setupFiles: './tests/setup.js', 
  },
});