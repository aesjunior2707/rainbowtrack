<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center">
              <div class="w-12 h-12 mr-3">
                <img src="/8f2f8613-ba62-409f-986d-78b711b47833.png" alt="Rainbow Track Logo" class="w-full h-full object-contain" />
              </div>
              <div class="text-xl font-bold text-primary-600">
                <div>Rainbow</div>
                <div class="-mt-1">Track</div>
              </div>
            </NuxtLink>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            <NuxtLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="{ 'text-primary-600 bg-primary-50': $route.path === item.href }"
            >
              <component :is="item.icon" class="w-4 h-4 inline mr-2" />
              {{ t(item.nameKey) }}
            </NuxtLink>
          </div>

          <!-- User Menu -->
          <div class="flex items-center space-x-4">
            <ClientOnly>
              <LanguageSelector />
            </ClientOnly>
            <ClientOnly>
              <div class="relative">
                <button
                  @click="showUserMenu = !showUserMenu"
                  class="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <div class="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                    <span class="text-white text-sm font-medium">
                      {{ authStore.user?.name.charAt(0) }}
                    </span>
                  </div>
                  <ChevronDown class="w-4 h-4" />
                </button>

                <!-- User Dropdown -->
                <div
                  v-if="showUserMenu"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                >
                  <div class="px-4 py-2 border-b">
                    <p class="text-sm font-medium text-gray-900">{{ authStore.user?.name }}</p>
                    <p class="text-sm text-gray-500">{{ authStore.user?.email }}</p>
                    <p class="text-xs text-primary-600 font-medium mt-1">
                      Região: {{ authStore.user?.defaultRegion }}
                    </p>
                  </div>
                  <button
                    @click="handleLogout"
                    class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut class="w-4 h-4 mr-2" />
                    {{ t('auth.logout') }}
                  </button>
                </div>
              </div>
            </ClientOnly>
          </div>

          <!-- Mobile menu button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100"
          >
            <Menu class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
            :class="{ 'text-primary-600 bg-primary-50': $route.path === item.href }"
          >
            <component :is="item.icon" class="w-4 h-4 inline mr-2" />
            {{ t(item.nameKey) }}
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>

    <!-- PWA Install Prompt -->
    <ClientOnly>
      <PWAInstallPrompt />
    </ClientOnly>
  </div>
</template>

<script setup>
import { 
  Home, 
  FileText, 
  Package, 
  Building2,
  ChevronDown, 
  LogOut, 
  Menu 
} from 'lucide-vue-next'

const { $pinia } = useNuxtApp()
const authStore = useAuthStore($pinia)
const translationStore = useTranslationStore($pinia)

const t = (key, params) => translationStore.t(key, params)

const showUserMenu = ref(false)
const mobileMenuOpen = ref(false)

const navigation = [
  { nameKey: 'navigation.dashboard', href: '/', icon: Home },
  { nameKey: 'navigation.tracking', href: '/reports', icon: FileText },
  { nameKey: 'navigation.competitors', href: '/competitors', icon: Building2 },
  { nameKey: 'navigation.catalog', href: '/products', icon: Package }
]

const handleLogout = async () => {
  await authStore.logout()
  await navigateTo('/login')
}

// Close dropdowns when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      showUserMenu.value = false
    }
  })
})
</script>
