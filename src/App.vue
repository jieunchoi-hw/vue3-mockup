<template>
  <div class="min-h-screen bg-base-100 p-8">
    <h1 class="text-3xl font-bold mb-8">Storybook 컴포넌트 테스트</h1>

    <div class="flex gap-4 flex-wrap">
      <BaseButton variant="primary" @click="showAlert('Primary clicked!')">
        Primary Button
      </BaseButton>
      <BaseButton variant="secondary" @click="showAlert('Secondary clicked!')">
        Secondary Button
      </BaseButton>
      <BaseButton variant="accent" size="lg" @click="showAlert('Large Accent!')">
        Large Accent
      </BaseButton>
      <BaseButton variant="ghost" :loading="loading" @click="testLoading">
        {{ loading ? 'Loading...' : 'Test Loading' }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from './components/BaseButton.vue'

const loading = ref(false)

const showAlert = (message: string) => {
  alert(message)
}

const testLoading = async () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>
