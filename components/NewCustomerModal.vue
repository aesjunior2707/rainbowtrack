<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900">
            Novo Cliente
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
              Nome
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
              Empresa
            </label>
            <input
              v-model="form.company"
              type="text"
              class="input-field"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              v-model="form.email"
              type="email"
              class="input-field"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Telefone
            </label>
            <input
              v-model="form.phone"
              type="tel"
              class="input-field"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Endereço
            </label>
            <textarea
              v-model="form.address"
              rows="3"
              class="input-field"
              required
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
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { X } from 'lucide-vue-next'

const emit = defineEmits(['close', 'customer-created'])

const { $pinia } = useNuxtApp()
const dataStore = useDataStore($pinia)

const form = ref({
  name: '',
  company: '',
  email: '',
  phone: '',
  address: ''
})

const handleSubmit = () => {
  const customer = dataStore.addCustomer(form.value)
  emit('customer-created', customer)
}
</script>