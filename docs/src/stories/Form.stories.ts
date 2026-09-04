import type { Meta, StoryObj } from '@storybook/vue3'
import { LButton, LForm, LFormItem, LInput } from '@lumen/components'
import { reactive, ref } from 'vue'

type FormInstance = {
  validate: () => Promise<boolean>
  resetFields: () => void
}

const meta: Meta<typeof LForm> = {
  title: 'Components/Form',
  component: LForm,
  tags: ['autodocs'],
  argTypes: {
    labelPosition: {
      control: { type: 'select' },
      options: ['top', 'left'],
      description: '标签位置',
    },
    labelWidth: {
      control: { type: 'text' },
      description: '左对齐模式下的标签宽度',
    },
    disabled: { control: 'boolean', description: '整表单禁用' },
    showMessage: { control: 'boolean', description: '是否展示校验文案' },
    rules: { control: false, description: '表单规则对象' },
    model: { control: false, description: '表单数据对象' },
  },
  args: {
    labelPosition: 'top',
    labelWidth: '88px',
    disabled: false,
    showMessage: true,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args: Record<string, unknown>) => ({
    components: { LForm, LFormItem, LInput, LButton },
    setup() {
      const formRef = ref<FormInstance | null>(null)
      const model = reactive({
        name: '',
        email: '',
      })

      const rules = {
        name: [
          { required: true, message: '请输入项目名称', trigger: ['blur', 'change'] as const },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' as const },
          {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: '邮箱格式不正确',
            trigger: ['blur', 'change'] as const,
          },
        ],
      }

      const handleValidate = async () => {
        const passed = await formRef.value?.validate()
        window.alert(passed ? '校验通过' : '校验未通过')
      }

      return { args, formRef, model, rules, handleValidate }
    },
    template: `
      <div style="width: 380px;">
        <LForm ref="formRef" v-bind="args" :model="model" :rules="rules">
          <LFormItem label="项目名称" prop="name" required>
            <LInput v-model="model.name" placeholder="请输入项目名称" clearable />
          </LFormItem>

          <LFormItem label="邮箱" prop="email">
            <LInput v-model="model.email" placeholder="请输入邮箱" clearable />
          </LFormItem>

          <div style="display: flex; gap: 8px; margin-top: 18px;">
            <LButton type="primary" @click="handleValidate">校验</LButton>
            <LButton native-type="reset">重置</LButton>
          </div>
        </LForm>
      </div>
    `,
  }),
}

export const LeftLabel: Story = {
  render: () => ({
    components: { LForm, LFormItem, LInput },
    setup() {
      const model = reactive({
        account: '',
        company: '',
      })

      return { model }
    },
    template: `
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
    `,
  }),
}

export const CustomValidator: Story = {
  render: () => ({
    components: { LForm, LFormItem, LInput, LButton },
    setup() {
      const formRef = ref<FormInstance | null>(null)
      const model = reactive({
        password: '',
        confirmPassword: '',
      })

      const rules = {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' as const },
        ],
        confirmPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' as const },
          {
            trigger: 'change' as const,
            validator: (value: unknown, currentModel: Record<string, unknown>) =>
              value === currentModel.password || '两次输入的密码不一致',
          },
        ],
      }

      const handleValidate = async () => {
        const passed = await formRef.value?.validate()
        window.alert(passed ? '密码校验通过' : '请检查表单内容')
      }

      return { formRef, model, rules, handleValidate }
    },
    template: `
      <div style="width: 380px;">
        <LForm ref="formRef" :model="model" :rules="rules">
          <LFormItem label="密码" prop="password" required>
            <LInput v-model="model.password" type="password" placeholder="请输入密码" />
          </LFormItem>

          <LFormItem label="确认密码" prop="confirmPassword" required>
            <LInput
              v-model="model.confirmPassword"
              type="password"
              placeholder="请再次输入密码"
            />
          </LFormItem>

          <div style="margin-top: 18px;">
            <LButton type="primary" @click="handleValidate">提交校验</LButton>
          </div>
        </LForm>
      </div>
    `,
  }),
}
