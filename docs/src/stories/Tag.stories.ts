import type { Meta, StoryObj } from '@storybook/vue3'
import { LTag } from '@lumen/components'
import { ref } from 'vue'

const meta: Meta<typeof LTag> = {
  title: 'Components/Tag',
  component: LTag,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
      description: '标签类型',
    },
    size: {
      control: { type: 'select' },
      options: ['large', 'default', 'small'],
      description: '标签尺寸',
    },
    plain: { control: 'boolean', description: '朴素风格' },
    round: { control: 'boolean', description: '圆角胶囊' },
    closable: { control: 'boolean', description: '可关闭' },
  },
  args: {
    type: 'default',
    size: 'default',
    plain: false,
    round: false,
    closable: false,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args: Record<string, unknown>) => ({
    components: { LTag },
    setup() {
      return { args }
    },
    template: '<LTag v-bind="args">默认标签</LTag>',
  }),
}

export const Types: Story = {
  render: () => ({
    components: { LTag },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <LTag>Default</LTag>
        <LTag type="primary">Primary</LTag>
        <LTag type="success">Success</LTag>
        <LTag type="warning">Warning</LTag>
        <LTag type="danger">Danger</LTag>
        <LTag type="info">Info</LTag>
      </div>
    `,
  }),
}

export const Plain: Story = {
  render: () => ({
    components: { LTag },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <LTag plain>Default</LTag>
        <LTag type="primary" plain>Primary</LTag>
        <LTag type="success" plain>Success</LTag>
        <LTag type="warning" plain>Warning</LTag>
        <LTag type="danger" plain>Danger</LTag>
        <LTag type="info" plain>Info</LTag>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { LTag },
    template: `
      <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
        <LTag size="large" type="primary">Large</LTag>
        <LTag type="primary">Default</LTag>
        <LTag size="small" type="primary">Small</LTag>
      </div>
    `,
  }),
}

export const Closable: Story = {
  render: () => ({
    components: { LTag },
    setup() {
      const tags = ref([
        { type: 'primary', label: 'Vue 3' },
        { type: 'success', label: 'TypeScript' },
        { type: 'info', label: 'Storybook' },
      ])

      const removeTag = (index: number) => {
        tags.value.splice(index, 1)
      }

      return { tags, removeTag }
    },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <LTag
          v-for="(tag, index) in tags"
          :key="tag.label"
          :type="tag.type"
          closable
          round
          @close="removeTag(index)"
        >
          {{ tag.label }}
        </LTag>
      </div>
    `,
  }),
}
