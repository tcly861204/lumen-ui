import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import LFormItem from '../LFormItem.vue'

describe('LFormItem', () => {
  it('renders label and default slot content', () => {
    const wrapper = mount(LFormItem, {
      props: {
        label: '用户名',
      },
      slots: {
        default: '<input class="field" />',
      },
    })

    expect(wrapper.text()).toContain('用户名')
    expect(wrapper.find('.field').exists()).toBe(true)
  })

  it('shows required mark when required', () => {
    const wrapper = mount(LFormItem, {
      props: {
        label: '邮箱',
        required: true,
      },
    })

    expect(wrapper.find('.l-form-item__required').exists()).toBe(true)
    expect(wrapper.classes()).toContain('is-required')
  })

  it('prefers error message over normal message', () => {
    const wrapper = mount(LFormItem, {
      props: {
        label: '邮箱',
        message: '请输入邮箱',
        error: '邮箱格式不正确',
      },
    })

    expect(wrapper.find('.l-form-item__message').text()).toBe('邮箱格式不正确')
    expect(wrapper.classes()).toContain('l-form-item--error')
  })

  it('applies left label layout and width style', () => {
    const wrapper = mount(LFormItem, {
      props: {
        label: '账号',
        labelPosition: 'left',
        labelWidth: 80,
      },
    })

    expect(wrapper.classes()).toContain('l-form-item--label-left')
    expect(wrapper.find('.l-form-item__label-wrap').attributes('style')).toContain('width: 80px;')
  })

  it('renders extra slot content', () => {
    const wrapper = mount(LFormItem, {
      props: {
        label: '令牌',
      },
      slots: {
        extra: '<div class="extra-tip">额外说明</div>',
      },
    })

    expect(wrapper.find('.extra-tip').exists()).toBe(true)
  })
})
