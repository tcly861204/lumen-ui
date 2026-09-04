# 主题换肤

Lumen UI 当前通过 CSS 变量做运行时主题切换。你可以在应用根节点上切换 `data-theme`，或者直接覆盖变量。

## 默认主题变量

项目入口先引入：

```ts
import '@lumen/tokens/css/variables.css'
```

然后通过根节点覆盖主题变量：

```css
html[data-theme='dark'] {
  --l-color-primary: #5aa9ff;
  --l-bg-color: #141821;
  --l-bg-color-page: #0f1115;
  --l-color-text-primary: #e5eaf3;
  --l-border-color-base: #4a5568;
}
```

## 切换主题

```ts
const setTheme = (theme: 'light' | 'dark') => {
  document.documentElement.setAttribute('data-theme', theme)
}
```

## 当前已接入运行时换肤的组件

- Button
- Input

后续可以继续把 Tag、FormItem 等组件逐步迁移到同样的 CSS 变量体系里。
