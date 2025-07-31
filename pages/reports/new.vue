<template>
  <div>
    <AppLayout>
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">
            {{ t('reports.new_report') }}
          </h1>
          <NuxtLink
            to="/reports"
            class="btn-outline"
          >
            <ArrowLeft class="w-4 h-4 mr-2" />
            {{ t('reports.back') }}
          </NuxtLink>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Competitor Selection -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">
              Informações Básicas
            </h2>
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t('reports.select_competitor') }}
                </label>
                <div class="flex space-x-2">
                  <select v-model="selectedCompetitor" class="input-field flex-1" required>
                    <option value="">{{ t('reports.select_competitor') }}</option>
                    <option
                      v-for="competitor in dataStore.competitors"
                      :key="competitor.id"
                      :value="competitor.id"
                    >
                      {{ competitor.name }} - {{ competitor.type }}
                    </option>
                  </select>
                  <button
                    v-if="authStore.user?.role === 'admin'"
                    type="button"
                    @click="showNewCompetitorModal = true"
                    class="btn-secondary whitespace-nowrap"
                  >
                    <Plus class="w-4 h-4 mr-1" />
                    Novo
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Product Selection -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">
              {{ t('reports.select_product') }}
            </h2>
            
            <!-- Product Categories -->
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

            <!-- Products List -->
            <div class="mb-6">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                  v-for="product in filteredProducts"
                  :key="product.id"
                  class="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  :class="selectedProduct === product.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200'"
                  @click="selectedProduct = product.id"
                >
                  <div class="mb-2">
                    <h3 class="font-semibold text-gray-900">{{ product.name }}</h3>
                    <p class="text-sm text-gray-600">{{ product.brand }}</p>
                  </div>
                  <div class="space-y-1 text-sm">
                    <p><span class="font-medium">Embalagem:</span> {{ product.packaging }}</p>
                  </div>
                  <div class="mt-2">
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
                </div>
              </div>
            </div>
            
            <!-- Empty State -->
            <div v-if="filteredProducts.length === 0" class="text-center py-8">
              <Package class="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p class="text-gray-500">Nenhum produto encontrado</p>
            </div>
          </div>

          <!-- Details -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">
              {{ t('reports.report_details') }}
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t('reports.report_date') }}
                </label>
                <ClientOnly>
                  <input
                    v-model="reportDate"
                    type="date"
                    class="input-field"
                    required
                  />
                </ClientOnly>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t('reports.region') }}
                </label>
                <input
                  v-model="region"
                  type="text"
                  class="input-field bg-gray-100"
                  placeholder="Região do representante"
                  readonly
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select v-model="state" class="input-field" required>
                  <option value="">Selecione o estado</option>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </select>
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t('reports.notes') }}
                </label>
                <textarea
                  v-model="notes"
                  rows="3"
                  class="input-field"
                  placeholder="Observações sobre o preço, condições especiais, etc."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Submit Buttons -->
          <div class="flex justify-end space-x-4">
            <NuxtLink
              to="/reports"
              class="btn-outline"
            >
              {{ t('reports.cancel') }}
            </NuxtLink>
            <button
              type="submit"
              class="btn-primary"
              :disabled="!canSubmit"
            >
              {{ t('reports.confirm_report') }}
            </button>
          </div>
        </form>
      </div>

      <!-- New Competitor Modal -->
      <NewCompetitorModal
        v-if="showNewCompetitorModal"
        @close="showNewCompetitorModal = false"
        @competitor-created="handleCompetitorCreated"
      />
    </AppLayout>
  </div>
</template>

<script setup>
import { Plus, ArrowLeft, Search, Package } from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth'
})

const { $pinia } = useNuxtApp()
const dataStore = useDataStore($pinia)
const authStore = useAuthStore($pinia)
const translationStore = useTranslationStore($pinia)

const t = (key, params) => translationStore.t(key, params)

const selectedCompetitor = ref('')
const selectedProduct = ref('')
const selectedCategory = ref('fungicides')
const reportDate = ref('')
const region = ref('')
const state = ref('')
const paymentCondition = ref('')
const notes = ref('')
const showNewCompetitorModal = ref(false)
const productSearch = ref('')

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

const canSubmit = computed(() => {
  return selectedCompetitor.value &&
         selectedProduct.value &&
         reportDate.value &&
         region.value &&
         state.value
})

const handleCompetitorCreated = (competitor) => {
  selectedCompetitor.value = competitor.id
  showNewCompetitorModal.value = false
}

const handleSubmit = () => {
  const report = {
    productId: selectedProduct.value,
    competitorId: selectedCompetitor.value,
    reportDate: reportDate.value,
    reportedBy: authStore.user.id,
    notes: notes.value,
    region: region.value || 'Não informado',
    state: state.value
  }

  dataStore.addPriceReport(report)
  navigateTo('/reports')
}

// Set default date to today and user's default region
onMounted(() => {
  const today = new Date()
  reportDate.value = today.toISOString().split('T')[0]

  // Set user's default region
  if (authStore.user?.defaultRegion) {
    region.value = authStore.user.defaultRegion
  }
})
</script>
