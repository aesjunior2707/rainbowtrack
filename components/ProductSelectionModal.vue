<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50" @click="$emit('close')">
    <div class="bg-white w-full max-w-md h-[90vh] rounded-t-2xl flex flex-col" @click.stop>
      <!-- Header -->
      <div class="flex justify-between items-center p-4 border-b bg-white rounded-t-2xl sticky top-0 z-10">
        <h2 class="text-lg font-semibold text-gray-900">Selecionar Produto</h2>
        <button
          @click="$emit('close')"
          class="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Categories -->
      <div class="p-4 border-b bg-gray-50">
        <div class="flex space-x-2 overflow-x-auto pb-2">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            class="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors"
            :class="selectedCategory === category 
              ? 'bg-primary-600 text-white' 
              : 'bg-white text-gray-700 border border-gray-300'"
          >
            {{ getCategoryName(category) }}
          </button>
        </div>
      </div>

      <!-- Search -->
      <div class="p-4 border-b">
        <div class="relative">
          <input
            v-model="productSearch"
            type="text"
            placeholder="Buscar produtos..."
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <!-- Products List -->
      <div class="flex-1 overflow-y-auto">
        <div class="p-4 space-y-3">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="border border-gray-200 rounded-xl p-4 hover:border-primary-300 hover:shadow-sm transition-all cursor-pointer"
            :class="selectedProduct?.id === product.id ? 'border-primary-500 bg-primary-50' : ''"
            @click="selectProduct(product)"
          >
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="font-semibold text-gray-900">{{ product.competitorProduct}}</h3>
                  <span
                    v-if="product.isMainCompetitor"
                    class="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full"
                  >
                    <AlertCircle class="w-3 h-3 mr-1" />
                    Main
                  </span>
                </div>

                <div class="space-y-1 mb-3">
                  <p class="text-sm text-gray-600">
                    <span class="font-medium">Marca:</span> {{ product.brand }}
                  </p>
                  <p class="text-sm text-gray-600">
                    {{ product.name }}
                  </p>
                </div>
                
                <!-- Category Badge -->
                <div class="flex items-center space-x-2 mb-3">
                  <span class="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {{ getCategoryName(product.category) }}
                  </span>
                </div>

                <!-- Crops -->
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="crop in product.registeredCrops.slice(0, 2)"
                    :key="crop"
                    class="inline-block px-2 py-1 text-xs bg-secondary-100 text-secondary-800 rounded"
                  >
                    {{ crop }}
                  </span>
                  <span
                    v-if="product.registeredCrops.length > 2"
                    class="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                  >
                    +{{ product.registeredCrops.length - 2 }}
                  </span>
                </div>
              </div>

              <!-- Selection indicator -->
              <div
                v-if="selectedProduct?.id === product.id"
                class="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center ml-3"
              >
                <Check class="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredProducts.length === 0" class="flex flex-col items-center justify-center py-12">
          <Package class="w-16 h-16 text-gray-300 mb-4" />
          <p class="text-gray-500 text-center">Nenhum produto encontrado</p>
          <p class="text-gray-400 text-sm text-center mt-1">
            Tente alterar os filtros ou termo de busca
          </p>
        </div>
      </div>

      <!-- Selected Product & Price Input -->
      <div v-if="selectedProduct" class="border-t bg-gray-50 p-4 space-y-4">
        <div class="bg-white rounded-xl p-4 border border-primary-200">
          <div class="flex items-center justify-between mb-3">
            <div class="flex-1">
              <div class="flex items-center space-x-2 mb-1">
                <h4 class="font-semibold text-gray-900">{{ selectedProduct.competitorProduct || selectedProduct.name }}</h4>
                <span
                  v-if="selectedProduct.isMainCompetitor"
                  class="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full"
                >
                  Main
                </span>
              </div>
              <p class="text-sm text-gray-600">{{ selectedProduct.brand }}</p>
              <p class="text-xs text-gray-500" v-if="selectedProduct.competitorProduct">
                Concorrente: {{ selectedProduct.name }}
              </p>
            </div>
            <button
              @click="selectedProduct = null; competitorPrice = ''"
              class="p-2 hover:bg-gray-100 rounded-full"
            >
              <X class="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <!-- Currency Selection -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Moeda *
            </label>
            <select v-model="selectedCurrency" class="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option
                v-for="currency in props.dataStore.currencies"
                :key="currency.id"
                :value="currency.id"
              >
                {{ currency.symbol }} - {{ currency.name }}
              </option>
            </select>
          </div>

          <!-- Price Input -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Preço do Concorrente *
            </label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">{{ getCurrencySymbol(selectedCurrency) }}</span>
              <input
                v-model="competitorPrice"
                type="number"
                step="0.01"
                min="0"
                placeholder="0,00"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="p-4 border-t space-y-3">
        <button
          @click="confirmSelection"
          :disabled="!selectedProduct || !competitorPrice || !selectedCurrency"
          class="w-full py-3 px-4 bg-primary-600 text-white rounded-xl font-medium disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Confirmar Produto
        </button>
        <button
          @click="$emit('close')"
          class="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { X, Search, Package, Check, AlertCircle } from 'lucide-vue-next'

const props = defineProps({
  dataStore: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'product-selected'])

const selectedCategory = ref('defensivos')
const productSearch = ref('')
const selectedProduct = ref(null)
const competitorPrice = ref('')
const selectedCurrency = ref(1) // Default to BRL

const categories = ['defensivos', 'seeds', 'fertilizers', 'inoculants', 'biologicals']

const getCategoryName = (category) => {
  const names = {
    defensivos: 'Defensivos',
    seeds: 'Sementes',
    fertilizers: 'Fertilizantes',
    inoculants: 'Inoculantes',
    biologicals: 'Biológicos'
  }
  return names[category] || category
}

const filteredProducts = computed(() => {
  let products = props.dataStore.getProductsByCategory(selectedCategory.value)
  
  if (productSearch.value) {
    const search = productSearch.value.toLowerCase()
    products = products.filter(product => 
      product.name.toLowerCase().includes(search) ||
      product.brand.toLowerCase().includes(search) ||
      product.competitorProduct?.toLowerCase().includes(search) ||
      product.registeredCrops.some(crop => crop.toLowerCase().includes(search))
    )
  }
  
  return products
})

const selectProduct = (product) => {
  selectedProduct.value = product
  // Scroll to bottom to show price input
  nextTick(() => {
    const container = document.querySelector('.overflow-y-auto')
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  })
}

const getCurrencySymbol = (currencyId) => {
  const currency = props.dataStore.getCurrencyById(currencyId)
  return currency ? currency.symbol : 'R$'
}

const confirmSelection = () => {
  if (selectedProduct.value && competitorPrice.value && selectedCurrency.value) {
    emit('product-selected', {
      product: selectedProduct.value,
      competitorPrice: parseFloat(competitorPrice.value),
      currencyId: selectedCurrency.value
    })
  }
}

// Reset when modal opens
watch(() => props.dataStore, () => {
  selectedProduct.value = null
  competitorPrice.value = ''
  selectedCurrency.value = 1 // Reset to BRL
  productSearch.value = ''
  selectedCategory.value = 'defensivos'
}, { immediate: true })

// Reset selected currency when closing product selection
watch(selectedProduct, (newVal) => {
  if (!newVal) {
    selectedCurrency.value = 1 // Reset to BRL
  }
})
</script>
