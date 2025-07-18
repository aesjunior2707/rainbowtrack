<template>
  <div class="relative">
    <button
      @click="showLanguages = !showLanguages"
      class="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-primary-600 transition-colors"
    >
      <Globe class="w-4 h-4" />
      <span>{{ currentLocale.name }}</span>
      <ChevronDown class="w-4 h-4" />
    </button>

    <div
      v-if="showLanguages"
      class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border"
    >
      <button
        v-for="locale in availableLocales"
        :key="locale.code"
        @click="switchLanguage(locale.code)"
        class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
        :class="{ 'bg-primary-50 text-primary-600': locale.code === $i18n.locale }"
      >
        <span>{{ locale.name }}</span>
        <Check v-if="locale.code === $i18n.locale" class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { Globe, ChevronDown, Check } from 'lucide-vue-next'

const { $i18n } = useNuxtApp()
const localePath = useLocalePath()

const showLanguages = ref(false)

const availableLocales = computed(() => {
  return $i18n.locales.value
})

const currentLocale = computed(() => {
  return availableLocales.value.find(locale => locale.code === $i18n.locale.value)
})

const switchLanguage = async (locale) => {
  await $i18n.setLocale(locale)
  showLanguages.value = false
}

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      showLanguages.value = false
    }
  })
})
</script>