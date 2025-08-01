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
        v-if="showInstallOption"
        class="mb-4 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-lg p-4"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <Download class="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 class="font-semibold text-primary-900">Instalar Rainbow Track</h3>
              <p class="text-sm text-primary-700">
                {{ isIOS ? 'Use Safari: Compartilhar → Adicionar à Tela Inicial' : 'Tenha acesso rápido sem abrir o navegador' }}
              </p>
            </div>
          </div>
          <button
            v-if="!isIOS && (unref(canInstall) || deferredPrompt)"
            @click="handleInstall"
            class="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-sm"
          >
            Instalar
          </button>
          <div
            v-else-if="isIOS"
            class="flex items-center text-primary-600"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Regular Status Row -->
      <div class="flex items-center justify-center space-x-4 text-sm text-gray-500">
        <div class="flex items-center space-x-2">
          <div
            class="w-2 h-2 rounded-full"
            :class="isClientMounted && unref(isInstalled) ? 'bg-green-500' : (showInstallOption ? 'bg-primary-500' : 'bg-yellow-500')"
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
const { isInstalled, canInstall, needsUpdate, updateServiceWorker } = usePWA()

// Use navigator.onLine for better reliability
const isOnline = ref(true)

const deferredPrompt = ref(null)

const showInstallBanner = ref(false)
const isClientMounted = ref(false)

// Check if it's iOS device
const isIOS = computed(() => {
  if (!process.client) return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
})

// Check if we can show install option (including iOS manual instructions)
const showInstallOption = computed(() => {
  if (!isClientMounted.value) return false
  return !unref(isInstalled) && (unref(canInstall) || deferredPrompt.value || isIOS.value)
})

const statusText = computed(() => {
  if (!isClientMounted.value) {
    return 'Carregando...'
  }

  try {
    if (!unref(isOnline)) {
      return 'Modo offline'
    } else if (unref(isInstalled)) {
      return 'App instalado'
    } else if (unref(canInstall) || deferredPrompt.value) {
      return 'App disponível para instalação'
    } else if (isIOS.value) {
      return 'Instale via Safari (Compartilhar > Adicionar à Tela Inicial)'
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
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('PWA install prompt available')
      e.preventDefault()
      deferredPrompt.value = e
    })

    // Listen for successful installation
    window.addEventListener('appinstalled', () => {
      console.log('PWA successfully installed')
      deferredPrompt.value = null
      showInstallBanner.value = false
    })
  } catch (error) {
    console.warn('Error setting up install prompt:', error)
  }
}

// Auto-show install banner
const setupAutoInstall = () => {
  if (!process.client) return

  try {
    // Watch for deferred prompt availability
    watch(deferredPrompt, (newPrompt) => {
      if (newPrompt && !unref(isInstalled)) {
        // Sempre mostra o banner quando app não estiver instalado
        showInstallBanner.value = true
      }
    })

    // Also watch canInstall from the official composable
    watch(canInstall, (newVal) => {
      if (newVal && !unref(isInstalled)) {
        // Sempre mostra o banner quando pode instalar e não está instalado
        showInstallBanner.value = true
        console.log('PWA can be installed via official API')
      }
    })

    // Watch para garantir que o banner fique visível se o app não estiver instalado
    watch(isInstalled, (newVal) => {
      if (!newVal && (deferredPrompt.value || unref(canInstall))) {
        showInstallBanner.value = true
      } else if (newVal) {
        showInstallBanner.value = false
      }
    })
  } catch (error) {
    console.warn('Error setting up auto install:', error)
  }
}

// Install PWA with banner management
const handleInstall = async () => {
  if (!process.client || !deferredPrompt.value) return

  try {
    const result = await deferredPrompt.value.prompt()
    const isAccepted = result.outcome === 'accepted'

    if (isAccepted) {
      showInstallBanner.value = false
    }

    deferredPrompt.value = null
  } catch (error) {
    console.error('Error handling install:', error)
  }
}

// Dismiss banner (temporariamente)
const dismissBanner = () => {
  if (!process.client) return

  try {
    showInstallBanner.value = false
    // Reexibe o banner após 1 minuto se o app ainda não estiver instalado
    setTimeout(() => {
      if (!unref(isInstalled) && (deferredPrompt.value || unref(canInstall))) {
        showInstallBanner.value = true
      }
    }, 60000) // 1 minuto
  } catch (error) {
    console.warn('Error dismissing banner:', error)
  }
}

// Update app
const updateApp = async () => {
  if (process.client) {
    try {
      if (updateServiceWorker) {
        await updateServiceWorker()
      } else {
        window.location.reload()
      }
    } catch (error) {
      console.error('Error updating app:', error)
      window.location.reload()
    }
  }
}

onMounted(() => {
  isClientMounted.value = true

  // Setup connectivity detection
  if (process.client) {
    isOnline.value = navigator.onLine

    window.addEventListener('online', () => {
      isOnline.value = true
    })

    window.addEventListener('offline', () => {
      isOnline.value = false
    })
  }

  nextTick(() => {
    try {
      setupInstallPrompt()
      setupAutoInstall()

      // Verifica se deve mostrar o banner imediatamente
      setTimeout(() => {
        if (!unref(isInstalled) && (deferredPrompt.value || unref(canInstall))) {
          showInstallBanner.value = true
        }
      }, 2000) // Aguarda 2 segundos para garantir que tudo esteja carregado
    } catch (error) {
      console.error('Error in onMounted:', error)
    }
  })
})
</script>
