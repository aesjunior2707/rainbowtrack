<template>
  <div class="w-full">
    <div class="card p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <MapPin class="w-5 h-5 mr-2 text-primary-600" />
        Capturas por Estado - Mapa do Brasil
      </h2>
      
      <div class="relative w-full">
        <!-- Legend -->
        <div class="mb-4 flex flex-wrap items-center gap-4 text-sm">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-gray-300"></div>
            <span class="text-gray-600">Sem capturas</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-primary-200"></div>
            <span class="text-gray-600">1-3 capturas</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded-full bg-primary-400"></div>
            <span class="text-gray-600">4-8 capturas</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-5 h-5 rounded-full bg-primary-600"></div>
            <span class="text-gray-600">9+ capturas</span>
          </div>
        </div>

        <!-- Leaflet Map Container -->
        <div class="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden">
          <div id="leaflet-map" class="h-96 md:h-[500px] w-full"></div>
        </div>

        <!-- Summary Stats -->
        <div class="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center p-3 bg-primary-50 rounded-lg">
            <div class="text-2xl font-bold text-primary-600">{{ totalCaptures }}</div>
            <div class="text-sm text-gray-600">Total de Capturas</div>
          </div>
          <div class="text-center p-3 bg-secondary-50 rounded-lg">
            <div class="text-2xl font-bold text-secondary-500">{{ activeStates }}</div>
            <div class="text-sm text-gray-600">Estados Ativos</div>
          </div>
          <div class="text-center p-3 bg-blue-50 rounded-lg">
            <div class="text-2xl font-bold text-blue-600">{{ topState.state }}</div>
            <div class="text-sm text-gray-600">Estado Líder</div>
          </div>
          <div class="text-center p-3 bg-purple-50 rounded-lg">
            <div class="text-2xl font-bold text-purple-600">{{ averagePerState.toFixed(1) }}</div>
            <div class="text-sm text-gray-600">Média por Estado</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MapPin } from 'lucide-vue-next'

const dataStore = useDataStore()

// All Brazilian states
const brazilianStates = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
]

// State names mapping
const stateNames = {
  'AC': 'Acre', 'AL': 'Alagoas', 'AP': 'Amapá', 'AM': 'Amazonas',
  'BA': 'Bahia', 'CE': 'Ceará', 'DF': 'Distrito Federal', 'ES': 'Espírito Santo',
  'GO': 'Goiás', 'MA': 'Maranhão', 'MT': 'Mato Grosso', 'MS': 'Mato Grosso do Sul',
  'MG': 'Minas Gerais', 'PA': 'Pará', 'PB': 'Paraíba', 'PR': 'Paraná',
  'PE': 'Pernambuco', 'PI': 'Piauí', 'RJ': 'Rio de Janeiro', 'RN': 'Rio Grande do Norte',
  'RS': 'Rio Grande do Sul', 'RO': 'Rondônia', 'RR': 'Roraima', 'SC': 'Santa Catarina',
  'SP': 'São Paulo', 'SE': 'Sergipe', 'TO': 'Tocantins'
}

// Map and GeoJSON refs
let map = null
let geoJsonLayer = null
let circleMarkers = []

// Calculate captures by state (reactive to data changes)
const stateData = computed(() => {
  const data = {}
  
  // Initialize all states with 0
  brazilianStates.forEach(state => {
    data[state] = 0
  })
  
  // Count captures by state
  dataStore.priceReports.forEach(report => {
    if (report.state && data.hasOwnProperty(report.state)) {
      data[report.state]++
    }
  })
  
  return data
})

// Computed stats
const totalCaptures = computed(() => {
  return Object.values(stateData.value).reduce((sum, count) => sum + count, 0)
})

const activeStates = computed(() => {
  return Object.values(stateData.value).filter(count => count > 0).length
})

const topState = computed(() => {
  const states = Object.entries(stateData.value)
  const max = Math.max(...Object.values(stateData.value))
  const topStateEntry = states.find(([state, count]) => count === max)
  return { 
    state: topStateEntry?.[0] ? getStateName(topStateEntry[0]) : '-', 
    count: max 
  }
})

const averagePerState = computed(() => {
  return activeStates.value > 0 ? totalCaptures.value / activeStates.value : 0
})

// Helper functions
const getBubbleSize = (count) => {
  if (count === 0) return 0
  if (count <= 3) return 15
  if (count <= 8) return 25
  return 35
}

const getBubbleColor = (count) => {
  if (count === 0) return '#e2e8f0'
  if (count <= 3) return '#99f6e4' // primary-200
  if (count <= 8) return '#2dd4bf' // primary-400
  return '#006E68' // primary-600
}

const getStateColor = (count) => {
  if (count === 0) return '#f8fafc'
  if (count <= 3) return '#f0fdfc'
  if (count <= 8) return '#ccfbf1'
  return '#5eead4'
}

const getPercentage = (count) => {
  if (totalCaptures.value === 0) return 0
  return ((count / totalCaptures.value) * 100).toFixed(1)
}

const getStateName = (stateCode) => {
  return stateNames[stateCode] || stateCode
}

// Initialize map
const initializeMap = async () => {
  if (typeof window === 'undefined') return

  try {
    // Use Leaflet from plugin or dynamic import
    const { $leaflet } = useNuxtApp()
    const L = $leaflet || (await import('leaflet')).default

    // Initialize map
    map = L.map('leaflet-map', {
      center: [-14.2350, -51.9253], // Brazil center
      zoom: 4,
      zoomControl: true,
      attributionControl: true
    })

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map)

    // Load and display GeoJSON
    await loadBrazilGeoJSON(L)

  } catch (error) {
    console.error('Error initializing map:', error)
  }
}

// Load Brazil GeoJSON data
const loadBrazilGeoJSON = async (L) => {
  try {
    const response = await fetch('/brazil-states.geojson')
    const geoJsonData = await response.json()
    
    // Add GeoJSON layer
    geoJsonLayer = L.geoJSON(geoJsonData, {
      style: (feature) => {
        const stateCode = feature.properties.sigla || feature.properties.SIGLA || feature.properties.state_code
        const count = stateData.value[stateCode] || 0

        return {
          fillColor: getStateColor(count),
          weight: 2,
          opacity: 1,
          color: '#64748b',
          dashArray: '',
          fillOpacity: 0.7
        }
      },
      onEachFeature: (feature, layer) => {
        const stateCode = feature.properties.sigla || feature.properties.SIGLA || feature.properties.state_code
        const stateName = feature.properties.nome || feature.properties.name || feature.properties.ESTADO || getStateName(stateCode)
        const count = stateData.value[stateCode] || 0
        
        // Bind popup
        layer.bindPopup(`
          <div class="p-2">
            <h3 class="font-bold text-lg">${stateName}</h3>
            <p class="text-gray-600">Código: ${stateCode}</p>
            <p class="text-primary-600 font-semibold">${count} capturas</p>
            <p class="text-sm text-gray-500">${getPercentage(count)}% do total</p>
          </div>
        `)
        
        // Add hover effects
        layer.on({
          mouseover: (e) => {
            const layer = e.target
            layer.setStyle({
              weight: 3,
              color: '#1f2937',
              fillOpacity: 0.9
            })
          },
          mouseout: (e) => {
            geoJsonLayer.resetStyle(e.target)
          }
        })
      }
    }).addTo(map)
    
    // Add bubble markers for states with data
    addBubbleMarkers(L)
    
    // Fit map to Brazil bounds
    map.fitBounds(geoJsonLayer.getBounds())
    
  } catch (error) {
    console.error('Error loading GeoJSON:', error)
  }
}

// Add bubble markers
const addBubbleMarkers = (L) => {
  // Clear existing markers
  circleMarkers.forEach(marker => map.removeLayer(marker))
  circleMarkers = []
  
  // State centers (approximate)
  const stateCenters = {
    'AC': [-9.0238, -70.8120], 'AL': [-9.5713, -36.7820], 'AP': [1.4554, -51.9045],
    'AM': [-4.0097, -63.1264], 'BA': [-12.5797, -41.7007], 'CE': [-5.4984, -39.3206],
    'DF': [-15.7998, -47.8645], 'ES': [-19.1834, -40.3089], 'GO': [-15.827, -49.8362],
    'MA': [-4.9609, -45.2744], 'MT': [-12.6819, -56.9211], 'MS': [-20.7722, -54.7852],
    'MG': [-18.5122, -44.5550], 'PA': [-3.9014, -52.7539], 'PB': [-7.2399, -36.7819],
    'PR': [-24.8220, -51.1690], 'PE': [-8.8137, -36.9541], 'PI': [-8.5335, -43.5939],
    'RJ': [-22.9068, -43.1729], 'RN': [-5.4026, -36.9541], 'RS': [-30.0346, -51.2177],
    'RO': [-10.8800, -63.0230], 'RR': [1.9981, -61.3300], 'SC': [-27.2423, -50.2189],
    'SP': [-23.5505, -46.6333], 'SE': [-10.5741, -37.3857], 'TO': [-10.1752, -48.2982]
  }
  
  Object.entries(stateData.value).forEach(([stateCode, count]) => {
    if (count > 0 && stateCenters[stateCode]) {
      const [lat, lng] = stateCenters[stateCode]
      const size = getBubbleSize(count)
      const color = getBubbleColor(count)
      
      const circleMarker = L.circleMarker([lat, lng], {
        radius: size,
        fillColor: color,
        color: '#1f2937',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(map)
      
      circleMarker.bindPopup(`
        <div class="p-2 text-center">
          <h3 class="font-bold text-lg">${getStateName(stateCode)}</h3>
          <p class="text-2xl font-bold text-primary-600">${count}</p>
          <p class="text-sm text-gray-600">capturas registradas</p>
        </div>
      `)
      
      circleMarkers.push(circleMarker)
    }
  })
}

// Update map when data changes
const updateMap = async () => {
  if (!map || typeof window === 'undefined') return
  
  try {
    const L = await import('leaflet')
    
    // Update GeoJSON styling
    if (geoJsonLayer) {
      geoJsonLayer.eachLayer((layer) => {
        const feature = layer.feature
        const stateCode = feature.properties.sigla || feature.properties.SIGLA || feature.properties.state_code
        const count = stateData.value[stateCode] || 0

        layer.setStyle({
          fillColor: getStateColor(count),
          weight: 2,
          opacity: 1,
          color: '#64748b',
          fillOpacity: 0.7
        })
      })
    }
    
    // Update bubble markers
    addBubbleMarkers(L.default)
    
  } catch (error) {
    console.error('Error updating map:', error)
  }
}

// Watch for data changes
watch(() => dataStore.priceReports, () => {
  nextTick(() => {
    updateMap()
  })
}, { deep: true })

// Lifecycle
onMounted(() => {
  nextTick(() => {
    initializeMap()
  })
})

onUnmounted(() => {
  if (map) {
    map.remove()
  }
})
</script>

<style scoped>
.card {
  @apply bg-white rounded-lg shadow-sm border border-gray-200;
}

/* Leaflet CSS - needs to be imported */
@import 'leaflet/dist/leaflet.css';
</style>
