<template>
  <span
    :class="[
      'l-tag',
      `l-tag--${type}`,
      `l-tag--${size}`,
      {
        'is-plain': plain,
        'is-round': round,
      },
    ]"
  >
    <span class="l-tag__content">
      <slot />
    </span>

    <button
      v-if="closable"
      type="button"
      class="l-tag__close"
      aria-label="关闭标签"
      @click="handleClose"
    >
      <LIcon :icon="X" size="0.9em" />
    </button>
  </span>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { LIcon } from '../Icon'
import type { TagProps } from './types'

defineOptions({ name: 'LTag' })

withDefaults(defineProps<TagProps>(), {
  type: 'default',
  size: 'default',
  plain: false,
  round: false,
  closable: false,
})

const emit = defineEmits<{
  (e: 'close', evt: MouseEvent): void
}>()

const handleClose = (evt: MouseEvent) => {
  evt.stopPropagation()
  emit('close', evt)
}
</script>

<style scoped lang="scss">
.l-tag {
  --l-tag-text: #{$l-color-text-regular};
  --l-tag-border: #{$l-border-color-light};
  --l-tag-bg: #{$l-bg-color-page};
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 24px;
  padding: 0 9px;
  font-size: $l-font-size-extra-small;
  font-weight: $l-font-weight-primary;
  line-height: 1;
  color: var(--l-tag-text);
  background: var(--l-tag-bg);
  border: 1px solid var(--l-tag-border);
  border-radius: 6px;
  box-sizing: border-box;

  &.is-round {
    border-radius: 999px;
  }

  &.is-plain {
    background: $l-color-white;
  }

  &--large {
    height: 28px;
    padding: 0 11px;
    font-size: $l-font-size-small;
    border-radius: 7px;
  }

  &--small {
    height: 22px;
    padding: 0 8px;
    font-size: 11px;
    border-radius: 5px;
  }

  &--default {
    --l-tag-text: #{$l-color-text-regular};
    --l-tag-border: #{$l-border-color-light};
    --l-tag-bg: #{$l-bg-color-page};
  }

  &--primary {
    --l-tag-text: #{$l-color-primary};
    --l-tag-border: #{color.mix($l-color-primary, $l-color-white, 32%)};
    --l-tag-bg: #{$l-color-primary-light-9};
  }

  &--success {
    --l-tag-text: #{$l-color-success};
    --l-tag-border: #{color.mix($l-color-success, $l-color-white, 32%)};
    --l-tag-bg: #{$l-color-success-light-9};
  }

  &--warning {
    --l-tag-text: #{$l-color-warning};
    --l-tag-border: #{color.mix($l-color-warning, $l-color-white, 32%)};
    --l-tag-bg: #{$l-color-warning-light-9};
  }

  &--danger {
    --l-tag-text: #{$l-color-danger};
    --l-tag-border: #{color.mix($l-color-danger, $l-color-white, 32%)};
    --l-tag-bg: #{$l-color-danger-light-9};
  }

  &--info {
    --l-tag-text: #{$l-color-info};
    --l-tag-border: #{color.mix($l-color-info, $l-color-white, 32%)};
    --l-tag-bg: #{$l-color-info-light-9};
  }
}

.l-tag__content {
  display: inline-flex;
  align-items: center;
}

.l-tag__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  padding: 0;
  color: inherit;
  background: transparent;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  opacity: 0.75;
  @include transition(background-color, opacity);

  &:hover {
    background: rgba($l-color-black, 0.06);
    opacity: 1;
  }
}
</style>
