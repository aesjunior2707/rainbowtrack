<template>
  <div>
    <AppLayout>
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">
            {{ t('competitors.title') }}
          </h1>
          <button
            v-if="authStore.user?.role === 'admin'"
            @click="showNewCompetitorModal = true"
            class="btn-primary"
          >
            <Plus class="w-4 h-4 mr-2" />
            {{ t('competitors.new_competitor') }}
          </button>
        </div>

        <!-- Search and Filter -->
        <div class="card p-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                v-model="searchTerm"
                type="text"
                placeholder="Pesquisar concorrentes..."
                class="input-field"
              />
            </div>
            <div>
              <select v-model="filterType" class="input-field">
                <option value="">Todos os Tipos</option>
                <option value="Fabricante">Fabricante</option>
                <option value="Distribuidor">Distribuidor</option>
                <option value="Varejista">Varejista</option>
                <option value="Cooperativa">Cooperativa</option>
              </select>
            </div>
            <div>
              <select v-model="filterRegion" class="input-field">
                <option value="">Todas as Regiões</option>
                <option
                  v-for="region in uniqueRegions"
                  :key="region"
                  :value="region"
                >
                  {{ region }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Competitors Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="competitor in filteredCompetitors"
            :key="competitor.id"
            class="card p-6 hover:shadow-lg transition-shadow"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900">{{ competitor.name }}</h3>
                <div class="flex items-center space-x-2 mt-1">
                  <span class="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
                    {{ competitor.type }}
                  </span>
                  <span class="text-sm text-gray-500">{{ competitor.region }}</span>
                </div>
              </div>
              <div class="flex space-x-2">
                <button class="text-gray-400 hover:text-gray-600">
                  <Edit class="w-4 h-4" />
                </button>
                <button class="text-gray-400 hover:text-red-600">
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div class="space-y-3 mb-4">
              <div class="flex items-center">
                <Mail class="w-4 h-4 mr-2 text-gray-400" />
                <span class="text-sm text-gray-600">{{ competitor.contact }}</span>
              </div>
              <div class="flex items-center">
                <Phone class="w-4 h-4 mr-2 text-gray-400" />
                <span class="text-sm text-gray-600">{{ competitor.phone }}</span>
              </div>
            </div>

            <!-- Statistics -->
            <div class="border-t pt-4">
              <div class="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p class="text-lg font-semibold text-primary-600">{{ getCaptureCount(competitor.id) }}</p>
                  <p class="text-xs text-gray-500">{{ t('competitors.report_count') }}</p>
                </div>
                <div>
                  <p class="text-lg font-semibold text-secondary-500">{{ competitor.marketShare }}%</p>
                  <p class="text-xs text-gray-500">Participação</p>
                </div>
              </div>
              
              <div class="mt-3 text-center">
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredCompetitors.length === 0" class="text-center py-12">
          <Building2 class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-500">{{ t('competitors.no_competitors') }}</p>
        </div>
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
import { Plus, Edit, Trash2, Mail, Phone, Building2 } from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth'
})

const { $pinia } = useNuxtApp()
const dataStore = useDataStore($pinia)
const authStore = useAuthStore($pinia)
const translationStore = useTranslationStore($pinia)

const t = (key, params) => translationStore.t(key, params)

const searchTerm = ref('')
const filterType = ref('')
const filterRegion = ref('')
const showNewCompetitorModal = ref(false)

const uniqueRegions = computed(() => {
  const regions = [...new Set(dataStore.competitors.map(c => c.region))]
  return regions.filter(Boolean)
})

const filteredCompetitors = computed(() => {
  let competitors = dataStore.competitors

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    competitors = competitors.filter(competitor => 
      competitor.name.toLowerCase().includes(term) ||
      competitor.type.toLowerCase().includes(term) ||
      competitor.region.toLowerCase().includes(term)
    )
  }

  if (filterType.value) {
    competitors = competitors.filter(c => c.type === filterType.value)
  }

  if (filterRegion.value) {
    competitors = competitors.filter(c => c.region === filterRegion.value)
  }

  return competitors
})

const getCaptureCount = (competitorId) => {
  return dataStore.getPriceReportsByCompetitor(competitorId).length
}

const handleCompetitorCreated = () => {
  showNewCompetitorModal.value = false
}

</script>
