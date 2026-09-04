<template>
  <div style="width: 320px;">
    <LFormItem label="字段标签" message="这里可以放输入提示或校验说明。">
      <LInput v-model="value" placeholder="请输入内容" clearable />
    </LFormItem>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
