<template>
  <div class="lumen-demo-row" style="font-size: 16px;">
    <span>
      查看详情
      <LIcon :icon="ChevronRight" size="1em" style="margin-left: 4px;" />
    </span>
    <span style="font-size: 20px;">
      Continue
      <LIcon :icon="ChevronRight" size="1em" style="margin-left: 6px;" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight } from '@lumen/components'
</script>
