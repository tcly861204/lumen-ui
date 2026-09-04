<template>
  <div class="lumen-demo-column">
    <LInput v-model="keyword" placeholder="请输入关键词" clearable />
    <LInput v-model="email" placeholder="请输入邮箱" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const keyword = ref('Lumen UI')
const email = ref('demo@lumen-ui.dev')
</script>
