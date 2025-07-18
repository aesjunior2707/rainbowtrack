<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 to-secondary-500">
    <div class="max-w-md w-full mx-4">
      <div class="bg-white rounded-lg shadow-xl p-8">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-primary-600 mb-2 leading-tight">
            <div>Rainbow</div>
            <div>Track</div>
          </h1>
          <p class="text-gray-600">
            {{ t('app.description') }}
          </p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ t('auth.username') }}
            </label>
            <input
              v-model="username"
              type="text"
              class="input-field"
              :placeholder="t('auth.username')"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ t('auth.password') }}
            </label>
            <input
              v-model="password"
              type="password"
              class="input-field"
              :placeholder="t('auth.password')"
              required
            />
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input type="checkbox" class="mr-2" />
              <span class="text-sm text-gray-600">{{ t('auth.remember') }}</span>
            </label>
            <a href="#" class="text-sm text-primary-600 hover:text-primary-500">
              {{ t('auth.forgot_password') }}
            </a>
          </div>

          <button
            type="submit"
            class="btn-primary w-full"
            :disabled="loading"
          >
            <span v-if="loading">{{ t('auth.loading') }}</span>
            <span v-else>{{ t('auth.login') }}</span>
          </button>

          <div v-if="error" class="text-red-600 text-sm text-center">
            {{ error }}
          </div>
        </form>

        <div class="mt-8 text-center">
          <div class="text-sm text-gray-600 mb-4">
            {{ t('auth.demo_users') }}
          </div>
          <div class="text-xs text-gray-500 space-y-1">
            <div>leonardo.campos / senha123</div>
            <div>leonardo.campos2 / senha123</div>
            <div>admin / admin123</div>
          </div>
        </div>

        <div class="mt-6 flex justify-center">
          <LanguageSelector />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const { $pinia } = useNuxtApp()
const authStore = useAuthStore($pinia)
const translationStore = useTranslationStore($pinia)

const t = (key, params) => translationStore.t(key, params)

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    const success = await authStore.login(username.value, password.value)
    
    if (success) {
      await navigateTo('/')
    } else {
      error.value = t('auth.invalid_credentials')
    }
  } catch (e) {
    error.value = t('auth.login_failed')
  } finally {
    loading.value = false
  }
}

</script>