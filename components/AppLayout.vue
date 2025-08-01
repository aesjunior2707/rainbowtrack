<template>
  <div class="min-h-screen bg-gray-50 relative">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b sticky top-0 z-50 safe-top">
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
                  class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-[100] border"
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
            class="md:hidden p-3 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-gray-100 touch-target mobile-button transition-colors"
            :aria-label="mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'"
          >
            <Menu class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Overlay -->
      <Transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="mobileMenuOpen"
          class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          @click="mobileMenuOpen = false"
          @touchstart.prevent
        />
      </Transition>

      <!-- Mobile Navigation -->
      <Transition
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-200 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <div v-if="mobileMenuOpen" class="md:hidden bg-white shadow-xl z-50 fixed top-16 right-0 bottom-0 w-80 max-w-[85vw] overflow-y-auto">
          <div class="flex flex-col h-full">
            <!-- User Info at Top -->
            <div class="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-6 text-white">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span class="text-white text-lg font-bold">
                    {{ authStore.user?.name.charAt(0) }}
                  </span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-white truncate">{{ authStore.user?.name }}</p>
                  <p class="text-primary-100 text-sm truncate">{{ authStore.user?.email }}</p>
                  <p class="text-primary-200 text-xs mt-1">
                    <MapPin class="w-3 h-3 inline mr-1" />
                    {{ authStore.user?.defaultRegion }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Navigation Items -->
            <div class="flex-1 px-4 py-6">
              <nav class="space-y-2">
                <NuxtLink
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.href"
                  @click="mobileMenuOpen = false"
                  class="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200 mobile-tap"
                  :class="{ 'text-primary-600 bg-primary-50 font-semibold': $route.path === item.href }"
                >
                  <component :is="item.icon" class="w-5 h-5 mr-3 flex-shrink-0" />
                  <span class="font-medium">{{ t(item.nameKey) }}</span>
                </NuxtLink>
              </nav>
            </div>

            <!-- Logout Button at Bottom -->
            <div class="border-t border-gray-200 p-4">
              <button
                @click="handleLogout"
                class="w-full flex items-center justify-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 font-medium mobile-tap"
              >
                <LogOut class="w-5 h-5 mr-2" />
                {{ t('auth.logout') }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 safe-left safe-right min-h-[calc(100vh-4rem)]">
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
  Menu,
  MapPin
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

// Close dropdowns when clicking outside and handle mobile menu
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      showUserMenu.value = false
    }
  })
})

// Prevent body scroll when mobile menu is open
watch(mobileMenuOpen, (isOpen) => {
  if (process.client) {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

// Cleanup on unmount
onUnmounted(() => {
  if (process.client) {
    document.body.style.overflow = ''
  }
})
</script>
