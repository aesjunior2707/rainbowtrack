<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-full"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-full"
    >
      <div
        v-if="showPrompt"
        class="fixed inset-x-0 bottom-0 z-notification p-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-2xl border-t-4 border-primary-400 safe-bottom"
      >
        <div class="max-w-md mx-auto">
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
            
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-bold leading-5">
                Instalar Rainbow Track
              </h3>
              <p class="text-xs text-primary-100 mt-1 leading-4">
                Instale o app no seu dispositivo para acesso rápido e experiência nativa!
              </p>
              
              <div class="flex items-center space-x-3 mt-3">
                <button
                  @click="installApp"
                  class="bg-white text-primary-700 text-xs font-semibold py-2 px-4 rounded-lg hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                >
                  Instalar Agora
                </button>
                <button
                  @click="remindLater"
                  class="text-primary-100 text-xs font-medium hover:text-white transition-colors"
                >
                  Lembrar Depois
                </button>
                <button
                  @click="dismissPermanently"
                  class="text-primary-200 hover:text-primary-100 text-xs ml-auto"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const showPrompt = ref(false)
const deferredPrompt = ref<any>(null)
const isInstallable = ref(false)

// Configurações de localStorage
const STORAGE_KEYS = {
  DISMISSED: 'pwa_install_dismissed',
  REMIND_LATER: 'pwa_install_remind_later',
  PROMPT_COUNT: 'pwa_install_prompt_count'
}

// Use PWA composable
const { isInstalled, canInstall } = usePWA()

onMounted(() => {
  checkInstallability()
  setupInstallPromptListener()
  setupAutoInstallListeners()
})

function setupAutoInstallListeners() {
  if (process.client) {
    // Escuta eventos de auto-instalação do plugin
    window.addEventListener('pwa-auto-install-trigger', (event: any) => {
      console.log('🎯 Auto-install triggered:', event.detail)

      if (shouldShowPrompt()) {
        showInstallPrompt()
      }
    })

    // Escuta eventos de instalação manual
    window.addEventListener('pwa-manual-install-trigger', () => {
      console.log('👆 Manual install triggered')
      showInstallPrompt()
    })

    // Escuta benefícios offline
    window.addEventListener('pwa-offline-benefit-show', () => {
      if (!showPrompt.value && shouldShowPrompt()) {
        console.log('📴 Showing offline benefits')
        showInstallPrompt()
      }
    })
  }
}

function checkInstallability() {
  if (process.client) {
    // Verifica se já está instalado
    const isStandalone = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches
    const isInWebAppiOS = (window.navigator as any).standalone === true
    const isInstalled = isStandalone || isInWebAppiOS
    
    if (isInstalled) {
      console.log('🎉 PWA já está instalado!')
      return
    }
    
    // Verifica se o browser suporta instalação
    isInstallable.value = 'serviceWorker' in navigator
  }
}

function setupInstallPromptListener() {
  if (process.client) {
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault()
      deferredPrompt.value = e as any
      isInstallable.value = true
      
      console.log('📱 PWA instalável detectado!')
      
      // Mostra prompt automaticamente se condições forem atendidas
      if (shouldShowPrompt()) {
        setTimeout(() => showInstallPrompt(), 5000)
      }
    })
    
    // Escuta quando o app é instalado
    window.addEventListener('appinstalled', () => {
      console.log('✅ PWA instalado com sucesso!')
      showPrompt.value = false
      deferredPrompt.value = null
      
      // Limpa localStorage
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key)
      })
    })
  }
}

function shouldShowPrompt(): boolean {
  if (!process.client || !isInstallable.value) return false
  
  const dismissed = typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEYS.DISMISSED) === 'true'
  const remindLater = localStorage.getItem(STORAGE_KEYS.REMIND_LATER)
  const promptCount = parseInt(localStorage.getItem(STORAGE_KEYS.PROMPT_COUNT) || '0')
  
  // Não mostra se foi permanentemente dispensado
  if (dismissed) return false
  
  // Não mostra se "lembrar depois" ainda está ativo (24h)
  if (remindLater) {
    const remindTime = new Date(remindLater)
    const now = new Date()
    if (now.getTime() - remindTime.getTime() < 24 * 60 * 60 * 1000) {
      return false
    }
  }
  
  // Limite de 3 prompts máximo
  if (promptCount >= 3) return false
  
  return true
}

function showInstallPrompt() {
  if (!shouldShowPrompt()) return
  
  console.log('🎯 Showing PWA install prompt')
  showPrompt.value = true
  
  // Auto-hide after 15 seconds
  setTimeout(() => showPrompt.value = false, 15000)
  
  // Incrementa contador
  const currentCount = parseInt(localStorage.getItem(STORAGE_KEYS.PROMPT_COUNT) || '0')
  localStorage.setItem(STORAGE_KEYS.PROMPT_COUNT, (currentCount + 1).toString())
}

async function installApp() {
  if (!deferredPrompt.value || typeof deferredPrompt.value.prompt !== 'function') {
    // Fallback para dispositivos iOS
    if (typeof navigator !== 'undefined' && /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())) {
      alert('Para instalar no iOS:\n1. Toque no ícone de compartilhar (📤)\n2. Selecione "Adicionar à Tela de Início"')
      showPrompt.value = false
      return
    }

    alert('Instalação não disponível neste momento. Tente novamente mais tarde.')
    return
  }

  try {
    await deferredPrompt.value.prompt()
    const result = await deferredPrompt.value.userChoice
    const outcome = result?.outcome

    console.log('Resultado da instalação:', outcome)

    if (outcome === 'accepted') {
      console.log('✅ Usuário aceitou instalar o PWA')
    } else {
      console.log('❌ Usuário recusou instalar o PWA')
    }

    showPrompt.value = false
    deferredPrompt.value = null
  } catch (error) {
    console.error('Erro durante instalação:', error)
    showPrompt.value = false
  }
}

function remindLater() {
  showPrompt.value = false
  localStorage.setItem(STORAGE_KEYS.REMIND_LATER, new Date().toISOString())
  console.log('⏰ Lembrete definido para 24h')
}

function dismissPermanently() {
  showPrompt.value = false
  localStorage.setItem(STORAGE_KEYS.DISMISSED, 'true')
  console.log('🚫 Prompt de instalação dispensado permanentemente')
}
</script>
