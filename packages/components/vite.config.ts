import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'

/**
 * Lumen UI 组件库构建配置
 * - 库模式输出 ESM + CJS + 类型声明
 * - 样式走 SCSS，全局注入 tokens 变量
 */
export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib'

  // 库模式专属配置
  const libConfig = isLib
    ? {
        build: {
          cssCodeSplit: false,
          lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'LumenUI',
            fileName: (format: string) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
            formats: ['es', 'cjs'] as ('es' | 'cjs')[],
          },
          rollupOptions: {
            // 外部化 Vue
            external: ['vue', /^@lumen\//],
            output: {
              globals: { vue: 'Vue' },
              assetFileNames: (assetInfo: { name?: string }) => {
                if (assetInfo.name === 'style.css') return 'style.css'
                return 'assets/[name][extname]'
              },
            },
          },
        },
        plugins: [
          dts({
            tsconfigPath: resolve(__dirname, 'tsconfig.json'),
            insertTypesEntry: true,
            cleanVueFileName: false,
            copyDtsFiles: true,
          }) as Plugin,
        ],
      }
    : {}

  return {
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 全局注入：sass:color、tokens 变量、mixin
          additionalData: `
            @use "sass:color";
            @use "@lumen/tokens/scss/variables" as *;
            @use "@lumen/tokens/scss/mixins" as *;
          `,
          api: 'modern-compiler',
        },
      },
    },
    server: {
      port: 5174,
      open: false,
    },
    build: {
      target: 'es2018',
      sourcemap: true,
    },
    ...libConfig,
  }
})
