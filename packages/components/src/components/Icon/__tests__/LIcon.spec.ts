import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Plus } from 'lucide-vue-next'
import LIcon from '../LIcon.vue'

describe('LIcon', () => {
  it('renders lucide icon component', () => {
    const wrapper = mount(LIcon, {
      props: {
        icon: Plus,
      },
    })

    expect(wrapper.find('.l-icon').exists()).toBe(true)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('passes size and stroke width to inner icon', () => {
    const wrapper = mount(LIcon, {
      props: {
        icon: Plus,
        size: 20,
        strokeWidth: 1.5,
      },
    })

    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe('20')
    expect(svg.attributes('height')).toBe('20')
    expect(svg.attributes('stroke-width')).toBe('1.5')
  })

  it('marks icon as decorative by default', () => {
    const wrapper = mount(LIcon, {
      props: {
        icon: Plus,
      },
    })

    expect(wrapper.find('.l-icon').attributes('aria-hidden')).toBe('true')
    expect(wrapper.find('svg').attributes('aria-hidden')).toBe('true')
  })

  it('supports accessible label for meaningful icons', () => {
    const wrapper = mount(LIcon, {
      props: {
        icon: Plus,
        ariaLabel: '新增',
      },
    })

    expect(wrapper.find('.l-icon').attributes('aria-hidden')).toBeUndefined()
    expect(wrapper.find('svg').attributes('aria-label')).toBe('新增')
  })

  it('forwards extra attrs to inner icon component', () => {
    const wrapper = mount(LIcon, {
      props: {
        icon: Plus,
      },
      attrs: {
        'data-testid': 'inner-icon',
      },
    })

    expect(wrapper.find('svg').attributes('data-testid')).toBe('inner-icon')
  })
})
