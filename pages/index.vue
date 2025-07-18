<template>
  <div>
    <AppLayout>
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">
              {{ t('dashboard.title') }}
            </h1>
            <ClientOnly>
              <p class="text-gray-600">
                {{ t('dashboard.welcome', { name: authStore.user?.name }) }}
              </p>
            </ClientOnly>
          </div>
          <div class="text-right">
            <ClientOnly>
              <div class="text-sm text-gray-500">
                {{ new Date().toLocaleDateString() }}
              </div>
            </ClientOnly>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="card p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">{{ t('dashboard.price_reports_month') }}</p>
                <p class="text-2xl font-bold text-primary-600">{{ currentMonthReports }}</p>
              </div>
              <div class="bg-primary-100 p-3 rounded-full">
                <FileText class="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div class="card p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">{{ t('dashboard.verified_reports') }}</p>
                <p class="text-2xl font-bold text-secondary-500">{{ verifiedReportsPercentage }}%</p>
              </div>
              <div class="bg-secondary-100 p-3 rounded-full">
                <CheckCircle class="w-6 h-6 text-secondary-500" />
              </div>
            </div>
          </div>

          <div class="card p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">{{ t('dashboard.active_competitors') }}</p>
                <p class="text-2xl font-bold text-blue-600">{{ dataStore.competitors.filter(c => c.active).length }}</p>
              </div>
              <div class="bg-blue-100 p-3 rounded-full">
                <Building2 class="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div class="card p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">{{ t('dashboard.customers') }}</p>
                <p class="text-2xl font-bold text-purple-600">{{ dataStore.customers.length }}</p>
              </div>
              <div class="bg-purple-100 p-3 rounded-full">
                <Users class="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Reports and Competitor Ranking -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Recent Reports -->
          <div class="card">
            <div class="p-6 border-b">
              <h2 class="text-lg font-semibold text-gray-900">
                {{ t('dashboard.recent_reports') }}
              </h2>
            </div>
            <div class="divide-y">
              <div
                v-for="report in recentReports"
                :key="report.id"
                class="p-6 hover:bg-gray-50 transition-colors"
              >
                <div class="flex justify-between items-start">
                  <div>
                    <p class="font-medium text-gray-900">
                      {{ getProductName(report.productId) }}
                    </p>
                    <p class="text-sm text-gray-500">
                      {{ getCustomerName(report.customerId) }} - {{ getCompetitorName(report.competitorId) }}
                    </p>
                    <p class="text-xs text-gray-400">
                      {{ formatDate(report.reportDate) }}
                    </p>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold" :class="getPriceDifferenceColor(report)">
                      {{ getCurrencySymbol(report.currencyId) }} {{ report.competitorPrice.toFixed(2) }}
                    </p>
                    <span
                      class="inline-flex items-center px-2 py-1 text-xs rounded-full"
                      :class="report.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                    >
                      <CheckCircle v-if="report.verified" class="w-3 h-3 mr-1" />
                      <Clock v-else class="w-3 h-3 mr-1" />
                      {{ report.verified ? 'Verificado' : 'Pendente' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Competitor Ranking -->
          <div class="card">
            <div class="p-6 border-b">
              <h2 class="text-lg font-semibold text-gray-900">
                {{ t('dashboard.competitor_ranking') }}
              </h2>
            </div>
            <div class="divide-y">
              <div
                v-for="(competitor, index) in competitorRanking"
                :key="competitor.id"
                class="p-6 hover:bg-gray-50 transition-colors"
              >
                <div class="flex justify-between items-start">
                  <div>
                    <div class="flex items-center">
                      <span class="inline-flex items-center justify-center w-6 h-6 bg-primary-100 text-primary-600 text-sm font-semibold rounded-full mr-3">
                        {{ index + 1 }}
                      </span>
                      <div>
                        <p class="font-medium text-gray-900">{{ competitor.name }}</p>
                        <p class="text-sm text-gray-500">{{ competitor.type }} - {{ competitor.region }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold text-gray-900">
                      {{ competitor.reportCount }} relatórios
                    </p>
                    <p class="text-sm text-gray-500">{{ competitor.marketShare }}% mercado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="card p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">
            {{ t('dashboard.quick_actions') }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <NuxtLink
              to="/reports/new"
              class="btn-primary text-center py-3 px-6 rounded-lg no-underline"
            >
              <FileText class="w-5 h-5 inline mr-2" />
              {{ t('dashboard.new_report') }}
            </NuxtLink>
            <NuxtLink
              to="/customers"
              class="btn-secondary text-center py-3 px-6 rounded-lg no-underline"
            >
              <UserPlus class="w-5 h-5 inline mr-2" />
              {{ t('dashboard.new_customer') }}
            </NuxtLink>
            <NuxtLink
              to="/competitors"
              class="btn-outline text-center py-3 px-6 rounded-lg no-underline"
            >
              <Building2 class="w-5 h-5 inline mr-2" />
              Concorrentes
            </NuxtLink>
          </div>
        </div>
      </div>
    </AppLayout>
  </div>
</template>

<script setup>
import { FileText, CheckCircle, Building2, Users, UserPlus, Clock } from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth'
})

const { $pinia } = useNuxtApp()
const authStore = useAuthStore($pinia)
const dataStore = useDataStore($pinia)
const translationStore = useTranslationStore($pinia)

const t = (key, params) => translationStore.t(key, params)

const recentReports = computed(() => {
  return dataStore.getRecentPriceReports(5)
})

const competitorRanking = computed(() => {
  return dataStore.getCompetitorRanking().slice(0, 5)
})

const currentMonthReports = computed(() => {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  return dataStore.priceReports.filter(report => {
    const reportDate = new Date(report.reportDate)
    return reportDate.getMonth() === currentMonth && reportDate.getFullYear() === currentYear
  }).length
})

const verifiedReportsPercentage = computed(() => {
  const totalReports = dataStore.priceReports.length
  if (totalReports === 0) return 0
  const verifiedReports = dataStore.priceReports.filter(r => r.verified).length
  return Math.round((verifiedReports / totalReports) * 100)
})

const getCustomerName = (customerId) => {
  const customer = dataStore.getCustomerById(customerId)
  return customer ? customer.name : 'Unknown Customer'
}

const getCompetitorName = (competitorId) => {
  const competitor = dataStore.getCompetitorById(competitorId)
  return competitor ? competitor.name : 'Unknown Competitor'
}

const getProductName = (productId) => {
  const product = dataStore.getProductById(productId)
  return product ? product.name : 'Unknown Product'
}

const getCurrencySymbol = (currencyId) => {
  const currency = dataStore.getCurrencyById(currencyId)
  return currency ? currency.symbol : 'R$'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}

const getPriceDifferenceColor = (report) => {
  const product = dataStore.getProductById(report.productId)
  if (!product) return 'text-gray-600'
  
  const difference = product.ourPrice - report.competitorPrice
  if (difference > 0) return 'text-red-600' // We're more expensive
  if (difference < 0) return 'text-green-600' // We're cheaper
  return 'text-gray-600' // Same price
}
</script>