import { Meta, StoryObj } from '@storybook/vue3'
import { Check, LButton, LIcon, Plus, Star } from '@lumen/components'
import '@lumen/components/src/components/Button/Button.vue'

// 注意：上面通过源码 import Button.vue 让 storybook 直接看到 scoped 样式。
// 真正发布时是 dist/style.css；这里为了演示方便直接走源码。

/**
 * Lumen UI 按钮组件
 *
 * 提供 6 种类型、3 种尺寸，支持 loading / disabled / plain / round / circle。
 */
const meta: Meta<typeof LButton> = {
  title: 'Components/Button',
  component: LButton,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
      description: '按钮类型',
    },
    size: {
      control: { type: 'select' },
      options: ['large', 'default', 'small'],
      description: '按钮尺寸',
    },
    plain: { control: 'boolean', description: '朴素按钮' },
    round: { control: 'boolean', description: '圆角按钮' },
    circle: { control: 'boolean', description: '圆形按钮' },
    loading: { control: 'boolean', description: '加载中' },
    disabled: { control: 'boolean', description: '禁用' },
    nativeType: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: '原生 type',
    },
    throttleDuration: { control: 'number', description: '节流间隔（毫秒）' },
  },
  args: {
    type: 'default',
    size: 'default',
  },
}

export default meta
type Story = StoryObj<typeof meta>

/* ----------------------------- 默认 -------------------------------- */
export const Default: Story = {
  args: {
    type: 'default',
  },
  render: (args: Record<string, unknown>) => ({
    components: { LButton },
    setup() {
      return { args }
    },
    template: '<LButton v-bind="args">Default</LButton>',
  }),
}

/* ----------------------------- 类型 -------------------------------- */
export const Types: Story = {
  render: () => ({
    components: { LButton },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <LButton>Default</LButton>
        <LButton type="primary">Primary</LButton>
        <LButton type="success">Success</LButton>
        <LButton type="warning">Warning</LButton>
        <LButton type="danger">Danger</LButton>
        <LButton type="info">Info</LButton>
      </div>
    `,
  }),
}

/* ----------------------------- 朴素 -------------------------------- */
export const Plain: Story = {
  render: () => ({
    components: { LButton },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <LButton plain>Default</LButton>
        <LButton type="primary" plain>Primary</LButton>
        <LButton type="success" plain>Success</LButton>
        <LButton type="warning" plain>Warning</LButton>
        <LButton type="danger" plain>Danger</LButton>
        <LButton type="info" plain>Info</LButton>
      </div>
    `,
  }),
}

/* ----------------------------- 尺寸 -------------------------------- */
export const Sizes: Story = {
  render: () => ({
    components: { LButton },
    template: `
      <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
        <LButton size="large" type="primary">Large</LButton>
        <LButton type="primary">Default</LButton>
        <LButton size="small" type="primary">Small</LButton>
      </div>
    `,
  }),
}

/* ----------------------------- 状态 -------------------------------- */
export const States: Story = {
  render: () => ({
    components: { LButton, LIcon },
    setup() {
      return { Plus }
    },
    template: `
      <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
        <LButton type="primary">Default</LButton>
        <LButton type="primary" loading>Loading</LButton>
        <LButton type="primary" disabled>Disabled</LButton>
        <LButton type="primary" round>Round</LButton>
        <LButton type="primary" circle>
          <template #icon>
            <LIcon :icon="Plus" />
          </template>
        </LButton>
      </div>
    `,
  }),
}

/* ----------------------------- 图标 -------------------------------- */
export const WithIcon: Story = {
  render: () => ({
    components: { LButton, LIcon },
    setup() {
      return { Star, Check }
    },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <LButton type="primary">
          <template #icon>
            <LIcon :icon="Star" />
          </template>
          Star
        </LButton>
        <LButton type="success" plain>
          <template #icon>
            <LIcon :icon="Check" />
          </template>
          Check
        </LButton>
      </div>
    `,
  }),
}
