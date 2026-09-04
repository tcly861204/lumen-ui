import type { Component } from 'vue'

/**
 * LIcon 组件 Props 类型定义
 */
export interface LIconProps {
  /** Lucide 图标组件，例如 Plus / Search / Check */
  icon: Component
  /** 图标尺寸，默认跟随当前字号 */
  size?: number | string
  /** 图标颜色，默认继承 currentColor */
  color?: string
  /** 线宽 */
  strokeWidth?: number | string
  /** 无障碍文本；不传则按装饰图标处理 */
  ariaLabel?: string
}
