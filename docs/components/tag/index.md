<script setup lang="ts">
import TagClosableDemo from './TagClosableDemo.vue'
import TagSizesDemo from './TagSizesDemo.vue'
import TagTypesDemo from './TagTypesDemo.vue'

const typeCode = `<template>
  <LTag>Default</LTag>
  <LTag type="primary">Primary</LTag>
  <LTag type="success">Success</LTag>
  <LTag type="warning">Warning</LTag>
  <LTag type="danger">Danger</LTag>
  <LTag type="info">Info</LTag>
<\/template>`

const sizeCode = `<template>
  <LTag size="large" type="primary">Large</LTag>
  <LTag type="primary">Default</LTag>
  <LTag size="small" type="primary">Small</LTag>
<\/template>`

const closeCode = `<template>
  <LTag
    v-for="(tag, index) in tags"
    :key="tag.label"
    :type="tag.type"
    closable
    round
    @close="removeTag(index)"
  >
    {{ tag.label }}
  </LTag>
<\/template>`
</script>

# Tag 标签

用于展示轻量状态、属性信息或可关闭的分类项，适合筛选器、状态提示和列表标签。

## 类型

<DemoBlock title="标签类型" description="支持默认、主色、成功、警告、危险和信息态。" :code="typeCode">
  <TagTypesDemo />
</DemoBlock>

## 尺寸

<DemoBlock title="标签尺寸" description="默认尺寸偏紧凑，适合后台场景密集展示。" :code="sizeCode">
  <TagSizesDemo />
</DemoBlock>

## 可关闭

<DemoBlock title="可关闭标签" description="结合 closable 和 close 事件可以方便地做动态标签组。" :code="closeCode">
  <TagClosableDemo />
</DemoBlock>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 标签类型 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` |
| `size` | 标签尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| `plain` | 是否朴素风格 | `boolean` | `false` |
| `round` | 是否为圆角胶囊 | `boolean` | `false` |
| `closable` | 是否可关闭 | `boolean` | `false` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `close` | 点击关闭按钮时触发 | `(evt: MouseEvent)` |
