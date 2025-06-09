// src/mocks/browser.ts
import { setupWorker } from 'msw/browser'
import { userHandlers } from './handlers/users'

export const worker = setupWorker(...userHandlers)

// main.ts에서 사용할 함수
export async function enableMocking(): Promise<void> {
  // 개발 환경이거나 MSW가 명시적으로 활성화된 경우
  if (
    import.meta.env.DEV ||
    import.meta.env.VITE_ENABLE_MSW === 'true' ||
    window.location.hostname.includes('github.io') // GitHub Pages 감지
  ) {
    // Service Worker가 등록되어 있는지 확인
    if ('serviceWorker' in navigator) {
      // 현재 모듈의 worker 사용
      return worker.start({
        onUnhandledRequest: 'warn', // 처리되지 않은 요청에 대해 경고만 표시
        serviceWorker: {
          url: '/mockServiceWorker.js', // GitHub Pages에서의 정확한 경로
        },
      })
    }
  }

  return Promise.resolve()
}
