export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $pinia } = useNuxtApp()
  const authStore = useAuthStore($pinia)

  // Skip middleware during SSR to avoid hydration issues
  if (process.server) {
    return
  }

  // Check authentication on client side
  await authStore.checkAuth()

  // Redirect to login if not authenticated
  if (!authStore.isAuthenticated && to.path !== '/login') {
    return navigateTo('/login')
  }

  // Redirect to dashboard if already authenticated and trying to access login
  if (authStore.isAuthenticated && to.path === '/login') {
    return navigateTo('/')
  }
})
