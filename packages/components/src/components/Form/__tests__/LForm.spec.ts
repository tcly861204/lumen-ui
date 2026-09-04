import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, reactive, ref } from 'vue'
import LForm from '../LForm.vue'
import { LButton } from '../../Button'
import { LFormItem } from '../../FormItem'
import { LInput } from '../../Input'

const createFormWrapper = () => {
  return mount({
    components: { LForm, LFormItem, LInput },
    setup() {
      const formRef = ref<InstanceType<typeof LForm> | null>(null)
      const model = reactive({
        name: '',
        email: '',
      })

      const rules = {
        name: [{ required: true, message: '请输入名称', trigger: ['blur', 'change'] as const }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' as const },
          {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: '邮箱格式不正确',
            trigger: ['blur', 'change'] as const,
          },
        ],
      }

      return { formRef, model, rules }
    },
    template: `
      <LForm ref="formRef" :model="model" :rules="rules">
        <LFormItem label="名称" prop="name">
          <LInput v-model="model.name" />
        </LFormItem>
        <LFormItem label="邮箱" prop="email">
          <LInput v-model="model.email" />
        </LFormItem>
      </LForm>
    `,
  })
}

describe('LForm', () => {
  it('validates required rules through form expose', async () => {
    const wrapper = createFormWrapper()
    const form = wrapper.findComponent(LForm).vm as InstanceType<typeof LForm> & {
      validate: () => Promise<boolean>
    }

    await expect(form.validate()).resolves.toBe(false)
    expect(wrapper.text()).toContain('请输入名称')
    expect(wrapper.text()).toContain('请输入邮箱')
  })

  it('validates field on blur and clears message after correct input', async () => {
    const wrapper = createFormWrapper()
    const inputs = wrapper.findAll('input')

    await inputs[1].trigger('blur')
    expect(wrapper.text()).toContain('请输入邮箱')

    await inputs[1].setValue('demo@lumen-ui.dev')
    await inputs[1].trigger('blur')
    await nextTick()

    expect(wrapper.text()).not.toContain('请输入邮箱')
    expect(wrapper.text()).not.toContain('邮箱格式不正确')
  })

  it('resets fields and clears validation state', async () => {
    const wrapper = createFormWrapper()
    const form = wrapper.findComponent(LForm).vm as InstanceType<typeof LForm> & {
      resetFields: () => void
      validate: () => Promise<boolean>
    }
    const inputs = wrapper.findAll('input')

    await inputs[0].setValue('Lumen UI')
    await form.validate()
    expect(wrapper.text()).toContain('请输入邮箱')

    form.resetFields()
    await nextTick()

    expect((inputs[0].element as HTMLInputElement).value).toBe('')
    expect(wrapper.text()).not.toContain('请输入邮箱')
  })

  it('resets controlled model when form receives reset event', async () => {
    const wrapper = mount({
      components: { LButton, LForm, LFormItem, LInput },
      setup() {
        const model = reactive({
          name: '初始名称',
          email: 'init@lumen-ui.dev',
        })

        return { model }
      },
      template: `
        <LForm :model="model">
          <LFormItem label="名称" prop="name">
            <LInput v-model="model.name" />
          </LFormItem>
          <LFormItem label="邮箱" prop="email">
            <LInput v-model="model.email" />
          </LFormItem>
          <LButton native-type="reset">重置</LButton>
        </LForm>
      `,
    })

    const inputs = wrapper.findAll('input')
    await inputs[0].setValue('已修改名称')
    await inputs[1].setValue('changed@lumen-ui.dev')

    await wrapper.find('form').trigger('reset')
    await nextTick()

    expect((inputs[0].element as HTMLInputElement).value).toBe('初始名称')
    expect((inputs[1].element as HTMLInputElement).value).toBe('init@lumen-ui.dev')
  })

  it('propagates form disabled state to inner inputs', () => {
    const wrapper = mount({
      components: { LForm, LFormItem, LInput },
      setup() {
        const model = reactive({ keyword: '' })
        return { model }
      },
      template: `
        <LForm :model="model" disabled>
          <LFormItem label="关键词" prop="keyword">
            <LInput v-model="model.keyword" />
          </LFormItem>
        </LForm>
      `,
    })

    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    expect(wrapper.findComponent(LInput).classes()).toContain('is-disabled')
  })
})
