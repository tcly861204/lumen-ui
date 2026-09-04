<template>
  <div
    :class="[
      'l-form-item',
      `l-form-item--${mergedStatus}`,
      `l-form-item--label-${mergedLabelPosition}`,
      {
        'is-required': computedRequired,
      },
    ]"
  >
    <div v-if="hasLabel" class="l-form-item__label-wrap" :style="labelWrapStyle">
      <label class="l-form-item__label" :for="for">
        <slot name="label">
          <span v-if="computedRequired" class="l-form-item__required" aria-hidden="true">*</span>
          <span>{{ label }}</span>
        </slot>
      </label>
    </div>

    <div class="l-form-item__main">
      <div class="l-form-item__content">
        <slot />
      </div>

      <div v-if="displayMessage" class="l-form-item__message">
        {{ displayMessage }}
      </div>

      <div v-if="$slots.extra" class="l-form-item__extra">
        <slot name="extra" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, provide, ref, useSlots } from 'vue'
import {
  cloneFormValue,
  formContextKey,
  formItemContextKey,
  isRuleTriggered,
  normalizeRules,
  resolveRuleMessage,
  statusFromMessage,
  type FormRule,
  type FormValidateTrigger,
} from '../Form/types'
import type { FormItemProps } from './types'

defineOptions({ name: 'LFormItem' })

const props = withDefaults(defineProps<FormItemProps>(), {
  prop: undefined,
  label: '',
  for: undefined,
  required: false,
  message: '',
  error: '',
  status: undefined,
  labelPosition: undefined,
  labelWidth: undefined,
  rules: undefined,
})

const slots = useSlots()
const formContext = inject(formContextKey, null)
const validateState = ref(props.status ?? 'default')
const validateMessage = ref('')
let initialValue = cloneFormValue(getFieldValue())

const hasLabel = computed(() => Boolean(props.label || slots.label))
const mergedLabelPosition = computed(
  () => props.labelPosition ?? formContext?.labelPosition.value ?? 'top',
)
const mergedLabelWidth = computed(() => props.labelWidth ?? formContext?.labelWidth.value)
const mergedRules = computed<FormRule[]>(() => {
  if (props.rules) return normalizeRules(props.rules)
  if (props.prop) return formContext?.getRules(props.prop) ?? []
  return []
})
const computedRequired = computed(
  () => props.required || mergedRules.value.some((rule) => rule.required),
)
const mergedStatus = computed(() => {
  if (props.error) return 'error'
  if (validateMessage.value) return statusFromMessage(validateMessage.value)
  return validateState.value
})
const displayMessage = computed(() => {
  const internalMessage = formContext?.showMessage.value === false ? '' : validateMessage.value
  return props.error || internalMessage || props.message
})
const labelWrapStyle = computed(() => {
  if (mergedLabelPosition.value !== 'left' || mergedLabelWidth.value === undefined) {
    return undefined
  }

  const width =
    typeof mergedLabelWidth.value === 'number'
      ? `${mergedLabelWidth.value}px`
      : mergedLabelWidth.value

  return {
    width,
  }
})

function getFieldValue() {
  if (!formContext || !props.prop) return undefined
  return formContext.model[props.prop]
}

const clearValidate = () => {
  validateState.value = props.status ?? 'default'
  validateMessage.value = ''
}

const validate = async (trigger?: FormValidateTrigger) => {
  if (!props.prop || !formContext) {
    clearValidate()
    return true
  }

  const rules = mergedRules.value.filter((rule) => isRuleTriggered(rule, trigger))
  if (!rules.length) {
    clearValidate()
    return true
  }

  const value = getFieldValue()

  for (const rule of rules) {
    if (rule.required) {
      const empty =
        value === undefined ||
        value === null ||
        value === '' ||
        (Array.isArray(value) && value.length === 0)
      if (empty) {
        validateState.value = 'error'
        validateMessage.value = resolveRuleMessage(rule, '该字段为必填项')
        return false
      }
    }

    if (rule.pattern && typeof value === 'string' && value && !rule.pattern.test(value)) {
      validateState.value = 'error'
      validateMessage.value = resolveRuleMessage(rule, '字段格式不正确')
      return false
    }

    if (rule.validator) {
      const result = await rule.validator(value, formContext.model)
      if (result !== true) {
        validateState.value = 'error'
        validateMessage.value = resolveRuleMessage(rule, '字段校验未通过', result)
        return false
      }
    }
  }

  validateState.value = mergedRules.value.length ? 'success' : props.status ?? 'default'
  validateMessage.value = ''
  return true
}

const resetField = () => {
  if (formContext && props.prop) {
    formContext.model[props.prop] = cloneFormValue(initialValue)
  }
  clearValidate()
}

const notifyChange = () => {
  void validate('change')
}

const notifyBlur = () => {
  void validate('blur')
}

provide(formItemContextKey, {
  prop: props.prop,
  notifyChange,
  notifyBlur,
})

onMounted(() => {
  initialValue = cloneFormValue(getFieldValue())
  if (formContext && props.prop) {
    formContext.registerField({
      prop: props.prop,
      validate,
      clearValidate,
      resetField,
    })
  }
})

onBeforeUnmount(() => {
  if (props.prop) {
    formContext?.unregisterField(props.prop)
  }
})
</script>

<style scoped lang="scss">
.l-form-item {
  --l-form-item-label-color: #{$l-color-text-regular};
  --l-form-item-message-color: #{$l-color-text-secondary};
  display: flex;
  flex-direction: column;
  gap: 8px;

  & + & {
    margin-top: 18px;
  }

  &--label-left {
    flex-direction: row;
    align-items: flex-start;
    gap: 14px;

    .l-form-item__label-wrap {
      flex-shrink: 0;
      padding-top: 8px;
    }

    .l-form-item__main {
      min-width: 0;
      flex: 1;
    }
  }

  &--success {
    --l-form-item-message-color: #{$l-color-success};
  }

  &--warning {
    --l-form-item-message-color: #{$l-color-warning};
  }

  &--error {
    --l-form-item-message-color: #{$l-color-danger};
    --l-form-item-label-color: #{$l-color-danger};
  }
}

.l-form-item__label-wrap {
  display: inline-flex;
}

.l-form-item__label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: $l-font-size-small;
  font-weight: $l-font-weight-primary;
  line-height: 1.4;
  color: var(--l-form-item-label-color);
}

.l-form-item__required {
  color: $l-color-danger;
}

.l-form-item__main {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.l-form-item__content {
  min-width: 0;
}

.l-form-item__message,
.l-form-item__extra {
  font-size: $l-font-size-extra-small;
  line-height: 1.5;
}

.l-form-item__message {
  color: var(--l-form-item-message-color);
}

.l-form-item__extra {
  color: $l-color-text-secondary;
}
</style>
