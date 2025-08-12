<template>
  <div class="min-h-screen bg-gray-50 relative overflow-x-hidden">
    <!-- Offline Indicator -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="-translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-full opacity-0"
    >
      <div
        v-if="!isOnline"
        class="fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2 text-sm font-medium z-[9999] safe-top"
      >
        📡 Modo offline - Algumas funcionalidades podem estar limitadas
      </div>
    </Transition>

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
  title: 'Rainbow Track - Inteligência Competitiva',
  meta: [
    { name: 'description', content: 'Sistema de Rastreamento e Vendas Agrícolas com Inteligência Competitiva' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover' },
    { name: 'theme-color', content: '#006E68' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'apple-mobile-web-app-title', content: 'Rainbow Track' },
    { name: 'application-name', content: 'Rainbow Track' },
    { name: 'msapplication-TileColor', content: '#006E68' },
    { name: 'msapplication-config', content: '/browserconfig.xml' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'apple-touch-fullscreen', content: 'yes' }
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
    { rel: 'apple-touch-icon', href: '/icon.svg' },
    { rel: 'apple-touch-icon', sizes: '152x152', href: '/icon-192x192.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/icon-192x192.png' },
    { rel: 'apple-touch-icon', sizes: '167x167', href: '/icon-192x192.png' },
    { rel: 'mask-icon', href: '/icon.svg', color: '#006E68' }
  ]
})

// Setup offline detection
const isOnline = ref(true)

onMounted(() => {
  if (process.client) {
    isOnline.value = navigator.onLine

    window.addEventListener('online', () => {
      isOnline.value = true
    })

    window.addEventListener('offline', () => {
      isOnline.value = false
    })
  }
})
</script>
