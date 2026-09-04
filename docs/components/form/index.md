<script setup lang="ts">
import FormBasicDemo from './FormBasicDemo.vue'
import FormCustomValidatorDemo from './FormCustomValidatorDemo.vue'
import FormLeftDemo from './FormLeftDemo.vue'

const validateCode = `<template>
  <LForm ref="formRef" :model="model" :rules="rules">
    <LFormItem label="项目名称" prop="name" required>
      <LInput v-model="model.name" placeholder="请输入项目名称" clearable />
    </LFormItem>

    <LFormItem label="邮箱" prop="email">
      <LInput v-model="model.email" placeholder="请输入邮箱" clearable />
    </LFormItem>

    <LButton type="primary" @click="formRef?.validate()">校验</LButton>
    <LButton native-type="reset">重置</LButton>
  </LForm>
<\/template>`

const leftCode = `<template>
  <LForm :model="leftModel" label-position="left" label-width="84px">
    <LFormItem label="账号" prop="account" required>
      <LInput v-model="leftModel.account" placeholder="请输入账号" />
    </LFormItem>
    <LFormItem label="公司" prop="company" message="用于展示组织信息。">
      <LInput v-model="leftModel.company" placeholder="请输入公司名称" />
    </LFormItem>
  </LForm>
<\/template>`

const customValidatorCode = `<template>
  <LForm ref="passwordFormRef" :model="passwordModel" :rules="passwordRules">
    <LFormItem label="密码" prop="password" required>
      <LInput v-model="passwordModel.password" type="password" />
    </LFormItem>
    <LFormItem label="确认密码" prop="confirmPassword" required>
      <LInput v-model="passwordModel.confirmPassword" type="password" />
    </LFormItem>
  </LForm>
<\/template>`
</script>

# Form 表单

用于承载表单布局、字段校验和受控数据重置，适合登录、筛选和后台配置表单场景。

## 基础校验

<DemoBlock title="基础表单" description="支持 rules 配置、字段级联校验，以及原生 reset 重置受控 model。" :code="validateCode">
  <FormBasicDemo />
</DemoBlock>

## 左侧标签

<DemoBlock title="左侧标签布局" description="通过 label-position 和 label-width 可以快速切到更典型的后台表单布局。" :code="leftCode">
  <FormLeftDemo />
</DemoBlock>

## 自定义校验器

<DemoBlock title="自定义校验" description="支持 validator 函数，可实现跨字段校验等场景。" :code="customValidatorCode">
  <FormCustomValidatorDemo />
</DemoBlock>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model` | 表单数据对象 | `Record<string, unknown>` | `{}` |
| `rules` | 表单规则对象 | `Record<string, FormRule \| FormRule[]>` | `{}` |
| `labelPosition` | 标签位置 | `'top' \| 'left'` | `'top'` |
| `labelWidth` | 左侧标签宽度 | `string \| number` | `undefined` |
| `disabled` | 是否整表单禁用 | `boolean` | `false` |
| `showMessage` | 是否展示校验文案 | `boolean` | `true` |

## Exposes

| 方法名 | 说明 | 签名 |
| --- | --- | --- |
| `validate` | 校验全部字段 | `() => Promise<boolean>` |
| `validateField` | 校验指定字段 | `(props: string \| string[]) => Promise<boolean>` |
| `resetFields` | 重置全部或指定字段 | `(props?: string \| string[]) => void` |
| `clearValidate` | 清空全部或指定字段校验状态 | `(props?: string \| string[]) => void` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `submit` | 表单提交时触发 | `(evt: Event)` |
| `reset` | 表单重置时触发 | `(evt: Event)` |
