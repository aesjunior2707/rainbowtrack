export const usePWA = () => {
  const { $pwa } = useNuxtApp()
  
  // Provide reactive refs for the PWA state
  const isInstalled = computed(() => $pwa?.isInstalled ?? false)
  const canInstall = computed(() => $pwa?.canInstall ?? false)
  const needsUpdate = computed(() => $pwa?.needsUpdate ?? false)
  
  // Provide PWA methods
  const updateServiceWorker = async () => {
    if ($pwa?.updateServiceWorker) {
      return await $pwa.updateServiceWorker()
    }
  }
  
  const install = async () => {
    if ($pwa?.install) {
      return await $pwa.install()
    }
  }
  
  const cancelInstall = () => {
    if ($pwa?.cancelInstall) {
      $pwa.cancelInstall()
    }
  }
  
  return {
    isInstalled,
    canInstall,
    needsUpdate,
    updateServiceWorker,
    install,
    cancelInstall
  }
}
