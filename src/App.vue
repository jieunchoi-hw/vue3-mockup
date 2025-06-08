<template>
  <div :data-theme="currentTheme" class="min-h-screen bg-base-100">
    <!-- 헤더 네비게이션 -->
    <header class="navbar bg-base-200 shadow-lg">
      <div class="navbar-start">
        <h1 class="text-xl font-bold">🚀 {{ t('header.title') }}</h1>
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
              <div class="stat-title">{{ t('dashboard.stats.styling.title') }}</div>
              <div class="stat-value text-primary">✅</div>
              <div class="stat-desc">{{ t('dashboard.stats.styling.desc') }}</div>
            </div>

            <div class="stat bg-base-100 rounded-lg">
              <div class="stat-figure text-secondary">🌍</div>
              <div class="stat-title">{{ t('dashboard.stats.i18n.title') }}</div>
              <div class="stat-value text-secondary">{{ locale.toUpperCase() }}</div>
              <div class="stat-desc">
                {{ t('common.language.korean') }} ↔ {{ t('common.language.english') }}
              </div>
            </div>

            <div class="stat bg-base-100 rounded-lg">
              <div class="stat-figure text-accent">🔧</div>
              <div class="stat-title">{{ t('dashboard.stats.api.title') }}</div>
              <div class="stat-value text-accent">{{ users.length }}</div>
              <div class="stat-desc">{{ t('dashboard.stats.api.desc') }}</div>
            </div>

            <div class="stat bg-base-100 rounded-lg">
              <div class="stat-figure text-info">📚</div>
              <div class="stat-title">{{ t('dashboard.stats.storybook.title') }}</div>
              <div class="stat-value text-info">{{ t('dashboard.stats.storybook.status') }}</div>
              <div class="stat-desc">{{ t('dashboard.stats.storybook.desc') }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 컴포넌트 테스트 섹션 -->
      <section class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">🧩 {{ t('test.components.title') }}</h2>
          <p class="text-base-content/70">{{ t('test.components.description') }}</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <!-- BaseButton 테스트 -->
            <div class="space-y-4">
              <h3 class="font-semibold">{{ t('test.components.baseButton.title') }}</h3>
              <div class="flex flex-wrap gap-2">
                <BaseButton variant="primary" @click="showAlert('Primary!')">{{
                  t('test.components.baseButton.variants.primary')
                }}</BaseButton>
                <BaseButton variant="secondary" @click="showAlert('Secondary!')">{{
                  t('test.components.baseButton.variants.secondary')
                }}</BaseButton>
                <BaseButton variant="accent" @click="showAlert('Accent!')">{{
                  t('test.components.baseButton.variants.accent')
                }}</BaseButton>
                <BaseButton variant="ghost" @click="showAlert('Ghost!')">{{
                  t('test.components.baseButton.variants.ghost')
                }}</BaseButton>
              </div>

              <div class="flex flex-wrap gap-2">
                <BaseButton size="xs">{{ t('test.components.baseButton.sizes.xs') }}</BaseButton>
                <BaseButton size="sm">{{ t('test.components.baseButton.sizes.sm') }}</BaseButton>
                <BaseButton size="md">{{ t('test.components.baseButton.sizes.md') }}</BaseButton>
                <BaseButton size="lg">{{ t('test.components.baseButton.sizes.lg') }}</BaseButton>
              </div>

              <div class="flex gap-2">
                <BaseButton :loading="buttonLoading" @click="testButtonLoading">
                  {{
                    buttonLoading
                      ? t('test.components.baseButton.states.loading')
                      : t('test.components.baseButton.states.testLoading')
                  }}
                </BaseButton>
                <BaseButton disabled>{{
                  t('test.components.baseButton.states.disabled')
                }}</BaseButton>
              </div>
            </div>

            <!-- DaisyUI 네이티브 컴포넌트 -->
            <div class="space-y-4">
              <h3 class="font-semibold">{{ t('test.components.daisyui.title') }}</h3>

              <!-- 알림 -->
              <div class="alert alert-info">
                <span>ℹ️ {{ t('test.components.daisyui.alert') }}</span>
              </div>

              <!-- 배지 -->
              <div class="flex gap-2">
                <div class="badge badge-primary">
                  {{ t('test.components.baseButton.variants.primary') }}
                </div>
                <div class="badge badge-secondary">
                  {{ t('test.components.baseButton.variants.secondary') }}
                </div>
                <div class="badge badge-accent">
                  {{ t('test.components.baseButton.variants.accent') }}
                </div>
              </div>

              <!-- 프로그레스 -->
              <progress class="progress progress-primary w-full" value="70" max="100"></progress>

              <!-- 입력 -->
              <input
                type="text"
                :placeholder="t('test.components.daisyui.inputPlaceholder')"
                class="input input-bordered w-full"
                v-model="testInput"
              />
              <p class="text-sm">{{ t('test.components.daisyui.inputValue') }}: {{ testInput }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- MSW API 테스트 섹션 -->
      <section class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">🔧 {{ t('test.api.title') }}</h2>
          <p class="text-base-content/70">{{ t('test.api.description') }}</p>

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
              👥 {{ t('test.api.userList') }} ({{ users.length }}{{ t('test.api.userCount') }})
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
                        {{ t(`test.api.roles.${user.role}`) }}
                      </span>
                    </p>
                    <p class="text-sm">📅 {{ user.createdAt }}</p>
                  </div>
                  <div class="card-actions justify-end mt-4">
                    <BaseButton size="sm" variant="ghost" @click="showUserDetail(user)">
                      {{ t('test.api.viewDetail') }}
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
          <p class="text-base-content/70">{{ t('test.theme.description') }}</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <!-- 테마 테스트 -->
            <div>
              <h3 class="font-semibold mb-4">🌙 {{ t('test.theme.themeChange') }}</h3>
              <div class="space-y-2">
                <p>
                  {{ t('test.theme.currentTheme') }}:
                  <span class="badge badge-primary">{{
                    t(`test.theme.themes.${currentTheme}`)
                  }}</span>
                </p>
                <BaseButton @click="toggleTheme" variant="outline">
                  {{ currentTheme === 'light' ? t('test.theme.toDark') : t('test.theme.toLight') }}
                </BaseButton>
              </div>
            </div>

            <!-- 다국어 테스트 -->
            <div>
              <h3 class="font-semibold mb-4">🌍 {{ t('test.i18n.title') }}</h3>
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
                    {{ t('common.language.korean') }}
                  </BaseButton>
                  <BaseButton
                    size="sm"
                    :variant="locale === 'en' ? 'primary' : 'outline'"
                    @click="changeLanguage('en')"
                  >
                    {{ t('common.language.english') }}
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
              <div class="font-semibold">{{ t('about.stack.vue.title') }}</div>
              <div class="text-sm text-base-content/70">{{ t('about.stack.vue.desc') }}</div>
            </div>
            <div class="text-center">
              <div class="text-3xl mb-2">🎨</div>
              <div class="font-semibold">{{ t('about.stack.tailwind.title') }}</div>
              <div class="text-sm text-base-content/70">{{ t('about.stack.tailwind.desc') }}</div>
            </div>
            <div class="text-center">
              <div class="text-3xl mb-2">🌍</div>
              <div class="font-semibold">{{ t('about.stack.i18n.title') }}</div>
              <div class="text-sm text-base-content/70">{{ t('about.stack.i18n.desc') }}</div>
            </div>
            <div class="text-center">
              <div class="text-3xl mb-2">🔧</div>
              <div class="font-semibold">{{ t('about.stack.msw.title') }}</div>
              <div class="text-sm text-base-content/70">{{ t('about.stack.msw.desc') }}</div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 푸터 -->
    <footer class="footer footer-center p-4 bg-base-300 text-base-content">
      <div>
        <p>🚀 {{ t('footer.mainText') }}</p>
        <p class="text-sm">
          {{ t('footer.storybook') }}:
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
    showAlert(t('test.components.baseButton.loadingComplete'))
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
    apiSuccess.value = t('test.api.messages.fetchSuccess', { count: data.length })

    // 성공 메시지 3초 후 자동 숨김
    setTimeout(() => {
      apiSuccess.value = ''
    }, 3000)
  } catch (err) {
    apiError.value = t('test.api.messages.fetchError')
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
    apiSuccess.value = t('test.api.messages.createSuccess', { name: newUser.name })

    // 목록 새로고침
    fetchUsers()
  } catch (err) {
    apiError.value = t('test.api.messages.createError')
    console.error(err)
  } finally {
    apiLoading.value = false
  }
}

const clearUsers = () => {
  users.value = []
  apiSuccess.value = t('test.api.messages.clearSuccess')
  setTimeout(() => {
    apiSuccess.value = ''
  }, 2000)
}

const showUserDetail = (user: any) => {
  const userDetail = t('test.api.userDetail', {
    name: user.name,
    email: user.email,
    role: t(`test.api.roles.${user.role}`),
    createdAt: user.createdAt,
  })
  alert(userDetail)
}

// 컴포넌트 마운트 시 초기 데이터 로드
import { onMounted } from 'vue'
onMounted(() => {
  fetchUsers()
})
</script>
