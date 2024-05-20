import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint ./src',
        dev: {
          logLevel: ['error'],
        },
      },
    }),
  ],
  server: {
    port: 3000,
    strictPort: true,
    host: true,
  },
  clearScreen: false,
  envPrefix: ['VITE_'],
});
