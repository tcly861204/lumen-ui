<script setup lang="ts">
import ButtonBasicDemo from './ButtonBasicDemo.vue'
import ButtonPlainDemo from './ButtonPlainDemo.vue'
import ButtonStatesDemo from './ButtonStatesDemo.vue'

const basicCode = `<template>
  <LButton>默认按钮</LButton>
  <LButton type="primary">主要按钮</LButton>
  <LButton type="success">成功按钮</LButton>
  <LButton type="warning">警告按钮</LButton>
  <LButton type="danger">危险按钮</LButton>
<\/template>`

const plainCode = `<template>
  <LButton type="primary" plain>朴素按钮</LButton>
  <LButton type="success" plain>成功按钮</LButton>
  <LButton type="danger" plain>危险按钮</LButton>
<\/template>`

const stateCode = `<template>
  <LButton type="primary">默认</LButton>
  <LButton type="primary" loading>加载中</LButton>
  <LButton type="primary" disabled>禁用</LButton>
  <LButton type="primary" round>圆角</LButton>
<\/template>`
</script>

# Button 按钮

用于触发一个即时操作，也适合作为表单提交、重置和状态反馈的主要入口。

## 基础用法

<DemoBlock title="按钮类型" description="提供默认、主色、成功、警告、危险等语义按钮。" :code="basicCode">
  <ButtonBasicDemo />
</DemoBlock>

## 朴素风格

<DemoBlock title="朴素按钮" description="适合二级操作或页面中对比度更轻的按钮。" :code="plainCode">
  <ButtonPlainDemo />
</DemoBlock>

## 状态

<DemoBlock title="状态组合" description="支持 loading、disabled、round 等常见状态。" :code="stateCode">
  <ButtonStatesDemo />
</DemoBlock>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 按钮类型 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` |
| `size` | 按钮尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| `plain` | 是否为朴素按钮 | `boolean` | `false` |
| `round` | 是否为圆角按钮 | `boolean` | `false` |
| `circle` | 是否为圆形按钮 | `boolean` | `false` |
| `loading` | 是否显示加载态 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `nativeType` | 原生按钮类型 | `'button' \| 'submit' \| 'reset'` | `'button'` |
