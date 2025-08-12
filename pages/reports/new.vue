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
          <!-- Competitor and Customer Selection -->
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
                      v-for="competitor in availableCompetitors"
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

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <User class="w-4 h-4 inline mr-1" />
                  Cliente
                </label>
                <input
                  v-model="customerName"
                  type="text"
                  class="input-field"
                  placeholder="Digite o nome do cliente (opcional)"
                />
                <p class="text-xs text-gray-500 mt-1">
                  Cliente que será visitado ou que forneceu a informação
                </p>
              </div>
            </div>
          </div>

          <!-- Product Selection -->
          <div class="card p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-semibold text-gray-900">
                Produtos Selecionados
              </h2>
              <button
                type="button"
                @click="showProductModal = true"
                class="btn-primary text-sm"
              >
                <Plus class="w-4 h-4 mr-2" />
                Adicionar Produto
              </button>
            </div>

            <!-- Selected Products List -->
            <div v-if="selectedProducts.length > 0" class="space-y-3">
              <div
                v-for="(item, index) in selectedProducts"
                :key="`${item.product.id}-${index}`"
                class="border border-gray-200 rounded-lg p-4 bg-gray-50"
              >
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <div class="flex items-start justify-between mb-2">
                      <div>
                        <h3 class="font-semibold text-gray-900">{{ item.product.name }}</h3>
                        <p class="text-sm text-gray-600">{{ item.product.brand }}</p>
                      </div>
                      <button
                        type="button"
                        @click="removeProduct(index)"
                        class="ml-2 p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <X class="w-4 h-4 text-gray-400" />
                      </button>
                    </div>

                    <!-- Price Display -->
                    <div class="mt-3">
                      <div class="text-sm">
                        <span class="text-gray-600">Preço Concorrente:</span>
                        <span class="ml-2 font-semibold text-lg text-primary-600">
                          R$ {{ formatPrice(item.competitorPrice) }}
                        </span>
                      </div>
                    </div>

                    <!-- Crops -->
                    <div class="flex flex-wrap gap-1 mt-3">
                      <span
                        v-for="crop in item.product.registeredCrops.slice(0, 3)"
                        :key="crop"
                        class="inline-block px-2 py-1 text-xs bg-secondary-100 text-secondary-800 rounded"
                      >
                        {{ crop }}
                      </span>
                      <span
                        v-if="item.product.registeredCrops.length > 3"
                        class="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                      >
                        +{{ item.product.registeredCrops.length - 3 }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <Package class="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p class="text-gray-500 mb-2">Nenhum produto selecionado</p>
              <p class="text-sm text-gray-400">Clique em "Adicionar Produto" para começar</p>
            </div>
          </div>

          <!-- Capture Summary -->
          <div v-if="selectedProducts.length > 0" class="card p-6 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
            <div class="flex justify-between items-center">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-1">
                  Resumo da Captura
                </h3>
                <p class="text-sm text-gray-600">
                  {{ selectedProducts.length }} produto{{ selectedProducts.length > 1 ? 's' : '' }} selecionado{{ selectedProducts.length > 1 ? 's' : '' }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-sm text-gray-600 mb-1">Valor Total</p>
                <p class="text-2xl font-bold text-primary-600">
                  {{ selectedCurrencySymbol }} {{ formatPrice(totalCaptureValue) }}
                </p>
              </div>
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

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Condição de Pagamento
                </label>
                <select v-model="paymentCondition" class="input-field" required>
                  <option value="">Selecione a condição</option>
                  <option value="A_VISTA">À Vista</option>
                  <option value="BOLETO_30">Boleto 30 dias</option>
                  <option value="BOLETO_60">Boleto 60 dias</option>
                  <option value="BOLETO_90">Boleto 90 dias</option>
                  <option value="BOLETO_120">Boleto 120 dias</option>
                  <option value="POS_COLHEITA">Pós-Colheita</option>
                  <option value="SAFRA">Safra</option>
                  <option value="BARTER">Barter (Troca)</option>
                  <option value="FINANCIAMENTO">Financiamento Próprio</option>
                  <option value="PARCELA_MENSAL">Parcelamento Mensal</option>
                  <option value="CHEQUE_PRE">Cheque Pré-Datado</option>
                  <option value="CARTAO_CREDITO">Cartão de Crédito</option>
                  <option value="OUTRO">Outro</option>
                </select>
              </div>


              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Moeda
                </label>
                <select v-model="currency" class="input-field" required>
                  <option value="">Selecione a moeda</option>
                  <option
                    v-for="curr in dataStore.currencies"
                    :key="curr.id"
                    :value="curr.id"
                  >
                    {{ curr.symbol }} - {{ curr.name }}
                  </option>
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

      <!-- Product Selection Modal -->
      <ProductSelectionModal
        v-if="showProductModal"
        :data-store="dataStore"
        @close="showProductModal = false"
        @product-selected="handleProductSelected"
      />
    </AppLayout>
  </div>
</template>

<script setup>
import { Plus, ArrowLeft, Search, Package, X, User } from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth'
})

const { $pinia } = useNuxtApp()
const dataStore = useDataStore($pinia)
const authStore = useAuthStore($pinia)
const translationStore = useTranslationStore($pinia)

const t = (key, params) => translationStore.t(key, params)

const selectedCompetitor = ref('')
const customerName = ref('')
const selectedProducts = ref([])
const reportDate = ref('')
const region = ref('')
const state = ref('')
const paymentCondition = ref('')
const currency = ref('')
const notes = ref('')
const showNewCompetitorModal = ref(false)
const showProductModal = ref(false)

const handleProductSelected = (productData) => {
  // Check if product already exists
  const existingIndex = selectedProducts.value.findIndex(
    item => item.product.id === productData.product.id
  )

  if (existingIndex >= 0) {
    // Update existing product price
    selectedProducts.value[existingIndex].competitorPrice = productData.competitorPrice
  } else {
    // Add new product
    selectedProducts.value.push({
      product: productData.product,
      competitorPrice: productData.competitorPrice
    })
  }

  showProductModal.value = false
}

const removeProduct = (index) => {
  selectedProducts.value.splice(index, 1)
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)
}

const selectedCurrencySymbol = computed(() => {
  const curr = dataStore.getCurrencyById(currency.value)
  return curr ? curr.symbol : 'R$'
})

const availableCompetitors = computed(() => {
  const userRegion = authStore.user?.defaultRegion
  const isAdmin = authStore.user?.role === 'admin'
  return dataStore.getCompetitorsByUserRegion(userRegion, isAdmin)
})



const canSubmit = computed(() => {
  return selectedCompetitor.value &&
         selectedProducts.value.length > 0 &&
         reportDate.value &&
         region.value &&
         state.value &&
         paymentCondition.value &&
         currency.value
})

const handleCompetitorCreated = (competitor) => {
  selectedCompetitor.value = competitor.id
  showNewCompetitorModal.value = false
}

const handleSubmit = () => {
  if (selectedProducts.value.length === 0) {
    return
  }

  // Create single report with multiple products
  const report = {
    competitorId: selectedCompetitor.value,
    customerName: customerName.value || '',
    reportDate: reportDate.value,
    reportedBy: authStore.user.id,
    notes: notes.value,
    region: region.value || 'Não informado',
    state: state.value,
    paymentCondition: paymentCondition.value,
    currencyId: currency.value,
    products: selectedProducts.value.map(item => ({
      productId: item.product.id,
      competitorPrice: item.competitorPrice
    }))
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

  // Set default currency to BRL (Real Brasileiro)
  const brlCurrency = dataStore.currencies.find(c => c.code === 'BRL')
  if (brlCurrency) {
    currency.value = brlCurrency.id
  }
})
</script>
