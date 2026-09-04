import type { Meta, StoryObj } from '@storybook/vue3'
import { AtSign, LIcon, LInput, Search } from '@lumen/components'
import { ref } from 'vue'

const meta: Meta<typeof LInput> = {
  title: 'Components/Input',
  component: LInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: { type: 'text' }, description: '占位文本' },
    size: {
      control: { type: 'select' },
      options: ['large', 'default', 'small'],
      description: '输入框尺寸',
    },
    status: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'error'],
      description: '输入框状态',
    },
    disabled: { control: 'boolean', description: '禁用' },
    readonly: { control: 'boolean', description: '只读' },
    clearable: { control: 'boolean', description: '可清空' },
    borderless: { control: 'boolean', description: '无边框模式' },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'search', 'email', 'tel', 'url'],
      description: '原生输入类型',
    },
    prefixIcon: { control: false, description: '前缀图标组件' },
    suffixIcon: { control: false, description: '后缀图标组件' },
    modelValue: { control: { type: 'text' }, description: '绑定值' },
  },
  args: {
    placeholder: '请输入内容',
    size: 'default',
    status: 'default',
    clearable: true,
    modelValue: '',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args: Record<string, unknown>) => ({
    components: { LInput },
    setup() {
      const value = ref(String(args.modelValue ?? ''))
      return { args, value }
    },
    template: `
      <div style="width: 280px;">
        <LInput
          v-bind="args"
          v-model="value"
        />
      </div>
    `,
  }),
}

export const WithIcons: Story = {
  render: () => ({
    components: { LInput },
    setup() {
      const searchValue = ref('')
      const emailValue = ref('')
      return { searchValue, emailValue, Search, AtSign }
    },
    template: `
      <div style="display: grid; gap: 12px; width: 320px;">
        <LInput
          v-model="searchValue"
          placeholder="搜索组件"
          :prefix-icon="Search"
          clearable
        />
        <LInput
          v-model="emailValue"
          placeholder="输入邮箱"
          :prefix-icon="AtSign"
          :suffix-icon="Search"
        />
      </div>
    `,
  }),
}

export const States: Story = {
  render: () => ({
    components: { LInput },
    setup() {
      const success = ref('已校验通过')
      const warning = ref('库存不足提醒')
      const error = ref('邮箱格式不正确')
      return { success, warning, error }
    },
    template: `
      <div style="display: grid; gap: 12px; width: 320px;">
        <LInput v-model="success" status="success" />
        <LInput v-model="warning" status="warning" />
        <LInput v-model="error" status="error" />
        <LInput model-value="不可编辑内容" disabled />
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { LInput, LIcon },
    setup() {
      const large = ref('')
      const normal = ref('')
      const small = ref('')
      return { large, normal, small, Search }
    },
    template: `
      <div style="display: grid; gap: 12px; width: 320px;">
        <LInput v-model="large" size="large" placeholder="Large input" :prefix-icon="Search" />
        <LInput v-model="normal" placeholder="Default input" :prefix-icon="Search" />
        <LInput v-model="small" size="small" placeholder="Small input" :prefix-icon="Search" />
      </div>
    `,
  }),
}
