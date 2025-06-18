<template>
  <div :data-theme="currentTheme" class="min-h-screen bg-base-100">
    <!-- 헤더 네비게이션 -->
    <header class="navbar bg-base-200 shadow-lg">
      <div class="navbar-start">
        <h1 class="text-xl font-bold flex items-center gap-2">
          <img :src="oasisLogo" alt="Oasis Logo" class="w-6 h-6" />
          {{ t('header.title') }}
        </h1>
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
          <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
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

            <!-- Vitest 추가 -->
            <div class="stat bg-base-100 rounded-lg">
              <div class="stat-figure text-success">🧪</div>
              <div class="stat-title">Unit Testing</div>
              <div class="stat-value text-success">Vitest</div>
              <div class="stat-desc">Fast & Modern Testing</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Vitest 테스트 섹션 추가 -->
      <section class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">🧪 Unit Testing with Vitest</h2>
          <p class="text-base-content/70">
            Fast and modern testing framework powered by Vite. Run tests, check coverage, and ensure
            code quality.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <!-- 테스트 실행 버튼들 -->
            <div class="space-y-4">
              <h3 class="font-semibold">🚀 Test Commands</h3>
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <code class="bg-base-300 px-2 py-1 rounded text-sm">npm run test</code>
                  <span class="text-sm text-base-content/70">Watch mode</span>
                </div>
                <div class="flex items-center gap-2">
                  <code class="bg-base-300 px-2 py-1 rounded text-sm">npm run test:run</code>
                  <span class="text-sm text-base-content/70">Single run</span>
                </div>
                <div class="flex items-center gap-2">
                  <code class="bg-base-300 px-2 py-1 rounded text-sm">npm run test:ui</code>
                  <span class="text-sm text-base-content/70">UI mode</span>
                </div>
                <div class="flex items-center gap-2">
                  <code class="bg-base-300 px-2 py-1 rounded text-sm">npm run test:coverage</code>
                  <span class="text-sm text-base-content/70">Coverage report</span>
                </div>
              </div>
            </div>

            <!-- 테스트 현황 -->
            <div class="space-y-4">
              <h3 class="font-semibold">📋 Test Status</h3>
              <div class="space-y-2">
                <div class="flex justify-between items-center">
                  <span>BaseButton.test.ts</span>
                  <div class="badge badge-success">✅ Ready</div>
                </div>
                <div class="flex justify-between items-center">
                  <span>counter.test.ts</span>
                  <div class="badge badge-success">✅ Ready</div>
                </div>
                <div class="flex justify-between items-center">
                  <span>API Tests</span>
                  <div class="badge badge-warning">⚠️ Pending</div>
                </div>
                <div class="flex justify-between items-center">
                  <span>Integration Tests</span>
                  <div class="badge badge-warning">⚠️ Pending</div>
                </div>
              </div>

              <div class="mt-4">
                <BaseButton variant="primary" size="sm" @click="showTestInfo">
                  🔍 View Test Details
                </BaseButton>
              </div>
            </div>
          </div>

          <!-- 테스트 팁 -->
          <div class="mt-6 p-4 bg-base-100 rounded-lg border border-base-300">
            <h4 class="font-semibold mb-2">💡 Testing Tips</h4>
            <ul class="text-sm space-y-1 text-base-content/70">
              <li>
                • Use <code class="bg-base-200 px-1 rounded">describe</code> and
                <code class="bg-base-200 px-1 rounded">it</code> to organize tests
              </li>
              <li>
                • Test user interactions with
                <code class="bg-base-200 px-1 rounded">@vue/test-utils</code>
              </li>
              <li>• Mock API calls and external dependencies</li>
              <li>• Aim for good test coverage without over-testing</li>
              <li>• Keep tests fast and independent</li>
            </ul>
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

            <BaseButton variant="secondary" @click="toggleUserForm">
              ➕ {{ showUserForm ? t('test.api.hideForm') : t('test.api.createUser') }}
            </BaseButton>

            <BaseButton variant="accent" @click="clearUsers">
              🗑️ {{ t('test.api.clearUsers') }}
            </BaseButton>

            <BaseButton variant="primary" @click="resetData">
              🔄 {{ t('test.api.resetData') }}
            </BaseButton>
          </div>

          <!-- 사용자 생성 폼 -->
          <div v-if="showUserForm" class="mt-6 p-6 bg-base-100 rounded-lg border border-base-300">
            <h3 class="font-semibold text-lg mb-4">👤 {{ t('test.api.createUserForm.title') }}</h3>

            <form @submit.prevent="createUser" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- 이름 입력 -->
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">{{ t('test.api.createUserForm.name') }}</span>
                  </label>
                  <input
                    type="text"
                    v-model="newUser.name"
                    :placeholder="t('test.api.createUserForm.namePlaceholder')"
                    class="input input-bordered w-full"
                    :class="{ 'input-error': !newUser.name && formTouched }"
                    required
                  />
                  <label v-if="!newUser.name && formTouched" class="label">
                    <span class="label-text-alt text-error">{{
                      t('test.api.createUserForm.nameRequired')
                    }}</span>
                  </label>
                </div>

                <!-- 이메일 입력 -->
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">{{ t('test.api.createUserForm.email') }}</span>
                  </label>
                  <input
                    type="email"
                    v-model="newUser.email"
                    :placeholder="t('test.api.createUserForm.emailPlaceholder')"
                    class="input input-bordered w-full"
                    :class="{ 'input-error': !newUser.email && formTouched }"
                    required
                  />
                  <label v-if="!newUser.email && formTouched" class="label">
                    <span class="label-text-alt text-error">{{
                      t('test.api.createUserForm.emailRequired')
                    }}</span>
                  </label>
                </div>
              </div>

              <!-- 역할 선택 -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text">{{ t('test.api.createUserForm.role') }}</span>
                </label>
                <select v-model="newUser.role" class="select select-bordered w-full">
                  <option value="user">{{ t('test.api.roles.user') }}</option>
                  <option value="admin">{{ t('test.api.roles.admin') }}</option>
                </select>
              </div>

              <!-- 버튼들 -->
              <div class="flex gap-2 justify-end">
                <BaseButton type="button" variant="ghost" @click="resetForm">
                  {{ t('test.api.createUserForm.reset') }}
                </BaseButton>
                <BaseButton
                  type="submit"
                  variant="primary"
                  :loading="apiLoading"
                  :disabled="!newUser.name || !newUser.email"
                >
                  {{
                    apiLoading
                      ? t('test.api.createUserForm.creating')
                      : t('test.api.createUserForm.create')
                  }}
                </BaseButton>
              </div>
            </form>
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
          <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
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
            <!-- Vitest -->
            <div class="text-center">
              <div class="text-3xl mb-2">🧪</div>
              <div class="font-semibold">Vitest</div>
              <div class="text-sm text-base-content/70">Unit Testing Framework</div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 사용자 상세정보 모달 -->
    <div v-if="showUserModal" class="modal modal-open">
      <div class="modal-box relative">
        <!-- 모달 헤더 -->
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold">👤 {{ t('test.api.userDetailModal.title') }}</h3>
          <button @click="showUserModal = false" class="btn btn-sm btn-circle btn-ghost">✕</button>
        </div>

        <!-- 사용자 정보 -->
        <div v-if="selectedUser" class="space-y-4">
          <!-- 프로필 섹션 -->
          <div class="flex items-center space-x-4 p-4 bg-base-200 rounded-lg">
            <div class="flex">
              <h4 class="text-xl font-semibold">{{ selectedUser.name }}</h4>
              <span
                class="ml-2 badge"
                :class="{
                  'badge-error': selectedUser.role === 'admin',
                  'badge-primary': selectedUser.role === 'user',
                }"
              >
                {{ t(`test.api.roles.${selectedUser.role}`) }}
              </span>
            </div>
          </div>

          <!-- 상세 정보 -->
          <div class="grid grid-cols-1 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold"
                  >📧 {{ t('test.api.userDetailModal.email') }}</span
                >
              </label>
              <input
                type="text"
                :value="selectedUser.email"
                class="ml-2 input input-bordered bg-base-200"
                readonly
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold"
                  >🔖 {{ t('test.api.userDetailModal.role') }}</span
                >
              </label>
              <input
                type="text"
                :value="t(`test.api.roles.${selectedUser.role}`)"
                class="ml-2 input input-bordered bg-base-200"
                readonly
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold"
                  >📅 {{ t('test.api.userDetailModal.createdAt') }}</span
                >
              </label>
              <input
                type="text"
                :value="selectedUser.createdAt"
                class="ml-2 input input-bordered bg-base-200"
                readonly
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold"
                  >🆔 {{ t('test.api.userDetailModal.id') }}</span
                >
              </label>
              <input
                type="text"
                :value="selectedUser.id"
                class="ml-2 input input-bordered bg-base-200"
                readonly
              />
            </div>
          </div>

          <!-- 액션 버튼들 -->
          <div class="flex gap-2 justify-end pt-4">
            <BaseButton variant="ghost" @click="showUserModal = false">
              {{ t('test.api.userDetailModal.close') }}
            </BaseButton>
            <BaseButton variant="primary" @click="editUser(selectedUser)">
              {{ t('test.api.userDetailModal.edit') }}
            </BaseButton>
            <BaseButton variant="primary" @click="deleteUser(selectedUser.id)" class="btn-outline">
              {{ t('test.api.userDetailModal.delete') }}
            </BaseButton>
          </div>
        </div>
      </div>
      <div class="modal-backdrop" @click="showUserModal = false"></div>
    </div>

    <!-- 푸터 -->
    <footer class="footer footer-center p-4 bg-base-300 text-base-content">
      <div>
        <p>🚀 {{ t('footer.mainText') }}</p>
        <div class="flex gap-4 text-sm">
          <a href="/vue3-mockup/storybook/" target="_blank" class="link link-primary">
            📚 Storybook
          </a>
          <span>•</span>
          <a href="http://localhost:6006" target="_blank" class="link link-primary">
            🛠️ Local Storybook
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseButton from './components/BaseButton.vue'
import oasisLogo from '@/assets/oasis_logo.png'

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

// 사용자 폼 관련 상태
const showUserForm = ref(false)
const formTouched = ref(false)
const newUser = ref({
  name: '',
  email: '',
  role: 'user' as 'user' | 'admin',
})

// 사용자 상세 모달 관련 상태
const showUserModal = ref(false)
const selectedUser = ref<any>(null)

// 테마 토글
const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', currentTheme.value)
}

// 언어 변경
const changeLanguage = (lang: string) => {
  locale.value = lang
}

// 사용자 폼 토글
const toggleUserForm = () => {
  showUserForm.value = !showUserForm.value
  if (!showUserForm.value) {
    resetForm()
  }
}

// 폼 리셋
const resetForm = () => {
  newUser.value = {
    name: '',
    email: '',
    role: 'user',
  }
  formTouched.value = false
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

// Vitest 테스트 정보 표시
const showTestInfo = () => {
  alert(`🧪 Vitest Testing Framework
  
✅ Fast unit testing with HMR
✅ TypeScript support out of the box
✅ Vue component testing with @vue/test-utils
✅ Jest-compatible API
✅ Coverage reports
✅ Watch mode for development

Current test files:
• BaseButton.test.ts - Component testing
• counter.test.ts - Store testing

Run 'npm run test' to start testing!`)
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
  formTouched.value = true

  // 폼 유효성 검사
  if (!newUser.value.name || !newUser.value.email) {
    apiError.value = t('test.api.createUserForm.validationError')
    setTimeout(() => {
      apiError.value = ''
    }, 3000)
    return
  }

  apiLoading.value = true
  apiError.value = ''
  apiSuccess.value = ''

  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser.value),
    })

    if (!response.ok) throw new Error('사용자 생성 실패')

    const createdUser = await response.json()
    apiSuccess.value = t('test.api.messages.createSuccess', { name: createdUser.name })

    // 폼 리셋 및 숨기기
    resetForm()
    showUserForm.value = false

    // 목록 새로고침
    fetchUsers()
  } catch (err) {
    apiError.value = t('test.api.messages.createError')
    console.error(err)
  } finally {
    apiLoading.value = false
  }
}

const clearUsers = async () => {
  try {
    const response = await fetch('/api/users', {
      method: 'DELETE',
    })

    if (response.ok) {
      users.value = []
      apiSuccess.value = t('test.api.messages.clearSuccess')
    } else {
      throw new Error('데이터 삭제 실패')
    }
  } catch (error) {
    apiError.value = t('test.api.messages.clearError')
    console.error(error)
  }

  setTimeout(() => {
    apiSuccess.value = ''
    apiError.value = ''
  }, 3000)
}

const resetData = async () => {
  apiLoading.value = true
  apiError.value = ''
  apiSuccess.value = ''

  try {
    const response = await fetch('/api/users/reset', {
      method: 'POST',
    })

    if (response.ok) {
      const data = await response.json()
      users.value = data.users
      apiSuccess.value = t('test.api.messages.resetSuccess')
    } else {
      throw new Error('데이터 리셋 실패')
    }
  } catch (error) {
    apiError.value = t('test.api.messages.resetError')
    console.error(error)
  } finally {
    apiLoading.value = false
  }

  setTimeout(() => {
    apiSuccess.value = ''
    apiError.value = ''
  }, 3000)
}

const showUserDetail = (user: any) => {
  selectedUser.value = user
  showUserModal.value = true
}

const editUser = (user: any) => {
  // 편집 기능
  newUser.value = {
    name: user.name,
    email: user.email,
    role: user.role,
  }
  showUserModal.value = false
  showUserForm.value = true
  formTouched.value = false
}

const deleteUser = async (userId: number) => {
  if (!confirm(t('test.api.userDetailModal.deleteConfirm'))) {
    return
  }

  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      apiSuccess.value = t('test.api.messages.deleteSuccess')
      showUserModal.value = false
      fetchUsers()
    } else {
      throw new Error('사용자 삭제 실패')
    }
  } catch (error) {
    apiError.value = t('test.api.messages.deleteError')
    console.error(error)
  }

  setTimeout(() => {
    apiSuccess.value = ''
    apiError.value = ''
  }, 3000)
}

// 컴포넌트 마운트 시 초기 데이터 로드
import { onMounted } from 'vue'
onMounted(() => {
  fetchUsers()
})
</script>
