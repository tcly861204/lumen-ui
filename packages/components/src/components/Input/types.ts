import type { Component } from 'vue'
import type { LSize } from '../../types'

export type LInputStatus = 'default' | 'success' | 'warning' | 'error'

/**
 * Input 组件 Props 类型定义
 */
export interface InputProps {
  /** 绑定值 */
  modelValue?: string
  /** 占位文本 */
  placeholder?: string
  /** 输入框尺寸 */
  size?: LSize
  /** 输入框状态 */
  status?: LInputStatus
  /** 是否禁用 */
  disabled?: boolean
  /** 是否只读 */
  readonly?: boolean
  /** 是否可清空 */
  clearable?: boolean
  /** 是否显示边框 */
  borderless?: boolean
  /** 原生 input type */
  type?: 'text' | 'password' | 'search' | 'email' | 'tel' | 'url'
  /** 前缀图标 */
  prefixIcon?: Component
  /** 后缀图标 */
  suffixIcon?: Component
  /** 原生 name */
  name?: string
  /** 原生 autocomplete */
  autocomplete?: string
}

/**
 * Input 组件 Emits
 */
export interface InputEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string, evt: Event): void
  (e: 'change', value: string, evt: Event): void
  (e: 'focus', evt: FocusEvent): void
  (e: 'blur', evt: FocusEvent): void
  (e: 'clear'): void
}
