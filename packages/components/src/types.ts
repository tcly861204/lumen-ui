/**
 * Lumen UI 组件类型定义
 */

// 通用尺寸
export type LSize = 'large' | 'default' | 'small'

// 通用类型
export type LType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'

// 组件实例（扩展 HTMLElement 时使用）
export type LComponentInstance = Record<string, unknown>
