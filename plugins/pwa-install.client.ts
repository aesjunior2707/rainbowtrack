export default defineNuxtPlugin(() => {
  if (process.client) {
    console.log('🚀 PWA Plugin inicializado')
    
    // Aguarda o service worker estar pronto
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
        console.log('✅ Service Worker está pronto')
      }).catch(error => {
        console.error('❌ Erro no Service Worker:', error)
      })
    }
    
    // Detecta quando o app está sendo executado como PWA
    const isPWA = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches
    if (isPWA) {
      console.log('📱 Executando como PWA')
    }
  }
})
