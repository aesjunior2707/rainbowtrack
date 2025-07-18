export default defineNuxtRouteMiddleware((to, from) => {
  const { $pinia } = useNuxtApp()
  const authStore = useAuthStore($pinia)

  // Check authentication on client side
  if (process.client) {
    authStore.checkAuth()
  }

  // Redirect to login if not authenticated
  if (!authStore.isAuthenticated && to.path !== '/login') {
    return navigateTo('/login')
  }

  // Redirect to dashboard if already authenticated and trying to access login
  if (authStore.isAuthenticated && to.path === '/login') {
    return navigateTo('/')
  }
})