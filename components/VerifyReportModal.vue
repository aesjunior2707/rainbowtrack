<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="$emit('close')">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto" @click.stop>
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-900">
            Verificar Captura #{{ report.id }}
          </h3>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Competitor Information -->
        <div class="card p-4 mb-4">
          <h4 class="font-semibold text-gray-900 mb-2">Concorrente</h4>
          <div class="flex items-center space-x-3">
            <div class="bg-primary-600 rounded-full p-2">
              <Building2 class="w-5 h-5 text-white" />
            </div>
            <div>
              <p class="font-medium text-gray-900">{{ report.competitorName }}</p>
              <p class="text-sm text-gray-600">{{ formatDate(report.reportDate) }}</p>
            </div>
          </div>
        </div>

        <!-- Products Information -->
        <div class="card p-4 mb-4">
          <h4 class="font-semibold text-gray-900 mb-3">Produtos Capturados</h4>
          
          <div class="space-y-3">
            <div
              v-for="(productItem, index) in getReportProducts()"
              :key="`verify-${productItem.productId}-${index}`"
              class="border border-gray-200 rounded-lg p-3 bg-gray-50"
            >
              <div class="flex justify-between items-center">
                <div class="flex-1">
                  <h5 class="font-medium text-gray-900">{{ getProductName(productItem.productId) }}</h5>
                  <p class="text-sm text-gray-600">{{ getProductBrand(productItem.productId) }}</p>
                </div>
                <div class="text-right">
                  <p class="text-lg font-bold text-primary-600">
                    {{ report.currencySymbol }} {{ formatPrice(productItem.competitorPrice) }}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Additional Details -->
        <div class="card p-4 mb-6">
          <h4 class="font-semibold text-gray-900 mb-3">Detalhes</h4>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="text-gray-600">Estado:</span>
              <span class="ml-2 font-medium">{{ report.state || 'Não informado' }}</span>
            </div>
            <div>
              <span class="text-gray-600">Região:</span>
              <span class="ml-2 font-medium">{{ report.region || 'Não informado' }}</span>
            </div>
            <div>
              <span class="text-gray-600">Condição:</span>
              <span class="ml-2 font-medium">{{ getPaymentConditionText(report.paymentCondition) }}</span>
            </div>
          </div>
          
          <div v-if="report.notes" class="mt-3 pt-3 border-t border-gray-200">
            <span class="text-gray-600">Observações:</span>
            <p class="mt-1 text-sm text-gray-900">{{ report.notes }}</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-3">
          <button
            @click="$emit('close')"
            class="btn-outline"
          >
            Cancelar
          </button>
          <button
            @click="handleVerify"
            class="btn-primary"
          >
            <CheckCircle class="w-4 h-4 mr-2" />
            Verificar Captura
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { X, Building2, CheckCircle } from 'lucide-vue-next'

const props = defineProps(['report'])
const emit = defineEmits(['close', 'verified'])

const { $pinia } = useNuxtApp()
const dataStore = useDataStore($pinia)

const getProductName = (productId) => {
  const product = dataStore.getProductById(productId)
  return product ? product.name : 'Produto Desconhecido'
}

const getProductBrand = (productId) => {
  const product = dataStore.getProductById(productId)
  return product ? product.brand : 'Marca Desconhecida'
}

const getReportProducts = () => {
  // Support both old and new format
  if (props.report.products && Array.isArray(props.report.products)) {
    return props.report.products
  }
  // Convert old format to new format for display
  return [{
    productId: props.report.productId,
    competitorPrice: props.report.competitorPrice
  }]
}

const getProductCount = () => {
  return getReportProducts().length
}


const formatPrice = (price) => {
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

const getPaymentConditionText = (condition) => {
  const conditions = {
    'SAFRA_2026': 'Safra 2026',
    'SAFRINHA_2026': 'Safrinha 2026',
    'A_VISTA': 'A vista',
    '30_DIAS': '30 dias',
    '60_DIAS': '60 dias',
    '90_DIAS': '90 dias',
    '120_DIAS': '120 dias',
    '150_DIAS': '150 dias',
    '180_DIAS': '180 dias',
    '210_DIAS': '210 dias',
    '240_DIAS': '240 dias',
    '270_DIAS': '270 dias',
    '360_DIAS': '360 dias'
  }
  return conditions[condition] || condition
}


const handleVerify = () => {
  emit('verified', props.report.id)
}
</script>
