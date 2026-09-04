import type { Meta, StoryObj } from '@storybook/vue3'
import { Check, ChevronRight, LIcon, Plus, Search, Star } from '@lumen/components'

const meta: Meta<typeof LIcon> = {
  title: 'Components/Icon',
  component: LIcon,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'text' },
      description: '图标尺寸，支持数字或任意合法 CSS 长度值',
    },
    color: {
      control: { type: 'color' },
      description: '图标颜色，默认继承 currentColor',
    },
    strokeWidth: {
      control: { type: 'number' },
      description: '线宽',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: '无障碍文本；不传则按装饰图标处理',
    },
    icon: {
      control: false,
      description: 'Lucide 图标组件本体，例如 Plus / Search / Check',
    },
  },
  args: {
    icon: Plus,
    size: 18,
    strokeWidth: 2,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args: Record<string, unknown>) => ({
    components: { LIcon },
    setup() {
      return { args }
    },
    template: `
      <div style="display: inline-flex; align-items: center; gap: 12px; color: #409eff;">
        <LIcon v-bind="args" />
        <span style="font-size: 14px; color: #606266;">LIcon 默认预览</span>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { LIcon },
    setup() {
      return { Plus }
    },
    template: `
      <div style="display: flex; align-items: center; gap: 16px; color: #303133;">
        <div style="display: inline-flex; align-items: center; gap: 8px;">
          <LIcon :icon="Plus" size="14" />
          <span style="font-size: 12px;">14px</span>
        </div>
        <div style="display: inline-flex; align-items: center; gap: 8px;">
          <LIcon :icon="Plus" size="18" />
          <span style="font-size: 12px;">18px</span>
        </div>
        <div style="display: inline-flex; align-items: center; gap: 8px;">
          <LIcon :icon="Plus" size="24" />
          <span style="font-size: 12px;">24px</span>
        </div>
        <div style="display: inline-flex; align-items: center; gap: 8px;">
          <LIcon :icon="Plus" size="32" />
          <span style="font-size: 12px;">32px</span>
        </div>
      </div>
    `,
  }),
}

export const Colors: Story = {
  render: () => ({
    components: { LIcon },
    setup() {
      return { Star, Check, Search }
    },
    template: `
      <div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
        <div style="display: inline-flex; align-items: center; gap: 8px; color: #409eff;">
          <LIcon :icon="Star" size="20" />
          <span style="font-size: 12px; color: #606266;">Primary</span>
        </div>
        <div style="display: inline-flex; align-items: center; gap: 8px; color: #67c23a;">
          <LIcon :icon="Check" size="20" />
          <span style="font-size: 12px; color: #606266;">Success</span>
        </div>
        <div style="display: inline-flex; align-items: center; gap: 8px; color: #909399;">
          <LIcon :icon="Search" size="20" />
          <span style="font-size: 12px; color: #606266;">Info</span>
        </div>
      </div>
    `,
  }),
}

export const InText: Story = {
  render: () => ({
    components: { LIcon },
    setup() {
      return { ChevronRight }
    },
    template: `
      <div style="display: flex; gap: 24px; flex-wrap: wrap;">
        <div style="font-size: 14px; color: #303133;">
          查看详情
          <LIcon :icon="ChevronRight" size="1em" style="margin-left: 4px;" />
        </div>
        <div style="font-size: 20px; color: #303133;">
          Continue
          <LIcon :icon="ChevronRight" size="1em" style="margin-left: 6px;" />
        </div>
      </div>
    `,
  }),
}
