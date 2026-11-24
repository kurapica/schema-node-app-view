import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@' : path.resolve(__dirname, 'src'),
    }
  },
  plugins: [
    vue(),
    dts({
      outDir: 'dist',         // emit index.d.ts to dist/
      insertTypesEntry: true,     // adds `export * from './index'` to index.d.ts
      processor: 'vue'            // vue files live under src/view, skip the auto detection
    })
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'SchemaNodeAppView',
      formats: ['es', 'cjs'],
      fileName: (format) => format === 'cjs' ? `index.js` : `index.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'element-plus', '@element-plus/icons-vue', 'schema-node-core', 'schema-node-app', 'schema-node-vue-view'],
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
          '@element-plus/icons-vue': 'ElementPlusIconsVue',
          'schema-node-core': 'SchemaNodeCore',
          'schema-node-app': 'SchemaNodeApp',
          'schema-node-vue-view': 'SchemaNodeVueView'
        }
      }
    },
  }
})
