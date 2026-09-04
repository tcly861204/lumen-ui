<template>
  <button
    :class="[
      'l-button',
      `l-button--${type}`,
      `l-button--${size}`,
      {
        'is-disabled': disabled || loading,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
      },
    ]"
    :type="nativeType"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    @click="handleClick"
  >
    <span v-if="loading" class="l-button__loading">
      <svg class="l-button__spinner" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="3" />
      </svg>
    </span>
    <span v-if="$slots.icon && !loading" class="l-button__icon">
      <slot name="icon" />
    </span>
    <span v-if="$slots.default" class="l-button__text">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'
import type { LType, LSize } from '../../types'

// 组件名
defineOptions({ name: 'LButton' })

// Props 定义
interface ButtonProps {
  /** 按钮类型 */
  type?: LType
  /** 按钮尺寸 */
  size?: LSize
  /** 是否朴素（白底带边框） */
  plain?: boolean
  /** 是否圆角胶囊 */
  round?: boolean
  /** 是否圆形 */
  circle?: boolean
  /** 加载中 */
  loading?: boolean
  /** 禁用 */
  disabled?: boolean
  /** 原生 type */
  nativeType?: 'button' | 'submit' | 'reset'
  /** 自动聚焦 */
  autofocus?: boolean
  /** 节流间隔（毫秒），0 表示不节流 */
  throttleDuration?: number
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  size: 'default',
  plain: false,
  round: false,
  circle: false,
  loading: false,
  disabled: false,
  nativeType: 'button',
  autofocus: false,
  throttleDuration: 0,
})

const emit = defineEmits<{
  (e: 'click', evt: MouseEvent): void
}>()

const slots = useSlots()

// 节流处理：避免重复点击
let lastClickTime = 0
const handleClick = (evt: MouseEvent) => {
  if (props.disabled || props.loading) {
    evt.preventDefault()
    evt.stopPropagation()
    return
  }
  const now = Date.now()
  if (props.throttleDuration > 0 && now - lastClickTime < props.throttleDuration) {
    evt.preventDefault()
    evt.stopPropagation()
    return
  }
  lastClickTime = now
  emit('click', evt)
}

// 暴露 slot 检测（避免 lint 警告）
void slots
</script>

<style lang="scss" scoped>
.l-button {
  --l-button-text-color: var(--l-color-text-regular);
  --l-button-bg-color: var(--l-bg-color-overlay);
  --l-button-border-color: var(--l-border-color-base);
  --l-button-shadow: var(--l-shadow-button-base);
  --l-button-hover-text-color: var(--l-color-primary);
  --l-button-hover-bg-color: var(--l-color-primary-light-9);
  --l-button-hover-border-color: var(--l-color-primary-light-5);
  --l-button-focus-border-color: var(--l-color-primary-light-5);
  --l-button-focus-shadow: 0 0 0 2px var(--l-shadow-color-primary-focus);
  --l-button-active-text-color: var(--l-color-primary-dark-2);
  --l-button-active-bg-color: var(--l-color-primary-light-8);
  --l-button-active-border-color: var(--l-color-primary);
  --l-button-plain-text-color: var(--l-color-primary);
  --l-button-plain-bg-color: var(--l-color-primary-light-9);
  --l-button-plain-border-color: var(--l-color-primary-light-5);
  --l-button-plain-hover-text-color: var(--l-color-white);
  --l-button-plain-hover-bg-color: var(--l-color-primary);
  --l-button-plain-hover-border-color: var(--l-color-primary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $l-spacing-xs;
  line-height: 1;
  height: 34px;
  padding: 0 15px;
  margin: 0;
  font-size: var(--l-font-size-base);
  font-weight: $l-font-weight-primary;
  color: var(--l-button-text-color);
  background: var(--l-button-bg-color);
  border: 1px solid var(--l-button-border-color);
  border-radius: 8px;
  box-shadow: var(--l-button-shadow);
  cursor: pointer;
  outline: none;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  @include transition(color, background-color, border-color, box-shadow, transform);

  &:hover {
    color: var(--l-button-hover-text-color);
    background: var(--l-button-hover-bg-color);
    border-color: var(--l-button-hover-border-color);
  }

  &:focus-visible {
    border-color: var(--l-button-focus-border-color);
    box-shadow: var(--l-button-focus-shadow);
  }

  &:active {
    color: var(--l-button-active-text-color);
    border-color: var(--l-button-active-border-color);
    background: var(--l-button-active-bg-color);
    transform: translateY(0.5px);
  }

  & + & {
    margin-left: $l-spacing-sm;
  }

  &.is-plain {
    color: var(--l-button-plain-text-color);
    background: var(--l-button-plain-bg-color);
    border-color: var(--l-button-plain-border-color);

    &:hover {
      color: var(--l-button-plain-hover-text-color);
      background: var(--l-button-plain-hover-bg-color);
      border-color: var(--l-button-plain-hover-border-color);
    }
  }

  &.is-round {
    border-radius: 999px;
  }

  &.is-circle {
    gap: 0;
    border-radius: $l-border-radius-circle;
    padding: 0;
    width: 34px;
  }

  &.is-disabled,
  &:disabled {
    color: var(--l-color-text-placeholder);
    cursor: not-allowed;
    background: var(--l-bg-color-overlay);
    border-color: var(--l-border-color-lighter);
    box-shadow: none;
    transform: none;

    &:hover {
      color: var(--l-color-text-placeholder);
      background: var(--l-bg-color-overlay);
      border-color: var(--l-border-color-lighter);
      transform: none;
      box-shadow: none;
    }
  }

  &.is-loading {
    cursor: wait;
  }

  &--large {
    height: 40px;
    padding: 0 19px;
    font-size: var(--l-font-size-medium);
    border-radius: 10px;

    &.is-circle {
      width: 40px;
    }
  }

  &--small {
    height: 28px;
    padding: 0 11px;
    font-size: var(--l-font-size-extra-small);
    border-radius: 7px;

    &.is-circle {
      width: 28px;
    }
  }

  &--primary {
    --l-button-text-color: var(--l-color-white);
    --l-button-bg-color: var(--l-color-primary);
    --l-button-border-color: var(--l-color-primary);
    --l-button-shadow: var(--l-shadow-button-primary);
    --l-button-hover-text-color: var(--l-color-white);
    --l-button-hover-bg-color: var(--l-color-primary-light-3);
    --l-button-hover-border-color: var(--l-color-primary-light-3);
    --l-button-focus-border-color: var(--l-color-primary-light-3);
    --l-button-focus-shadow: 0 0 0 2px var(--l-shadow-color-primary-focus-strong);
    --l-button-active-text-color: var(--l-color-white);
    --l-button-active-bg-color: var(--l-color-primary-dark-2);
    --l-button-active-border-color: var(--l-color-primary-dark-2);
    --l-button-plain-text-color: var(--l-color-primary);
    --l-button-plain-bg-color: var(--l-color-primary-light-9);
    --l-button-plain-border-color: var(--l-color-primary-light-5);
    --l-button-plain-hover-text-color: var(--l-color-white);
    --l-button-plain-hover-bg-color: var(--l-color-primary);
    --l-button-plain-hover-border-color: var(--l-color-primary);
  }

  &--success {
    --l-button-text-color: var(--l-color-white);
    --l-button-bg-color: var(--l-color-success);
    --l-button-border-color: var(--l-color-success);
    --l-button-hover-text-color: var(--l-color-white);
    --l-button-hover-bg-color: var(--l-color-success-light-3);
    --l-button-hover-border-color: var(--l-color-success-light-3);
    --l-button-focus-border-color: var(--l-color-success-light-3);
    --l-button-focus-shadow: 0 0 0 2px var(--l-shadow-color-success-focus);
    --l-button-active-text-color: var(--l-color-white);
    --l-button-active-bg-color: var(--l-color-success-dark-2);
    --l-button-active-border-color: var(--l-color-success-dark-2);
    --l-button-plain-text-color: var(--l-color-success);
    --l-button-plain-bg-color: var(--l-color-success-light-9);
    --l-button-plain-border-color: var(--l-color-success-light-3);
    --l-button-plain-hover-text-color: var(--l-color-white);
    --l-button-plain-hover-bg-color: var(--l-color-success);
    --l-button-plain-hover-border-color: var(--l-color-success);
  }

  &--warning {
    --l-button-text-color: var(--l-color-white);
    --l-button-bg-color: var(--l-color-warning);
    --l-button-border-color: var(--l-color-warning);
    --l-button-hover-text-color: var(--l-color-white);
    --l-button-hover-bg-color: var(--l-color-warning-light-3);
    --l-button-hover-border-color: var(--l-color-warning-light-3);
    --l-button-focus-border-color: var(--l-color-warning-light-3);
    --l-button-focus-shadow: 0 0 0 2px var(--l-shadow-color-warning-focus);
    --l-button-active-text-color: var(--l-color-white);
    --l-button-active-bg-color: var(--l-color-warning-dark-2);
    --l-button-active-border-color: var(--l-color-warning-dark-2);
    --l-button-plain-text-color: var(--l-color-warning);
    --l-button-plain-bg-color: var(--l-color-warning-light-9);
    --l-button-plain-border-color: var(--l-color-warning-light-3);
    --l-button-plain-hover-text-color: var(--l-color-white);
    --l-button-plain-hover-bg-color: var(--l-color-warning);
    --l-button-plain-hover-border-color: var(--l-color-warning);
  }

  &--danger {
    --l-button-text-color: var(--l-color-white);
    --l-button-bg-color: var(--l-color-danger);
    --l-button-border-color: var(--l-color-danger);
    --l-button-hover-text-color: var(--l-color-white);
    --l-button-hover-bg-color: var(--l-color-danger-light-3);
    --l-button-hover-border-color: var(--l-color-danger-light-3);
    --l-button-focus-border-color: var(--l-color-danger-light-3);
    --l-button-focus-shadow: 0 0 0 2px var(--l-shadow-color-danger-focus);
    --l-button-active-text-color: var(--l-color-white);
    --l-button-active-bg-color: var(--l-color-danger-dark-2);
    --l-button-active-border-color: var(--l-color-danger-dark-2);
    --l-button-plain-text-color: var(--l-color-danger);
    --l-button-plain-bg-color: var(--l-color-danger-light-9);
    --l-button-plain-border-color: var(--l-color-danger-light-3);
    --l-button-plain-hover-text-color: var(--l-color-white);
    --l-button-plain-hover-bg-color: var(--l-color-danger);
    --l-button-plain-hover-border-color: var(--l-color-danger);
  }

  &--info {
    --l-button-text-color: var(--l-color-white);
    --l-button-bg-color: var(--l-color-info);
    --l-button-border-color: var(--l-color-info);
    --l-button-hover-text-color: var(--l-color-white);
    --l-button-hover-bg-color: var(--l-color-info-light-3);
    --l-button-hover-border-color: var(--l-color-info-light-3);
    --l-button-focus-border-color: var(--l-color-info-light-3);
    --l-button-focus-shadow: 0 0 0 2px var(--l-shadow-color-info-focus);
    --l-button-active-text-color: var(--l-color-white);
    --l-button-active-bg-color: var(--l-color-info-dark-2);
    --l-button-active-border-color: var(--l-color-info-dark-2);
    --l-button-plain-text-color: var(--l-color-info);
    --l-button-plain-bg-color: var(--l-color-info-light-9);
    --l-button-plain-border-color: var(--l-color-info-light-3);
    --l-button-plain-hover-text-color: var(--l-color-white);
    --l-button-plain-hover-bg-color: var(--l-color-info);
    --l-button-plain-hover-border-color: var(--l-color-info);
  }
}

.l-button__loading {
  display: inline-flex;
}

.l-button__spinner {
  width: 1em;
  height: 1em;
  animation: l-button-spin 1s linear infinite;
}

.l-button__icon {
  display: inline-flex;
  font-size: inherit;

  :deep(svg) {
    width: 1em;
    height: 1em;
    stroke-width: 2;
    flex-shrink: 0;
  }
}

.l-button__text {
  display: inline-flex;
  align-items: center;
}

@media (prefers-reduced-motion: reduce) {
  .l-button {
    transition: none;

    &:hover,
    &:active {
      transform: none;
    }
  }
}

@keyframes l-button-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
