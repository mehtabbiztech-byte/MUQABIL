import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  // GitHub Pages serves this repository from /MUQABIL/, while Vercel and local
  // development serve it from /. Keep the production base environment-specific.
  const base = process.env.GITHUB_ACTIONS === 'true' ? '/MUQABIL/' : '/';

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    build: {
      outDir: 'dist',
      // Large curriculum and offline question banks are intentional application data.
      // Keep Vite focused on unexpectedly oversized chunks above this reviewed limit.
      chunkSizeWarningLimit: 1250,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/firebase') || id.includes('node_modules/@firebase')) return 'firebase';
            if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) return 'react';
            if (id.includes('node_modules/lucide-react')) return 'icons';
            return undefined;
          },
        },
      },
    },
    server: {
      // Hosted sandbox previews proxy the dev server under a generated host.
      allowedHosts: ['.e2b.app', '.arena.ai', 'localhost', '127.0.0.1'],
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
