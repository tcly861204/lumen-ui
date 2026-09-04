import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../Button.vue'

describe('LButton', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('renders default slot content', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Click me' },
    })
    expect(wrapper.text()).toContain('Click me')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(Button, {
      slots: { default: 'Click' },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: 'Disabled' },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('applies type class', () => {
    const wrapper = mount(Button, {
      props: { type: 'primary' },
      slots: { default: 'Primary' },
    })
    expect(wrapper.classes()).toContain('l-button--primary')
  })

  it('applies size class', () => {
    const wrapper = mount(Button, {
      props: { size: 'small' },
      slots: { default: 'Small' },
    })
    expect(wrapper.classes()).toContain('l-button--small')
  })

  it('shows loading state', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { default: 'Loading' },
    })
    expect(wrapper.classes()).toContain('is-loading')
  })

  it('renders icon slot when not loading', () => {
    const wrapper = mount(Button, {
      slots: {
        icon: '<svg class="test-icon" />',
        default: 'With icon',
      },
    })

    expect(wrapper.find('.l-button__icon').exists()).toBe(true)
    expect(wrapper.find('.test-icon').exists()).toBe(true)
  })

  it('shows loading spinner and hides icon slot when loading', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: {
        icon: '<svg class="test-icon" />',
        default: 'Loading',
      },
    })

    expect(wrapper.find('.l-button__loading').exists()).toBe(true)
    expect(wrapper.find('.l-button__spinner').exists()).toBe(true)
    expect(wrapper.find('.l-button__icon').exists()).toBe(false)
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('applies plain round and circle classes', () => {
    const wrapper = mount(Button, {
      props: {
        plain: true,
        round: true,
        circle: true,
      },
      slots: {
        icon: '<svg class="only-icon" />',
      },
    })

    expect(wrapper.classes()).toContain('is-plain')
    expect(wrapper.classes()).toContain('is-round')
    expect(wrapper.classes()).toContain('is-circle')
  })

  it('sets native button type attribute', () => {
    const wrapper = mount(Button, {
      props: { nativeType: 'submit' },
      slots: { default: 'Submit' },
    })

    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('throttles repeated clicks within throttle duration', async () => {
    const wrapper = mount(Button, {
      props: { throttleDuration: 30 },
      slots: { default: 'Throttle' },
    })

    await wrapper.find('button').trigger('click')
    await wrapper.find('button').trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 35))
    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('click')).toHaveLength(2)
  })
})
