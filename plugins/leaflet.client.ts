export default defineNuxtPlugin(async () => {
  // Plugin só executa no client-side
  if (process.client) {
    try {
      // Import Leaflet CSS
      await import('leaflet/dist/leaflet.css')
      
      // Import Leaflet JS
      const L = await import('leaflet')
      
      // Fix for default markers in Leaflet
      delete (L.default as any).Icon.Default.prototype._getIconUrl
      L.default.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      })
      
      // Make Leaflet globally available
      return {
        provide: {
          leaflet: L.default
        }
      }
    } catch (error) {
      console.error('Error loading Leaflet:', error)
    }
  }
})
