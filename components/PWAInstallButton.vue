<template>
  <button
    v-if="showButton"
    @click="triggerInstall"
    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:scale-105"
  >
    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
    </svg>
    {{ buttonText }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  text?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  text: 'Instalar App',
  variant: 'primary',
  size: 'md'
})

const showButton = ref(false)
const buttonText = ref(props.text)

onMounted(() => {
  checkIfShouldShow()
})

function checkIfShouldShow() {
  if (!process.client) return
  
  // Verifica se já está instalado
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches
  const isInWebAppiOS = (window.navigator as any).standalone === true
  const isInstalled = isStandalone || isInWebAppiOS
  
  if (isInstalled) {
    console.log('PWA já instalado - ocultando botão')
    return
  }
  
  // Verifica se foi dispensado permanentemente
  const dismissed = localStorage.getItem('pwa_install_dismissed') === 'true'
  if (dismissed) {
    console.log('PWA dispensado permanentemente - ocultando botão')
    return
  }
  
  // Verifica suporte do browser
  const isSupported = 'serviceWorker' in navigator
  if (!isSupported) {
    console.log('PWA não suportado - ocultando botão')
    return
  }
  
  showButton.value = true
  
  // Escuta quando app é instalado para ocultar botão
  window.addEventListener('appinstalled', () => {
    showButton.value = false
  })
}

function triggerInstall() {
  if (process.client && window.pwaInstaller) {
    window.pwaInstaller.triggerInstall()
  } else {
    // Fallback - dispara evento diretamente
    window.dispatchEvent(new CustomEvent('pwa-manual-install-trigger'))
  }
}
</script>
