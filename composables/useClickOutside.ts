export function useClickOutside(elementRef: Ref<HTMLElement | null>, callback: () => void) {
  const handleClickOutside = (event: Event) => {
    if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
      callback()
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    document.removeEventListener('touchstart', handleClickOutside)
  })
}
