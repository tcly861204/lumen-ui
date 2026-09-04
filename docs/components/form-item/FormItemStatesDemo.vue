<template>
  <div style="display: grid; gap: 18px; width: 360px;">
    <LFormItem label="项目名称" status="success" message="命名格式正确，可以提交。">
      <LInput v-model="success" status="success" />
    </LFormItem>

    <LFormItem label="库存提醒" status="warning" message="建议补货，避免缺货。">
      <LInput v-model="warning" status="warning" />
    </LFormItem>

    <LFormItem label="邮箱" required error="请输入正确的邮箱地址。">
      <LInput v-model="error" status="error" />
    </LFormItem>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const success = ref('lumen-ui')
const warning = ref('库存低于安全阈值')
const error = ref('abc@')
</script>
