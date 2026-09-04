import type { FormRule } from '../Form/types'

/**
 * FormItem 状态类型
 */
export type LFormItemStatus = 'default' | 'success' | 'warning' | 'error'

/**
 * FormItem 标签位置
 */
export type LFormItemLabelPosition = 'left' | 'top'

/**
 * FormItem 组件 Props 类型定义
 */
export interface FormItemProps {
  /** 对应表单字段名 */
  prop?: string
  /** 标签文本 */
  label?: string
  /** 原生 label for */
  for?: string
  /** 是否必填 */
  required?: boolean
  /** 说明文案 */
  message?: string
  /** 错误文案，优先级高于 message */
  error?: string
  /** 校验状态 */
  status?: LFormItemStatus
  /** 标签位置 */
  labelPosition?: LFormItemLabelPosition
  /** 标签宽度 */
  labelWidth?: string | number
  /** 单独指定规则 */
  rules?: FormRule | FormRule[]
}
