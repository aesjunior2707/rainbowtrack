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
        v-if="isClientMounted && !unref(isInstalled) && !bannerDismissed"
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
              {{ isIOS ? 'Como Instalar' : 'Instalar' }}
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

// Composables PWA
const { isInstalled, canInstall, needsUpdate, updateServiceWorker } = usePWA()

const isOnline = ref(true)
const deferredPrompt = ref(null)
const showInstallBanner = ref(false)
const bannerDismissed = ref(false)
const isClientMounted = ref(false)

const isIOS = computed(() => {
  if (!process.client) return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
})

const showInstallOption = computed(() => {
  if (!isClientMounted.value) return false
  return !isInstalled.value && (canInstall.value || deferredPrompt.value || isIOS.value)
})

const statusText = computed(() => {
  if (!isClientMounted.value) {
    return 'Carregando...'
  }

  try {
    if (!isOnline.value) {
      return 'Modo offline'
    } else if (isInstalled.value) {
      return 'App instalado'
    } else if (canInstall.value || deferredPrompt.value) {
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
    // Watch for app installation status
    watch(isInstalled, (newVal) => {
      if (newVal) {
        // Reset banner when app is installed
        bannerDismissed.value = false
      }
    })
  } catch (error) {
    console.warn('Error setting up auto install:', error)
  }
}

// Handle PWA installation
const handleInstall = async () => {
  if (!process.client) return

  try {
    if (deferredPrompt.value && typeof deferredPrompt.value.prompt === 'function') {
      // Usar o prompt nativo se disponível
      const result = await deferredPrompt.value.prompt()
      const isAccepted = result?.outcome === 'accepted'

      if (isAccepted) {
        showInstallBanner.value = false
      }
      deferredPrompt.value = null
    } else if (isIOS.value) {
      // Para iOS, mostrar instruções
      alert('Para instalar este app:\n\n1. Toque no botão de compartilhamento \n2. Selecione "Adicionar à Tela Inicial"\n3. Toque em "Adicionar"')
    } else {
      // Para outros navegadores, mostrar instruções gerais
      alert('Para instalar este app:\n\n• Chrome: Menu > Instalar app\n• Firefox: Menu > Instalar\n• Edge: Menu > Apps > Instalar este site como app')
    }
  } catch (error) {
    console.error('Error handling install:', error)
  }
}

// Dismiss banner temporarily
const dismissBanner = () => {
  if (!process.client) return

  try {
    bannerDismissed.value = true
    // Reexibe o banner após 1 minuto se o app ainda não estiver instalado
    setTimeout(() => {
      if (!isInstalled.value) {
        bannerDismissed.value = false
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
      if (typeof updateServiceWorker === 'function') {
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
  // Aguarda um pouco para garantir que tudo foi carregado
  setTimeout(() => {
    isClientMounted.value = true
  }, 1000)

  // Auto-show banner after some time if conditions are met
  setTimeout(() => {
    if (!isInstalled.value && !bannerDismissed.value && (canInstall.value || deferredPrompt.value)) {
      showInstallBanner.value = true
    }
  }, 5000)

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
    } catch (error) {
      console.error('Error in onMounted:', error)
    }
  })

  // Show banner automatically after some engagement
  setTimeout(() => {
    if (showInstallOption.value && !bannerDismissed.value) {
      showInstallBanner.value = true
    }
  }, 10000) // Show after 10 seconds
})
</script>
