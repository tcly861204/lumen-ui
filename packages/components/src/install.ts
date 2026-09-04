/**
 * Lumen UI 全量注册插件
 * 使用：app.use(LumenUI)
 */
import type { App, Component, Plugin } from 'vue'
import { Button } from './components/Button'
import { LIcon } from './components/Icon'
import { LInput } from './components/Input'
import { LTag } from './components/Tag'
import { LForm } from './components/Form'
import { LFormItem } from './components/FormItem'

const components: Component[] = [Button, LIcon, LInput, LTag, LForm, LFormItem]

const install = (app: App): void => {
  components.forEach((comp) => {
    const name = (comp as unknown as { name?: string }).name
    if (name) {
      app.component(name, comp)
    }
  })
}

const LumenUI = {
  install,
  version: '0.0.0',
} satisfies Plugin & { version: string }

export default LumenUI
export { install }
