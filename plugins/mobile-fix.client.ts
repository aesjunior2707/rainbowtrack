export default defineNuxtPlugin(() => {
  if (process.client) {
    // Detecta se é iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    if (isIOS || isMobile) {
      console.log('📱 Aplicando fixes para dispositivo móvel...')
      
      // Fix para viewport height em iOS
      function setVH() {
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      }
      
      // Fix para prevenir zoom no focus de inputs
      function preventZoomOnFocus() {
        const addMaximumScaleToMetaViewport = () => {
          const el = document.querySelector('meta[name=viewport]') as HTMLMetaElement
          if (el !== null) {
            let content = el.getAttribute('content')
            if (content && !content.includes('maximum-scale')) {
              content = content + ', maximum-scale=1.0'
              el.setAttribute('content', content)
            }
          }
        }

        const disableIosTextFieldZoom = addMaximumScaleToMetaViewport

        // iOS 9.3 allows users to request desktop sites (iOS 9.3 has been reported
        // to not respect the maximum-scale meta tag)
        const checkIsIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent)

        const disableIOS10Safari = () => {
          const el = document.querySelector('meta[name=viewport]') as HTMLMetaElement
          if (el !== null) {
            el.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover')
          }
        }

        const detectIOSVersion = () => {
          const match = navigator.userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/)
          if (match !== null && match.length > 0) {
            return [
              parseInt(match[1], 10),
              parseInt(match[2], 10),
              parseInt(match[3] || '0', 10)
            ]
          }
          return []
        }

        const isIOS10 = () => {
          const version = detectIOSVersion()
          return version.length > 0 && version[0] === 10
        }

        if (checkIsIOS()) {
          if (isIOS10()) {
            disableIOS10Safari()
          } else {
            disableIosTextFieldZoom()
          }
        }
      }

      // Fix para prevenir scroll durante touch events
      function preventOverscroll() {
        let startY: number
        
        document.addEventListener('touchstart', (e) => {
          startY = e.touches[0].clientY
        }, { passive: true })
        
        document.addEventListener('touchmove', (e) => {
          const currentY = e.touches[0].clientY
          const element = e.target as HTMLElement
          
          // Permite scroll apenas em elementos específicos
          const scrollableParent = element.closest('.overflow-y-auto, .overflow-auto, main, [data-scrollable]')
          
          if (!scrollableParent) {
            e.preventDefault()
            return
          }
          
          // Previne rubber band scroll
          const isScrollingUp = currentY > startY
          const isScrollingDown = currentY < startY
          const isAtTop = scrollableParent.scrollTop === 0
          const isAtBottom = scrollableParent.scrollTop + scrollableParent.clientHeight >= scrollableParent.scrollHeight
          
          if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
            e.preventDefault()
          }
        }, { passive: false })
      }

      // Fix para keyboard que altera viewport
      function fixKeyboardResize() {
        const initialViewportHeight = window.visualViewport?.height || window.innerHeight
        
        const handleViewportChange = () => {
          const currentHeight = window.visualViewport?.height || window.innerHeight
          const heightDifference = initialViewportHeight - currentHeight
          
          // Se a diferença é significativa, provavelmente o teclado está aberto
          if (heightDifference > 150) {
            document.body.classList.add('keyboard-open')
          } else {
            document.body.classList.remove('keyboard-open')
          }
          
          // Atualiza CSS custom property para viewport height
          setVH()
        }
        
        if (window.visualViewport) {
          window.visualViewport.addEventListener('resize', handleViewportChange)
        } else {
          window.addEventListener('resize', handleViewportChange)
        }
      }

      // Aplica todos os fixes
      setVH()
      preventZoomOnFocus()
      preventOverscroll()
      fixKeyboardResize()
      
      // Reaplica em resize
      window.addEventListener('resize', setVH)
      window.addEventListener('orientationchange', () => {
        setTimeout(setVH, 100)
      })
      
      // Adiciona classes CSS para identificar o tipo de dispositivo
      document.documentElement.classList.add('mobile-device')
      if (isIOS) {
        document.documentElement.classList.add('ios-device')
      }
      
      console.log('✅ Fixes móveis aplicados com sucesso')
    }
  }
})
