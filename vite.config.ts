import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3005,
        strictPort: true,
        host: '0.0.0.0',
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        },
        dedupe: [
          'react',
          'react-dom',
          'react-router-dom',
          'react-helmet-async'
        ]
      },
      optimizeDeps: {
        include: [
          'react',
          'react-dom',
          'react-dom/client',
          'react/jsx-runtime',
          'react/jsx-dev-runtime',
          'react-router-dom',
          'react-helmet-async',
          'lucide-react',
          'framer-motion',
          '@supabase/supabase-js',
          '@google/genai',
          '@emailjs/browser',
          'clsx',
          'tailwind-merge'
        ]
      },
      build: {
        sourcemap: false,
        rollupOptions: {
          output: {
            manualChunks: {
              'vendor-react': ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
              'vendor-supabase': ['@supabase/supabase-js'],
              'vendor-motion': ['framer-motion'],
              'vendor-icons': ['lucide-react']
            }
          }
        }
      }
    };
});
