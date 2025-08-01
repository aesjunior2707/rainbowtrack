<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click="$emit('close')">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] overflow-y-auto" @click.stop>
      <div class="p-6">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-gray-900">
            Editar Captura #{{ report.id }}
          </h3>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X class="w-6 h-6" />
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Competitor Information Card -->
          <div class="card p-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Informações do Concorrente
            </h4>
            <div class="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-lg p-4">
              <div class="flex items-center space-x-4">
                <div class="bg-primary-600 rounded-full p-3">
                  <Building2 class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h5 class="font-semibold text-gray-900">{{ competitorName }}</h5>
                  <p class="text-sm text-gray-600">{{ competitorType }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Product Information Card -->
          <div class="card p-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Produto Capturado
            </h4>
            <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div class="flex justify-between items-start mb-4">
                <div class="flex-1">
                  <div class="flex items-start justify-between mb-2">
                    <div>
                      <h5 class="font-semibold text-gray-900">{{ productInfo.name }}</h5>
                      <p class="text-sm text-gray-600">{{ productInfo.brand }} • {{ productInfo.packaging }}</p>
                      <p class="text-xs text-gray-500 mt-1">{{ productInfo.description }}</p>
                    </div>
                  </div>

                  <!-- Price Input (Highlighted) -->
                  <div class="mt-4 bg-white border-2 border-primary-200 rounded-lg p-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Preço do Concorrente
                    </label>
                    <div class="flex items-center space-x-2">
                      <span class="text-lg font-semibold text-primary-600">{{ selectedCurrencySymbol }}</span>
                      <input
                        v-model.number="form.competitorPrice"
                        type="number"
                        step="0.01"
                        min="0"
                        class="input-field flex-1 text-lg font-semibold"
                        required
                      />
                    </div>
                  </div>

                  <!-- Registered Crops -->
                  <div class="flex flex-wrap gap-1 mt-4">
                    <span
                      v-for="crop in productInfo.registeredCrops.slice(0, 3)"
                      :key="crop"
                      class="inline-block px-2 py-1 text-xs bg-secondary-100 text-secondary-800 rounded"
                    >
                      {{ crop }}
                    </span>
                    <span
                      v-if="productInfo.registeredCrops.length > 3"
                      class="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                    >
                      +{{ productInfo.registeredCrops.length - 3 }}
                    </span>
                  </div>
                </div>
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
            <button
              type="button"
              @click="$emit('close')"
              class="btn-outline"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="btn-primary"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { X, Building2 } from 'lucide-vue-next'

const props = defineProps(['report', 'dataStore'])
const emit = defineEmits(['close', 'report-updated'])

const currencies = computed(() => props.dataStore.currencies)

const competitorInfo = computed(() => {
  const competitor = props.dataStore.getCompetitorById(props.report.competitorId)
  return competitor || { name: 'Concorrente Desconhecido', type: 'Não informado' }
})

const competitorName = computed(() => competitorInfo.value.name)
const competitorType = computed(() => competitorInfo.value.type)

const productInfo = computed(() => {
  const product = props.dataStore.getProductById(props.report.productId)
  return product || {
    name: 'Produto Desconhecido',
    brand: 'Não informado',
    packaging: 'Não informado',
    description: 'Produto não encontrado',
    registeredCrops: []
  }
})

const selectedCurrencySymbol = computed(() => {
  const currency = props.dataStore.getCurrencyById(form.value.currencyId)
  return currency ? currency.symbol : 'R$'
})

const form = ref({
  competitorPrice: props.report.competitorPrice,
  reportDate: props.report.reportDate,
  region: props.report.region,
  state: props.report.state,
  paymentCondition: props.report.paymentCondition,
  paymentMethod: props.report.paymentMethod,
  currencyId: props.report.currencyId,
  notes: props.report.notes || ''
})

const handleSubmit = () => {
  const updatedReport = {
    ...props.report,
    ...form.value,
    editedAt: new Date().toISOString()
  }

  emit('report-updated', updatedReport)
}
</script>
