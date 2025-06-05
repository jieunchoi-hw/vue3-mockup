<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
import { computed } from 'vue'
const buttonClasses = computed(() => {
  const classes = ['btn']

  // Variant 처리
  if (props.variant === 'outline') {
    classes.push('btn-outline')
  } else {
    classes.push(`btn-${props.variant}`)
  }

  // Size
  if (props.size !== 'md') {
    classes.push(`btn-${props.size}`)
  }

  // States
  if (props.loading) classes.push('loading')
  if (props.disabled) classes.push('btn-disabled')

  return classes.join(' ')
})
</script>

<template>
  <button :class="buttonClasses" :disabled="disabled || loading" @click="emit('click', $event)">
    <span v-if="loading" class="loading loading-spinner loading-sm"></span>
    <slot v-else />
  </button>
</template>
