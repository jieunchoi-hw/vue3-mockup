<template>
  <div :data-theme="currentTheme" class="min-h-screen bg-base-100">
    <!-- 헤더 네비게이션 -->
    <header class="navbar bg-base-200 shadow-lg">
      <div class="navbar-start">
        <h1 class="text-xl font-bold">🚀 Vue3 Demo</h1>
      </div>

      <div class="navbar-end space-x-2">
        <!-- 언어 전환 -->
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-sm">
            {{ locale === 'ko' ? '🇰🇷 한국어' : '🇺🇸 English' }}
          </label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
            <li>
              <a @click="changeLanguage('ko')" :class="{ active: locale === 'ko' }">
                🇰🇷 {{ t('common.language.korean') }}
              </a>
            </li>
            <li>
              <a @click="changeLanguage('en')" :class="{ active: locale === 'en' }">
                🇺🇸 {{ t('common.language.english') }}
              </a>
            </li>
          </ul>
        </div>

        <!-- 테마 전환 -->
        <BaseButton variant="ghost" size="sm" @click="toggleTheme">
          {{ currentTheme === 'dark' ? '☀️' : '🌙' }}
        </BaseButton>
      </div>
    </header>

    <main class="container mx-auto p-8 space-y-8">
      <!-- 기능 상태 대시보드 -->
      <section class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-2xl">📊 {{ t('dashboard.title') }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div class="stat bg-base-100 rounded-lg">
              <div class="stat-figure text-primary">🎨</div>
              <div class="stat-title">Tailwind + DaisyUI</div>
              <div class="stat-value text-primary">✅</div>
              <div class="stat-desc">스타일링 작동중</div>
            </div>

            <div class="stat bg-base-100 rounded-lg">
              <div class="stat-figure text-secondary">🌍</div>
              <div class="stat-title">Vue I18n</div>
              <div class="stat-value text-secondary">{{ locale.toUpperCase() }}</div>
              <div class="stat-desc">
                {{ t('common.language.korean') }} ↔ {{ t('common.language.english') }}
              </div>
            </div>

            <div class="stat bg-base-100 rounded-lg">
              <div class="stat-figure text-accent">🔧</div>
              <div class="stat-title">MSW API</div>
              <div class="stat-value text-accent">{{ users.length }}</div>
              <div class="stat-desc">사용자 데이터</div>
            </div>

            <div class="stat bg-base-100 rounded-lg">
              <div class="stat-figure text-info">📚</div>
              <div class="stat-title">Storybook</div>
              <div class="stat-value text-info">ON</div>
              <div class="stat-desc">컴포넌트 문서화</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 컴포넌트 테스트 섹션 -->
      <section class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">🧩 {{ t('test.components.title') }}</h2>
          <p class="text-base-content/70">DaisyUI 컴포넌트들과 우리가 만든 BaseButton 테스트</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <!-- BaseButton 테스트 -->
            <div class="space-y-4">
              <h3 class="font-semibold">BaseButton 컴포넌트</h3>
              <div class="flex flex-wrap gap-2">
                <BaseButton variant="primary" @click="showAlert('Primary!')">Primary</BaseButton>
                <BaseButton variant="secondary" @click="showAlert('Secondary!')"
                  >Secondary</BaseButton
                >
                <BaseButton variant="accent" @click="showAlert('Accent!')">Accent</BaseButton>
                <BaseButton variant="ghost" @click="showAlert('Ghost!')">Ghost</BaseButton>
              </div>

              <div class="flex flex-wrap gap-2">
                <BaseButton size="xs">Extra Small</BaseButton>
                <BaseButton size="sm">Small</BaseButton>
                <BaseButton size="md">Medium</BaseButton>
                <BaseButton size="lg">Large</BaseButton>
              </div>

              <div class="flex gap-2">
                <BaseButton :loading="buttonLoading" @click="testButtonLoading">
                  {{ buttonLoading ? 'Loading...' : 'Test Loading' }}
                </BaseButton>
                <BaseButton disabled>Disabled</BaseButton>
              </div>
            </div>

            <!-- DaisyUI 네이티브 컴포넌트 -->
            <div class="space-y-4">
              <h3 class="font-semibold">DaisyUI 네이티브 컴포넌트</h3>

              <!-- 알림 -->
              <div class="alert alert-info">
                <span>ℹ️ 정보 알림 - DaisyUI 컴포넌트</span>
              </div>

              <!-- 배지 -->
              <div class="flex gap-2">
                <div class="badge badge-primary">Primary</div>
                <div class="badge badge-secondary">Secondary</div>
                <div class="badge badge-accent">Accent</div>
              </div>

              <!-- 프로그레스 -->
              <progress class="progress progress-primary w-full" value="70" max="100"></progress>

              <!-- 입력 -->
              <input
                type="text"
                placeholder="Type here..."
                class="input input-bordered w-full"
                v-model="testInput"
              />
              <p class="text-sm">입력한 값: {{ testInput }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- MSW API 테스트 섹션 -->
      <section class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">🔧 {{ t('test.api.title') }}</h2>
          <p class="text-base-content/70">Mock Service Worker로 API 요청 테스트</p>

          <!-- API 컨트롤 -->
          <div class="flex flex-wrap gap-4 mt-4">
            <BaseButton variant="primary" :loading="apiLoading" @click="fetchUsers">
              👥 {{ t('test.api.fetchUsers') }}
            </BaseButton>

            <BaseButton variant="secondary" :loading="apiLoading" @click="createUser">
              ➕ {{ t('test.api.createUser') }}
            </BaseButton>

            <BaseButton variant="accent" @click="clearUsers">
              🗑️ {{ t('test.api.clearUsers') }}
            </BaseButton>
          </div>

          <!-- API 상태 -->
          <div v-if="apiError" class="alert alert-error mt-4">
            <span>❌ {{ apiError }}</span>
          </div>

          <div v-if="apiSuccess" class="alert alert-success mt-4">
            <span>✅ {{ apiSuccess }}</span>
          </div>

          <!-- 사용자 목록 -->
          <div v-if="users.length > 0" class="mt-6">
            <h3 class="font-semibold mb-4">
              👥 {{ t('test.api.userList') }} ({{ users.length }}명)
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="user in users"
                :key="user.id"
                class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div class="card-body">
                  <h3 class="card-title text-lg">{{ user.name }}</h3>
                  <div class="space-y-2">
                    <p class="text-sm">📧 {{ user.email }}</p>
                    <p class="text-sm">
                      🔖
                      <span
                        class="badge"
                        :class="{
                          'badge-error': user.role === 'admin',
                          'badge-primary': user.role === 'user',
                        }"
                      >
                        {{ user.role }}
                      </span>
                    </p>
                    <p class="text-sm">📅 {{ user.createdAt }}</p>
                  </div>
                  <div class="card-actions justify-end mt-4">
                    <BaseButton size="sm" variant="ghost" @click="showUserDetail(user)">
                      상세보기
                    </BaseButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 테마 & 다국어 테스트 -->
      <section class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">🎨 {{ t('test.theme.title') }}</h2>
          <p class="text-base-content/70">테마 변경과 다국어 기능 테스트</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <!-- 테마 테스트 -->
            <div>
              <h3 class="font-semibold mb-4">🌙 테마 변경</h3>
              <div class="space-y-2">
                <p>
                  현재 테마: <span class="badge badge-primary">{{ currentTheme }}</span>
                </p>
                <BaseButton @click="toggleTheme" variant="outline">
                  {{ currentTheme === 'light' ? '🌙 다크 모드로' : '☀️ 라이트 모드로' }}
                </BaseButton>
              </div>
            </div>

            <!-- 다국어 테스트 -->
            <div>
              <h3 class="font-semibold mb-4">🌍 다국어 기능</h3>
              <div class="space-y-2">
                <p>
                  {{ t('test.i18n.currentLang') }}:
                  <span class="badge badge-secondary">{{ locale }}</span>
                </p>
                <p>{{ t('test.i18n.welcomeMessage') }}</p>
                <div class="flex gap-2">
                  <BaseButton
                    size="sm"
                    :variant="locale === 'ko' ? 'primary' : 'outline'"
                    @click="changeLanguage('ko')"
                  >
                    한국어
                  </BaseButton>
                  <BaseButton
                    size="sm"
                    :variant="locale === 'en' ? 'primary' : 'outline'"
                    @click="changeLanguage('en')"
                  >
                    English
                  </BaseButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 기술 스택 정보 -->
      <section class="card bg-gradient-to-r from-primary/10 to-accent/10 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">🛠️ {{ t('about.techStack') }}</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div class="text-center">
              <div class="text-3xl mb-2">⚡</div>
              <div class="font-semibold">Vue 3</div>
              <div class="text-sm text-base-content/70">Composition API</div>
            </div>
            <div class="text-center">
              <div class="text-3xl mb-2">🎨</div>
              <div class="font-semibold">Tailwind CSS</div>
              <div class="text-sm text-base-content/70">+ DaisyUI</div>
            </div>
            <div class="text-center">
              <div class="text-3xl mb-2">🌍</div>
              <div class="font-semibold">Vue I18n</div>
              <div class="text-sm text-base-content/70">다국어 지원</div>
            </div>
            <div class="text-center">
              <div class="text-3xl mb-2">🔧</div>
              <div class="font-semibold">MSW</div>
              <div class="text-sm text-base-content/70">API 모킹</div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 푸터 -->
    <footer class="footer footer-center p-4 bg-base-300 text-base-content">
      <div>
        <p>🚀 Vue 3 Enterprise Boilerplate - 모든 기능 테스트 완료!</p>
        <p class="text-sm">
          Storybook:
          <a href="http://localhost:6006" target="_blank" class="link link-primary"
            >localhost:6006</a
          >
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseButton from './components/BaseButton.vue'

// i18n 설정
const { t, locale } = useI18n()

// 테마 관리 (간단 버전)
const currentTheme = ref<'light' | 'dark'>('light')

// 상태 관리
const users = ref<any[]>([])
const apiLoading = ref(false)
const apiError = ref('')
const apiSuccess = ref('')
const buttonLoading = ref(false)
const testInput = ref('Hello Vue 3!')

// 테마 토글
const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', currentTheme.value)
}

// 언어 변경
const changeLanguage = (lang: string) => {
  locale.value = lang
}

// 버튼 로딩 테스트
const testButtonLoading = async () => {
  buttonLoading.value = true
  setTimeout(() => {
    buttonLoading.value = false
    showAlert('Button loading test completed!')
  }, 2000)
}

// 알림 표시
const showAlert = (message: string) => {
  alert(`🎉 ${message}`)
}

// API 함수들
const fetchUsers = async () => {
  apiLoading.value = true
  apiError.value = ''
  apiSuccess.value = ''

  try {
    const response = await fetch('/api/users')
    if (!response.ok) throw new Error('API 호출 실패')

    const data = await response.json()
    users.value = data
    apiSuccess.value = `✅ ${data.length}명의 사용자 데이터를 불러왔습니다!`

    // 성공 메시지 3초 후 자동 숨김
    setTimeout(() => {
      apiSuccess.value = ''
    }, 3000)
  } catch (err) {
    apiError.value = '❌ 사용자 목록을 불러오는데 실패했습니다.'
    console.error(err)
  } finally {
    apiLoading.value = false
  }
}

const createUser = async () => {
  apiLoading.value = true
  apiError.value = ''
  apiSuccess.value = ''

  try {
    const randomNames = ['김민수', '이영희', 'John Doe', 'Jane Smith', '박철수']
    const randomName = randomNames[Math.floor(Math.random() * randomNames.length)]

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: randomName,
        email: `${randomName.toLowerCase().replace(' ', '')}@example.com`,
        role: Math.random() > 0.5 ? 'user' : 'admin',
      }),
    })

    if (!response.ok) throw new Error('사용자 생성 실패')

    const newUser = await response.json()
    apiSuccess.value = `✅ 새 사용자 "${newUser.name}"을 생성했습니다!`

    // 목록 새로고침
    fetchUsers()
  } catch (err) {
    apiError.value = '❌ 사용자 생성에 실패했습니다.'
    console.error(err)
  } finally {
    apiLoading.value = false
  }
}

const clearUsers = () => {
  users.value = []
  apiSuccess.value = '🗑️ 사용자 목록을 초기화했습니다.'
  setTimeout(() => {
    apiSuccess.value = ''
  }, 2000)
}

const showUserDetail = (user: any) => {
  alert(
    `👤 사용자 상세정보\n\n이름: ${user.name}\n이메일: ${user.email}\n역할: ${user.role}\n가입일: ${user.createdAt}`,
  )
}

// 컴포넌트 마운트 시 초기 데이터 로드
import { onMounted } from 'vue'
onMounted(() => {
  fetchUsers()
})
</script>
