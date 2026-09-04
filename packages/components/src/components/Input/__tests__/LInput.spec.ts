import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Search } from 'lucide-vue-next'
import LInput from '../LInput.vue'

describe('LInput', () => {
  it('renders input with placeholder', () => {
    const wrapper = mount(LInput, {
      props: {
        placeholder: '请输入关键词',
      },
    })

    expect(wrapper.find('input').attributes('placeholder')).toBe('请输入关键词')
  })

  it('emits update:modelValue and input on typing', async () => {
    const wrapper = mount(LInput, {
      props: {
        modelValue: '',
      },
    })

    const input = wrapper.find('input')
    await input.setValue('lumen')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['lumen'])
    expect(wrapper.emitted('input')?.[0]?.[0]).toBe('lumen')
  })

  it('emits change event', async () => {
    const wrapper = mount(LInput, {
      props: {
        modelValue: 'before',
      },
    })

    const input = wrapper.find('input')
    await input.trigger('change')

    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')?.[0]?.[0]).toBe('before')
  })

  it('shows and handles clear button when clearable and focused', async () => {
    const wrapper = mount(LInput, {
      props: {
        modelValue: 'clear me',
        clearable: true,
      },
    })

    expect(wrapper.find('.l-input__clear').exists()).toBe(false)

    await wrapper.find('input').trigger('focus')

    const clearButton = wrapper.find('.l-input__clear')
    expect(clearButton.exists()).toBe(true)

    await clearButton.trigger('click')

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([''])
    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  it('keeps clear button clickable before blur hides it', async () => {
    const wrapper = mount(LInput, {
      props: {
        modelValue: 'abc',
        clearable: true,
      },
    })

    await wrapper.find('input').trigger('focus')

    const clearButton = wrapper.find('.l-input__clear')
    await clearButton.trigger('mousedown')
    await clearButton.trigger('click')

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([''])
    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  it('renders prefix and suffix icons', () => {
    const wrapper = mount(LInput, {
      props: {
        prefixIcon: Search,
        suffixIcon: Search,
      },
    })

    expect(wrapper.find('.l-input__prefix').exists()).toBe(true)
    expect(wrapper.find('.l-input__suffix').exists()).toBe(true)
    expect(wrapper.findAll('svg')).toHaveLength(2)
  })

  it('applies size, status and disabled classes', () => {
    const wrapper = mount(LInput, {
      props: {
        size: 'small',
        status: 'error',
        disabled: true,
      },
    })

    expect(wrapper.classes()).toContain('l-input--small')
    expect(wrapper.classes()).toContain('l-input--error')
    expect(wrapper.classes()).toContain('is-disabled')
  })

  it('emits focus and blur and toggles focus class', async () => {
    const wrapper = mount(LInput)
    const input = wrapper.find('input')

    await input.trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()
    expect(wrapper.classes()).toContain('is-focus')

    await input.trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
    expect(wrapper.classes()).not.toContain('is-focus')
  })

  it('renders custom prefix and suffix slots', () => {
    const wrapper = mount(LInput, {
      slots: {
        prefix: '<span class="custom-prefix">P</span>',
        suffix: '<span class="custom-suffix">S</span>',
      },
    })

    expect(wrapper.find('.custom-prefix').exists()).toBe(true)
    expect(wrapper.find('.custom-suffix').exists()).toBe(true)
  })

  it('applies borderless class', () => {
    const wrapper = mount(LInput, {
      props: {
        borderless: true,
      },
    })

    expect(wrapper.classes()).toContain('is-borderless')
  })

  it('forwards attrs to native input element', () => {
    const wrapper = mount(LInput, {
      attrs: {
        id: 'account-input',
        'data-testid': 'native-input',
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('id')).toBe('account-input')
    expect(input.attributes('data-testid')).toBe('native-input')
  })
})
