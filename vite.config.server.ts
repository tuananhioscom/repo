import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Vite config for server-side bundle
export default defineConfig({
  plugins: [react()],
  build: {
    ssr: true,
    outDir: 'dist-server',
    rollupOptions: {
      input: './server.tsx',
      output: {
        format: 'es',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  ssr: {
    noExternal: ['react', 'react-dom'],
  },
});
