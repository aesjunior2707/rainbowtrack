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
                <p class="text-sm text-gray-600">{{ t('dashboard.sales_month') }}</p>
                <p class="text-2xl font-bold text-primary-600">R$ 45.230</p>
              </div>
              <div class="bg-primary-100 p-3 rounded-full">
                <TrendingUp class="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div class="card p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">{{ t('dashboard.goals_achieved') }}</p>
                <p class="text-2xl font-bold text-secondary-500">85%</p>
              </div>
              <div class="bg-secondary-100 p-3 rounded-full">
                <Target class="w-6 h-6 text-secondary-500" />
              </div>
            </div>
          </div>

          <div class="card p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">{{ t('dashboard.active_deals') }}</p>
                <p class="text-2xl font-bold text-blue-600">12</p>
              </div>
              <div class="bg-blue-100 p-3 rounded-full">
                <ShoppingCart class="w-6 h-6 text-blue-600" />
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

        <!-- Recent Deals and Top Products -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Recent Deals -->
          <div class="card">
            <div class="p-6 border-b">
              <h2 class="text-lg font-semibold text-gray-900">
                {{ t('dashboard.recent_deals') }}
              </h2>
            </div>
            <div class="divide-y">
              <div
                v-for="deal in recentDeals"
                :key="deal.id"
                class="p-6 hover:bg-gray-50 transition-colors"
              >
                <div class="flex justify-between items-start">
                  <div>
                    <p class="font-medium text-gray-900">
                      {{ getCustomerName(deal.customerId) }}
                    </p>
                    <p class="text-sm text-gray-500">
                      {{ deal.orderDate }}
                    </p>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold text-primary-600">
                      R$ {{ deal.total.toFixed(2) }}
                    </p>
                    <span
                      class="inline-block px-2 py-1 text-xs rounded-full"
                      :class="deal.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                    >
                      {{ deal.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Top Products -->
          <div class="card">
            <div class="p-6 border-b">
              <h2 class="text-lg font-semibold text-gray-900">
                {{ t('dashboard.top_products') }}
              </h2>
            </div>
            <div class="divide-y">
              <div
                v-for="product in topProducts"
                :key="product.id"
                class="p-6 hover:bg-gray-50 transition-colors"
              >
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium text-gray-900">{{ product.name }}</p>
                    <p class="text-sm text-gray-500">{{ product.brand }}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold text-primary-600">
                      R$ {{ product.price.toFixed(2) }}
                    </p>
                    <p class="text-sm text-gray-500">{{ product.packaging }}</p>
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
              to="/deals/new"
              class="btn-primary text-center py-3 px-6 rounded-lg no-underline"
            >
              <Plus class="w-5 h-5 inline mr-2" />
              {{ t('dashboard.new_deal') }}
            </NuxtLink>
            <NuxtLink
              to="/customers"
              class="btn-secondary text-center py-3 px-6 rounded-lg no-underline"
            >
              <UserPlus class="w-5 h-5 inline mr-2" />
              {{ t('dashboard.new_customer') }}
            </NuxtLink>
            <NuxtLink
              to="/products"
              class="btn-outline text-center py-3 px-6 rounded-lg no-underline"
            >
              <Package class="w-5 h-5 inline mr-2" />
              {{ t('dashboard.products') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </AppLayout>
  </div>
</template>

<script setup>
import { TrendingUp, Target, ShoppingCart, Users, Plus, UserPlus, Package } from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth'
})

const { $pinia } = useNuxtApp()
const authStore = useAuthStore($pinia)
const dataStore = useDataStore($pinia)
const translationStore = useTranslationStore($pinia)

const t = (key: string, params?: Record<string, any>) => translationStore.t(key, params)

const recentDeals = computed(() => {
  return dataStore.deals.slice(0, 5)
})

const topProducts = computed(() => {
  return dataStore.products.slice(0, 5)
})

const getCustomerName = (customerId) => {
  const customer = dataStore.getCustomerById(customerId)
  return customer ? customer.name : 'Unknown Customer'
}

// Initialize translation store
onMounted(() => {
  translationStore.initLocale()
})
</script>