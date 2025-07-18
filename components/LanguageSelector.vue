<template>
  <div class="relative">
    <button
      @click="showLanguages = !showLanguages"
      class="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-primary-600 transition-colors"
    >
      <Globe class="w-4 h-4" />
      <span>{{ translationStore.currentLocaleName }}</span>
      <ChevronDown class="w-4 h-4" />
    </button>

    <div
      v-if="showLanguages"
      class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border"
    >
      <button
        v-for="locale in translationStore.availableLocales"
        :key="locale.code"
        @click="switchLanguage(locale.code)"
        class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
        :class="{ 'bg-primary-50 text-primary-600': locale.code === translationStore.currentLocale }"
      >
        <span class="flex items-center space-x-2">
          <span>{{ locale.flag }}</span>
          <span>{{ locale.name }}</span>
        </span>
        <Check v-if="locale.code === translationStore.currentLocale" class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { Globe, ChevronDown, Check } from 'lucide-vue-next'

const { $pinia } = useNuxtApp()
const translationStore = useTranslationStore($pinia)

const showLanguages = ref(false)

const switchLanguage = (locale) => {
  translationStore.setLocale(locale)
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