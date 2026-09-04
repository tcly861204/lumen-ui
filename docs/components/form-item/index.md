<script setup lang="ts">
import FormItemBasicDemo from './FormItemBasicDemo.vue'
import FormItemExtraDemo from './FormItemExtraDemo.vue'
import FormItemLeftDemo from './FormItemLeftDemo.vue'
import FormItemStatesDemo from './FormItemStatesDemo.vue'

const basicCode = `<template>
  <LFormItem label="字段标签" message="这里可以放输入提示或校验说明。">
    <LInput v-model="value" placeholder="请输入内容" clearable />
  </LFormItem>
<\/template>`

const stateCode = `<template>
  <LFormItem label="项目名称" status="success" message="命名格式正确，可以提交。">
    <LInput v-model="success" status="success" />
  </LFormItem>
  <LFormItem label="邮箱" required error="请输入正确的邮箱地址。">
    <LInput v-model="error" status="error" />
  </LFormItem>
<\/template>`

const leftCode = `<template>
  <LFormItem label="搜索" label-position="left" label-width="72px">
    <LInput v-model="keyword" :prefix-icon="Search" clearable />
  </LFormItem>
<\/template>`

const extraCode = `<template>
  <LFormItem label="访问令牌" required message="建议定期轮换访问令牌。">
    <LInput v-model="token" type="password" />
    <template #extra>
      <div>令牌只会在创建时展示一次，请妥善保存。</div>
    </template>
  </LFormItem>
<\/template>`
</script>

# FormItem 表单项

用于承载单个表单字段的标签、状态文案和额外说明，也会在接入 `LForm` 后负责字段注册与校验展示。

## 基础用法

<DemoBlock title="基础表单项" description="可独立展示标签、说明文案和输入控件。" :code="basicCode">
  <FormItemBasicDemo />
</DemoBlock>

## 校验状态

<DemoBlock title="状态反馈" description="支持 success、warning、error，以及强制错误文案展示。" :code="stateCode">
  <FormItemStatesDemo />
</DemoBlock>

## 左侧标签

<DemoBlock title="左侧标签布局" description="适合后台配置表单，标签宽度可单独控制。" :code="leftCode">
  <FormItemLeftDemo />
</DemoBlock>

## 额外说明

<DemoBlock title="额外说明内容" description="通过 extra 插槽补充辅助信息、风险提示或操作说明。" :code="extraCode">
  <FormItemExtraDemo />
</DemoBlock>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `prop` | 对应表单字段名 | `string` | `undefined` |
| `label` | 标签文本 | `string` | `''` |
| `for` | 原生 label 的 for 属性 | `string` | `undefined` |
| `required` | 是否必填 | `boolean` | `false` |
| `message` | 说明文案 | `string` | `''` |
| `error` | 错误文案，优先级高于 message | `string` | `''` |
| `status` | 校验状态 | `'default' \| 'success' \| 'warning' \| 'error'` | `undefined` |
| `labelPosition` | 标签位置 | `'top' \| 'left'` | `undefined` |
| `labelWidth` | 标签宽度 | `string \| number` | `undefined` |
| `rules` | 单独指定规则 | `FormRule \| FormRule[]` | `undefined` |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 表单控件内容 |
| `label` | 自定义标签内容 |
| `extra` | 标签下方的补充说明 |
