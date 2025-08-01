export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    // Check if app was opened from PWA
    const urlParams = new URLSearchParams(window.location.search)
    const isPWALaunch = urlParams.get('pwa') === '1'
    
    if (isPWALaunch) {
      console.log('🚀 App launched as PWA!')
      
      // Store PWA usage for analytics
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('pwa-launches', 
          (parseInt(localStorage.getItem('pwa-launches') || '0') + 1).toString()
        )
      }
    }

    // Track PWA display mode
    const displayMode = window.matchMedia('(display-mode: standalone)').matches 
      ? 'standalone' 
      : 'browser'
    
    // You can send this to analytics or use for app behavior
    console.log(`📱 Display mode: ${displayMode}`)
  }
})
