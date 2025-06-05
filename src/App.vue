<template>
  <div class="min-h-screen bg-base-100 p-8">
    <h1 class="text-3xl font-bold mb-8">MSW API 테스트</h1>

    <!-- API 테스트 버튼들 -->
    <div class="mb-8 flex gap-4">
      <button @click="fetchUsers" class="btn btn-primary" :class="{ loading: loading }">
        사용자 목록 가져오기
      </button>
      <button @click="createUser" class="btn btn-secondary">새 사용자 생성</button>
    </div>

    <!-- 사용자 목록 표시 -->
    <div v-if="users.length > 0" class="grid gap-4">
      <div v-for="user in users" :key="user.id" class="card bg-base-200 shadow-lg">
        <div class="card-body">
          <h2 class="card-title">{{ user.name }}</h2>
          <p>📧 {{ user.email }}</p>
          <p>🔖 {{ user.role }}</p>
          <p>📅 {{ user.createdAt }}</p>
        </div>
      </div>
    </div>

    <!-- 에러 표시 -->
    <div v-if="error" class="alert alert-error">
      <span>{{ error }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface User {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
}

const users = ref<User[]>([])
const loading = ref(false)
const error = ref('')

const fetchUsers = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await fetch('/api/users')
    if (!response.ok) throw new Error('API 호출 실패')

    const data = await response.json()
    users.value = data
    console.log('사용자 데이터:', data)
  } catch (err) {
    error.value = '사용자 목록을 불러오는데 실패했습니다.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const createUser = async () => {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: '새 사용자',
        email: 'new@example.com',
        role: 'user',
      }),
    })

    if (!response.ok) throw new Error('사용자 생성 실패')

    const newUser = await response.json()
    console.log('새 사용자 생성됨:', newUser)

    // 목록 새로고침
    fetchUsers()
  } catch (err) {
    error.value = '사용자 생성에 실패했습니다.'
    console.error(err)
  }
}
</script>
