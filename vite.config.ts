import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: process.env.ANALYZE
    ? [
        visualizer({
          filename: 'dist/bundle-stats.html',
          template: 'treemap',
          gzipSize: true,
          brotliSize: true,
          open: false
        })
      ]
    : [],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es']
    },
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      external: [/^lit($|\/)/, /^@lit\//],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js'
      }
    }
  }
});
