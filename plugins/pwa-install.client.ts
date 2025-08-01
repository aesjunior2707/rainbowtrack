export default defineNuxtPlugin(() => {
  if (process.client) {
    // Configurações de auto-instalação
    const AUTO_INSTALL_CONFIG = {
      // Mostra prompt após X visitas
      VISITS_THRESHOLD: 3,
      // Mostra prompt após X minutos de uso
      USAGE_TIME_THRESHOLD: 5, // minutos
      // Intervalo entre prompts (em dias)
      PROMPT_INTERVAL_DAYS: 7
    }

    // Rastreia estatísticas de uso
    function trackUserEngagement() {
      const stats = getStoredStats()
      
      // Incrementa visitas
      stats.visits += 1
      stats.lastVisit = new Date().toISOString()
      
      // Rastreia tempo de sessão
      const sessionStart = Date.now()
      
      // Salva estatísticas quando a página é fechada
      window.addEventListener('beforeunload', () => {
        const sessionTime = Math.floor((Date.now() - sessionStart) / 1000 / 60) // minutos
        stats.totalUsageMinutes += sessionTime
        localStorage.setItem('pwa_user_stats', JSON.stringify(stats))
      })
      
      // Salva estatísticas periodicamente
      setInterval(() => {
        const sessionTime = Math.floor((Date.now() - sessionStart) / 1000 / 60)
        stats.totalUsageMinutes += sessionTime
        localStorage.setItem('pwa_user_stats', JSON.stringify(stats))
      }, 60000) // a cada minuto
      
      localStorage.setItem('pwa_user_stats', JSON.stringify(stats))
      return stats
    }

    function getStoredStats() {
      const defaultStats = {
        visits: 0,
        totalUsageMinutes: 0,
        lastVisit: new Date().toISOString(),
        firstVisit: new Date().toISOString()
      }
      
      try {
        const stored = localStorage.getItem('pwa_user_stats')
        if (stored) {
          const parsed = JSON.parse(stored)
          return { ...defaultStats, ...parsed }
        }
      } catch (error) {
        console.warn('Erro ao carregar estatísticas PWA:', error)
      }
      
      return defaultStats
    }

    function shouldTriggerAutoInstall(stats: any): boolean {
      // Verifica se já foi dispensado permanentemente
      if (localStorage.getItem('pwa_install_dismissed') === 'true') {
        return false
      }
      
      // Verifica se está no período de "lembrar depois"
      const remindLater = localStorage.getItem('pwa_install_remind_later')
      if (remindLater) {
        const remindTime = new Date(remindLater)
        const now = new Date()
        const daysSinceRemind = (now.getTime() - remindTime.getTime()) / (1000 * 60 * 60 * 24)
        
        if (daysSinceRemind < AUTO_INSTALL_CONFIG.PROMPT_INTERVAL_DAYS) {
          return false
        }
      }
      
      // Critérios de engajamento
      const hasEnoughVisits = stats.visits >= AUTO_INSTALL_CONFIG.VISITS_THRESHOLD
      const hasEnoughUsage = stats.totalUsageMinutes >= AUTO_INSTALL_CONFIG.USAGE_TIME_THRESHOLD
      
      return hasEnoughVisits || hasEnoughUsage
    }

    // Detecção de dispositivo móvel
    function isMobileDevice(): boolean {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }

    // Detecção de browser suportado
    function isSupportedBrowser(): boolean {
      const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
      const isEdge = /Edg/.test(navigator.userAgent)
      const isFirefox = /Firefox/.test(navigator.userAgent)
      const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
      
      return isChrome || isEdge || isFirefox || isSafari
    }

    // Trigger inteligente de instalação
    function triggerSmartInstall() {
      const stats = trackUserEngagement()
      
      console.log('📊 PWA Stats:', {
        visits: stats.visits,
        usageMinutes: stats.totalUsageMinutes,
        mobile: isMobileDevice(),
        supported: isSupportedBrowser()
      })
      
      // Condições para mostrar prompt automaticamente
      if (shouldTriggerAutoInstall(stats) && isSupportedBrowser()) {
        console.log('🎯 Condições atendidas para auto-instalação PWA')
        
        // Dispara evento customizado para o componente
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('pwa-auto-install-trigger', {
            detail: { reason: 'engagement', stats }
          }))
        }, 3000) // delay de 3 segundos
      }
      
      // Prompt especial para dispositivos móveis
      if (isMobileDevice() && stats.visits === 1) {
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('pwa-auto-install-trigger', {
            detail: { reason: 'first-mobile-visit', stats }
          }))
        }, 10000) // delay de 10 segundos na primeira visita móvel
      }
    }

    // Detecção de recursos offline
    function setupOfflineDetection() {
      window.addEventListener('online', () => {
        console.log('🌐 Conectado - PWA totalmente funcional')
      })
      
      window.addEventListener('offline', () => {
        console.log('📴 Offline - PWA funcionando localmente')
        
        // Mostra notificação sobre benefícios do PWA quando offline
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('pwa-offline-benefit-show'))
        }, 2000)
      })
    }

    // Inicialização
    setTimeout(() => {
      triggerSmartInstall()
      setupOfflineDetection()
    }, 1000)

    // Exporta funções para uso global
    if (process.client) {
      window.pwaInstaller = {
        getStats: getStoredStats,
        shouldTrigger: shouldTriggerAutoInstall,
        triggerInstall: () => {
          window.dispatchEvent(new CustomEvent('pwa-manual-install-trigger'))
        }
      }
    }

    console.log('🚀 PWA Auto-Install Plugin carregado')
  }
})
