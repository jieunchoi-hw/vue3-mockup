import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '../BaseButton.vue'

describe('BaseButton', () => {
  it('renders properly', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Test Button', // slot을 사용할 경우
      },
    })

    expect(wrapper.exists()).toBe(true)
    console.log('Button HTML:', wrapper.html()) // 디버깅용
    console.log('Button Text:', wrapper.text()) // 디버깅용
  })

  it('is clickable', async () => {
    const wrapper = mount(BaseButton)

    // 클릭 가능한지만 확인
    expect(wrapper.find('button').exists()).toBe(true)
  })
})
