<template>
  <div>
    <AppLayout>
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">
            Catálogo de Produtos
          </h1>
        </div>

        <!-- Category Filter -->
        <div class="card p-4">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="category in categories"
              :key="category"
              @click="selectedCategory = category"
              class="px-4 py-2 rounded-lg font-medium transition-colors"
              :class="selectedCategory === category ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
            >
              {{ getCategoryName(category) }}
            </button>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="card p-6 hover:shadow-lg transition-shadow"
          >
            <div class="mb-4">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-lg font-semibold text-gray-900">{{ product.name }}</h3>
                <div class="flex items-center space-x-2">
                  <span
                    class="inline-block px-3 py-1 text-xs font-medium rounded-full"
                    :class="getCategoryColor(product.category)"
                  >
                    {{ getCategoryName(product.category) }}
                  </span>
                  <span 
                    v-if="product.isMainCompetitor"
                    class="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full"
                  >
                    <AlertCircle class="w-3 h-3 mr-1" />
                    Main
                  </span>
                </div>
              </div>
              <p class="text-primary-600 font-medium">{{ product.brand }}</p>
            </div>
            
            <div class="space-y-3 text-sm">
              <!-- Competitor Product -->
              <div v-if="product.competitorProduct">
                <span class="text-gray-600">Produto Concorrente:</span>
                <p class="font-medium text-gray-900">{{ product.competitorProduct }}</p>
              </div>
              
              <div>
                <span class="text-gray-600">Cultivos Registrados:</span>
                <div class="flex flex-wrap gap-1 mt-1">
                  <span
                    v-for="crop in product.registeredCrops"
                    :key="crop"
                    class="inline-block px-2 py-1 text-xs bg-secondary-100 text-secondary-800 rounded"
                  >
                    {{ crop }}
                  </span>
                </div>
              </div>
              
              <div class="pt-2 border-t">
                <p class="text-xs text-gray-500">{{ product.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredProducts.length === 0" class="text-center py-12">
          <Package class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-500">Nenhum produto encontrado nesta categoria</p>
        </div>
      </div>
    </AppLayout>
  </div>
</template>

<script setup>
import { Package, AlertCircle } from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth'
})

const { $pinia } = useNuxtApp()
const dataStore = useDataStore($pinia)

const selectedCategory = ref('defensivos')
const categories = ['defensivos', 'seeds'] // Apenas as categorias que realmente temos

const getCategoryName = (category) => {
  const names = {
    defensivos: 'Defensivos',
    seeds: 'Sementes'
  }
  return names[category] || category
}

const filteredProducts = computed(() => {
  return dataStore.getProductsByCategory(selectedCategory.value)
})

const getCategoryColor = (category) => {
  const colors = {
    defensivos: 'bg-blue-100 text-blue-800',
    seeds: 'bg-green-100 text-green-800'
  }
  return colors[category] || 'bg-gray-100 text-gray-800'
}
</script>
