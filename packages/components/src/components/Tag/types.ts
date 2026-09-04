import type { LSize, LType } from '../../types'

export type LTagType = Exclude<LType, 'default'> | 'default'

/**
 * Tag 组件 Props 类型定义
 */
export interface TagProps {
  /** 标签类型 */
  type?: LTagType
  /** 标签尺寸 */
  size?: LSize
  /** 是否朴素 */
  plain?: boolean
  /** 是否圆角胶囊 */
  round?: boolean
  /** 是否可关闭 */
  closable?: boolean
}

/**
 * Tag 组件 Emits
 */
export interface TagEmits {
  (e: 'close', evt: MouseEvent): void
}
