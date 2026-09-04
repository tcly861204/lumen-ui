<template>
  <div class="demo-block">
    <div class="demo-block__preview">
      <slot />
    </div>

    <div class="demo-block__footer">
      <div class="demo-block__meta">
        <div v-if="title" class="demo-block__title">{{ title }}</div>
        <div v-if="description" class="demo-block__description">{{ description }}</div>
      </div>

      <div class="demo-block__actions">
        <button class="demo-block__action" type="button" @click="handleCopy">
          {{ copied ? '已复制' : '复制代码' }}
        </button>
        <button class="demo-block__action" type="button" @click="expanded = !expanded">
          {{ expanded ? '收起代码' : '查看代码' }}
        </button>
      </div>
    </div>

    <div v-if="expanded" class="demo-block__source">
      <pre><code>{{ code }}</code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface DemoBlockProps {
  title?: string
  description?: string
  code: string
}

const props = withDefaults(defineProps<DemoBlockProps>(), {
  title: '',
  description: '',
})

const expanded = ref(false)
const copied = ref(false)

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    window.setTimeout(() => {
      copied.value = false
    }, 1200)
  } catch {
    copied.value = false
  }
}
</script>

<style scoped>
.demo-block {
  overflow: hidden;
  background: var(--l-bg-color-overlay);
  border: 1px solid var(--l-border-color-light);
  border-radius: 14px;
  box-shadow:
    0 10px 30px rgba(15, 23, 42, 0.05),
    0 0 0 1px rgba(15, 23, 42, 0.02);
}

.demo-block__preview {
  padding: 24px;
}

.demo-block__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 20px;
  border-top: 1px solid var(--l-border-color-light);
  background: color-mix(in srgb, var(--l-bg-color-page) 72%, transparent);
}

.demo-block__meta {
  min-width: 0;
}

.demo-block__title {
  font-size: 14px;
  font-weight: 600;
  color: var(--l-color-text-primary);
}

.demo-block__description {
  margin-top: 4px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--l-color-text-secondary);
}

.demo-block__actions {
  display: inline-flex;
  gap: 8px;
}

.demo-block__action {
  height: 30px;
  padding: 0 12px;
  color: var(--l-color-text-regular);
  background: var(--l-bg-color-overlay);
  border: 1px solid var(--l-border-color-light);
  border-radius: 999px;
  cursor: pointer;
  transition:
    color var(--l-transition-duration-fast),
    border-color var(--l-transition-duration-fast),
    background-color var(--l-transition-duration-fast);
}

.demo-block__action:hover {
  color: var(--l-color-primary);
  border-color: var(--l-color-primary-light-5);
  background: var(--l-color-primary-light-9);
}

.demo-block__source {
  overflow: auto;
  padding: 16px 20px;
  border-top: 1px solid var(--l-border-color-light);
  background: color-mix(in srgb, var(--l-bg-color-page) 86%, transparent);
}

.demo-block__source pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.demo-block__source code {
  font-size: 13px;
  line-height: 1.7;
}

@media (max-width: 768px) {
  .demo-block__footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
