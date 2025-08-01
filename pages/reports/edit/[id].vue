<template>
  <div>
    <AppLayout>
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">
              Editar Captura #{{ reportId }}
            </h1>
            <p class="text-gray-600 mt-1">
              Atualize as informações da captura e dos produtos capturados
            </p>
          </div>
          <NuxtLink
            to="/reports"
            class="btn-outline"
          >
            <ArrowLeft class="w-4 h-4 mr-2" />
            Voltar
          </NuxtLink>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
          <div class="animate-pulse">
            <div class="w-16 h-16 bg-primary-200 rounded-full mx-auto mb-4"></div>
            <div class="text-primary-600 font-semibold">Carregando captura...</div>
          </div>
        </div>

        <!-- Report Not Found -->
        <div v-else-if="!report" class="text-center py-12">
          <div class="w-16 h-16 bg-red-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <X class="w-8 h-8 text-red-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Captura não encontrada</h3>
          <p class="text-gray-600">A captura que você está tentando editar não existe ou foi removida.</p>
        </div>

        <!-- Edit Form -->
        <form v-else @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Competitor Information Card -->
          <div class="card p-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Informações da Captura
            </h4>
            <div class="space-y-4">
              <!-- Concorrente -->
              <div class="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-lg p-4">
                <div class="flex items-center space-x-4">
                  <div class="bg-primary-600 rounded-full p-3">
                    <Building2 class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h5 class="font-semibold text-gray-900">{{ competitorInfo.name }}</h5>
                    <p class="text-sm text-gray-600">{{ competitorInfo.type }}</p>
                  </div>
                </div>
              </div>

              <!-- Cliente -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <User class="w-4 h-4 inline mr-1" />
                  Cliente
                </label>
                <input
                  v-model="form.customerName"
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

          <!-- Products Information Card -->
          <div class="card p-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Produtos Capturados
            </h4>
            
            <div class="space-y-4">
              <div
                v-for="(productItem, index) in form.products"
                :key="`${productItem.productId}-${index}`"
                class="border border-gray-200 rounded-lg p-4 bg-gray-50"
              >
                <div class="flex justify-between items-start mb-4">
                  <div class="flex-1">
                    <h5 class="font-semibold text-gray-900">{{ getProductName(productItem.productId) }}</h5>
                    <p class="text-sm text-gray-600">{{ getProductBrand(productItem.productId) }} • {{ getProductPackaging(productItem.productId) }}</p>
                    <p class="text-xs text-gray-500 mt-1">{{ getProductDescription(productItem.productId) }}</p>
                    
                    <!-- Registered Crops -->
                    <div class="flex flex-wrap gap-1 mt-3">
                      <span
                        v-for="crop in getProductCrops(productItem.productId).slice(0, 3)"
                        :key="crop"
                        class="inline-block px-2 py-1 text-xs bg-secondary-100 text-secondary-800 rounded"
                      >
                        {{ crop }}
                      </span>
                      <span
                        v-if="getProductCrops(productItem.productId).length > 3"
                        class="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                      >
                        +{{ getProductCrops(productItem.productId).length - 3 }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Price Input -->
                <div class="bg-white border-2 border-primary-200 rounded-lg p-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Preço do Concorrente
                  </label>
                  <div class="flex items-center space-x-2">
                    <span class="text-lg font-semibold text-primary-600">{{ selectedCurrencySymbol }}</span>
                    <input
                      v-model.number="productItem.competitorPrice"
                      type="number"
                      step="0.01"
                      min="0"
                      class="input-field flex-1 text-lg font-semibold"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Total da Captura -->
            <div v-if="form.products.length > 1" class="bg-primary-50 border border-primary-200 rounded-lg p-4 mt-4">
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-primary-900">Total da Captura:</span>
                <span class="text-xl font-bold text-primary-600">
                  {{ selectedCurrencySymbol }} {{ formatPrice(totalCaptureValue) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Details Card -->
          <div class="card p-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Detalhes da Captura
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Data da Captura
                </label>
                <input
                  v-model="form.reportDate"
                  type="date"
                  class="input-field"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Região
                </label>
                <input
                  v-model="form.region"
                  type="text"
                  class="input-field bg-gray-100"
                  readonly
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select v-model="form.state" class="input-field" required>
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
                  Moeda
                </label>
                <select v-model="form.currencyId" class="input-field" required>
                  <option value="">Selecione a moeda</option>
                  <option
                    v-for="currency in currencies"
                    :key="currency.id"
                    :value="currency.id"
                  >
                    {{ currency.symbol }} - {{ currency.name }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Condição de Pagamento
                </label>
                <select v-model="form.paymentCondition" class="input-field" required>
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
                  Forma de Pagamento
                </label>
                <select v-model="form.paymentMethod" class="input-field" required>
                  <option value="">Selecione a forma</option>
                  <option value="DINHEIRO">Dinheiro</option>
                  <option value="PIX">PIX</option>
                  <option value="TRANSFERENCIA">Transferência Bancária</option>
                  <option value="BOLETO">Boleto Bancário</option>
                  <option value="CHEQUE">Cheque</option>
                  <option value="CARTAO_CREDITO">Cartão de Crédito</option>
                  <option value="CARTAO_DEBITO">Cartão de Débito</option>
                  <option value="DEPOSITO">Depósito Bancário</option>
                  <option value="DOCUMENTO">Documento/Duplicata</option>
                  <option value="OUTRO">Outro</option>
                </select>
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Observações
                </label>
                <textarea
                  v-model="form.notes"
                  rows="3"
                  class="input-field"
                  placeholder="Observações sobre o preço, condições especiais, etc."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-4 pt-4 border-t">
            <NuxtLink
              to="/reports"
              class="btn-outline"
            >
              Cancelar
            </NuxtLink>
            <button
              type="submit"
              class="btn-primary"
              :disabled="saving"
            >
              <span v-if="saving">Salvando...</span>
              <span v-else>Salvar Alterações</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Success Notification -->
      <AnimatedNotification
        :show="showSuccessNotification"
        type="success"
        message="Captura atualizada com sucesso!"
        @close="showSuccessNotification = false"
      />
    </AppLayout>
  </div>
</template>

<script setup>
import { ArrowLeft, Building2, X, User } from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const { $pinia } = useNuxtApp()
const dataStore = useDataStore($pinia)
const authStore = useAuthStore($pinia)

const reportId = route.params.id
const loading = ref(true)
const saving = ref(false)
const report = ref(null)
const showSuccessNotification = ref(false)

const currencies = computed(() => dataStore.currencies)

const competitorInfo = computed(() => {
  if (!report.value) return { name: 'Carregando...', type: '' }
  const competitor = dataStore.getCompetitorById(report.value.competitorId)
  return competitor || { name: 'Concorrente Desconhecido', type: 'Não informado' }
})

const selectedCurrencySymbol = computed(() => {
  const currency = dataStore.getCurrencyById(form.value.currencyId)
  return currency ? currency.symbol : 'R$'
})

const totalCaptureValue = computed(() => {
  return form.value.products.reduce((total, product) => total + product.competitorPrice, 0)
})

const form = ref({
  reportDate: '',
  region: '',
  state: '',
  paymentCondition: '',
  paymentMethod: '',
  currencyId: '',
  notes: '',
  products: []
})

// Helper functions
const getProductName = (productId) => {
  const product = dataStore.getProductById(productId)
  return product ? product.name : 'Produto Desconhecido'
}

const getProductBrand = (productId) => {
  const product = dataStore.getProductById(productId)
  return product ? product.brand : 'Marca Desconhecida'
}

const getProductPackaging = (productId) => {
  const product = dataStore.getProductById(productId)
  return product ? product.packaging : 'Não informado'
}

const getProductDescription = (productId) => {
  const product = dataStore.getProductById(productId)
  return product ? product.description : 'Descrição não disponível'
}

const getProductCrops = (productId) => {
  const product = dataStore.getProductById(productId)
  return product ? product.registeredCrops : []
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)
}

const loadReport = () => {
  loading.value = true
  
  // Find the report
  const foundReport = dataStore.priceReports.find(r => r.id === parseInt(reportId))
  
  if (foundReport) {
    report.value = foundReport
    
    // Populate form with report data
    form.value = {
      reportDate: foundReport.reportDate,
      region: foundReport.region,
      state: foundReport.state,
      paymentCondition: foundReport.paymentCondition,
      paymentMethod: foundReport.paymentMethod,
      currencyId: foundReport.currencyId,
      notes: foundReport.notes || '',
      products: [...foundReport.products] // Copy products array
    }
  }
  
  loading.value = false
}

const handleSubmit = () => {
  saving.value = true
  
  try {
    const updatedReport = {
      ...report.value,
      ...form.value,
      editedAt: new Date().toISOString()
    }
    
    dataStore.updatePriceReport(updatedReport.id, updatedReport)
    
    showSuccessNotification.value = true
    setTimeout(() => {
      showSuccessNotification.value = false
      navigateTo('/reports')
    }, 2000)
  } catch (error) {
    console.error('Erro ao salvar:', error)
  } finally {
    saving.value = false
  }
}

// Load report on component mount
onMounted(() => {
  loadReport()
})
</script>
