export const usePWA = () => {
  const isInstalled = ref(false)
  const canInstall = ref(false)
  const needsUpdate = ref(false)
  const deferredPrompt = ref<any>(null)
  const isOnline = ref(true)

  // Check if app is running as PWA
  const checkIfInstalled = () => {
    if (process.client) {
      isInstalled.value = 
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true ||
        document.referrer.includes('android-app://')
    }
  }

  // Setup install prompt event
  const setupInstallPrompt = () => {
    if (process.client) {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
        deferredPrompt.value = e
        canInstall.value = true
      })

      window.addEventListener('appinstalled', () => {
        isInstalled.value = true
        canInstall.value = false
        deferredPrompt.value = null
      })
    }
  }

  // Install the PWA
  const installPWA = async () => {
    if (!deferredPrompt.value) return false

    try {
      const result = await deferredPrompt.value.prompt()
      const isAccepted = result.outcome === 'accepted'
      
      if (isAccepted) {
        canInstall.value = false
      }
      
      deferredPrompt.value = null
      return isAccepted
    } catch (error) {
      console.error('Error installing PWA:', error)
      return false
    }
  }

  // Check online status
  const setupOnlineStatus = () => {
    if (process.client) {
      isOnline.value = navigator.onLine
      
      window.addEventListener('online', () => {
        isOnline.value = true
      })
      
      window.addEventListener('offline', () => {
        isOnline.value = false
      })
    }
  }

  // Check for updates
  const checkForUpdates = async () => {
    if (process.client && 'serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.getRegistration()
        if (registration) {
          await registration.update()
        }
      } catch (error) {
        console.error('Error checking for updates:', error)
      }
    }
  }

  // Get PWA info
  const getPWAInfo = () => {
    return {
      isInstalled: isInstalled.value,
      canInstall: canInstall.value,
      needsUpdate: needsUpdate.value,
      isOnline: isOnline.value,
      isStandalone: isInstalled.value,
      displayMode: process.client ? 
        window.matchMedia('(display-mode: standalone)').matches ? 'standalone' : 'browser' : 'browser'
    }
  }

  // Initialize PWA functionality
  const initPWA = () => {
    if (process.client) {
      checkIfInstalled()
      setupInstallPrompt()
      setupOnlineStatus()
      
      // Check for updates every 30 seconds
      setInterval(() => {
        checkForUpdates()
      }, 30000)
    }
  }

  return {
    isInstalled: readonly(isInstalled),
    canInstall: readonly(canInstall),
    needsUpdate: readonly(needsUpdate),
    isOnline: readonly(isOnline),
    installPWA,
    checkForUpdates,
    getPWAInfo,
    initPWA
  }
}
