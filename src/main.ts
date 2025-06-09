import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { enableMocking } from './mocks/browser'

// MSW 디버깅을 위한 로그 추가
console.log('🔍 Environment check:')
console.log('DEV:', import.meta.env.DEV)
console.log('VITE_ENABLE_MSW:', import.meta.env.VITE_ENABLE_MSW)
console.log('Hostname:', window.location.hostname)

enableMocking()
  .then(() => {
    console.log('✅ MSW initialization completed')
    const app = createApp(App)

    app.use(createPinia())
    app.use(router)
    app.use(i18n)
    app.mount('#app')
  })
  .catch((error: Error) => {
    console.error('❌ MSW initialization failed:', error)

    // MSW 없이도 앱 실행
    const app = createApp(App)
    app.mount('#app')
  })
