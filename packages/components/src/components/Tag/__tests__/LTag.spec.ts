import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import LTag from '../LTag.vue'

describe('LTag', () => {
  it('renders slot content', () => {
    const wrapper = mount(LTag, {
      slots: {
        default: 'Vue 3',
      },
    })

    expect(wrapper.text()).toContain('Vue 3')
  })

  it('applies type and size classes', () => {
    const wrapper = mount(LTag, {
      props: {
        type: 'success',
        size: 'small',
      },
      slots: {
        default: 'Success',
      },
    })

    expect(wrapper.classes()).toContain('l-tag--success')
    expect(wrapper.classes()).toContain('l-tag--small')
  })

  it('applies plain and round classes', () => {
    const wrapper = mount(LTag, {
      props: {
        plain: true,
        round: true,
      },
      slots: {
        default: 'Tag',
      },
    })

    expect(wrapper.classes()).toContain('is-plain')
    expect(wrapper.classes()).toContain('is-round')
  })

  it('renders close button when closable', () => {
    const wrapper = mount(LTag, {
      props: {
        closable: true,
      },
      slots: {
        default: 'Closable',
      },
    })

    expect(wrapper.find('.l-tag__close').exists()).toBe(true)
  })

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(LTag, {
      props: {
        closable: true,
      },
      slots: {
        default: 'Closable',
      },
    })

    await wrapper.find('.l-tag__close').trigger('click')

    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('does not render close button when not closable', () => {
    const wrapper = mount(LTag, {
      slots: {
        default: 'Static',
      },
    })

    expect(wrapper.find('.l-tag__close').exists()).toBe(false)
  })
})
