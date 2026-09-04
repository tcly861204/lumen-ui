import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { install } from '@lumen/components'
import DemoBlock from './components/DemoBlock.vue'
import '@lumen/tokens/css/variables.css'
import './style.css'

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(install)
    app.component('DemoBlock', DemoBlock)
  },
}

export default theme
