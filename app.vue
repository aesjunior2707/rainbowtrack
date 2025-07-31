<template>
  <div class="min-h-screen bg-gray-50">
    <ClientOnly>
      <NuxtPage />
      <template #fallback>
        <div class="min-h-screen flex items-center justify-center bg-gray-50">
          <div class="text-center">
            <div class="animate-pulse">
              <div class="w-16 h-16 bg-primary-200 rounded-full mx-auto mb-4"></div>
              <div class="text-primary-600 font-semibold">Rainbow Track</div>
              <div class="text-gray-500 text-sm mt-2">Carregando...</div>
            </div>
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
// Global setup
useHead({
  title: 'Rainbow Track',
  meta: [
    { name: 'description', content: 'Sistema de Rastreamento e Vendas Agrícolas' }
  ]
})
</script>
