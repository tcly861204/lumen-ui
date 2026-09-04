<template>
  <div class="lumen-demo-row">
    <LTag
      v-for="(tag, index) in tags"
      :key="tag.label"
      :type="tag.type"
      closable
      round
      @close="removeTag(index)"
    >
      {{ tag.label }}
    </LTag>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tags = ref([
  { type: 'primary', label: 'Vue 3' },
  { type: 'success', label: 'TypeScript' },
  { type: 'info', label: 'VitePress' },
])

const removeTag = (index: number) => {
  tags.value.splice(index, 1)
}
</script>
