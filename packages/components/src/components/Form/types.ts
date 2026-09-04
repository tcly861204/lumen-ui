import type { ComputedRef, InjectionKey } from 'vue'
import type { LFormItemLabelPosition, LFormItemStatus } from '../FormItem/types'

export type FormModel = Record<string, unknown>
export type FormValidateTrigger = 'change' | 'blur'

export interface FormRule {
  required?: boolean
  message?: string
  pattern?: RegExp
  trigger?: FormValidateTrigger | FormValidateTrigger[]
  validator?: (
    value: unknown,
    model: FormModel,
  ) => boolean | string | Promise<boolean | string>
}

export type FormRules = Record<string, FormRule | FormRule[]>

export interface FormFieldContext {
  prop: string
  validate: (trigger?: FormValidateTrigger) => Promise<boolean>
  clearValidate: () => void
  resetField: () => void
}

export interface FormContext {
  model: FormModel
  rules: ComputedRef<FormRules>
  disabled: ComputedRef<boolean>
  labelPosition: ComputedRef<LFormItemLabelPosition>
  labelWidth: ComputedRef<string | number | undefined>
  showMessage: ComputedRef<boolean>
  registerField: (field: FormFieldContext) => void
  unregisterField: (prop: string) => void
  getRules: (prop?: string) => FormRule[]
}

export interface FormItemContext {
  prop?: string
  notifyChange: () => void
  notifyBlur: () => void
}

export interface FormProps {
  model?: FormModel
  rules?: FormRules
  labelPosition?: LFormItemLabelPosition
  labelWidth?: string | number
  disabled?: boolean
  showMessage?: boolean
}

export interface FormEmits {
  (e: 'submit', evt: Event): void
  (e: 'reset', evt: Event): void
  (e: 'validate', prop: string, isValid: boolean, message: string): void
}

export interface FormExpose {
  validate: () => Promise<boolean>
  validateField: (props: string | string[]) => Promise<boolean>
  resetFields: (props?: string | string[]) => void
  clearValidate: (props?: string | string[]) => void
}

export const formContextKey: InjectionKey<FormContext> = Symbol('l-form-context')
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('l-form-item-context')

export const normalizeRules = (rules?: FormRule | FormRule[]): FormRule[] => {
  if (!rules) return []
  return Array.isArray(rules) ? rules : [rules]
}

export const isRuleTriggered = (rule: FormRule, trigger?: FormValidateTrigger): boolean => {
  if (!trigger || !rule.trigger) return true
  const triggers = Array.isArray(rule.trigger) ? rule.trigger : [rule.trigger]
  return triggers.includes(trigger)
}

export const resolveRuleMessage = (
  rule: FormRule,
  fallback: string,
  validatorResult?: boolean | string,
): string => {
  if (typeof validatorResult === 'string' && validatorResult) {
    return validatorResult
  }
  if (rule.message) {
    return rule.message
  }
  return fallback
}

export const cloneFormValue = <T>(value: T): T => {
  if (typeof globalThis.structuredClone === 'function') {
    return globalThis.structuredClone(value)
  }

  if (value === null || typeof value !== 'object') {
    return value
  }

  return JSON.parse(JSON.stringify(value)) as T
}

export const statusFromMessage = (message: string): LFormItemStatus =>
  message ? 'error' : 'default'
