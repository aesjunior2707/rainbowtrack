<template>
  <div>
    <AppLayout>
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">
            Clientes - Rainbow Track
          </h1>
          <button
            @click="showNewCustomerModal = true"
            class="btn-primary"
          >
            <Plus class="w-4 h-4 mr-2" />
            Novo Cliente
          </button>
        </div>

        <!-- Search -->
        <div class="card p-4">
          <div class="flex items-center space-x-4">
            <div class="flex-1">
              <input
                v-model="searchTerm"
                type="text"
                placeholder="Pesquisar"
                class="input-field"
              />
            </div>
            <Search class="w-5 h-5 text-gray-400" />
          </div>
        </div>

        <!-- Customers Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="customer in filteredCustomers"
            :key="customer.id"
            class="card p-6 hover:shadow-lg transition-shadow"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900">{{ customer.name }}</h3>
                <p class="text-primary-600 font-medium">{{ customer.company }}</p>
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
            
            <div class="space-y-2 text-sm text-gray-600">
              <div class="flex items-center">
                <Mail class="w-4 h-4 mr-2" />
                {{ customer.email }}
              </div>
              <div class="flex items-center">
                <Phone class="w-4 h-4 mr-2" />
                {{ customer.phone }}
              </div>
              <div class="flex items-start">
                <MapPin class="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>{{ customer.address }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredCustomers.length === 0" class="text-center py-12">
          <Users class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-500">No customers found</p>
        </div>
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
import { Plus, Search, Edit, Trash2, Mail, Phone, MapPin, Users } from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth'
})

const { $pinia } = useNuxtApp()
const dataStore = useDataStore($pinia)

const searchTerm = ref('')
const showNewCustomerModal = ref(false)

const filteredCustomers = computed(() => {
  if (!searchTerm.value) return dataStore.customers
  
  const term = searchTerm.value.toLowerCase()
  return dataStore.customers.filter(customer => 
    customer.name.toLowerCase().includes(term) ||
    customer.company.toLowerCase().includes(term) ||
    customer.email.toLowerCase().includes(term)
  )
})

const handleCustomerCreated = () => {
  showNewCustomerModal.value = false
}
</script>