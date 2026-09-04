import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|js|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: false,
  },
  async viteFinal(config) {
    // 把 @lumen/components 直接指向源码，dev 模式无需先构建
    // 这里用 process.cwd() 解析 monorepo 根，避免在顶层 import 'node:path' /
    // 'node:url'（docs 是 "type": "module"，esbuild-register 编译出来的
    // require() 在 ESM 作用域下会报 require is not defined）。
    const cwd = process.cwd().replace(/\\/g, '/')
    // 切掉最后一段（docs/），保留 monorepo 根
    // Windows: E:/works/lumen-ui/docs -> E:/works/lumen-ui
    // POSIX:   /Users/xxx/lumen-ui/docs -> /Users/xxx/lumen-ui
    const monorepoRoot = cwd.split('/').slice(0, -1).join('/')
    const componentsSrc = `${monorepoRoot}/packages/components/src`

    // 把 resolve.alias 统一成数组形态，便于追加 RegExp 规则
    config.resolve = config.resolve || {}
    const previousAlias = config.resolve.alias
    const aliasEntries: { find: string | RegExp; replacement: string }[] = []
    if (Array.isArray(previousAlias)) {
      aliasEntries.push(...(previousAlias as { find: string | RegExp; replacement: string }[]))
    } else if (previousAlias && typeof previousAlias === 'object') {
      for (const [find, replacement] of Object.entries(previousAlias)) {
        aliasEntries.push({ find, replacement: String(replacement) })
      }
    }
    aliasEntries.push({
      // 必须用 RegExp：字符串 find 在 @rollup/plugin-alias 里是精确匹配，不是正则
      find: /^@lumen\/components(?:\/src)?(.*)$/,
      replacement: `${componentsSrc}$1`,
    })
    config.resolve.alias = aliasEntries

    // dep-scan 阶段别去预打包 @lumen/components（它的 main 指向不存在的 dist），
    // 这样 Vite 会走普通 resolver，进而命中上面的 alias
    config.optimizeDeps = config.optimizeDeps || {}
    const previousExclude = config.optimizeDeps.exclude
    const excludeList: string[] = Array.isArray(previousExclude)
      ? [...previousExclude]
      : previousExclude
        ? [String(previousExclude)]
        : []
    if (!excludeList.some((e) => e === '@lumen/components')) {
      excludeList.push('@lumen/components')
    }
    config.optimizeDeps.exclude = excludeList

    // 注入 SCSS 全局变量
    config.css = config.css || {}
    config.css.preprocessorOptions = {
      scss: {
        additionalData: `
          @use "sass:color";
          @use "@lumen/tokens/scss/variables" as *;
          @use "@lumen/tokens/scss/mixins" as *;
        `,
        api: 'modern-compiler',
      },
    }

    // @storybook/vue3-vite 不会自动注入 @vitejs/plugin-vue，
    // 这里在 async 函数里用动态 import 把它加载进来。
    // esbuild-register 只会改写顶层静态 import，函数体里的 import()
    // 会被保留为原生 ESM 动态加载，从而避开 docs/package.json "type":"module" 下
    // 顶层 require 报 "require is not defined" 的问题。
    const { default: vue } = (await import('@vitejs/plugin-vue')) as {
      default: () => unknown
    }
    config.plugins = config.plugins || []
    // 避免重复 push（viteFinal 可能被多次调用）
    const hasVuePlugin = (config.plugins as { name?: string }[]).some(
      (p) => p && (p as { name?: string }).name === 'vite:vue',
    )
    if (!hasVuePlugin) {
      ;(config.plugins as unknown[]).push(vue())
    }

    return config
  },
}

export default config
