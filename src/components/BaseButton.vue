<script setup lang="ts">
import { computed } from 'vue'
interface Props {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost'
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

const buttonClasses = computed(() => {
  const classes = ['btn']

  // Variant
  classes.push(`btn-${props.variant}`)

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
