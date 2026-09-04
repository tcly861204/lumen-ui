<template>
  <span class="l-icon" :aria-hidden="ariaHidden">
    <component
      :is="icon"
      class="l-icon__svg"
      :size="size"
      :color="color"
      :stroke-width="strokeWidth"
      :aria-hidden="ariaHidden"
      :aria-label="ariaLabel"
      role="img"
      v-bind="$attrs"
    />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { LIconProps } from './types'

const props = withDefaults(defineProps<LIconProps>(), {
  size: '1em',
  color: 'currentColor',
  strokeWidth: 2,
  ariaLabel: undefined,
})

defineOptions({
  name: 'LIcon',
  inheritAttrs: false,
})
const ariaHidden = computed(() => (props.ariaLabel ? undefined : 'true'))
</script>

<style scoped lang="scss">
.l-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  vertical-align: middle;
  flex-shrink: 0;
}

.l-icon__svg {
  display: block;
  flex-shrink: 0;
}
</style>
