<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg max-w-md w-full mx-4 p-6">
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle class="w-6 h-6 text-green-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">
            Verificar Captura
          </h3>
        </div>
        <button
          @click="$emit('close')"
          class="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X class="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <!-- Content -->
      <div class="mb-6">
        <p class="text-gray-600 mb-4">
          Você deseja marcar esta captura como <strong>verificada</strong>?
        </p>
        
        <!-- Report Summary -->
        <div class="bg-gray-50 rounded-lg p-4 border">
          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Concorrente:</span>
              <span class="text-sm font-medium">{{ report.competitorName }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Preço:</span>
              <span class="text-sm font-medium text-primary-600">
                {{ report.currencySymbol }} {{ formatPrice(report.competitorPrice) }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Data:</span>
              <span class="text-sm font-medium">{{ formatDate(report.reportDate) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Local:</span>
              <span class="text-sm font-medium">{{ report.state || report.region }}</span>
            </div>
          </div>
          
          <div v-if="report.notes" class="mt-3 pt-3 border-t">
            <p class="text-xs text-gray-600 mb-1">Observações:</p>
            <p class="text-sm text-gray-800 italic">"{{ report.notes }}"</p>
          </div>
        </div>

        <div class="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <div class="flex items-start space-x-2">
            <CheckCircle class="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div class="text-sm text-green-800">
              <p class="font-medium">Esta ação irá:</p>
              <ul class="mt-1 space-y-1 text-sm">
                <li>• Marcar a captura como verificada</li>
                <li>• Registrar você como responsável pela verificação</li>
                <li>• Atualizar o status visualmente para todos os usuários</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex space-x-3">
        <button
          @click="$emit('close')"
          class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          @click="confirmVerification"
          class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          Confirmar Verificação
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckCircle, X } from 'lucide-vue-next'

const props = defineProps({
  report: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'verified'])

const formatPrice = (price) => {
  if (!price) return '0,00'
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}

const confirmVerification = () => {
  emit('verified', props.report.id)
}
</script>
