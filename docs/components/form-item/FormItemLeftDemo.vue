<template>
  <div style="display: grid; gap: 16px; width: 520px;">
    <LFormItem label="账号" label-position="left" label-width="72px" required>
      <LInput v-model="account" placeholder="请输入账号" />
    </LFormItem>

    <LFormItem
      label="搜索"
      label-position="left"
      label-width="72px"
      message="支持按组件名或关键词搜索。"
    >
      <LInput v-model="keyword" placeholder="搜索组件" :prefix-icon="Search" clearable />
    </LFormItem>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@lumen/components'
import { ref } from 'vue'

const account = ref('')
const keyword = ref('')
</script>
