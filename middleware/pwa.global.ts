export default defineNuxtRouteMiddleware((to) => {
  // Simplified PWA middleware to prevent errors during initialization
  if (process.client) {
    try {
      // Check if app was opened from PWA
      const urlParams = new URLSearchParams(window.location.search)
      const isPWALaunch = urlParams.get('pwa') === '1'

      if (isPWALaunch) {
        console.log('🚀 App launched as PWA!')
      }
    } catch (error) {
      // Silently handle any middleware errors
      console.warn('PWA middleware error:', error)
    }
  }
})
