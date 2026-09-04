<template>
  <form class="l-form" @submit="handleSubmit" @reset="handleReset">
    <slot />
  </form>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import {
  formContextKey,
  normalizeRules,
  type FormEmits,
  type FormExpose,
  type FormFieldContext,
  type FormProps,
} from './types'

defineOptions({ name: 'LForm' })

const props = withDefaults(defineProps<FormProps>(), {
  model: () => ({}),
  rules: () => ({}),
  labelPosition: 'top',
  labelWidth: undefined,
  disabled: false,
  showMessage: true,
})

const emit = defineEmits<FormEmits>()

const fields = new Map<string, FormFieldContext>()

const registerField = (field: FormFieldContext) => {
  fields.set(field.prop, field)
}

const unregisterField = (prop: string) => {
  fields.delete(prop)
}

const getRules = (prop?: string) => {
  if (!prop) return []
  return normalizeRules(props.rules[prop])
}

const validateField = async (propsToValidate: string | string[]) => {
  const propsList = Array.isArray(propsToValidate) ? propsToValidate : [propsToValidate]
  const results = await Promise.all(
    propsList
      .map((prop) => fields.get(prop))
      .filter((field): field is FormFieldContext => Boolean(field))
      .map((field) => field.validate()),
  )
  return results.every(Boolean)
}

const validate = async () => {
  const results = await Promise.all([...fields.values()].map((field) => field.validate()))
  return results.every(Boolean)
}

const resetFields = (propsToReset?: string | string[]) => {
  const propsList = propsToReset
    ? Array.isArray(propsToReset)
      ? propsToReset
      : [propsToReset]
    : [...fields.keys()]

  propsList.forEach((prop) => {
    fields.get(prop)?.resetField()
  })
}

const clearValidate = (propsToClear?: string | string[]) => {
  const propsList = propsToClear
    ? Array.isArray(propsToClear)
      ? propsToClear
      : [propsToClear]
    : [...fields.keys()]

  propsList.forEach((prop) => {
    fields.get(prop)?.clearValidate()
  })
}

provide(formContextKey, {
  model: props.model,
  rules: computed(() => props.rules),
  disabled: computed(() => props.disabled),
  labelPosition: computed(() => props.labelPosition),
  labelWidth: computed(() => props.labelWidth),
  showMessage: computed(() => props.showMessage),
  registerField,
  unregisterField,
  getRules,
})

defineExpose<FormExpose>({
  validate,
  validateField,
  resetFields,
  clearValidate,
})

const handleSubmit = (evt: Event) => {
  evt.preventDefault()
  emit('submit', evt)
}

const handleReset = (evt: Event) => {
  // 使用受控 model 时，原生 reset 不会同步回写响应式数据，这里统一走组件的重置逻辑。
  evt.preventDefault()
  resetFields()
  emit('reset', evt)
}
</script>

<style scoped lang="scss">
.l-form {
  display: block;
}
</style>
