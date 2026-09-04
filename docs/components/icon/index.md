<script setup lang="ts">
import IconBasicDemo from './IconBasicDemo.vue'
import IconColorsDemo from './IconColorsDemo.vue'
import IconSizesDemo from './IconSizesDemo.vue'
import IconTextDemo from './IconTextDemo.vue'

const basicCode = `<template>
  <LIcon :icon="Plus" size="18" />
<\/template>`

const sizeCode = `<template>
  <LIcon :icon="Plus" size="14" />
  <LIcon :icon="Plus" size="18" />
  <LIcon :icon="Plus" size="24" />
  <LIcon :icon="Plus" size="32" />
<\/template>`

const colorCode = `<template>
  <LIcon :icon="Star" size="20" color="#409eff" />
  <LIcon :icon="Check" size="20" color="#67c23a" />
  <LIcon :icon="Search" size="20" color="#909399" />
<\/template>`

const textCode = `<template>
  查看详情
  <LIcon :icon="ChevronRight" size="1em" />
<\/template>`
</script>

# Icon 图标

对 `lucide-vue-next` 做了一层统一包装，方便在组件库和业务侧保持一致的尺寸、颜色和无障碍写法。

## 基础用法

<DemoBlock title="基础图标" description="传入 Lucide 图标组件即可渲染，默认尺寸为 1em。" :code="basicCode">
  <IconBasicDemo />
</DemoBlock>

## 尺寸

<DemoBlock title="图标尺寸" description="支持数字和任意合法 CSS 长度值。" :code="sizeCode">
  <IconSizesDemo />
</DemoBlock>

## 颜色

<DemoBlock title="图标颜色" description="默认继承 currentColor，也可以按需单独设置 color。" :code="colorCode">
  <IconColorsDemo />
</DemoBlock>

## 文本内使用

<DemoBlock title="行内图标" description="图标默认与文本基线对齐，适合放在按钮和文字后面。" :code="textCode">
  <IconTextDemo />
</DemoBlock>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `icon` | Lucide 图标组件本体 | `Component` | `-` |
| `size` | 图标尺寸 | `number \| string` | `'1em'` |
| `color` | 图标颜色 | `string` | `'currentColor'` |
| `strokeWidth` | 线宽 | `number \| string` | `2` |
| `ariaLabel` | 无障碍文本，不传则按装饰图标处理 | `string` | `undefined` |
