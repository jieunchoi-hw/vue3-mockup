import { vi } from 'vitest'

// Vue Test Utils 글로벌 설정
import { config } from '@vue/test-utils'

// i18n 모킹 (다국어 기능이 있으므로)
const mockI18n = {
  global: {
    $t: (key: string) => key, // 테스트에서는 키를 그대로 반환
  },
}

config.global.mocks = {
  $t: (key: string) => key,
  $i18n: mockI18n,
}

// DOM 환경 설정
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
