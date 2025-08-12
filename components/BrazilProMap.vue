<template>
  <div class="w-full">
    <div class="card p-6">
      <!-- Enhanced Header -->
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 class="text-xl font-bold text-gray-900 mb-2 flex items-center">
            <MapIcon class="w-6 h-6 mr-3 text-primary-600" />
            Mapa Geográfico do Brasil - Capturas Competitivas
          </h2>
          <p class="text-gray-600">Visualização geográfica profissional com dados em tempo real</p>
        </div>
        
        <div class="mt-4 lg:mt-0 flex items-center gap-4">
          <div class="flex items-center gap-2 text-sm">
            <Layers class="w-4 h-4 text-gray-500" />
            <span class="text-gray-600">Camadas:</span>
            <label class="flex items-center gap-1">
              <input 
                type="checkbox" 
                v-model="showHeatMap" 
                class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              >
              <span class="text-xs">Calor</span>
            </label>
            <label class="flex items-center gap-1">
              <input 
                type="checkbox" 
                v-model="showBubbles" 
                class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              >
              <span class="text-xs">Bolhas</span>
            </label>
          </div>
          
          <button
            @click="refreshMap"
            class="flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <RefreshCw class="w-4 h-4" />
            Atualizar
          </button>
        </div>
      </div>

      <!-- Statistics Cards -->
      <div class="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-5 rounded-xl shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-2xl font-bold">{{ totalCaptures }}</div>
              <div class="text-cyan-100 text-sm font-medium">Total de Capturas</div>
            </div>
            <div class="bg-white bg-opacity-20 p-3 rounded-lg">
              <Target class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="mt-2 text-cyan-100 text-xs">
            Cobertura nacional ativa
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-emerald-500 to-green-600 text-white p-5 rounded-xl shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-2xl font-bold">{{ activeStates }}</div>
              <div class="text-emerald-100 text-sm font-medium">Estados com Dados</div>
            </div>
            <div class="bg-white bg-opacity-20 p-3 rounded-lg">
              <MapPin class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="mt-2 text-emerald-100 text-xs">
            {{ coveragePercentage }}% do território
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-5 rounded-xl shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-2xl font-bold">{{ topState.state }}</div>
              <div class="text-purple-100 text-sm font-medium">Estado Líder</div>
            </div>
            <div class="bg-white bg-opacity-20 p-3 rounded-lg">
              <Award class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="mt-2 text-purple-100 text-xs">
            {{ topState.count }} capturas registradas
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-orange-500 to-red-500 text-white p-5 rounded-xl shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-2xl font-bold">{{ averagePerState.toFixed(1) }}</div>
              <div class="text-orange-100 text-sm font-medium">Média por Estado</div>
            </div>
            <div class="bg-white bg-opacity-20 p-3 rounded-lg">
              <TrendingUp class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="mt-2 text-orange-100 text-xs">
            Indicador de performance
          </div>
        </div>
      </div>

      <!-- Professional Geographic Map -->
      <div class="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        <div class="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 flex items-center">
                <Globe class="w-5 h-5 mr-2 text-blue-600" />
                Mapa Geográfico Interativo do Brasil
              </h3>
              <p class="text-sm text-gray-600 mt-1">
                Representação precisa das divisões estaduais com dados de capturas
              </p>
            </div>
            
            <!-- Map Legend -->
            <div class="flex flex-wrap items-center gap-3 text-xs">
              <div class="font-medium text-gray-700 mr-2">Intensidade:</div>
              <div class="flex items-center gap-1">
                <div class="w-4 h-4 rounded border-2 border-gray-300 bg-gray-100"></div>
                <span class="text-gray-600">Sem dados</span>
              </div>
              <div class="flex items-center gap-1">
                <div class="w-4 h-4 rounded bg-green-200"></div>
                <span class="text-gray-600">Baixa (1-3)</span>
              </div>
              <div class="flex items-center gap-1">
                <div class="w-4 h-4 rounded bg-green-400"></div>
                <span class="text-gray-600">Média (4-8)</span>
              </div>
              <div class="flex items-center gap-1">
                <div class="w-4 h-4 rounded bg-green-600"></div>
                <span class="text-gray-600">Alta (9+)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="p-6 bg-gradient-to-br from-slate-50 to-blue-50">
          <!-- SVG Map Container -->
          <div class="relative bg-white rounded-lg border border-gray-200 shadow-inner overflow-hidden">
            <div 
              ref="mapContainer" 
              class="w-full"
              style="height: 500px;"
            >
              <!-- Loading State -->
              <div v-if="!mapReady" class="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                <div class="text-center">
                  <div class="relative">
                    <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                    <div class="absolute inset-0 flex items-center justify-center">
                      <Globe class="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <p class="text-gray-700 font-medium text-lg">Carregando Mapa do Brasil</p>
                  <p class="text-sm text-gray-500 mt-2">Processando dados geográficos dos estados</p>
                </div>
              </div>
              
              <!-- Actual Map -->
              <svg
                v-show="mapReady"
                ref="svgMap"
                class="w-full h-full"
                viewBox="0 0 900 700"
                style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0fdf4 100%)"
              >
                <!-- Brazil States Paths will be rendered here -->
              </svg>
            </div>
            
            <!-- Interactive Info Panel -->
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 transform translate-y-4 scale-95"
              enter-to-class="opacity-100 transform translate-y-0 scale-100"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 transform translate-y-0 scale-100"
              leave-to-class="opacity-0 transform translate-y-4 scale-95"
            >
              <div
                v-if="hoveredState"
                class="absolute top-6 right-6 bg-white p-5 rounded-xl shadow-2xl border border-gray-200 min-w-[220px] z-20"
              >
                <div class="flex items-center gap-2 mb-3">
                  <div 
                    class="w-4 h-4 rounded"
                    :style="{ backgroundColor: getStateColor(hoveredState.captures) }"
                  ></div>
                  <h4 class="font-bold text-gray-900 text-lg">{{ hoveredState.name }}</h4>
                </div>
                
                <div class="space-y-2">
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Capturas:</span>
                    <span class="font-bold text-primary-600 text-lg">{{ hoveredState.captures }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Participação:</span>
                    <span class="font-semibold text-gray-900">{{ hoveredState.percentage }}%</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Ranking Nacional:</span>
                    <span class="font-semibold text-orange-600">#{{ hoveredState.rank }}</span>
                  </div>
                </div>
                
                <!-- Enhanced progress bar -->
                <div class="mt-4 w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    class="h-3 rounded-full transition-all duration-500 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600"
                    :style="{ width: `${Math.min(hoveredState.percentage * 3, 100)}%` }"
                  ></div>
                </div>
                
                <div class="mt-3 text-xs text-gray-500 text-center">
                  Clique para mais detalhes
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <!-- Bottom Analytics Section -->
      <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- State Performance Ranking -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div class="p-4 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-green-50">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center">
              <Trophy class="w-5 h-5 mr-2 text-emerald-600" />
              Ranking de Performance
            </h3>
          </div>
          
          <div class="p-6 max-h-80 overflow-y-auto">
            <div class="space-y-3">
              <div
                v-for="([state, count], index) in topStatesData.slice(0, 8)"
                :key="state"
                class="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:shadow-md hover:border-primary-200 transition-all cursor-pointer"
                @click="highlightState(state)"
              >
                <div class="flex items-center gap-3">
                  <div 
                    class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md"
                    :class="getRankingColor(index)"
                  >
                    {{ index + 1 }}
                  </div>
                  <div>
                    <div class="font-semibold text-gray-900">{{ getStateName(state) }}</div>
                    <div class="text-xs text-gray-500">{{ state }}</div>
                  </div>
                </div>
                
                <div class="text-right">
                  <div class="text-xl font-bold text-primary-600">{{ count }}</div>
                  <div class="text-xs text-gray-500">{{ getPercentage(count) }}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Regional Analysis -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div class="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center">
              <BarChart3 class="w-5 h-5 mr-2 text-blue-600" />
              Análise Regional
            </h3>
          </div>
          
          <div class="p-6">
            <div class="space-y-4">
              <div
                v-for="region in regionalAnalysis"
                :key="region.name"
                class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-semibold text-gray-900">{{ region.name }}</h4>
                  <div class="text-right">
                    <div class="text-lg font-bold text-indigo-600">{{ region.captures }}</div>
                    <div class="text-xs text-gray-500">capturas</div>
                  </div>
                </div>
                
                <div class="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
                  <div
                    class="h-3 rounded-full transition-all duration-700 bg-gradient-to-r from-indigo-400 to-purple-500"
                    :style="{ width: `${(region.captures / totalCaptures * 100)}%` }"
                  ></div>
                </div>
                
                <div class="flex justify-between text-sm text-gray-600">
                  <span>{{ region.activeStates }}/{{ region.totalStates }} estados ativos</span>
                  <span>{{ ((region.captures / totalCaptures) * 100).toFixed(1) }}%</span>
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
import { 
  MapIcon, Globe, MapPin, Target, Award, TrendingUp, BarChart3, 
  Trophy, RefreshCw, Layers 
} from 'lucide-vue-next'

const dataStore = useDataStore()

// Component state
const mapContainer = ref(null)
const svgMap = ref(null)
const mapReady = ref(false)
const hoveredState = ref(null)
const showHeatMap = ref(true)
const showBubbles = ref(true)

// State mappings and coordinates
const stateNames = {
  'AC': 'Acre', 'AL': 'Alagoas', 'AP': 'Amapá', 'AM': 'Amazonas',
  'BA': 'Bahia', 'CE': 'Ceará', 'DF': 'Distrito Federal', 'ES': 'Espírito Santo',
  'GO': 'Goiás', 'MA': 'Maranhão', 'MT': 'Mato Grosso', 'MS': 'Mato Grosso do Sul',
  'MG': 'Minas Gerais', 'PA': 'Pará', 'PB': 'Paraíba', 'PR': 'Paraná',
  'PE': 'Pernambuco', 'PI': 'Piauí', 'RJ': 'Rio de Janeiro', 'RN': 'Rio Grande do Norte',
  'RS': 'Rio Grande do Sul', 'RO': 'Rondônia', 'RR': 'Roraima', 'SC': 'Santa Catarina',
  'SP': 'São Paulo', 'SE': 'Sergipe', 'TO': 'Tocantins'
}

const regionalMapping = {
  'Norte': ['AC', 'AM', 'AP', 'PA', 'RO', 'RR', 'TO'],
  'Nordeste': ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'],
  'Centro-Oeste': ['DF', 'GO', 'MT', 'MS'],
  'Sudeste': ['ES', 'MG', 'RJ', 'SP'],
  'Sul': ['PR', 'RS', 'SC']
}

// Simplified Brazil state paths for SVG
const brazilStatePaths = {
  'AC': 'M100,350 L180,340 L190,380 L160,420 L120,410 Z',
  'AM': 'M180,280 L280,270 L300,320 L280,380 L180,340 Z',
  'RR': 'M280,200 L350,190 L360,240 L330,280 L280,270 Z',
  'PA': 'M350,240 L480,230 L500,300 L480,360 L350,340 Z',
  'AP': 'M480,200 L520,190 L530,230 L500,240 Z',
  'TO': 'M400,360 L480,350 L490,420 L450,450 L400,440 Z',
  'MA': 'M480,300 L580,290 L590,340 L570,380 L480,360 Z',
  'PI': 'M480,380 L570,370 L580,420 L550,460 L480,450 Z',
  'CE': 'M570,340 L650,330 L660,370 L640,390 L570,380 Z',
  'RN': 'M640,320 L680,310 L690,340 L670,360 L640,350 Z',
  'PB': 'M640,360 L680,350 L690,380 L670,400 L640,390 Z',
  'PE': 'M580,420 L650,410 L670,450 L640,480 L580,470 Z',
  'AL': 'M640,450 L680,440 L690,480 L670,500 L640,490 Z',
  'SE': 'M640,480 L680,470 L690,500 L670,520 L640,510 Z',
  'BA': 'M480,450 L640,440 L650,540 L600,580 L480,570 Z',
  'MT': 'M350,380 L480,370 L490,500 L450,540 L350,530 Z',
  'GO': 'M450,440 L550,430 L560,500 L520,540 L450,530 Z',
  'DF': 'M520,480 L540,470 L550,490 L530,500 Z',
  'MS': 'M350,530 L450,520 L460,590 L420,630 L350,620 Z',
  'MG': 'M520,500 L650,490 L660,560 L620,600 L520,590 Z',
  'ES': 'M650,520 L690,510 L700,550 L680,570 L650,560 Z',
  'RJ': 'M620,560 L680,550 L690,590 L660,610 L620,600 Z',
  'SP': 'M520,590 L620,580 L630,640 L580,670 L520,660 Z',
  'PR': 'M520,640 L580,630 L590,680 L550,710 L520,700 Z',
  'SC': 'M550,680 L590,670 L600,710 L570,730 L550,720 Z',
  'RS': 'M520,700 L570,690 L580,750 L540,780 L520,770 Z',
  'RO': 'M280,380 L350,370 L360,420 L330,460 L280,450 Z'
}

// Calculate state data
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
  return Object.entries(stateData.value).sort(([,a], [,b]) => b - a)
})

const regionalAnalysis = computed(() => {
  return Object.entries(regionalMapping).map(([regionName, states]) => {
    const captures = states.reduce((sum, state) => sum + (stateData.value[state] || 0), 0)
    const activeStates = states.filter(state => stateData.value[state] > 0).length
    
    return {
      name: regionName,
      captures,
      activeStates,
      totalStates: states.length
    }
  }).sort((a, b) => b.captures - a.captures)
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
  if (count === 0) return '#f1f5f9'
  if (count <= 3) return '#bbf7d0'
  if (count <= 8) return '#4ade80'
  return '#16a34a'
}

const getRankingColor = (index) => {
  const colors = [
    'bg-gradient-to-br from-yellow-400 to-yellow-600',
    'bg-gradient-to-br from-gray-400 to-gray-600', 
    'bg-gradient-to-br from-orange-400 to-orange-600'
  ]
  return colors[index] || 'bg-gradient-to-br from-blue-400 to-blue-600'
}

const highlightState = (stateCode) => {
  // Add state highlighting logic here
  console.log('Highlighting state:', stateCode)
}

const refreshMap = () => {
  mapReady.value = false
  setTimeout(() => {
    mapReady.value = true
    nextTick(() => renderMap())
  }, 1000)
}

// Render the map
const renderMap = () => {
  if (!svgMap.value) return

  // Clear existing content
  svgMap.value.innerHTML = ''

  // Create groups for different layers
  const statesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
  statesGroup.setAttribute('id', 'states')
  
  const bubblesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
  bubblesGroup.setAttribute('id', 'bubbles')

  // Render state paths
  Object.entries(brazilStatePaths).forEach(([stateCode, pathData]) => {
    const captureCount = stateData.value[stateCode] || 0
    
    // Create state path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('d', pathData)
    path.setAttribute('fill', getStateColor(captureCount))
    path.setAttribute('stroke', '#1f2937')
    path.setAttribute('stroke-width', '1')
    path.style.cursor = 'pointer'
    path.style.transition = 'all 0.3s ease'
    
    // Add interactivity
    path.addEventListener('mouseenter', () => {
      path.setAttribute('stroke-width', '2')
      path.setAttribute('stroke', '#059669')
      
      const ranking = topStatesData.value.findIndex(([state]) => state === stateCode) + 1
      
      hoveredState.value = {
        name: getStateName(stateCode),
        captures: captureCount,
        percentage: parseFloat(getPercentage(captureCount)),
        rank: ranking || 'N/A'
      }
    })
    
    path.addEventListener('mouseleave', () => {
      path.setAttribute('stroke-width', '1')
      path.setAttribute('stroke', '#1f2937')
      hoveredState.value = null
    })
    
    statesGroup.appendChild(path)
  })

  svgMap.value.appendChild(statesGroup)
  if (showBubbles.value) {
    svgMap.value.appendChild(bubblesGroup)
  }
}

// Initialize map
onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      mapReady.value = true
      nextTick(() => renderMap())
    }, 1000)
  })
})

// Watch for data changes
watch([() => stateData.value, showHeatMap, showBubbles], () => {
  if (mapReady.value) {
    nextTick(() => renderMap())
  }
}, { deep: true })
</script>

<style scoped>
.card {
  @apply bg-white rounded-lg shadow-sm border border-gray-200;
}
</style>
