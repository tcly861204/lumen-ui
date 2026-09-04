import type { Preview } from '@storybook/vue3'
import '@lumen/tokens/css/variables.css'

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: '全局主题模式',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: '浅色' },
          { value: 'dark', title: '深色' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
  decorators: [
    (story, context) => {
      const theme = String(context.globals.theme ?? 'light')

      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme)
        document.body.style.background = 'var(--l-bg-color-page)'
        document.body.style.color = 'var(--l-color-text-primary)'
      }

      return {
        components: {
          Story: story(),
        },
        template: `
          <div
            style="
              min-width: 320px;
              padding: 20px;
              color: var(--l-color-text-primary);
              background: var(--l-bg-color-page);
              border-radius: 16px;
              box-sizing: border-box;
            "
          >
            <Story />
          </div>
        `,
      }
    },
  ],
}

export default preview
