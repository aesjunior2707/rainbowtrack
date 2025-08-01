<template>
  <div>
    <!-- PWA Install Banner -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-full opacity-0"
    >
      <div
        v-if="isClientMounted && showInstallBanner && !unref(isInstalled)"
        class="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 shadow-lg z-50"
      >
        <div class="max-w-md mx-auto flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Download class="w-5 h-5" />
            </div>
            <div>
              <h3 class="font-semibold text-sm">Instalar Rainbow Track</h3>
              <p class="text-xs text-primary-100">Acesso rápido sem navegador</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="handleInstall"
              class="bg-white text-primary-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-50 transition-colors"
            >
              Instalar
            </button>
            <button
              @click="dismissBanner"
              class="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
            >
              <X class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- PWA Status in Footer -->
    <div class="mt-6 pt-4 border-t border-gray-200">
      <!-- Install Available Card -->
      <div
        v-if="isClientMounted && !unref(isInstalled) && unref(canInstall)"
        class="mb-4 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-lg p-4"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <Download class="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 class="font-semibold text-primary-900">Instalar Rainbow Track</h3>
              <p class="text-sm text-primary-700">Tenha acesso rápido sem abrir o navegador</p>
            </div>
          </div>
          <button
            @click="handleInstall"
            class="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-sm"
          >
            Instalar
          </button>
        </div>
      </div>

      <!-- Regular Status Row -->
      <div class="flex items-center justify-center space-x-4 text-sm text-gray-500">
        <div class="flex items-center space-x-2">
          <div
            class="w-2 h-2 rounded-full"
            :class="isClientMounted && unref(isInstalled) ? 'bg-green-500' : (isClientMounted && unref(canInstall) ? 'bg-primary-500' : 'bg-yellow-500')"
          ></div>
          <span>{{ statusText }}</span>
        </div>

        <button
          v-if="isClientMounted && unref(needsUpdate)"
          @click="updateApp"
          class="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium"
        >
          <RefreshCw class="w-4 h-4" />
          <span>Atualizar</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Download, X, RefreshCw } from 'lucide-vue-next'

// Use the official @vite-pwa/nuxt composable
const { isInstalled, canInstall, needsUpdate, isOnline, updateServiceWorker } = usePWA()

const deferredPrompt = ref<any>(null)

const showInstallBanner = ref(false)
const isClientMounted = ref(false)

const statusText = computed(() => {
  if (!isClientMounted.value) {
    return 'Carregando...'
  }

  try {
    if (!unref(isOnline)) {
      return 'Modo offline'
    } else if (unref(isInstalled)) {
      return 'App instalado'
    } else if (unref(canInstall)) {
      return 'App disponível para instalação'
    } else {
      return 'Navegador web'
    }
  } catch (error) {
    console.warn('Error in statusText computed:', error)
    return 'Navegador web'
  }
})

// Setup install prompt event listener
const setupInstallPrompt = () => {
  if (!process.client) return

  try {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt.value = e
    })

    window.addEventListener('appinstalled', () => {
      deferredPrompt.value = null
    })
  } catch (error) {
    console.warn('Error setting up install prompt:', error)
  }
}

// Auto-show install banner
const setupAutoInstall = () => {
  if (!process.client) return

  try {
    watch(canInstall, (newVal) => {
      if (newVal && !unref(isInstalled)) {
        setTimeout(() => {
          if (!process.client) return

          const dismissed = localStorage.getItem('pwa-install-dismissed')
          const lastShown = localStorage.getItem('pwa-banner-last-shown')
          const now = Date.now()

          // Show banner only if never dismissed and after 10 seconds of use
          // Or if 48 hours have passed since last shown (less intrusive)
          if (!dismissed || (lastShown && now - parseInt(lastShown) > 48 * 60 * 60 * 1000)) {
            showInstallBanner.value = true
            localStorage.setItem('pwa-banner-last-shown', now.toString())
          }
        }, 10000) // Show after 10 seconds (less intrusive)
      }
    })
  } catch (error) {
    console.warn('Error setting up auto install:', error)
  }
}

// Install PWA with banner management
const handleInstall = async () => {
  if (!process.client) return

  try {
    const success = await installPWA()
    if (success) {
      showInstallBanner.value = false
      localStorage.removeItem('pwa-install-dismissed')
    }
  } catch (error) {
    console.error('Error handling install:', error)
  }
}

// Dismiss banner
const dismissBanner = () => {
  if (!process.client) return

  try {
    showInstallBanner.value = false
    localStorage.setItem('pwa-install-dismissed', 'true')
  } catch (error) {
    console.warn('Error dismissing banner:', error)
  }
}

// Update app
const updateApp = () => {
  if (process.client) {
    try {
      window.location.reload()
    } catch (error) {
      console.error('Error updating app:', error)
    }
  }
}

onMounted(() => {
  isClientMounted.value = true

  nextTick(() => {
    try {
      if (initPWA && typeof initPWA === 'function') {
        initPWA()
      }
      setupAutoInstall()
    } catch (error) {
      console.error('Error in onMounted:', error)
    }
  })
})
</script>
