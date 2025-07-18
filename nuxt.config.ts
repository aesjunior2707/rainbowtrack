// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    '@nuxtjs/i18n'
  ],
  i18n: {
    locales: [
      { code: 'pt-BR', name: 'Português', file: 'pt-BR.json' },
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'es', name: 'Español', file: 'es.json' },
      { code: 'zh', name: '中文', file: 'zh.json' }
    ],
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'pt-BR',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Rainbow Track',
      short_name: 'Rainbow Track',
      description: 'Sistema de Rastreamento e Vendas Agrícolas',
      theme_color: '#006E68',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      scope: '/',
      start_url: '/',
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    }
  },
  css: ['~/assets/css/main.css']
})