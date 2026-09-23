import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [react()],
  resolve: {
    alias: {
      'next/navigation': fileURLToPath(
        new URL('./app/vercel-navigation.ts', import.meta.url),
      ),
    },
  },
  build: {
    outDir: 'vercel-dist',
    emptyOutDir: true,
  },
});
