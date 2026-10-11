import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
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
      // Hosted sandbox previews proxy the dev server under a generated host
      // (e.g. https://<port>-<id>.e2b.app). Vite rejects unknown Host headers
      // with HTTP 403, which blocks the preview, so allow the preview domains.
      allowedHosts: ['.e2b.app', '.arena.ai', 'localhost', '127.0.0.1'],
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
