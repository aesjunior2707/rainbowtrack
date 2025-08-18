<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999]" @click="$emit('close')" style="z-index: 99999 !important;">
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="scale-95 opacity-0"
        enter-to-class="scale-100 opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="scale-100 opacity-100"
        leave-to-class="scale-95 opacity-0"
      >
        <div class="bg-white w-full max-w-md mx-4 rounded-2xl shadow-2xl" @click.stop>
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle class="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Campos Obrigatórios</h3>
            <p class="text-sm text-gray-600">Preencha os itens em vermelho para continuar</p>
          </div>
        </div>
        <button
          @click="$emit('close')"
          class="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X class="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <!-- Content -->
      <div class="p-6 space-y-4">
        <!-- Basic Information -->
        <div class="space-y-3">
          <h4 class="font-medium text-gray-900 flex items-center">
            <User class="w-4 h-4 mr-2" />
            Informações Básicas
          </h4>
          
          <div class="space-y-2 ml-6">
            <!-- Date -->
            <div class="flex items-center space-x-2">
              <div 
                class="w-4 h-4 rounded-full flex items-center justify-center"
                :class="validation.reportDate ? 'bg-green-100' : 'bg-red-100'"
              >
                <Check v-if="validation.reportDate" class="w-3 h-3 text-green-600" />
                <X v-else class="w-3 h-3 text-red-600" />
              </div>
              <span 
                class="text-sm"
                :class="validation.reportDate ? 'text-green-700' : 'text-red-700'"
              >
                Data da captura
              </span>
            </div>

            <!-- State -->
            <div class="flex items-center space-x-2">
              <div 
                class="w-4 h-4 rounded-full flex items-center justify-center"
                :class="validation.state ? 'bg-green-100' : 'bg-red-100'"
              >
                <Check v-if="validation.state" class="w-3 h-3 text-green-600" />
                <X v-else class="w-3 h-3 text-red-600" />
              </div>
              <span 
                class="text-sm"
                :class="validation.state ? 'text-green-700' : 'text-red-700'"
              >
                Estado
              </span>
            </div>

            <!-- Payment Condition -->
            <div class="flex items-center space-x-2">
              <div 
                class="w-4 h-4 rounded-full flex items-center justify-center"
                :class="validation.paymentCondition ? 'bg-green-100' : 'bg-red-100'"
              >
                <Check v-if="validation.paymentCondition" class="w-3 h-3 text-green-600" />
                <X v-else class="w-3 h-3 text-red-600" />
              </div>
              <span 
                class="text-sm"
                :class="validation.paymentCondition ? 'text-green-700' : 'text-red-700'"
              >
                Condição de pagamento
              </span>
            </div>
          </div>
        </div>

        <!-- Products -->
        <div class="space-y-3">
          <h4 class="font-medium text-gray-900 flex items-center">
            <Package class="w-4 h-4 mr-2" />
            Produtos
          </h4>
          
          <div class="space-y-2 ml-6">
            <!-- Has Products -->
            <div class="flex items-center space-x-2">
              <div 
                class="w-4 h-4 rounded-full flex items-center justify-center"
                :class="validation.hasProducts ? 'bg-green-100' : 'bg-red-100'"
              >
                <Check v-if="validation.hasProducts" class="w-3 h-3 text-green-600" />
                <X v-else class="w-3 h-3 text-red-600" />
              </div>
              <span 
                class="text-sm"
                :class="validation.hasProducts ? 'text-green-700' : 'text-red-700'"
              >
                Pelo menos um produto selecionado
              </span>
            </div>

            <!-- Generic Company Names -->
            <div v-if="validation.genericsWithoutCompany.length > 0" class="space-y-2">
              <div 
                v-for="(productName, index) in validation.genericsWithoutCompany"
                :key="index"
                class="flex items-center space-x-2"
              >
                <div class="w-4 h-4 rounded-full flex items-center justify-center bg-red-100">
                  <X class="w-3 h-3 text-red-600" />
                </div>
                <span class="text-sm text-red-700">
                  Nome da empresa para "{{ productName }}"
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <div class="mt-6 p-4 bg-gray-50 rounded-lg border">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">Progresso:</span>
            <div class="flex items-center space-x-2">
              <div class="w-20 bg-gray-200 rounded-full h-2">
                <div 
                  class="h-2 rounded-full transition-all duration-300"
                  :class="progress === 100 ? 'bg-green-500' : 'bg-red-500'"
                  :style="{ width: progress + '%' }"
                ></div>
              </div>
              <span class="text-sm font-medium" :class="progress === 100 ? 'text-green-600' : 'text-red-600'">
                {{ progress }}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
        <div class="flex items-center justify-between">
          <p class="text-xs text-gray-500">
            Preencha todos os campos obrigatórios para salvar a captura
          </p>
          <button
            @click="$emit('close')"
            class="btn-primary text-sm px-4 py-2"
          >
            Entendi
          </button>
        </div>
      </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { AlertTriangle, X, Check, User, Package } from 'lucide-vue-next'

const props = defineProps({
  validation: {
    type: Object,
    required: true,
    default: () => ({
      reportDate: false,
      state: false,
      paymentCondition: false,
      hasProducts: false,
      genericsWithoutCompany: []
    })
  }
})

const emit = defineEmits(['close'])

const progress = computed(() => {
  const basicFields = 4 // reportDate, state, paymentCondition, hasProducts
  const genericsFields = props.validation.genericsWithoutCompany.length
  const total = basicFields + genericsFields

  let completed = 0

  if (props.validation.reportDate) completed++
  if (props.validation.state) completed++
  if (props.validation.paymentCondition) completed++
  if (props.validation.hasProducts) completed++

  // Generics without company are NOT completed, so we don't add them to completed count

  return total > 0 ? Math.round((completed / total) * 100) : 100
})
</script>
