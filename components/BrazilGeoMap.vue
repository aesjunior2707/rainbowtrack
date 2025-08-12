<template>
  <div class="w-full">
    <div class="card p-6">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 class="text-xl font-bold text-gray-900 mb-2 flex items-center">
            <Globe class="w-6 h-6 mr-3 text-primary-600" />
            Inteligência Competitiva - Brasil
          </h2>
          <p class="text-gray-600">Distribuição geográfica das capturas por estado</p>
        </div>
        
        <div class="mt-4 lg:mt-0 flex items-center gap-4">
          <div class="flex items-center gap-2 text-sm">
            <span class="text-gray-600">Visualização:</span>
            <select 
              v-model="viewMode" 
              class="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="intensity">Intensidade</option>
              <option value="volume">Volume</option>
            </select>
          </div>
          
          <button
            @click="refreshData"
            class="btn-outline text-sm px-3 py-1"
          >
            <RefreshCw class="w-4 h-4 mr-1" />
            Atualizar
          </button>
        </div>
      </div>

      <!-- Enhanced Statistics Panel -->
      <div class="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-4 rounded-xl shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-2xl font-bold">{{ totalCaptures }}</div>
              <div class="text-emerald-100 text-sm font-medium">Total Capturas</div>
            </div>
            <div class="bg-white bg-opacity-20 p-3 rounded-lg">
              <Target class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="mt-2 text-emerald-100 text-xs">
            +{{ recentCapturesCount }} nas últimas 24h
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-2xl font-bold">{{ activeStates }}/27</div>
              <div class="text-blue-100 text-sm font-medium">Estados Ativos</div>
            </div>
            <div class="bg-white bg-opacity-20 p-3 rounded-lg">
              <MapPin class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="mt-2 text-blue-100 text-xs">
            {{ coveragePercentage }}% cobertura nacional
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-xl shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-2xl font-bold">{{ topState.state }}</div>
              <div class="text-purple-100 text-sm font-medium">Estado Líder</div>
            </div>
            <div class="bg-white bg-opacity-20 p-3 rounded-lg">
              <Crown class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="mt-2 text-purple-100 text-xs">
            {{ topState.count }} capturas
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-xl shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-2xl font-bold">{{ averagePerState.toFixed(1) }}</div>
              <div class="text-orange-100 text-sm font-medium">Média Estado</div>
            </div>
            <div class="bg-white bg-opacity-20 p-3 rounded-lg">
              <TrendingUp class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="mt-2 text-orange-100 text-xs">
            Distribuição equilibrada
          </div>
        </div>
      </div>

      <!-- Professional Geographic Map -->
      <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div class="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Mapa Geográfico do Brasil</h3>
              <p class="text-sm text-gray-600 mt-1">Dados atualizados em tempo real</p>
            </div>
            
            <!-- Enhanced Legend -->
            <div class="flex flex-wrap items-center gap-3">
              <div class="text-xs font-medium text-gray-700 mr-2">Intensidade:</div>
              <div class="flex items-center gap-2 text-xs">
                <div class="w-4 h-4 rounded border border-gray-300 bg-gray-100"></div>
                <span class="text-gray-600">Sem dados</span>
              </div>
              <div class="flex items-center gap-2 text-xs">
                <div class="w-4 h-4 rounded bg-emerald-200"></div>
                <span class="text-gray-600">1-3</span>
              </div>
              <div class="flex items-center gap-2 text-xs">
                <div class="w-4 h-4 rounded bg-emerald-400"></div>
                <span class="text-gray-600">4-8</span>
              </div>
              <div class="flex items-center gap-2 text-xs">
                <div class="w-4 h-4 rounded bg-emerald-600"></div>
                <span class="text-gray-600">9+</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="p-6 bg-gradient-to-br from-blue-50/30 to-emerald-50/30">
          <div class="relative">
            <!-- Map Container -->
            <div 
              ref="mapContainer" 
              class="w-full rounded-lg border border-gray-200 bg-white shadow-inner"
              style="height: 500px;"
            >
              <!-- Loading State -->
              <div v-if="!mapReady" class="h-full flex items-center justify-center">
                <div class="text-center">
                  <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                  <p class="text-gray-500 font-medium">Carregando mapa geográfico...</p>
                  <p class="text-sm text-gray-400 mt-1">Processando dados dos estados</p>
                </div>
              </div>
            </div>
            
            <!-- Hover Info Panel -->
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 transform translate-y-2"
              enter-to-class="opacity-100 transform translate-y-0"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 transform translate-y-0"
              leave-to-class="opacity-0 transform translate-y-2"
            >
              <div
                v-if="hoveredState"
                class="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-xl border border-gray-200 min-w-[200px] z-10"
              >
                <h4 class="font-bold text-gray-900 text-lg">{{ hoveredState.name }}</h4>
                <div class="mt-2 space-y-1">
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Capturas:</span>
                    <span class="font-semibold text-primary-600">{{ hoveredState.captures }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Participação:</span>
                    <span class="font-semibold text-gray-900">{{ hoveredState.percentage }}%</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Ranking:</span>
                    <span class="font-semibold text-orange-600">#{{ hoveredState.rank }}</span>
                  </div>
                </div>
                
                <!-- Mini progress bar -->
                <div class="mt-3 w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-gradient-to-r from-primary-400 to-primary-600 h-2 rounded-full transition-all duration-300"
                    :style="{ width: `${Math.min(hoveredState.percentage * 2, 100)}%` }"
                  ></div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <!-- Top Performers Section -->
      <div class="mt-8 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div class="p-4 border-b border-gray-100 bg-gradient-to-r from-primary-50 to-emerald-50">
          <h3 class="text-lg font-semibold text-gray-900 flex items-center">
            <Award class="w-5 h-5 mr-2 text-primary-600" />
            Top 5 Estados - Performance
          </h3>
        </div>
        
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <div
              v-for="([state, count], index) in topStatesData.slice(0, 5)"
              :key="state"
              class="relative p-4 border-2 border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 group hover:border-primary-300"
            >
              <!-- Ranking Badge -->
              <div 
                class="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                :class="getRankingColor(index)"
              >
                {{ index + 1 }}
              </div>
              
              <div class="text-center">
                <h4 class="font-bold text-gray-900 text-lg mb-2">{{ getStateName(state) }}</h4>
                <div class="text-3xl font-bold text-primary-600 mb-1">{{ count }}</div>
                <div class="text-sm text-gray-600 mb-3">capturas</div>
                
                <div class="space-y-2">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Participação:</span>
                    <span class="font-semibold">{{ getPercentage(count) }}%</span>
                  </div>
                  
                  <!-- Enhanced progress bar -->
                  <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      class="h-3 rounded-full transition-all duration-500 bg-gradient-to-r from-primary-400 to-primary-600"
                      :style="{ width: `${Math.min(getPercentage(count), 100)}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Globe, MapPin, Target, Crown, TrendingUp, Award, RefreshCw } from 'lucide-vue-next'

const dataStore = useDataStore()

// Component state
const mapContainer = ref(null)
const mapReady = ref(false)
const hoveredState = ref(null)
const viewMode = ref('intensity')

// Brazilian states data
const stateNames = {
  'AC': 'Acre', 'AL': 'Alagoas', 'AP': 'Amapá', 'AM': 'Amazonas',
  'BA': 'Bahia', 'CE': 'Ceará', 'DF': 'Distrito Federal', 'ES': 'Espírito Santo',
  'GO': 'Goiás', 'MA': 'Maranhão', 'MT': 'Mato Grosso', 'MS': 'Mato Grosso do Sul',
  'MG': 'Minas Gerais', 'PA': 'Pará', 'PB': 'Paraíba', 'PR': 'Paraná',
  'PE': 'Pernambuco', 'PI': 'Piauí', 'RJ': 'Rio de Janeiro', 'RN': 'Rio Grande do Norte',
  'RS': 'Rio Grande do Sul', 'RO': 'Rondônia', 'RR': 'Roraima', 'SC': 'Santa Catarina',
  'SP': 'São Paulo', 'SE': 'Sergipe', 'TO': 'Tocantins'
}

// Simplified Brazil state geometry (for demo purposes)
const brazilStates = {
  'MT': { cx: 350, cy: 280, captures: 0 },
  'GO': { cx: 400, cy: 320, captures: 0 },
  'MS': { cx: 360, cy: 350, captures: 0 },
  'SP': { cx: 420, cy: 380, captures: 0 },
  'MG': { cx: 450, cy: 350, captures: 0 },
  'RS': { cx: 380, cy: 450, captures: 0 },
  'SC': { cx: 400, cy: 420, captures: 0 },
  'PR': { cx: 390, cy: 390, captures: 0 },
  'RJ': { cx: 480, cy: 370, captures: 0 },
  'ES': { cx: 490, cy: 340, captures: 0 },
  'BA': { cx: 470, cy: 280, captures: 0 },
  'SE': { cx: 520, cy: 250, captures: 0 },
  'AL': { cx: 530, cy: 240, captures: 0 },
  'PE': { cx: 520, cy: 220, captures: 0 },
  'PB': { cx: 540, cy: 210, captures: 0 },
  'RN': { cx: 550, cy: 200, captures: 0 },
  'CE': { cx: 510, cy: 190, captures: 0 },
  'PI': { cx: 480, cy: 200, captures: 0 },
  'MA': { cx: 450, cy: 180, captures: 0 },
  'TO': { cx: 420, cy: 230, captures: 0 },
  'PA': { cx: 380, cy: 160, captures: 0 },
  'AP': { cx: 380, cy: 120, captures: 0 },
  'RR': { cx: 320, cy: 100, captures: 0 },
  'AM': { cx: 280, cy: 160, captures: 0 },
  'AC': { cx: 240, cy: 200, captures: 0 },
  'RO': { cx: 300, cy: 220, captures: 0 },
  'DF': { cx: 415, cy: 310, captures: 0 }
}

// Calculate captures by state
const stateData = computed(() => {
  const data = {}
  
  dataStore.priceReports.forEach(report => {
    if (report.state) {
      data[report.state] = (data[report.state] || 0) + 1
    }
  })
  
  return data
})

// Computed statistics
const totalCaptures = computed(() => {
  return Object.values(stateData.value).reduce((sum, count) => sum + count, 0)
})

const activeStates = computed(() => {
  return Object.keys(stateData.value).length
})

const coveragePercentage = computed(() => {
  return Math.round((activeStates.value / 27) * 100)
})

const topState = computed(() => {
  const states = Object.entries(stateData.value)
  if (states.length === 0) return { state: '-', count: 0 }
  
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

const topStatesData = computed(() => {
  return Object.entries(stateData.value)
    .sort(([,a], [,b]) => b - a)
})

const recentCapturesCount = computed(() => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  
  return dataStore.priceReports.filter(report => {
    const reportDate = new Date(report.reportDate)
    return reportDate >= yesterday
  }).length
})

// Helper functions
const getStateName = (stateCode) => {
  return stateNames[stateCode] || stateCode
}

const getPercentage = (count) => {
  if (totalCaptures.value === 0) return 0
  return ((count / totalCaptures.value) * 100).toFixed(1)
}

const getStateColor = (count) => {
  if (count === 0) return '#f8fafc'
  if (count <= 3) return '#a7f3d0'
  if (count <= 8) return '#34d399'
  return '#059669'
}

const getRankingColor = (index) => {
  const colors = [
    'bg-gradient-to-br from-yellow-400 to-yellow-500', // Gold
    'bg-gradient-to-br from-gray-400 to-gray-500',     // Silver
    'bg-gradient-to-br from-orange-400 to-orange-500', // Bronze
    'bg-gradient-to-br from-blue-400 to-blue-500',     // 4th
    'bg-gradient-to-br from-purple-400 to-purple-500'  // 5th
  ]
  return colors[index] || 'bg-gradient-to-br from-gray-300 to-gray-400'
}

const refreshData = () => {
  // Simulate data refresh
  mapReady.value = false
  setTimeout(() => {
    mapReady.value = true
    renderMap()
  }, 1000)
}

// Render the SVG map
const renderMap = () => {
  if (!mapContainer.value) return

  // Clear existing content
  mapContainer.value.innerHTML = ''

  // Create SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', '100%')
  svg.setAttribute('height', '100%')
  svg.setAttribute('viewBox', '0 0 600 500')
  svg.style.background = 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'

  // Add states
  Object.entries(brazilStates).forEach(([stateCode, coords]) => {
    const captureCount = stateData.value[stateCode] || 0
    
    // State circle
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circle.setAttribute('cx', coords.cx)
    circle.setAttribute('cy', coords.cy)
    circle.setAttribute('r', Math.max(8, Math.min(30, 8 + captureCount * 2)))
    circle.setAttribute('fill', getStateColor(captureCount))
    circle.setAttribute('stroke', '#1f2937')
    circle.setAttribute('stroke-width', '2')
    circle.style.cursor = 'pointer'
    circle.style.transition = 'all 0.3s ease'
    
    // Add hover effects
    circle.addEventListener('mouseenter', () => {
      circle.setAttribute('stroke-width', '3')
      circle.setAttribute('stroke', '#059669')
      
      const ranking = topStatesData.value.findIndex(([state]) => state === stateCode) + 1
      
      hoveredState.value = {
        name: getStateName(stateCode),
        captures: captureCount,
        percentage: parseFloat(getPercentage(captureCount)),
        rank: ranking || 'N/A'
      }
    })
    
    circle.addEventListener('mouseleave', () => {
      circle.setAttribute('stroke-width', '2')
      circle.setAttribute('stroke', '#1f2937')
      hoveredState.value = null
    })
    
    svg.appendChild(circle)
    
    // State label
    if (captureCount > 0) {
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      text.setAttribute('x', coords.cx)
      text.setAttribute('y', coords.cy + 4)
      text.setAttribute('text-anchor', 'middle')
      text.setAttribute('fill', captureCount > 8 ? 'white' : '#1f2937')
      text.setAttribute('font-size', '12')
      text.setAttribute('font-weight', 'bold')
      text.textContent = stateCode
      text.style.pointerEvents = 'none'
      svg.appendChild(text)
    }
  })

  mapContainer.value.appendChild(svg)
}

// Initialize map
onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      mapReady.value = true
      renderMap()
    }, 500)
  })
})

// Watch for data changes
watch(() => dataStore.priceReports, () => {
  if (mapReady.value) {
    renderMap()
  }
}, { deep: true })
</script>

<style scoped>
.card {
  @apply bg-white rounded-lg shadow-sm border border-gray-200;
}

.btn-outline {
  @apply border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center;
}
</style>
