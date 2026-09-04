import type { Meta, StoryObj } from '@storybook/vue3'
import { LButton, LInput } from '@lumen/components'
import { ref } from 'vue'

const meta: Meta = {
  title: 'Guide/Theme',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: () => ({
    components: { LButton, LInput },
    setup() {
      const keyword = ref('Lumen UI')
      const email = ref('demo@lumen-ui.dev')

      return { email, keyword }
    },
    template: `
      <div style="display: grid; gap: 20px; width: 420px;">
        <div>
          <div style="font-size: 18px; font-weight: 600;">主题预览</div>
          <div style="margin-top: 8px; color: var(--l-color-text-secondary); line-height: 1.6;">
            使用右上角工具栏里的 Theme 切换浅色 / 深色，观察按钮与输入框的颜色变化。
          </div>
        </div>

        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <LButton>默认按钮</LButton>
          <LButton type="primary">主按钮</LButton>
          <LButton type="success" plain>成功按钮</LButton>
          <LButton type="danger" plain>危险按钮</LButton>
        </div>

        <div style="display: grid; gap: 12px;">
          <LInput v-model="keyword" placeholder="请输入关键词" clearable />
          <LInput v-model="email" status="success" placeholder="请输入邮箱" />
          <LInput model-value="错误状态示例" status="error" />
          <LInput model-value="禁用状态示例" disabled />
        </div>
      </div>
    `,
  }),
}
