<template>
  <div style="width: 380px;">
    <LForm ref="formRef" :model="model" :rules="rules">
      <LFormItem label="项目名称" prop="name" required>
        <LInput v-model="model.name" placeholder="请输入项目名称" clearable />
      </LFormItem>

      <LFormItem label="邮箱" prop="email">
        <LInput v-model="model.email" placeholder="请输入邮箱" clearable />
      </LFormItem>

      <div class="lumen-demo-row" style="margin-top: 18px;">
        <LButton type="primary" @click="formRef?.validate()">校验</LButton>
        <LButton native-type="reset">重置</LButton>
      </div>
    </LForm>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

type FormInstance = {
  validate: () => Promise<boolean>
}

const formRef = ref<FormInstance | null>(null)
const model = reactive({
  name: '',
  email: '',
})

const rules = {
  name: [{ required: true, message: '请输入项目名称', trigger: ['blur', 'change'] as const }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' as const },
    {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '邮箱格式不正确',
      trigger: ['blur', 'change'] as const,
    },
  ],
}
</script>
