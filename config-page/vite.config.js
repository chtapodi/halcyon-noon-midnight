import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'src/config.ts'
    }
  },
  esbuild: {
    // Use esbuild for TypeScript compilation
    loader: 'ts',
    include: /\.(ts|tsx|js|jsx)$/,
  },
  server: {
    port: 3000,
    open: '/config.html'
  },
  optimizeDeps: {
    include: ['src/**/*']
  }
});