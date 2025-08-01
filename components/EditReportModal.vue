<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="$emit('close')">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto" @click.stop>
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900">
            Editar Captura #{{ report.id }}
          </h3>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Competitor Selection (read-only) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Concorrente
            </label>
            <input
              :value="competitorName"
              type="text"
              class="input-field bg-gray-100"
              readonly
            />
          </div>

          <!-- Product Selection (read-only) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Produto
            </label>
            <input
              :value="productName"
              type="text"
              class="input-field bg-gray-100"
              readonly
            />
          </div>

          <!-- Price -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Preço do Concorrente
            </label>
            <input
              v-model.number="form.competitorPrice"
              type="number"
              step="0.01"
              min="0"
              class="input-field"
              required
            />
          </div>

          <!-- Report Date -->
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

          <!-- Region (read-only) -->
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

          <!-- State -->
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

          <!-- Payment Condition -->
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

          <!-- Payment Method -->
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

          <!-- Currency -->
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

          <!-- Notes -->
          <div>
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

          <div class="flex justify-end space-x-3 pt-4">
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
import { X } from 'lucide-vue-next'

const props = defineProps(['report', 'dataStore'])
const emit = defineEmits(['close', 'report-updated'])

const currencies = computed(() => props.dataStore.currencies)

const competitorName = computed(() => {
  const competitor = props.dataStore.getCompetitorById(props.report.competitorId)
  return competitor ? competitor.name : 'Concorrente Desconhecido'
})

const productName = computed(() => {
  const product = props.dataStore.getProductById(props.report.productId)
  return product ? product.name : 'Produto Desconhecido'
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
