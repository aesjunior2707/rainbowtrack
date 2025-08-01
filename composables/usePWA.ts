export const usePWA = () => {
  // Initialize with default values that work on both client and server
  const isInstalled = ref(false)
  const canInstall = ref(false)
  const needsUpdate = ref(false)
  const deferredPrompt = ref<any>(null)
  const isOnline = ref(true)
  const isInitialized = ref(false)

  // Check if app is running as PWA
  const checkIfInstalled = () => {
    if (!process.client) return

    try {
      isInstalled.value =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true ||
        document.referrer.includes('android-app://')
    } catch (error) {
      console.warn('Error checking PWA installation status:', error)
    }
  }

  // Setup install prompt event
  const setupInstallPrompt = () => {
    if (!process.client) return

    try {
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
    } catch (error) {
      console.warn('Error setting up install prompt:', error)
    }
  }

  // Install the PWA
  const installPWA = async () => {
    if (!process.client || !deferredPrompt.value) return false

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
    if (!process.client) return

    try {
      isOnline.value = navigator.onLine

      window.addEventListener('online', () => {
        isOnline.value = true
      })

      window.addEventListener('offline', () => {
        isOnline.value = false
      })
    } catch (error) {
      console.warn('Error setting up online status:', error)
    }
  }

  // Check for updates
  const checkForUpdates = async () => {
    if (!process.client || !('serviceWorker' in navigator)) return

    try {
      const registration = await navigator.serviceWorker.getRegistration()
      if (registration) {
        await registration.update()
      }
    } catch (error) {
      console.warn('Error checking for updates:', error)
    }
  }

  // Get PWA info
  const getPWAInfo = () => {
    if (!process.client) {
      return {
        isInstalled: false,
        canInstall: false,
        needsUpdate: false,
        isOnline: true,
        isStandalone: false,
        displayMode: 'browser'
      }
    }

    try {
      return {
        isInstalled: isInstalled.value,
        canInstall: canInstall.value,
        needsUpdate: needsUpdate.value,
        isOnline: isOnline.value,
        isStandalone: isInstalled.value,
        displayMode: window.matchMedia('(display-mode: standalone)').matches ? 'standalone' : 'browser'
      }
    } catch (error) {
      console.warn('Error getting PWA info:', error)
      return {
        isInstalled: false,
        canInstall: false,
        needsUpdate: false,
        isOnline: true,
        isStandalone: false,
        displayMode: 'browser'
      }
    }
  }

  // Initialize PWA functionality
  const initPWA = () => {
    if (!process.client || isInitialized.value) return

    isInitialized.value = true

    nextTick(() => {
      try {
        checkIfInstalled()
        setupInstallPrompt()
        setupOnlineStatus()

        // Check for updates every 60 seconds (reduced frequency)
        setInterval(() => {
          checkForUpdates()
        }, 60000)
      } catch (error) {
        console.warn('Error initializing PWA:', error)
      }
    })
  }

  return {
    isInstalled,
    canInstall,
    needsUpdate,
    isOnline,
    installPWA,
    checkForUpdates,
    getPWAInfo,
    initPWA
  }
}
