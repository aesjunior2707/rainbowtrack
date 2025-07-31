export default defineNuxtPlugin(async () => {
  const { $pinia } = useNuxtApp()
  const authStore = useAuthStore($pinia)
  
  // Initialize auth state on client hydration
  await authStore.checkAuth()
})
