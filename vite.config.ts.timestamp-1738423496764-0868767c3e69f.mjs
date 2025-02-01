// vite.config.ts
import { defineConfig } from "file:///Users/matanlasry/Desktop/C/Projects/react-squad-builder/node_modules/vite/dist/node/index.js";
import react from "file:///Users/matanlasry/Desktop/C/Projects/react-squad-builder/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import cssInjectedByJsPlugin from "file:///Users/matanlasry/Desktop/C/Projects/react-squad-builder/node_modules/vite-plugin-css-injected-by-js/dist/esm/index.js";
import dts from "file:///Users/matanlasry/Desktop/C/Projects/react-squad-builder/node_modules/vite-plugin-dts/dist/index.mjs";
import svgr from "file:///Users/matanlasry/Desktop/C/Projects/react-squad-builder/node_modules/vite-plugin-svgr/dist/index.js";
var __vite_injected_original_dirname = "/Users/matanlasry/Desktop/C/Projects/react-squad-builder";
var vite_config_default = defineConfig({
  plugins: [
    svgr(),
    dts({
      insertTypesEntry: true,
      include: ["src/types", "src/components"],
      outDir: "dist/types"
    }),
    react(),
    cssInjectedByJsPlugin()
  ],
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/components/App.tsx"),
      name: "react-squad-builder",
      formats: ["es", "umd"],
      fileName: (format) => `react-squad-builder.${format}.js`
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "tailwindcss"],
      output: {
        globals: {
          react: "React"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWF0YW5sYXNyeS9EZXNrdG9wL0MvUHJvamVjdHMvcmVhY3Qtc3F1YWQtYnVpbGRlclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL21hdGFubGFzcnkvRGVza3RvcC9DL1Byb2plY3RzL3JlYWN0LXNxdWFkLWJ1aWxkZXIvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL21hdGFubGFzcnkvRGVza3RvcC9DL1Byb2plY3RzL3JlYWN0LXNxdWFkLWJ1aWxkZXIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgY3NzSW5qZWN0ZWRCeUpzUGx1Z2luIGZyb20gJ3ZpdGUtcGx1Z2luLWNzcy1pbmplY3RlZC1ieS1qcydcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJ1xuaW1wb3J0IHN2Z3IgZnJvbSAndml0ZS1wbHVnaW4tc3ZncicgXG5cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHN2Z3IoKSxcbiAgICBkdHMoe1xuICAgICAgaW5zZXJ0VHlwZXNFbnRyeTogdHJ1ZSxcbiAgICAgIGluY2x1ZGU6IFsnc3JjL3R5cGVzJywgJ3NyYy9jb21wb25lbnRzJ10sXG4gICAgICBvdXREaXI6ICdkaXN0L3R5cGVzJ1xuICAgIH0pLFxuICAgIHJlYWN0KCksXG4gICAgY3NzSW5qZWN0ZWRCeUpzUGx1Z2luKCksXG4gICAgXG4gIF0sXG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29tcG9uZW50cy9BcHAudHN4JyksXG4gICAgICBuYW1lOiAncmVhY3Qtc3F1YWQtYnVpbGRlcicsXG4gICAgICBmb3JtYXRzOiBbXCJlc1wiLCBcInVtZFwiXSxcbiAgICAgIGZpbGVOYW1lOiAoZm9ybWF0KSA9PiBgcmVhY3Qtc3F1YWQtYnVpbGRlci4ke2Zvcm1hdH0uanNgLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFtcInJlYWN0XCIsIFwicmVhY3QtZG9tXCIsIFwicmVhY3QvanN4LXJ1bnRpbWVcIiwgXCJ0YWlsd2luZGNzc1wiXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgcmVhY3Q6ICdSZWFjdCcsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KSJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFYsU0FBUyxvQkFBb0I7QUFDdlgsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUN4QixPQUFPLDJCQUEyQjtBQUNsQyxPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVO0FBTGpCLElBQU0sbUNBQW1DO0FBUXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLEtBQUs7QUFBQSxJQUNMLElBQUk7QUFBQSxNQUNGLGtCQUFrQjtBQUFBLE1BQ2xCLFNBQVMsQ0FBQyxhQUFhLGdCQUFnQjtBQUFBLE1BQ3ZDLFFBQVE7QUFBQSxJQUNWLENBQUM7QUFBQSxJQUNELE1BQU07QUFBQSxJQUNOLHNCQUFzQjtBQUFBLEVBRXhCO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsa0NBQVcsd0JBQXdCO0FBQUEsTUFDbEQsTUFBTTtBQUFBLE1BQ04sU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLE1BQ3JCLFVBQVUsQ0FBQyxXQUFXLHVCQUF1QixNQUFNO0FBQUEsSUFDckQ7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxTQUFTLGFBQWEscUJBQXFCLGFBQWE7QUFBQSxNQUNuRSxRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsVUFDUCxPQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
