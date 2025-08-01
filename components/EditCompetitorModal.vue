<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="$emit('close')">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 transform transition-all duration-300 ease-out scale-100" @click.stop>
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900">
            Editar Concorrente
          </h3>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ t('competitors.name') }}
            </label>
            <input
              v-model="form.name"
              type="text"
              class="input-field"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ t('competitors.type') }}
            </label>
            <select
              v-model="form.type"
              class="input-field"
              required
            >
              <option value="">Selecionar Tipo</option>
              <option value="Fabricante">{{ t('competitors.types.manufacturer') }}</option>
              <option value="Distribuidor">{{ t('competitors.types.distributor') }}</option>
              <option value="Varejista">{{ t('competitors.types.retailer') }}</option>
              <option value="Cooperativa">{{ t('competitors.types.cooperative') }}</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ t('competitors.region') }}
            </label>
            <select
              v-model="form.region"
              class="input-field"
              required
            >
              <option value="">{{ t('competitors.select_region') }}</option>
              <option value="REG001">{{ t('competitors.regions.reg001') }}</option>
              <option value="REG002">{{ t('competitors.regions.reg002') }}</option>
              <option value="REG003">{{ t('competitors.regions.reg003') }}</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ t('competitors.contact') }}
            </label>
            <input
              v-model="form.contact"
              type="email"
              class="input-field"
              placeholder="contato@empresa.com"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ t('competitors.phone') }}
            </label>
            <input
              v-model="form.phone"
              type="tel"
              class="input-field"
              placeholder="(11) 9999-9999"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ t('competitors.market_share') }}
            </label>
            <input
              v-model.number="form.marketShare"
              type="number"
              min="0"
              max="100"
              step="0.1"
              class="input-field"
              placeholder="0.0"
            />
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="$emit('close')"
              class="btn-outline"
            >
              {{ t('common.cancel') }}
            </button>
            <button
              type="submit"
              class="btn-primary"
            >
              {{ t('common.save') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { X } from 'lucide-vue-next'

const props = defineProps(['competitor'])
const emit = defineEmits(['close', 'competitor-updated'])

const { $pinia } = useNuxtApp()
const translationStore = useTranslationStore($pinia)

const t = (key, params) => translationStore.t(key, params)

const form = ref({
  name: props.competitor.name,
  type: props.competitor.type,
  region: props.competitor.region,
  contact: props.competitor.contact,
  phone: props.competitor.phone,
  marketShare: props.competitor.marketShare
})

const handleSubmit = () => {
  const updatedCompetitor = {
    ...props.competitor,
    ...form.value,
    updatedAt: new Date().toISOString()
  }
  
  emit('competitor-updated', updatedCompetitor)
}
</script>
