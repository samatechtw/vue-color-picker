import Vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const resolve = (p: string): string => path.resolve(__dirname, p)

const outputName = 'vue-color-picker.es.js'

export default defineConfig({
  assetsInclude: /\.(pdf|jpg|png|webm|mp4|svg|wasm)$/,
  plugins: [Vue(), dts({ rollupTypes: true })],
  worker: {
    format: 'es',
  },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: 'terser',
    lib: {
      formats: ['es'],
      entry: [resolve('./src/index.ts')],
      name: '@samatech/vue-color-picker',
    },
    rollupOptions: {
      // externalize deps that shouldn't be bundled
      external: ['vue'],
      output: {
        format: 'es',
        dir: 'dist',
        entryFileNames: (_entry) => {
          return outputName
        },
        assetFileNames: (_entry) => {
          return 'style.css'
        },
      },
    },
  },
})
