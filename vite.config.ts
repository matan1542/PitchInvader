import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr' 


export default defineConfig({
  plugins: [
    svgr(),
    dts({
      insertTypesEntry: true,
      include: ['src/types', 'src/components'],
      outDir: 'dist/types'
    }),
    react(),
    cssInjectedByJsPlugin(),
    
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/App.tsx'),
      name: 'react-squad-builder',
      formats: ["es", "umd"],
      fileName: (format) => `react-squad-builder.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "tailwindcss"],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
})