# 快速开始

## 安装

```bash
pnpm add @lumen/components @lumen/tokens
```

## 全量引入

```ts
import { createApp } from 'vue'
import App from './App.vue'
import LumenUI from '@lumen/components'
import '@lumen/tokens/css/variables.css'

createApp(App).use(LumenUI).mount('#app')
```

## 按需引入

```ts
import { LButton, LInput } from '@lumen/components'
import '@lumen/tokens/css/variables.css'
```

## 为什么需要引入 tokens

Lumen UI 的主题色、文本色、边框色和组件交互色都通过 CSS 变量暴露在 `@lumen/tokens/css/variables.css` 中。业务项目引入它之后，就可以在运行时覆盖变量来实现换肤。

## 组件预览说明

当前文档站使用 VitePress 直接渲染真实 Vue 组件，所以页面里的示例都是真实可交互的，不是截图。
