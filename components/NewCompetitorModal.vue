<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ t('competitors.new_competitor') }}
          </h3>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600"
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
              <option value="Minha Região">{{ t('competitors.regions.my_region') }}</option>
              <option value="Região Norte">{{ t('competitors.regions.north_territory') }}</option>
              <option value="Região Sul">{{ t('competitors.regions.south_territory') }}</option>
              <option value="Região Leste">{{ t('competitors.regions.east_territory') }}</option>
              <option value="Região Oeste">{{ t('competitors.regions.west_territory') }}</option>
              <option value="Região Central">{{ t('competitors.regions.central_territory') }}</option>
              <option value="Território A">{{ t('competitors.regions.territory_a') }}</option>
              <option value="Território B">{{ t('competitors.regions.territory_b') }}</option>
              <option value="Território C">{{ t('competitors.regions.territory_c') }}</option>
              <option value="Zona Metropolitana">{{ t('competitors.regions.metropolitan_zone') }}</option>
              <option value="Interior">{{ t('competitors.regions.interior') }}</option>
              <option value="Capital">{{ t('competitors.regions.capital') }}</option>
              <option value="Outras Regiões">{{ t('competitors.regions.other_regions') }}</option>
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

const emit = defineEmits(['close', 'competitor-created'])

const { $pinia } = useNuxtApp()
const dataStore = useDataStore($pinia)
const translationStore = useTranslationStore($pinia)

const t = (key, params) => translationStore.t(key, params)

const form = ref({
  name: '',
  type: '',
  region: '',
  contact: '',
  phone: '',
  marketShare: 0
})

const handleSubmit = () => {
  const competitor = dataStore.addCompetitor(form.value)
  emit('competitor-created', competitor)
}

// Initialize translation store
</script>
