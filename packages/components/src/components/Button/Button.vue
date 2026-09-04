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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $l-spacing-xs;
  line-height: 1;
  height: 34px;
  padding: 0 15px;
  margin: 0;
  font-size: $l-font-size-base;
  font-weight: $l-font-weight-primary;
  color: $l-color-text-regular;
  background: $l-color-white;
  border: 1px solid $l-border-color-base;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba($l-color-black, 0.03);
  cursor: pointer;
  outline: none;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  @include transition(color, background-color, border-color, box-shadow, transform);

  &:hover {
    color: $l-color-primary;
    background: $l-color-primary-light-9;
    border-color: $l-color-primary-light-5;
  }

  &:focus-visible {
    border-color: $l-color-primary-light-5;
    box-shadow: 0 0 0 2px rgba($l-color-primary, 0.16);
  }

  &:active {
    color: color.scale($l-color-primary, $lightness: -8%);
    border-color: color.scale($l-color-primary-light-5, $lightness: -6%);
    background: color.scale($l-color-primary-light-9, $lightness: -2%);
    transform: translateY(0.5px);
  }

  & + & {
    margin-left: $l-spacing-sm;
  }

  &.is-plain {
    color: $l-color-primary;
    background: $l-color-primary-light-9;
    border-color: $l-color-primary-light-5;

    &:hover {
      color: $l-color-white;
      background: $l-color-primary;
      border-color: $l-color-primary;
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
    color: $l-color-text-placeholder;
    cursor: not-allowed;
    background: $l-color-white;
    border-color: $l-border-color-lighter;
    box-shadow: none;
    transform: none;

    &:hover {
      color: $l-color-text-placeholder;
      background: $l-color-white;
      border-color: $l-border-color-lighter;
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
    font-size: $l-font-size-medium;
    border-radius: 10px;

    &.is-circle {
      width: 40px;
    }
  }

  &--small {
    height: 28px;
    padding: 0 11px;
    font-size: $l-font-size-extra-small;
    border-radius: 7px;

    &.is-circle {
      width: 28px;
    }
  }

  &--primary {
    color: $l-color-white;
    background: $l-color-primary;
    border-color: $l-color-primary;
    box-shadow: 0 1px 2px rgba($l-color-primary, 0.2);

    &:hover {
      color: $l-color-white;
      background: $l-color-primary-light-3;
      border-color: $l-color-primary-light-3;
    }

    &:focus-visible {
      border-color: $l-color-primary-light-3;
      box-shadow: 0 0 0 2px rgba($l-color-primary, 0.24);
    }

    &:active {
      color: $l-color-white;
      background: $l-color-primary-dark-2;
      border-color: $l-color-primary-dark-2;
      transform: translateY(0.5px);
    }

    &.is-plain {
      color: $l-color-primary;
      background: $l-color-primary-light-9;
      border-color: $l-color-primary-light-5;

      &:hover {
        color: $l-color-white;
        background: $l-color-primary;
        border-color: $l-color-primary;
      }
    }
  }

  &--success {
    color: $l-color-white;
    background: $l-color-success;
    border-color: $l-color-success;

    &:hover {
      color: $l-color-white;
      background: color.scale($l-color-success, $lightness: 8%);
      border-color: color.scale($l-color-success, $lightness: 8%);
    }

    &:active {
      color: $l-color-white;
      background: color.scale($l-color-success, $lightness: -8%);
      border-color: color.scale($l-color-success, $lightness: -8%);
    }

    &.is-plain {
      color: $l-color-success;
      background: $l-color-success-light-9;
      border-color: color.mix($l-color-success, $l-color-white, 35%);

      &:hover {
        color: $l-color-white;
        background: $l-color-success;
        border-color: $l-color-success;
      }
    }
  }

  &--warning {
    color: $l-color-white;
    background: $l-color-warning;
    border-color: $l-color-warning;

    &:hover {
      color: $l-color-white;
      background: color.scale($l-color-warning, $lightness: 8%);
      border-color: color.scale($l-color-warning, $lightness: 8%);
    }

    &:active {
      color: $l-color-white;
      background: color.scale($l-color-warning, $lightness: -8%);
      border-color: color.scale($l-color-warning, $lightness: -8%);
    }

    &.is-plain {
      color: $l-color-warning;
      background: $l-color-warning-light-9;
      border-color: color.mix($l-color-warning, $l-color-white, 35%);

      &:hover {
        color: $l-color-white;
        background: $l-color-warning;
        border-color: $l-color-warning;
      }
    }
  }

  &--danger {
    color: $l-color-white;
    background: $l-color-danger;
    border-color: $l-color-danger;

    &:hover {
      color: $l-color-white;
      background: color.scale($l-color-danger, $lightness: 8%);
      border-color: color.scale($l-color-danger, $lightness: 8%);
    }

    &:active {
      color: $l-color-white;
      background: color.scale($l-color-danger, $lightness: -8%);
      border-color: color.scale($l-color-danger, $lightness: -8%);
    }

    &.is-plain {
      color: $l-color-danger;
      background: $l-color-danger-light-9;
      border-color: color.mix($l-color-danger, $l-color-white, 35%);

      &:hover {
        color: $l-color-white;
        background: $l-color-danger;
        border-color: $l-color-danger;
      }
    }
  }

  &--info {
    color: $l-color-white;
    background: $l-color-info;
    border-color: $l-color-info;

    &:hover {
      color: $l-color-white;
      background: color.scale($l-color-info, $lightness: 8%);
      border-color: color.scale($l-color-info, $lightness: 8%);
    }

    &:active {
      color: $l-color-white;
      background: color.scale($l-color-info, $lightness: -8%);
      border-color: color.scale($l-color-info, $lightness: -8%);
    }

    &.is-plain {
      color: $l-color-info;
      background: $l-color-info-light-9;
      border-color: color.mix($l-color-info, $l-color-white, 35%);

      &:hover {
        color: $l-color-white;
        background: $l-color-info;
        border-color: $l-color-info;
      }
    }
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
