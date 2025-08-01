<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="$emit('close') || $emit('cancel')">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 transform transition-all duration-300 ease-out scale-100" @click.stop>
      <div class="p-6">
        <div class="flex items-center mb-4">
          <div class="flex-shrink-0 w-10 h-10 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle class="w-6 h-6 text-red-600" />
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-semibold text-gray-900">
              {{ title }}
            </h3>
          </div>
        </div>

        <div class="mb-6">
          <p class="text-sm text-gray-600">
            {{ message }}
          </p>
          <p v-if="warningText" class="text-sm text-red-600 mt-2 font-medium">
            {{ warningText }}
          </p>
        </div>

        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="$emit('cancel')"
            class="btn-outline"
          >
            Cancelar
          </button>
          <button
            type="button"
            @click="$emit('confirm')"
            class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { AlertTriangle } from 'lucide-vue-next'

defineProps({
  title: {
    type: String,
    default: 'Confirmar Exclusão'
  },
  message: {
    type: String,
    required: true
  },
  warningText: {
    type: String,
    default: ''
  },
  confirmText: {
    type: String,
    default: 'Excluir'
  }
})

defineEmits(['cancel', 'confirm'])
</script>
