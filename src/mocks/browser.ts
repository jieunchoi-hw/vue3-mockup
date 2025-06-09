// src/mocks/browser.ts
import { setupWorker } from 'msw/browser'
import { userHandlers } from './handlers/users'

export const worker = setupWorker(...userHandlers)

// main.ts에서 사용할 함수 - 반환 타입 수정
export async function enableMocking(): Promise<void> {
  // 개발 환경이거나 MSW가 명시적으로 활성화된 경우
  if (
    import.meta.env.DEV ||
    import.meta.env.VITE_ENABLE_MSW === 'true' ||
    window.location.hostname.includes('github.io') // GitHub Pages 감지
  ) {
    // Service Worker가 등록되어 있는지 확인
    if ('serviceWorker' in navigator) {
      const isGitHubPages = window.location.hostname.includes('github.io')
      const basePath = isGitHubPages ? '/vue3-mockup' : ''
      const serviceWorkerUrl = `${basePath}/mockServiceWorker.js`
      await worker.start({
        onUnhandledRequest: 'bypass', // 처리되지 않은 요청에 대해 경고만 표시
        serviceWorker: {
          url: serviceWorkerUrl, // GitHub Pages에서의 정확한 경로
        },
      })
      return // 명시적으로 void 반환
    }
  }

  return Promise.resolve()
}
