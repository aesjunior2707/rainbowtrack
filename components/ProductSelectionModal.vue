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
                <h3 class="font-semibold text-gray-900 mb-1">{{ product.name }}</h3>
                <p class="text-sm text-gray-600 mb-2">{{ product.brand }}</p>
                
                <!-- Crops -->
                <div class="flex flex-wrap gap-1 mb-3">
                  <span
                    v-for="crop in product.registeredCrops.slice(0, 3)"
                    :key="crop"
                    class="inline-block px-2 py-1 text-xs bg-secondary-100 text-secondary-800 rounded"
                  >
                    {{ crop }}
                  </span>
                  <span
                    v-if="product.registeredCrops.length > 3"
                    class="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                  >
                    +{{ product.registeredCrops.length - 3 }}
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
            <div>
              <h4 class="font-semibold text-gray-900">{{ selectedProduct.name }}</h4>
              <p class="text-sm text-gray-600">{{ selectedProduct.brand }}</p>
            </div>
            <button
              @click="selectedProduct = null; competitorPrice = ''"
              class="p-2 hover:bg-gray-100 rounded-full"
            >
              <X class="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <!-- Price Input -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Preço do Concorrente *
            </label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
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
          :disabled="!selectedProduct || !competitorPrice"
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
import { X, Search, Package, Check } from 'lucide-vue-next'

const props = defineProps({
  dataStore: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'product-selected'])

const selectedCategory = ref('fungicides')
const productSearch = ref('')
const selectedProduct = ref(null)
const competitorPrice = ref('')

const categories = ['fungicides', 'insecticides', 'herbicides']

const getCategoryName = (category) => {
  const names = {
    fungicides: 'Fungicidas',
    insecticides: 'Inseticidas',
    herbicides: 'Herbicidas'
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

const formatPrice = (price) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)
}

const confirmSelection = () => {
  if (selectedProduct.value && competitorPrice.value) {
    emit('product-selected', {
      product: selectedProduct.value,
      competitorPrice: parseFloat(competitorPrice.value)
    })
  }
}

// Reset when modal opens
watch(() => props.dataStore, () => {
  selectedProduct.value = null
  competitorPrice.value = ''
  productSearch.value = ''
  selectedCategory.value = 'fungicides'
}, { immediate: true })
</script>
