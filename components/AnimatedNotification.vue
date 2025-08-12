<template>
  <Transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="translate-x-full opacity-0"
    enter-to-class="translate-x-0 opacity-100"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="translate-x-0 opacity-100"
    leave-to-class="translate-x-full opacity-0"
  >
    <div
      v-if="show"
      class="fixed top-4 right-4 z-50 flex items-center space-x-3 px-6 py-4 rounded-lg shadow-lg transform"
      :class="notificationClasses"
    >
      <component :is="iconComponent" class="w-5 h-5 flex-shrink-0" />
      <span class="font-medium">{{ message }}</span>
      <button
        @click="$emit('close')"
        class="ml-2 text-current opacity-70 hover:opacity-100 transition-opacity"
      >
        <X class="w-4 h-4" />
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { CheckCircle, AlertCircle, X } from 'lucide-vue-next'

const props = defineProps({
  show: Boolean,
  type: {
    type: String,
    default: 'success',
    validator: value => ['success', 'error', 'warning'].includes(value)
  },
  message: String
})

defineEmits(['close'])

const notificationClasses = computed(() => {
  const classes = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white'
  }
  return classes[props.type]
})

const iconComponent = computed(() => {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertCircle
  }
  return icons[props.type]
})
</script>
