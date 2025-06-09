import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/vue3-mockup/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    copyPublicDir: true,
    rollupOptions: {
      external: [],
    },
  },
  // MSW 서비스워커를 static 파일로 복사
  publicDir: 'public',

  server: {
    // MSW 서비스워커에 대한 CORS 설정
    cors: true,
  },
})
