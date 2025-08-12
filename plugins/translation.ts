export default defineNuxtPlugin(() => {
  const { $pinia } = useNuxtApp()
  const translationStore = useTranslationStore($pinia)
  
  // Initialize locale once on client side
  if (process.client) {
    translationStore.initLocale()
  }
})