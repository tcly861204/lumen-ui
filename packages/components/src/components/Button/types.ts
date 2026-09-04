import type { LType, LSize } from '../../types'

/**
 * Button 组件 Props 类型定义
 */
export interface ButtonProps {
  type?: LType
  size?: LSize
  plain?: boolean
  round?: boolean
  circle?: boolean
  loading?: boolean
  disabled?: boolean
  nativeType?: 'button' | 'submit' | 'reset'
  autofocus?: boolean
  throttleDuration?: number
}

/**
 * Button 组件 Emits
 */
export interface ButtonEmits {
  (e: 'click', evt: MouseEvent): void
}
