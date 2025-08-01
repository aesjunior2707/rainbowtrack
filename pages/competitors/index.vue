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
                :placeholder="t('competitors.search_placeholder')"
                class="input-field"
              />
            </div>
            <div>
              <select v-model="filterType" class="input-field">
                <option value="">{{ t('competitors.all_types') }}</option>
                <option value="Fabricante">{{ t('competitors.types.manufacturer') }}</option>
                <option value="Distribuidor">{{ t('competitors.types.distributor') }}</option>
                <option value="Varejista">{{ t('competitors.types.retailer') }}</option>
                <option value="Cooperativa">{{ t('competitors.types.cooperative') }}</option>
              </select>
            </div>
            <div>
              <select v-model="filterRegion" class="input-field">
                <option value="">{{ t('competitors.all_regions') }}</option>
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
              <div v-if="authStore.user?.role === 'admin'" class="flex space-x-2">
                <button
                  @click="handleEditCompetitor(competitor)"
                  class="text-gray-400 hover:text-gray-600 transition-colors"
                  title="Editar concorrente"
                >
                  <Edit class="w-4 h-4" />
                </button>
                <button
                  @click="handleDeleteCompetitor(competitor)"
                  class="text-gray-400 hover:text-red-600 transition-colors"
                  title="Excluir concorrente"
                >
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

      <EditCompetitorModal
        v-if="showEditCompetitorModal && selectedCompetitor"
        :competitor="selectedCompetitor"
        @close="showEditCompetitorModal = false"
        @competitor-updated="handleCompetitorUpdated"
      />

      <ConfirmDeleteModal
        v-if="showDeleteModal && selectedCompetitor"
        title="Excluir Concorrente"
        :message="'Tem certeza que deseja excluir o concorrente ' + selectedCompetitor.name + '?'"
        :warning-text="getDeleteWarningText(selectedCompetitor)"
        @cancel="showDeleteModal = false"
        @confirm="confirmDeleteCompetitor"
      />

      <AnimatedNotification
        :show="showNotification"
        :type="notificationType"
        :message="notificationMessage"
        @close="showNotification = false"
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
const showEditCompetitorModal = ref(false)
const showDeleteModal = ref(false)
const selectedCompetitor = ref(null)
const showNotification = ref(false)
const notificationType = ref('success')
const notificationMessage = ref('')

const uniqueRegions = computed(() => {
  const userRegion = authStore.user?.defaultRegion
  const isAdmin = authStore.user?.role === 'admin'
  const availableCompetitors = dataStore.getCompetitorsByUserRegion(userRegion, isAdmin)
  const regions = [...new Set(availableCompetitors.map(c => c.region))]
  return regions.filter(Boolean)
})

const filteredCompetitors = computed(() => {
  // Start with competitors filtered by user region/role
  const userRegion = authStore.user?.defaultRegion
  const isAdmin = authStore.user?.role === 'admin'
  let competitors = dataStore.getCompetitorsByUserRegion(userRegion, isAdmin)

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

const handleCompetitorCreated = (competitor) => {
  showNewCompetitorModal.value = false
  showNotificationWithMessage('success', `Concorrente "${competitor.name}" criado com sucesso!`)
}

const handleEditCompetitor = (competitor) => {
  selectedCompetitor.value = competitor
  showEditCompetitorModal.value = true
}

const handleCompetitorUpdated = (updatedCompetitor) => {
  dataStore.updateCompetitor(updatedCompetitor.id, updatedCompetitor)
  showEditCompetitorModal.value = false
  selectedCompetitor.value = null
  showNotificationWithMessage('success', `Concorrente "${updatedCompetitor.name}" atualizado com sucesso!`)
}

const handleDeleteCompetitor = (competitor) => {
  selectedCompetitor.value = competitor
  showDeleteModal.value = true
}

const confirmDeleteCompetitor = () => {
  try {
    const competitorName = selectedCompetitor.value.name
    dataStore.deleteCompetitor(selectedCompetitor.value.id)
    showDeleteModal.value = false
    selectedCompetitor.value = null
    showNotificationWithMessage('success', `Concorrente "${competitorName}" excluído com sucesso!`)
  } catch (error) {
    showNotificationWithMessage('error', error.message)
    showDeleteModal.value = false
  }
}

const getDeleteWarningText = (competitor) => {
  const reportCount = getCaptureCount(competitor.id)
  if (reportCount > 0) {
    return `Este concorrente possui ${reportCount} captura(s) associada(s) e não pode ser excluído.`
  }
  return ''
}

const showNotificationWithMessage = (type, message) => {
  notificationType.value = type
  notificationMessage.value = message
  showNotification.value = true

  // Auto-hide after 4 seconds
  setTimeout(() => {
    showNotification.value = false
  }, 4000)
}

</script>
