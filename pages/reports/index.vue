<template>
  <div>
    <AppLayout>
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">
            {{ t('reports.title') }}
          </h1>
          <NuxtLink
            to="/reports/new"
            class="btn-primary"
          >
            <Plus class="w-4 h-4 mr-2" />
            {{ t('reports.new_report') }}
          </NuxtLink>
        </div>

        <!-- Filter and Search -->
        <div class="card p-4">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <input
                v-model="searchTerm"
                type="text"
                placeholder="Pesquisar..."
                class="input-field"
              />
            </div>
            <div>
              <select v-model="filterCompetitor" class="input-field">
                <option value="">Todos os Concorrentes</option>
                <option
                  v-for="competitor in dataStore.competitors"
                  :key="competitor.id"
                  :value="competitor.id"
                >
                  {{ competitor.name }}
                </option>
              </select>
            </div>
            <div>
              <select v-model="filterRegion" class="input-field">
                <option value="">Todas as Regiões</option>
                <option
                  v-for="region in uniqueRegions"
                  :key="region"
                  :value="region"
                >
                  {{ region }}
                </option>
              </select>
            </div>
            <div>
              <select v-model="filterVerified" class="input-field">
                <option value="">Todos os Status</option>
                <option value="true">Verificados</option>
                <option value="false">Pendentes</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Reports Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="report in filteredReports"
            :key="report.id"
            class="card hover:shadow-lg transition-all duration-200 overflow-hidden"
          >
            <!-- Header com Status e Data -->
            <div class="bg-gradient-to-r from-primary-50 to-secondary-50 px-4 py-3 border-b">
              <div class="flex justify-between items-center">
                <div class="flex items-center space-x-2">
                  <span
                    class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full"
                    :class="report.verified ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'"
                  >
                    <CheckCircle v-if="report.verified" class="w-3 h-3 mr-1" />
                    <Clock v-else class="w-3 h-3 mr-1" />
                    {{ report.verified ? 'Verificado' : 'Pendente' }}
                  </span>
                </div>
                <span class="text-xs text-gray-600">
                  {{ formatDate(report.reportDate) }}
                </span>
              </div>
            </div>

            <!-- Conteúdo Principal -->
            <div class="p-4">
              <!-- Concorrente em Destaque -->
              <div class="mb-3">
                <h3 class="text-lg font-bold text-gray-900 mb-1">
                  {{ getCompetitorName(report.competitorId) }}
                </h3>
                <div class="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin class="w-4 h-4" />
                  <span>{{ report.state || report.region }}</span>
                </div>
              </div>

              <!-- Preço -->
              <div class="bg-gray-50 rounded-lg p-3 mb-3">
                <div class="text-center">
                  <p class="text-xs text-gray-600 mb-1">Preço Capturado</p>
                  <p class="text-2xl font-bold text-primary-600">
                    {{ getCurrencySymbol(report.currencyId) }} {{ formatPrice(report.competitorPrice) }}
                  </p>
                </div>
              </div>

              <!-- Condições de Pagamento (apenas para admin) -->
              <div v-if="isAdmin && (report.paymentCondition || report.paymentMethod)" class="text-xs text-gray-500 mb-3">
                <div class="flex items-center space-x-2">
                  <CreditCard class="w-3 h-3" />
                  <span>{{ getPaymentConditionText(report.paymentCondition) }}</span>
                  <span v-if="report.paymentMethod">• {{ getPaymentMethodText(report.paymentMethod) }}</span>
                </div>
              </div>

              <!-- Observações (se houver) -->
              <div v-if="report.notes" class="text-xs text-gray-600 bg-blue-50 rounded p-2 mb-3 border-l-2 border-blue-200">
                <p class="italic">"{{ truncateText(report.notes, 60) }}"</p>
              </div>
            </div>

            <!-- Footer com Ações -->
            <div class="px-4 py-3 bg-gray-50 border-t">
              <div class="flex items-center justify-between">
                <div class="text-xs text-gray-500">
                  <User class="w-3 h-3 inline mr-1" />
                  {{ getReporterName(report.reportedBy) }}
                </div>
                <div class="flex items-center space-x-1">
                  <button
                    class="p-1.5 text-primary-600 hover:text-primary-900 hover:bg-primary-100 rounded transition-colors"
                    title="Visualizar Detalhes"
                  >
                    <Eye class="w-4 h-4" />
                  </button>
                  <button
                    v-if="isAdmin || report.reportedBy === authStore.user?.id"
                    class="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
                    title="Editar"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredReports.length === 0" class="text-center py-12">
          <FileText class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-500">{{ t('reports.no_reports') }}</p>
          <NuxtLink
            to="/reports/new"
            class="btn-primary mt-4 inline-flex items-center"
          >
            <Plus class="w-4 h-4 mr-2" />
            {{ t('reports.create_first') }}
          </NuxtLink>
        </div>
      </div>
    </AppLayout>
  </div>
</template>

<script setup>
import { Plus, Eye, Edit, FileText, CheckCircle, Clock, MapPin, CreditCard, User } from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth'
})

const { $pinia } = useNuxtApp()
const dataStore = useDataStore($pinia)
const authStore = useAuthStore($pinia)
const translationStore = useTranslationStore($pinia)

const t = (key, params) => translationStore.t(key, params)

const searchTerm = ref('')
const filterCompetitor = ref('')
const filterRegion = ref('')
const filterVerified = ref('')

const isAdmin = computed(() => authStore.user?.role === 'admin')

const uniqueRegions = computed(() => {
  const regions = [...new Set(dataStore.priceReports.map(r => r.region))]
  return regions.filter(Boolean)
})

const filteredReports = computed(() => {
  let reports = dataStore.priceReports

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    reports = reports.filter(report => {
      const product = getProductName(report.productId).toLowerCase()
      const competitor = getCompetitorName(report.competitorId).toLowerCase()
      return product.includes(term) || competitor.includes(term)
    })
  }

  if (filterCompetitor.value) {
    reports = reports.filter(r => r.competitorId === parseInt(filterCompetitor.value))
  }

  if (filterRegion.value) {
    reports = reports.filter(r => r.region === filterRegion.value)
  }

  if (filterVerified.value !== '') {
    reports = reports.filter(r => r.verified === (filterVerified.value === 'true'))
  }

  return reports.sort((a, b) => new Date(b.reportDate).getTime() - new Date(a.reportDate).getTime())
})

const getCompetitorName = (competitorId) => {
  const competitor = dataStore.getCompetitorById(competitorId)
  return competitor ? competitor.name : 'Concorrente Desconhecido'
}

const getProductName = (productId) => {
  const product = dataStore.getProductById(productId)
  return product ? product.name : 'Produto Desconhecido'
}

const getCurrencySymbol = (currencyId) => {
  const currency = dataStore.getCurrencyById(currencyId)
  return currency ? currency.symbol : 'R$'
}

const getReporterName = (reporterId) => {
  const user = authStore.users.find(u => u.id === reporterId)
  return user ? user.name : 'Desconhecido'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}

const formatPrice = (price) => {
  if (!price) return '0,00'
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)
}

const getProductBrand = (productId) => {
  const product = dataStore.getProductById(productId)
  return product ? product.brand : ''
}

const getPaymentConditionText = (condition) => {
  const conditions = {
    'A_VISTA': 'À Vista',
    'BOLETO_30': 'Boleto 30d',
    'BOLETO_60': 'Boleto 60d',
    'BOLETO_90': 'Boleto 90d',
    'BOLETO_120': 'Boleto 120d',
    'POS_COLHEITA': 'Pós-Colheita',
    'SAFRA': 'Safra',
    'BARTER': 'Barter',
    'FINANCIAMENTO': 'Financiamento',
    'PARCELA_MENSAL': 'Parcelado',
    'CHEQUE_PRE': 'Cheque Pré',
    'CARTAO_CREDITO': 'Cartão Crédito',
    'OUTRO': 'Outro'
  }
  return conditions[condition] || condition
}

const getPaymentMethodText = (method) => {
  const methods = {
    'DINHEIRO': 'Dinheiro',
    'PIX': 'PIX',
    'TRANSFERENCIA': 'Transferência',
    'BOLETO': 'Boleto',
    'CHEQUE': 'Cheque',
    'CARTAO_CREDITO': 'Cartão Crédito',
    'CARTAO_DEBITO': 'Cartão Débito',
    'DEPOSITO': 'Depósito',
    'DOCUMENTO': 'Documento',
    'OUTRO': 'Outro'
  }
  return methods[method] || method
}

const truncateText = (text, maxLength) => {
  if (!text) return ''
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

</script>
