<template>
  <div style="width: 380px;">
    <LForm ref="formRef" :model="model" :rules="rules">
      <LFormItem label="密码" prop="password" required>
        <LInput v-model="model.password" type="password" placeholder="请输入密码" />
      </LFormItem>

      <LFormItem label="确认密码" prop="confirmPassword" required>
        <LInput v-model="model.confirmPassword" type="password" placeholder="请再次输入密码" />
      </LFormItem>
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
  password: '',
  confirmPassword: '',
})

const rules = {
  password: [{ required: true, message: '请输入密码', trigger: 'blur' as const }],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' as const },
    {
      trigger: 'change' as const,
      validator: (value: unknown, currentModel: Record<string, unknown>) =>
        value === currentModel.password || '两次输入的密码不一致',
    },
  ],
}
</script>
