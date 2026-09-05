/**
 * Lumen UI 入口 - 按需引入
 *
 * 使用：
 *   import { LButton, LIcon, LInput, LTag, LForm, LFormItem } from '@lumen/components'
 *   import { Plus } from '@lumen/components'
 *   import '@lumen/components/dist/style.css'
 */

import { LButton } from './components/Button'
import { LIcon } from './components/Icon'
import { LInput } from './components/Input'
import { LTag } from './components/Tag'
import { LForm } from './components/Form'
import { LFormItem } from './components/FormItem'

export { LButton }
export { LIcon }
export { LInput }
export { LTag }
export { LForm }
export { LFormItem }
export * from 'lucide-vue-next'

export type * from './types'
export type { ButtonProps, ButtonEmits } from './components/Button/types'
export type { LIconProps } from './components/Icon/types'
export type { InputProps, InputEmits, LInputStatus } from './components/Input/types'
export type { TagProps, TagEmits, LTagType } from './components/Tag/types'
export type {
  FormProps,
  FormEmits,
  FormExpose,
  FormModel,
  FormRule,
  FormRules,
  FormValidateTrigger,
} from './components/Form/types'
export type {
  FormItemProps,
  LFormItemStatus,
  LFormItemLabelPosition,
} from './components/FormItem/types'

// 全部组件列表（用于 install 全局注册）
export * from './install'
export { default as version } from './version'
