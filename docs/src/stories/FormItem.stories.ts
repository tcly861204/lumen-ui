import type { Meta, StoryObj } from '@storybook/vue3'
import { AlertCircle, LFormItem, LInput, Search } from '@lumen/components'
import { ref } from 'vue'

const meta: Meta<typeof LFormItem> = {
  title: 'Components/FormItem',
  component: LFormItem,
  tags: ['autodocs'],
  argTypes: {
    label: { control: { type: 'text' }, description: '标签文本' },
    required: { control: 'boolean', description: '是否必填' },
    message: { control: { type: 'text' }, description: '说明文案' },
    error: { control: { type: 'text' }, description: '错误文案，优先级高于 message' },
    status: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'error'],
      description: '校验状态',
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['top', 'left'],
      description: '标签位置',
    },
    labelWidth: {
      control: { type: 'text' },
      description: '左对齐布局时的标签宽度',
    },
    for: { control: { type: 'text' }, description: '原生 label for' },
  },
  args: {
    label: '字段标签',
    required: false,
    message: '这里可以放输入提示或校验说明。',
    error: '',
    status: 'default',
    labelPosition: 'top',
    labelWidth: '88px',
    for: 'storybook-form-item-input',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args: Record<string, unknown>) => ({
    components: { LFormItem, LInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <div style="width: 320px;">
        <LFormItem v-bind="args">
          <LInput
            id="storybook-form-item-input"
            v-model="value"
            placeholder="请输入内容"
            clearable
          />
        </LFormItem>
      </div>
    `,
  }),
}

export const ValidationStates: Story = {
  render: () => ({
    components: { LFormItem, LInput },
    setup() {
      const success = ref('lumen-ui')
      const warning = ref('库存低于安全阈值')
      const error = ref('abc@')
      return { success, warning, error }
    },
    template: `
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
    `,
  }),
}

export const LeftLabel: Story = {
  render: () => ({
    components: { LFormItem, LInput },
    setup() {
      const account = ref('')
      const keyword = ref('')
      return { account, keyword, Search }
    },
    template: `
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
    `,
  }),
}

export const WithExtra: Story = {
  render: () => ({
    components: { LFormItem, LInput },
    setup() {
      const value = ref('')
      return { value, AlertCircle }
    },
    template: `
      <div style="width: 360px;">
        <LFormItem label="访问令牌" required message="建议定期轮换访问令牌。">
          <LInput
            v-model="value"
            type="password"
            placeholder="请输入访问令牌"
          />
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
    `,
  }),
}
