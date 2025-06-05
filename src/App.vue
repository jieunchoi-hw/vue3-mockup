<template>
  <div class="min-h-screen bg-base-100 p-8">
    <!-- 언어 전환 버튼 -->
    <div class="mb-8 flex gap-4">
      <button
        @click="locale = 'ko'"
        class="btn btn-primary"
        :class="{ 'btn-outline': locale !== 'ko' }"
      >
        {{ t('common.language.korean') }}
      </button>
      <button
        @click="locale = 'en'"
        class="btn btn-primary"
        :class="{ 'btn-outline': locale !== 'en' }"
      >
        {{ t('common.language.english') }}
      </button>
    </div>

    <!-- 번역 테스트 -->
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">{{ t('home.title') }}</h2>
        <p>{{ t('home.welcome') }}</p>
        <p>현재 언어: {{ locale }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
</script>
