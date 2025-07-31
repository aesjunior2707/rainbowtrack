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
    registerType: 'prompt',
    includeAssets: ['favicon.ico', 'icon.svg'],
    manifest: {
      name: 'Rainbow Track - Inteligência Competitiva',
      short_name: 'Rainbow Track',
      description: 'Sistema de Rastreamento e Vendas Agrícolas com Inteligência Competitiva',
      theme_color: '#006E68',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait-primary',
      scope: '/',
      start_url: '/?pwa=1',
      categories: ['business', 'productivity', 'utilities'],
      lang: 'pt-BR',
      icons: [
        {
          src: '/icon.svg',
          sizes: 'any',
          type: 'image/svg+xml',
          purpose: 'any maskable'
        },
        {
          src: '/icon.svg',
          sizes: '192x192',
          type: 'image/svg+xml'
        },
        {
          src: '/icon.svg',
          sizes: '512x512',
          type: 'image/svg+xml'
        }
      ],
      screenshots: [
        {
          src: '/screenshot1.png',
          sizes: '1280x720',
          type: 'image/png',
          form_factor: 'wide'
        }
      ]
    },
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
              maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
            }
          }
        },
        {
          urlPattern: /^https:\/\/.*\.(?:png|jpg|jpeg|svg|gif)$/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'images-cache',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
            }
          }
        }
      ]
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module'
    }
  },
  css: ['~/assets/css/main.css']
})
