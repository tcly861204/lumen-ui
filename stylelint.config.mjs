/**
 * Stylelint 配置 - Lumen UI
 * 作用域：packages/** 和 docs/** 下的 SCSS 文件
 */
export default {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    // BEM 类名允许 l-xxx 这种短前缀
    'selector-class-pattern': [
      '^[a-z]([a-z0-9-]+)?(__[a-z0-9-]+)?(--[a-z0-9-]+)?$',
      { message: '类名需符合 BEM 规范 (l-block__element--modifier)' },
    ],
    // 颜色用变量或十六进制
    'color-no-invalid-hex': true,
    // 不允许重复声明
    'no-duplicate-selectors': true,
    // 允许 :deep / :slotted 等 Vue scoped 写法
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['deep', 'slotted', 'global'] },
    ],
    // SCSS 嵌套
    'scss/dollar-variable-pattern': '^[a-z][a-zA-Z0-9-]*$',
    'scss/at-mixin-pattern': '^[a-z][a-zA-Z0-9-]*$',
    'scss/at-function-pattern': '^[a-z][a-zA-Z0-9-]*$',
    // 允许 SCSS 变量
    'scss/dollar-variable-empty-line-before': null,
    'no-empty-source': null,
  },
  ignoreFiles: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/storybook-static/**',
  ],
  overrides: [
    {
      // tokens 内部允许通用 SCSS 写法
      files: ['packages/tokens/src/scss/**/*.scss'],
      rules: {
        'selector-class-pattern': null,
      },
    },
  ],
}
