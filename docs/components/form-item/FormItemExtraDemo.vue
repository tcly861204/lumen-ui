<template>
  <div style="width: 360px;">
    <LFormItem label="访问令牌" required message="建议定期轮换访问令牌。">
      <LInput v-model="token" type="password" placeholder="请输入访问令牌" />
      <template #extra>
        <div style="display: inline-flex; align-items: center; gap: 6px;">
          <span style="display: inline-flex;">
            <AlertCircle style="width: 14px; height: 14px;" />
          </span>
          <span>令牌只会在创建时展示一次，请妥善保存。</span>
        </div>
      </template>
    </LFormItem>
  </div>
</template>

<script setup lang="ts">
import { AlertCircle } from '@lumen/components'
import { ref } from 'vue'

const token = ref('')
</script>
