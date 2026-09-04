import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'

const monorepoRoot = fileURLToPath(new URL('../../', import.meta.url))
const componentsSrc = fileURLToPath(new URL('../../packages/components/src', import.meta.url)).replace(
  /\\/g,
  '/',
)
const componentsEntry = fileURLToPath(
  new URL('../../packages/components/src/index.ts', import.meta.url),
).replace(/\\/g, '/')

export default defineConfig({
  base: '/lumen-ui',
  lang: 'zh-CN',
  title: 'Lumen UI',
  description: '基于 Vue 3 的轻量级组件库文档站',
  srcDir: '.',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Lumen UI',
    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: '组件', link: '/components/button' },
    ],
    search: {
      provider: 'local',
    },
    sidebar: [
      {
        text: '开始',
        items: [
          { text: '快速开始', link: '/guide/getting-started' },
          { text: '主题换肤', link: '/guide/theming' },
        ],
      },
      {
        text: '基础组件',
        items: [
          { text: 'Button 按钮', link: '/components/button/index' },
          { text: 'Input 输入框', link: '/components/input/index' },
          { text: 'Tag 标签', link: '/components/tag/index' },
          { text: 'Icon 图标', link: '/components/icon/index' },
          { text: 'Form 表单', link: '/components/form/index' },
          { text: 'FormItem 表单项', link: '/components/form-item/index' },
        ],
      },
    ],
    outline: {
      label: '页面导航',
      level: [2, 3],
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^@lumen\/components$/,
          replacement: componentsEntry,
        },
        {
          find: /^@lumen\/components\/src(.*)$/,
          replacement: `${componentsSrc}$1`,
        },
      ],
    },
    optimizeDeps: {
      exclude: ['@lumen/components'],
    },
    css: {
      preprocessorOptions: {
        scss: {
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
      host: '0.0.0.0',
      fs: {
        allow: [monorepoRoot],
      },
    }
  },
})
