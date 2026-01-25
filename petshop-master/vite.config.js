import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext', // Otimiza para navegadores modernos (mais leve)
    minify: 'esbuild', // Minificação ultra-rápida
    cssCodeSplit: true, // Separa o CSS por arquivo (carrega só o necessário)
    sourcemap: false, // Desabilita mapas em produção (menor upload)
    rollupOptions: {
      output: {
        // Separa bibliotecas pesadas em arquivos diferentes (Cache eficiente)
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'animation-vendor': ['framer-motion'],
          'icons-vendor': ['lucide-react']
        }
      }
    }
  },
  // Otimização de dependências durante o desenvolvimento
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react']
  }
});