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
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="report in filteredReports"
            :key="report.id"
            class="card p-6 hover:shadow-lg transition-shadow"
          >
            <!-- Header do Card -->
            <div class="flex justify-between items-start mb-4">
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900">
                  {{ getProductName(report.productId) }}
                </h3>
                <p class="text-sm text-gray-500">
                  {{ t('reports.report_number', { id: report.id }) }}
                </p>
              </div>
              <div class="flex items-center space-x-2">
                <span
                  class="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full"
                  :class="report.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                >
                  <CheckCircle v-if="report.verified" class="w-3 h-3 mr-1" />
                  <Clock v-else class="w-3 h-3 mr-1" />
                  {{ report.verified ? t('reports.verified') : 'Pendente' }}
                </span>
              </div>
            </div>

            <!-- Informações do Relatório -->
            <div class="space-y-3 mb-4">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">{{ t('reports.competitor') }}</span>
                <span class="text-sm font-medium">{{ getCompetitorName(report.competitorId) }}</span>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">{{ t('reports.region') }}</span>
                <span class="text-sm font-medium">{{ report.region }}</span>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">{{ t('reports.report_date') }}</span>
                <span class="text-sm font-medium">{{ formatDate(report.reportDate) }}</span>
              </div>
            </div>

            <!-- Observações -->
            <div v-if="report.notes" class="mb-4">
              <p class="text-sm text-gray-600 mb-1">{{ t('reports.notes') }}</p>
              <p class="text-xs text-gray-500 italic">{{ report.notes }}</p>
            </div>

            <!-- Ações -->
            <div class="border-t pt-4">
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-400">
                  Por: {{ getReporterName(report.reportedBy) }}
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
import { Plus, Eye, Edit, FileText, CheckCircle, Clock } from 'lucide-vue-next'

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

</script>