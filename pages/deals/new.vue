<template>
  <div>
    <AppLayout>
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">
            Novo Rastreamento
          </h1>
          <NuxtLink
            to="/deals"
            class="btn-outline"
          >
            <ArrowLeft class="w-4 h-4 mr-2" />
            Voltar
          </NuxtLink>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Customer Selection -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">
              Cliente
            </h2>
            <div class="space-y-4">
              <div class="flex space-x-4">
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Selecionar Cliente
                  </label>
                  <select v-model="selectedCustomer" class="input-field">
                    <option value="">Selecionar Cliente</option>
                    <option
                      v-for="customer in dataStore.customers"
                      :key="customer.id"
                      :value="customer.id"
                    >
                      {{ customer.name }} - {{ customer.company }}
                    </option>
                  </select>
                </div>
                <div class="flex items-end">
                  <button
                    type="button"
                    @click="showNewCustomerModal = true"
                    class="btn-secondary"
                  >
                    <Plus class="w-4 h-4 mr-2" />
                    Novo Cliente
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Products Selection -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">
              Produtos
            </h2>
            
            <!-- Product Categories - Mobile Optimized -->
            <div class="mb-6 space-y-4">
              <!-- Mobile: Dropdown for categories -->
              <div class="md:hidden">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Categoria
                </label>
                <select v-model="selectedCategory" class="input-field">
                  <option
                    v-for="category in categories"
                    :key="category"
                    :value="category"
                  >
                    {{ getCategoryName(category) }}
                  </option>
                </select>
              </div>
              
              <!-- Desktop: Buttons for categories -->
              <div class="hidden md:flex space-x-4">
                <button
                  v-for="category in categories"
                  :key="category"
                  type="button"
                  @click="selectedCategory = category"
                  class="px-4 py-2 rounded-lg font-medium transition-colors"
                  :class="selectedCategory === category ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                >
                  {{ getCategoryName(category) }}
                </button>
              </div>
              
              <!-- Product Search -->
              <div class="relative">
                <input
                  v-model="productSearch"
                  type="text"
                  placeholder="Buscar produtos..."
                  class="input-field pl-10"
                />
                <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <!-- Products List - Mobile Optimized -->
            <div class="mb-6">
              <!-- Mobile: List view -->
              <div class="md:hidden space-y-3">
                <div
                  v-for="product in filteredProducts"
                  :key="product.id"
                  class="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div class="flex justify-between items-start mb-3">
                    <div class="flex-1 min-w-0">
                      <h3 class="font-semibold text-gray-900 text-sm truncate">{{ product.name }}</h3>
                      <p class="text-xs text-gray-600 truncate">{{ product.brand }}</p>
                      <p class="text-sm font-medium text-primary-600 mt-1">R$ {{ product.price.toFixed(2) }}</p>
                    </div>
                    <button
                      type="button"
                      @click="addProduct(product)"
                      class="ml-3 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors flex-shrink-0"
                    >
                      <Plus class="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div class="space-y-1 text-xs text-gray-500">
                    <p><span class="font-medium">Embalagem:</span> {{ product.packaging }}</p>
                    <div class="flex flex-wrap gap-1 mt-2">
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
                </div>
              </div>
              
              <!-- Desktop: Grid view -->
              <div class="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                  v-for="product in filteredProducts"
                  :key="product.id"
                  class="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  @click="addProduct(product)"
                >
                  <div class="mb-2">
                    <h3 class="font-semibold text-gray-900">{{ product.name }}</h3>
                    <p class="text-sm text-gray-600">{{ product.brand }}</p>
                  </div>
                  <div class="space-y-1 text-sm">
                    <p><span class="font-medium">Preço:</span> R$ {{ product.price.toFixed(2) }}</p>
                    <p><span class="font-medium">Embalagem:</span> {{ product.packaging }}</p>
                    <p><span class="font-medium">Cultivos Registrados:</span> {{ product.registeredCrops.join(', ') }}</p>
                  </div>
                  <button
                    type="button"
                    class="mt-3 w-full btn-primary text-sm"
                  >
                    Adicionar Produto
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Empty State -->
            <div v-if="filteredProducts.length === 0" class="text-center py-8">
              <Package class="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p class="text-gray-500">Nenhum produto encontrado</p>
            </div>

            <!-- Selected Products Counter - Mobile -->
            <div v-if="selectedProducts.length > 0" class="md:hidden mb-4">
              <button
                type="button"
                @click="showSelectedProducts = !showSelectedProducts"
                class="w-full flex items-center justify-between p-3 bg-primary-50 border border-primary-200 rounded-lg"
              >
                <span class="font-medium text-primary-700">
                  {{ selectedProducts.length }} produto(s) selecionado(s)
                </span>
                <div class="flex items-center space-x-2">
                  <span class="text-sm font-semibold text-primary-600">
                    R$ {{ totalAmount.toFixed(2) }}
                  </span>
                  <ChevronDown 
                    class="w-4 h-4 text-primary-600 transition-transform"
                    :class="{ 'rotate-180': showSelectedProducts }"
                  />
                </div>
              </button>
            </div>

            <!-- Selected Products -->
            <div 
              v-if="selectedProducts.length > 0" 
              class="mt-6"
              :class="{ 'hidden md:block': !showSelectedProducts }"
            >
              <h3 class="font-semibold text-gray-900 mb-3">Produtos Selecionados</h3>
              <div class="space-y-3">
                <div
                  v-for="(item, index) in selectedProducts"
                  :key="index"
                  class="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                >
                  <div class="flex-1">
                    <p class="font-medium">{{ item.product.name }}</p>
                    <p class="text-sm text-gray-600">{{ item.product.brand }} - {{ item.product.packaging }}</p>
                  </div>
                  <div class="flex items-center space-x-4">
                    <div class="flex items-center space-x-2">
                      <label class="text-sm text-gray-700">Qty:</label>
                      <div class="flex items-center space-x-1">
                        <button
                          type="button"
                          @click="decreaseQuantity(index)"
                          class="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300"
                        >
                          <Minus class="w-4 h-4" />
                        </button>
                        <input
                          v-model.number="item.quantity"
                          type="number"
                          min="1"
                          class="w-16 text-center border rounded px-2 py-1"
                        />
                        <button
                          type="button"
                          @click="increaseQuantity(index)"
                          class="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300"
                        >
                          <Plus class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="font-medium text-primary-600">
                        R$ {{ (item.product.price * item.quantity).toFixed(2) }}
                      </p>
                    </div>
                    <button
                      type="button"
                      @click="removeProduct(index)"
                      class="text-red-600 hover:text-red-800"
                    >
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div class="mt-4 text-right">
                <p class="text-lg font-semibold text-primary-600">
                  Total: R$ {{ totalAmount.toFixed(2) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Deal Details -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">
              Detalhes do Negócio
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Data do Pedido
                </label>
                <ClientOnly>
                  <input
                    v-model="orderDate"
                    type="date"
                    class="input-field"
                    required
                  />
                </ClientOnly>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Data de Entrega
                </label>
                <ClientOnly>
                  <input
                    v-model="deliveryDate"
                    type="date"
                    class="input-field"
                    required
                  />
                </ClientOnly>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Método de Pagamento
                </label>
                <select v-model="paymentMethod" class="input-field" required>
                  <option value="">Selecionar Método de Pagamento</option>
                  <option value="credit_card">Cartão de Crédito</option>
                  <option value="bank_transfer">Transferência Bancária</option>
                  <option value="cash">Dinheiro</option>
                  <option value="check">Cheque</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Condições de Pagamento
                </label>
                <select v-model="paymentTerms" class="input-field" required>
                  <option value="">Selecionar Condições de Pagamento</option>
                  <option value="immediate">Imediato</option>
                  <option value="30_days">30 Dias</option>
                  <option value="60_days">60 Dias</option>
                  <option value="90_days">90 Dias</option>
                </select>
              </div>
            </div>
            <div class="mt-4">
              <label class="flex items-center">
                <input
                  v-model="sendByEmail"
                  type="checkbox"
                  class="mr-2"
                />
                <span class="text-sm text-gray-700">Enviar por Email</span>
              </label>
            </div>
          </div>

          <!-- Submit Buttons -->
          <div class="flex justify-end space-x-4">
            <NuxtLink
              to="/deals"
              class="btn-outline"
            >
              Cancelar
            </NuxtLink>
            <button
              type="submit"
              class="btn-primary"
              :disabled="!canSubmit"
            >
              Confirmar Negócio
            </button>
          </div>
        </form>
      </div>

      <!-- New Customer Modal -->
      <NewCustomerModal
        v-if="showNewCustomerModal"
        @close="showNewCustomerModal = false"
        @customer-created="handleCustomerCreated"
      />
    </AppLayout>
  </div>
</template>

<script setup>
import { Plus, ArrowLeft, Trash2, Search, Package, ChevronDown, Minus } from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth'
})

const { $pinia } = useNuxtApp()
const dataStore = useDataStore($pinia)

const selectedCustomer = ref('')
const selectedCategory = ref('fungicides')
const selectedProducts = ref([])
const orderDate = ref('')
const deliveryDate = ref('')
const paymentMethod = ref('')
const paymentTerms = ref('')
const sendByEmail = ref(false)
const showNewCustomerModal = ref(false)
const productSearch = ref('')
const showSelectedProducts = ref(false)

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
  let products = dataStore.getProductsByCategory(selectedCategory.value)
  
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

const totalAmount = computed(() => {
  return selectedProducts.value.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity)
  }, 0)
})

const canSubmit = computed(() => {
  return selectedCustomer.value && 
         selectedProducts.value.length > 0 && 
         orderDate.value && 
         deliveryDate.value && 
         paymentMethod.value && 
         paymentTerms.value
})

const addProduct = (product) => {
  const existingIndex = selectedProducts.value.findIndex(item => item.product.id === product.id)
  
  if (existingIndex >= 0) {
    selectedProducts.value[existingIndex].quantity += 1
  } else {
    selectedProducts.value.push({
      product,
      quantity: 1
    })
  }
}

const removeProduct = (index) => {
  selectedProducts.value.splice(index, 1)
}

const increaseQuantity = (index) => {
  selectedProducts.value[index].quantity += 1
}

const decreaseQuantity = (index) => {
  if (selectedProducts.value[index].quantity > 1) {
    selectedProducts.value[index].quantity -= 1
  }
}

const handleCustomerCreated = (customer) => {
  selectedCustomer.value = customer.id
  showNewCustomerModal.value = false
}

const handleSubmit = () => {
  const deal = {
    customerId: selectedCustomer.value,
    products: selectedProducts.value.map(item => ({
      productId: item.product.id,
      quantity: item.quantity,
      price: item.product.price
    })),
    orderDate: orderDate.value,
    deliveryDate: deliveryDate.value,
    paymentMethod: paymentMethod.value,
    paymentTerms: paymentTerms.value,
    sendByEmail: sendByEmail.value,
    total: totalAmount.value
  }
  
  dataStore.addDeal(deal)
  navigateTo('/deals')
}

// Set default dates
onMounted(() => {
  const today = new Date()
  orderDate.value = today.toISOString().split('T')[0]
  
  const nextWeek = new Date(today)
  nextWeek.setDate(today.getDate() + 7)
  deliveryDate.value = nextWeek.toISOString().split('T')[0]
})
</script>