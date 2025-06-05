import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './i18n'

// MSW 설정
async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return
  }

  const { worker } = await import('./mocks/browser')
  return worker.start({
    onUnhandledRequest: 'bypass'
  })
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

enableMocking().then(() => {
  app.mount('#app')
})
