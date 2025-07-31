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
        v-if="showInstallBanner && !isInstalled"
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
              @click="installPWA"
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
      <div class="flex items-center justify-center space-x-4 text-sm text-gray-500">
        <div class="flex items-center space-x-2">
          <div
            class="w-2 h-2 rounded-full"
            :class="isInstalled ? 'bg-green-500' : 'bg-yellow-500'"
          ></div>
          <span>{{ statusText }}</span>
        </div>
        
        <button
          v-if="!isInstalled && canInstall"
          @click="installPWA"
          class="flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-medium"
        >
          <Download class="w-4 h-4" />
          <span>Instalar App</span>
        </button>

        <button
          v-if="needsUpdate"
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

const deferredPrompt = ref(null)
const isInstalled = ref(false)
const canInstall = ref(false)
const showInstallBanner = ref(false)
const needsUpdate = ref(false)
const updateSW = ref(null)

const statusText = computed(() => {
  if (isInstalled.value) {
    return 'App instalado'
  } else if (canInstall.value) {
    return 'App disponível para instalação'
  } else {
    return 'Navegador web'
  }
})

// Check if app is installed
const checkIfInstalled = () => {
  if (process.client) {
    // Check if running as PWA
    isInstalled.value = 
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true ||
      document.referrer.includes('android-app://')
  }
}

// Handle PWA install prompt
const setupInstallPrompt = () => {
  if (process.client) {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt.value = e
      canInstall.value = true
      
      // Show banner automatically after 3 seconds if not installed
      if (!isInstalled.value) {
        setTimeout(() => {
          const dismissed = localStorage.getItem('pwa-install-dismissed')
          if (!dismissed) {
            showInstallBanner.value = true
          }
        }, 3000)
      }
    })

    // Handle successful installation
    window.addEventListener('appinstalled', () => {
      isInstalled.value = true
      canInstall.value = false
      showInstallBanner.value = false
      deferredPrompt.value = null
      
      // Show success notification
      showNotification('App instalado com sucesso!', 'success')
    })
  }
}

// Install PWA
const installPWA = async () => {
  if (!deferredPrompt.value) return

  try {
    const result = await deferredPrompt.value.prompt()
    
    if (result.outcome === 'accepted') {
      showInstallBanner.value = false
      canInstall.value = false
    }
    
    deferredPrompt.value = null
  } catch (error) {
    console.error('Error installing PWA:', error)
  }
}

// Dismiss banner
const dismissBanner = () => {
  showInstallBanner.value = false
  localStorage.setItem('pwa-install-dismissed', 'true')
  
  // Show again after 24 hours
  setTimeout(() => {
    localStorage.removeItem('pwa-install-dismissed')
  }, 24 * 60 * 60 * 1000)
}

// Update app
const updateApp = () => {
  if (updateSW.value) {
    updateSW.value()
    needsUpdate.value = false
  }
}

// Show notification (you can replace this with your notification component)
const showNotification = (message, type = 'success') => {
  // This would integrate with your existing notification system
  console.log(`${type}: ${message}`)
}

// Setup service worker update detection
const setupServiceWorker = () => {
  if (process.client && 'serviceWorker' in navigator) {
    // Listen for service worker updates
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload()
    })

    // Check for updates periodically
    setInterval(() => {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg) {
          reg.update()
        }
      })
    }, 60000) // Check every minute
  }
}

onMounted(() => {
  checkIfInstalled()
  setupInstallPrompt()
  setupServiceWorker()
})
</script>
