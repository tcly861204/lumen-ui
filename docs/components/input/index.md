<script setup lang="ts">
import InputBasicDemo from './InputBasicDemo.vue'
import InputSizesDemo from './InputSizesDemo.vue'
import InputStatesDemo from './InputStatesDemo.vue'

const basicCode = `<template>
  <LInput v-model="keyword" placeholder="请输入关键词" clearable />
<\/template>`

const statusCode = `<template>
  <LInput model-value="已校验通过" status="success" />
  <LInput model-value="格式有提示" status="warning" />
  <LInput model-value="邮箱格式不正确" status="error" />
  <LInput model-value="禁用内容" disabled />
<\/template>`

const sizeCode = `<template>
  <LInput v-model="large" size="large" placeholder="Large input" />
  <LInput v-model="small" size="small" placeholder="Small input" />
<\/template>`
</script>

# Input 输入框

输入框用于收集单行文本信息，支持尺寸、状态、清空和前后缀图标等能力。

## 基础用法

<DemoBlock title="基础输入" description="支持双向绑定、占位符和清空按钮。" :code="basicCode">
  <InputBasicDemo />
</DemoBlock>

## 状态

<DemoBlock title="状态反馈" description="成功、警告、错误和禁用态都可以直接通过 status 或 disabled 控制。" :code="statusCode">
  <InputStatesDemo />
</DemoBlock>

## 尺寸

<DemoBlock title="尺寸" description="默认尺寸偏紧凑，适合后台表单密集排布。" :code="sizeCode">
  <InputSizesDemo />
</DemoBlock>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `modelValue` | 绑定值 | `string` | `''` |
| `placeholder` | 占位内容 | `string` | `''` |
| `size` | 输入框尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| `status` | 状态 | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `readonly` | 是否只读 | `boolean` | `false` |
| `clearable` | 是否支持清空 | `boolean` | `false` |
| `borderless` | 是否无边框 | `boolean` | `false` |
| `type` | 原生类型 | `string` | `'text'` |
