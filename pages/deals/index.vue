<template>
  <div>
    <AppLayout>
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">
            Rastreamento de Negócios
          </h1>
          <NuxtLink
            to="/deals/new"
            class="btn-primary"
          >
            <Plus class="w-4 h-4 mr-2" />
            Novo Negócio
          </NuxtLink>
        </div>

        <!-- Deals Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="deal in dataStore.deals"
            :key="deal.id"
            class="card p-6 hover:shadow-lg transition-shadow"
          >
            <!-- Header do Card -->
            <div class="flex justify-between items-start mb-4">
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900">
                  {{ getCustomerName(deal.customerId) }}
                </h3>
                <p class="text-sm text-gray-500">
                  Negócio #{{ deal.id }}
                </p>
              </div>
              <div class="flex items-center space-x-2">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="deal.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                >
                  {{ getStatusText(deal.status) }}
                </span>
              </div>
            </div>

            <!-- Informações do Negócio -->
            <div class="space-y-3 mb-4">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Data do Pedido:</span>
                <span class="text-sm font-medium">{{ formatDate(deal.orderDate) }}</span>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Data de Entrega:</span>
                <span class="text-sm font-medium">{{ formatDate(deal.deliveryDate) }}</span>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Método de Pagamento:</span>
                <span class="text-sm font-medium">{{ getPaymentMethodText(deal.paymentMethod) }}</span>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Condições:</span>
                <span class="text-sm font-medium">{{ getPaymentTermsText(deal.paymentTerms) }}</span>
              </div>
            </div>

            <!-- Produtos -->
            <div class="mb-4">
              <p class="text-sm text-gray-600 mb-2">Produtos:</p>
              <div class="space-y-1">
                <div
                  v-for="product in deal.products.slice(0, 2)"
                  :key="product.productId"
                  class="text-xs text-gray-500"
                >
                  {{ getProductName(product.productId) }} ({{ product.quantity }}x)
                </div>
                <div
                  v-if="deal.products.length > 2"
                  class="text-xs text-gray-400"
                >
                  +{{ deal.products.length - 2 }} produto(s) adicional(is)
                </div>
              </div>
            </div>

            <!-- Total e Ações -->
            <div class="border-t pt-4">
              <div class="flex items-center justify-between mb-3">
                <span class="text-lg font-bold text-primary-600">
                  R$ {{ deal.total.toFixed(2) }}
                </span>
                <div class="flex items-center space-x-2">
                  <button
                    class="p-2 text-primary-600 hover:text-primary-900 hover:bg-primary-50 rounded-full transition-colors"
                    title="Visualizar"
                  >
                    <Eye class="w-4 h-4" />
                  </button>
                  <button
                    class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
                    title="Editar"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <!-- Indicador de Email -->
              <div v-if="deal.sendByEmail" class="flex items-center text-xs text-gray-500">
                <Mail class="w-3 h-3 mr-1" />
                Enviado por email
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="dataStore.deals.length === 0" class="text-center py-12">
          <ShoppingCart class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-500">Nenhum negócio encontrado</p>
          <NuxtLink
            to="/deals/new"
            class="btn-primary mt-4 inline-flex items-center"
          >
            <Plus class="w-4 h-4 mr-2" />
            Criar Primeiro Negócio
          </NuxtLink>
        </div>
      </div>
    </AppLayout>
  </div>
</template>

<script setup>
import { Plus, Eye, Edit, Mail, ShoppingCart } from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth'
})

const { $pinia } = useNuxtApp()
const dataStore = useDataStore($pinia)

const getCustomerName = (customerId) => {
  const customer = dataStore.getCustomerById(customerId)
  return customer ? customer.name : 'Unknown Customer'
}

const getProductName = (productId) => {
  const product = dataStore.getProductById(productId)
  return product ? product.name : 'Produto Desconhecido'
}

const getStatusText = (status) => {
  const statusMap = {
    'confirmed': 'Confirmado',
    'pending': 'Pendente',
    'delivered': 'Entregue',
    'cancelled': 'Cancelado'
  }
  return statusMap[status] || status
}

const getPaymentMethodText = (method) => {
  const methodMap = {
    'credit_card': 'Cartão de Crédito',
    'bank_transfer': 'Transferência',
    'cash': 'Dinheiro',
    'check': 'Cheque'
  }
  return methodMap[method] || method
}

const getPaymentTermsText = (terms) => {
  const termsMap = {
    'immediate': 'À Vista',
    '30_days': '30 Dias',
    '60_days': '60 Dias',
    '90_days': '90 Dias'
  }
  return termsMap[terms] || terms
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}
</script>