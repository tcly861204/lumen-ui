<template>
  <label
    :class="[
      'l-input',
      `l-input--${size}`,
      `l-input--${status}`,
      {
        'is-disabled': mergedDisabled,
        'is-focus': isFocused,
        'is-borderless': borderless,
        'has-prefix': hasPrefix,
        'has-suffix': hasSuffix,
      },
    ]"
  >
    <span v-if="hasPrefix" class="l-input__prefix">
      <slot name="prefix">
        <LIcon v-if="prefixIcon" :icon="prefixIcon" />
      </slot>
    </span>

    <input
      class="l-input__inner"
      :value="modelValue"
      :type="type"
      :name="name"
      :disabled="mergedDisabled"
      :readonly="readonly"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      v-bind="$attrs"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <button
      v-if="showClear"
      type="button"
      class="l-input__clear"
      aria-label="清空输入内容"
      @mousedown.prevent
      @click="handleClear"
    >
      <LIcon :icon="X" />
    </button>

    <span v-else-if="hasSuffix" class="l-input__suffix">
      <slot name="suffix">
        <LIcon v-if="suffixIcon" :icon="suffixIcon" />
      </slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject, ref, useSlots } from 'vue'
import { X } from 'lucide-vue-next'
import { LIcon } from '../Icon'
import { formContextKey, formItemContextKey } from '../Form/types'
import type { InputProps } from './types'

defineOptions({
  name: 'LInput',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  placeholder: '',
  size: 'default',
  status: 'default',
  disabled: false,
  readonly: false,
  clearable: false,
  borderless: false,
  type: 'text',
  prefixIcon: undefined,
  suffixIcon: undefined,
  name: undefined,
  autocomplete: 'off',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string, evt: Event): void
  (e: 'change', value: string, evt: Event): void
  (e: 'focus', evt: FocusEvent): void
  (e: 'blur', evt: FocusEvent): void
  (e: 'clear'): void
}>()

const slots = useSlots()
const formContext = inject(formContextKey, null)
const formItemContext = inject(formItemContextKey, null)
const isFocused = ref(false)
const mergedDisabled = computed(() => props.disabled || formContext?.disabled.value === true)

const hasPrefix = computed(() => Boolean(slots.prefix || props.prefixIcon))
const hasSuffix = computed(() => Boolean(slots.suffix || props.suffixIcon))
const showClear = computed(
  () =>
    props.clearable &&
    !mergedDisabled.value &&
    !props.readonly &&
    !!props.modelValue &&
    isFocused.value,
)

const handleInput = (evt: Event) => {
  const value = (evt.target as HTMLInputElement).value
  emit('update:modelValue', value)
  emit('input', value, evt)
  formItemContext?.notifyChange()
}

const handleChange = (evt: Event) => {
  const value = (evt.target as HTMLInputElement).value
  emit('change', value, evt)
}

const handleFocus = (evt: FocusEvent) => {
  isFocused.value = true
  emit('focus', evt)
}

const handleBlur = (evt: FocusEvent) => {
  isFocused.value = false
  emit('blur', evt)
  formItemContext?.notifyBlur()
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
  formItemContext?.notifyChange()
}
</script>

<style scoped lang="scss">
.l-input {
  --l-input-height: 34px;
  --l-input-padding-x: 11px;
  --l-input-font-size: #{$l-font-size-base};
  --l-input-border-color: #{$l-border-color-base};
  --l-input-shadow-color: #{rgba($l-color-primary, 0.16)};
  display: inline-flex;
  align-items: center;
  width: 100%;
  max-width: 280px;
  height: var(--l-input-height);
  padding: 0 var(--l-input-padding-x);
  gap: $l-spacing-sm;
  color: $l-color-text-primary;
  background: $l-color-white;
  border: 1px solid var(--l-input-border-color);
  border-radius: 8px;
  box-sizing: border-box;
  @include transition(border-color, box-shadow, background-color);

  &:hover {
    --l-input-border-color: #{$l-border-color-dark};
  }

  &.is-focus {
    --l-input-border-color: #{$l-color-primary};
    box-shadow: 0 0 0 2px var(--l-input-shadow-color);
  }

  &.is-disabled {
    color: $l-color-text-disabled;
    background: $l-bg-color-page;
    cursor: not-allowed;

    .l-input__inner {
      cursor: not-allowed;
      color: $l-color-text-disabled;
    }
  }

  &.is-borderless {
    background: transparent;
    border-color: transparent;
    box-shadow: none;

    &:hover,
    &.is-focus {
      --l-input-border-color: transparent;
      box-shadow: none;
    }
  }

  &--success {
    --l-input-border-color: #{color.mix($l-color-success, $l-color-white, 55%)};
    --l-input-shadow-color: #{rgba($l-color-success, 0.16)};
  }

  &--warning {
    --l-input-border-color: #{color.mix($l-color-warning, $l-color-white, 55%)};
    --l-input-shadow-color: #{rgba($l-color-warning, 0.16)};
  }

  &--error {
    --l-input-border-color: #{color.mix($l-color-danger, $l-color-white, 55%)};
    --l-input-shadow-color: #{rgba($l-color-danger, 0.16)};
  }

  &--large {
    --l-input-height: 40px;
    --l-input-padding-x: 13px;
    --l-input-font-size: #{$l-font-size-medium};
    border-radius: 10px;
  }

  &--small {
    --l-input-height: 30px;
    --l-input-padding-x: 9px;
    --l-input-font-size: #{$l-font-size-extra-small};
    border-radius: 7px;
  }
}

.l-input__inner {
  flex: 1;
  width: 100%;
  min-width: 0;
  height: 100%;
  padding: 0;
  font: inherit;
  font-size: var(--l-input-font-size);
  color: inherit;
  background: transparent;
  border: none;
  outline: none;

  &::placeholder {
    color: $l-color-text-placeholder;
  }
}

.l-input__prefix,
.l-input__suffix,
.l-input__clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: $l-color-text-secondary;
  flex-shrink: 0;
}

.l-input__clear {
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  @include transition(color);

  &:hover {
    color: $l-color-text-regular;
  }
}
</style>
