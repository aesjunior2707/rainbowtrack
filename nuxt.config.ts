// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  imports: {
    exclude: ['validate']
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@vite-pwa/nuxt'
  ],
  pwa: {
    registerType: 'autoUpdate',
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // 365 days
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    },
    manifest: {
      name: 'Rainbow Track - Inteligência Competitiva',
      short_name: 'Rainbow Track',
      description: 'Sistema de Rastreamento e Vendas Agrícolas com Inteligência Competitiva',
      theme_color: '#006E68',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait-primary',
      scope: '/',
      start_url: '/',
      lang: 'pt-BR',
      categories: ['business', 'productivity'],
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/favicon.ico',
          sizes: '64x64 32x32 24x24 16x16',
          type: 'image/x-icon'
        },
        {
          src: '/icon.svg',
          sizes: 'any',
          type: 'image/svg+xml'
        }
      ]
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  },
  css: ['~/assets/css/main.css']
})
