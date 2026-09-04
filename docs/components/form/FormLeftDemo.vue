<template>
  <div style="width: 520px;">
    <LForm :model="model" label-position="left" label-width="84px">
      <LFormItem label="账号" prop="account" required>
        <LInput v-model="model.account" placeholder="请输入账号" />
      </LFormItem>

      <LFormItem label="公司" prop="company" message="用于展示组织信息。">
        <LInput v-model="model.company" placeholder="请输入公司名称" />
      </LFormItem>
    </LForm>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const model = reactive({
  account: '',
  company: '',
})
</script>
