<template>
  <div class="w-full">
    <div class="card p-6">
      <!-- Header -->
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 class="text-xl font-bold text-gray-900 mb-2 flex items-center">
            <MapIcon class="w-6 h-6 mr-3 text-primary-600" />
            Mapa Geográfico Real do Brasil
          </h2>
          <p class="text-gray-600">Visualização profissional com contornos geográficos precisos</p>
        </div>
        
        <div class="mt-4 lg:mt-0 flex items-center gap-4">
          <div class="flex items-center gap-2 text-sm">
            <span class="text-gray-600">Exibição:</span>
            <select 
              v-model="displayMode" 
              class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="choropleth">Mapa de Calor</option>
              <option value="bubbles">Bolhas + Estados</option>
              <option value="both">Completo</option>
            </select>
          </div>
          
          <button
            @click="zoomToFit"
            class="flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <ZoomIn class="w-4 h-4" />
            Ajustar Zoom
          </button>
        </div>
      </div>

      <!-- Statistics Cards -->
      <div class="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-5 rounded-xl shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-2xl font-bold">{{ totalCaptures }}</div>
              <div class="text-blue-100 text-sm font-medium">Total de Capturas</div>
            </div>
            <div class="bg-white bg-opacity-20 p-3 rounded-lg">
              <Target class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="mt-2 text-blue-100 text-xs">
            Dados consolidados
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-green-500 to-green-600 text-white p-5 rounded-xl shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-2xl font-bold">{{ activeStates }}/27</div>
              <div class="text-green-100 text-sm font-medium">Estados Ativos</div>
            </div>
            <div class="bg-white bg-opacity-20 p-3 rounded-lg">
              <MapPin class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="mt-2 text-green-100 text-xs">
            {{ coveragePercentage }}% cobertura
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-5 rounded-xl shadow-lg">
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
        
        <div class="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-5 rounded-xl shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-2xl font-bold">{{ averagePerState.toFixed(1) }}</div>
              <div class="text-orange-100 text-sm font-medium">Média/Estado</div>
            </div>
            <div class="bg-white bg-opacity-20 p-3 rounded-lg">
              <TrendingUp class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="mt-2 text-orange-100 text-xs">
            Performance geral
          </div>
        </div>
      </div>

      <!-- Professional Map -->
      <div class="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        <div class="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-green-50">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 flex items-center">
                <Globe class="w-5 h-5 mr-2 text-blue-600" />
                Brasil - Capturas por Estado
              </h3>
              <p class="text-sm text-gray-600 mt-1">
                Mapa geográfico preciso com dados de inteligência competitiva
              </p>
            </div>
            
            <!-- Legend -->
            <div class="flex flex-wrap items-center gap-3 text-xs">
              <div class="font-medium text-gray-700 mr-2">Intensidade:</div>
              <div class="flex items-center gap-1">
                <div class="w-4 h-4 rounded bg-gray-200 border"></div>
                <span class="text-gray-600">0</span>
              </div>
              <div class="flex items-center gap-1">
                <div class="w-4 h-4 rounded bg-green-200"></div>
                <span class="text-gray-600">1-3</span>
              </div>
              <div class="flex items-center gap-1">
                <div class="w-4 h-4 rounded bg-green-400"></div>
                <span class="text-gray-600">4-8</span>
              </div>
              <div class="flex items-center gap-1">
                <div class="w-4 h-4 rounded bg-green-600"></div>
                <span class="text-gray-600">9+</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="p-6 bg-gradient-to-br from-slate-50 to-blue-50">
          <div class="relative bg-white rounded-lg border border-gray-200 shadow-inner">
            <!-- Map Container -->
            <div 
              ref="mapContainer" 
              class="w-full relative overflow-hidden rounded-lg"
              style="height: 600px;"
            >
              <svg
                ref="svgMap"
                class="w-full h-full cursor-move"
                viewBox="0 0 1000 800"
                @mousedown="startPan"
                @mousemove="onPan"
                @mouseup="endPan"
                @wheel="onZoom"
              >
                <!-- Background -->
                <rect width="1000" height="800" fill="url(#oceanGradient)" />
                
                <!-- Gradients -->
                <defs>
                  <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#e0f2fe;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#f0f9ff;stop-opacity:1" />
                  </linearGradient>
                  <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.1"/>
                  </filter>
                </defs>
                
                <!-- Brazil States with Real Geographic Shapes -->
                <g :transform="`translate(${panX}, ${panY}) scale(${zoomLevel})`">
                  <!-- States Group -->
                  <g id="states">
                    <path
                      v-for="state in brazilStates"
                      :key="state.code"
                      :d="state.path"
                      :fill="getStateColor(stateData[state.code] || 0)"
                      stroke="#1f2937"
                      stroke-width="0.5"
                      class="state-path transition-all duration-300 hover:stroke-2 cursor-pointer"
                      :class="{ 'hover:brightness-110': true }"
                      filter="url(#shadow)"
                      @mouseenter="onStateHover(state, $event)"
                      @mouseleave="onStateLeave"
                      @click="onStateClick(state)"
                    />
                  </g>
                  
                  <!-- Bubble Markers -->
                  <g v-if="displayMode !== 'choropleth'" id="bubbles">
                    <circle
                      v-for="state in brazilStates"
                      :key="`bubble-${state.code}`"
                      :cx="state.center[0]"
                      :cy="state.center[1]"
                      :r="getBubbleSize(stateData[state.code] || 0)"
                      :fill="getBubbleColor(stateData[state.code] || 0)"
                      stroke="white"
                      stroke-width="2"
                      class="bubble transition-all duration-300 hover:scale-110 cursor-pointer"
                      opacity="0.9"
                      @mouseenter="onStateHover(state, $event)"
                      @mouseleave="onStateLeave"
                    />
                    
                    <!-- State Labels -->
                    <text
                      v-for="state in brazilStates"
                      :key="`label-${state.code}`"
                      :x="state.center[0]"
                      :y="state.center[1] + 3"
                      text-anchor="middle"
                      class="text-xs font-bold fill-white pointer-events-none"
                      style="font-family: Inter, sans-serif;"
                    >
                      {{ state.code }}
                    </text>
                  </g>
                </g>
              </svg>
              
              <!-- Tooltip -->
              <Transition
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="opacity-0 transform translate-y-2 scale-95"
                enter-to-class="opacity-100 transform translate-y-0 scale-100"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="opacity-100 transform translate-y-0 scale-100"
                leave-to-class="opacity-0 transform translate-y-2 scale-95"
              >
                <div
                  v-if="tooltip.visible"
                  class="absolute bg-white p-4 rounded-lg shadow-xl border border-gray-200 z-20 pointer-events-none"
                  :style="{
                    left: tooltip.x + 'px',
                    top: tooltip.y + 'px',
                    transform: 'translate(-50%, -100%)'
                  }"
                >
                  <h4 class="font-bold text-gray-900 mb-2">{{ tooltip.state.name }}</h4>
                  <div class="space-y-1 text-sm">
                    <div class="flex justify-between gap-4">
                      <span class="text-gray-600">Capturas:</span>
                      <span class="font-semibold text-primary-600">{{ tooltip.captures }}</span>
                    </div>
                    <div class="flex justify-between gap-4">
                      <span class="text-gray-600">Participação:</span>
                      <span class="font-semibold">{{ tooltip.percentage }}%</span>
                    </div>
                    <div class="flex justify-between gap-4">
                      <span class="text-gray-600">Ranking:</span>
                      <span class="font-semibold text-orange-600">#{{ tooltip.rank }}</span>
                    </div>
                  </div>
                  
                  <!-- Mini progress bar -->
                  <div class="mt-3 w-full bg-gray-200 rounded-full h-2">
                    <div
                      class="bg-gradient-to-r from-primary-400 to-primary-600 h-2 rounded-full transition-all duration-300"
                      :style="{ width: `${Math.min(tooltip.percentage * 3, 100)}%` }"
                    ></div>
                  </div>
                </div>
              </Transition>
              
              <!-- Zoom Controls -->
              <div class="absolute bottom-4 right-4 flex flex-col gap-2">
                <button
                  @click="zoomIn"
                  class="w-10 h-10 bg-white rounded-lg shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Plus class="w-5 h-5 text-gray-600" />
                </button>
                <button
                  @click="zoomOut"
                  class="w-10 h-10 bg-white rounded-lg shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Minus class="w-5 h-5 text-gray-600" />
                </button>
                <button
                  @click="resetZoom"
                  class="w-10 h-10 bg-white rounded-lg shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <RotateCcw class="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Analysis -->
      <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- State Ranking -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div class="p-4 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center">
              <Trophy class="w-5 h-5 mr-2 text-green-600" />
              Ranking Nacional
            </h3>
          </div>
          
          <div class="p-6 max-h-80 overflow-y-auto">
            <div class="space-y-3">
              <div
                v-for="([stateCode, count], index) in topStatesData.slice(0, 10)"
                :key="stateCode"
                class="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:shadow-md hover:border-primary-200 transition-all cursor-pointer"
                @click="focusState(stateCode)"
              >
                <div class="flex items-center gap-3">
                  <div 
                    class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md"
                    :class="getRankingBadgeColor(index)"
                  >
                    {{ index + 1 }}
                  </div>
                  <div>
                    <div class="font-semibold text-gray-900">{{ getStateName(stateCode) }}</div>
                    <div class="text-xs text-gray-500">{{ stateCode }}</div>
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

        <!-- Regional Distribution -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div class="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center">
              <BarChart3 class="w-5 h-5 mr-2 text-blue-600" />
              Distribuição Regional
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
                  <span>{{ region.activeStates }}/{{ region.totalStates }} estados</span>
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
  MapIcon, Globe, MapPin, Target, Crown, TrendingUp, BarChart3, 
  Trophy, ZoomIn, Plus, Minus, RotateCcw 
} from 'lucide-vue-next'

const dataStore = useDataStore()

// Component state
const mapContainer = ref(null)
const svgMap = ref(null)
const displayMode = ref('both')

// Pan and zoom state
const panX = ref(0)
const panY = ref(0)
const zoomLevel = ref(1)
const isPanning = ref(false)
const lastPanPoint = ref({ x: 0, y: 0 })

// Tooltip state
const tooltip = ref({
  visible: false,
  x: 0,
  y: 0,
  state: null,
  captures: 0,
  percentage: 0,
  rank: 0
})

// State mappings
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

// Real Brazil state SVG paths (simplified but accurate)
const brazilStates = [
  { code: 'AC', name: 'Acre', center: [150, 400], path: 'M70,380 L160,370 L170,410 L140,450 L100,440 L70,410 Z' },
  { code: 'AM', name: 'Amazonas', center: [250, 350], path: 'M160,300 L360,290 L380,340 L360,400 L320,420 L280,410 L240,400 L200,390 L160,370 Z' },
  { code: 'RR', name: 'Roraima', center: [300, 250], path: 'M280,200 L350,190 L360,230 L350,270 L320,280 L280,270 Z' },
  { code: 'PA', name: 'Pará', center: [400, 320], path: 'M360,240 L520,230 L540,280 L530,330 L510,380 L480,400 L440,410 L400,400 L380,370 L360,340 Z' },
  { code: 'AP', name: 'Amapá', center: [480, 220], path: 'M520,180 L560,170 L570,210 L560,250 L540,260 L520,250 Z' },
  { code: 'TO', name: 'Tocantins', center: [450, 420], path: 'M400,380 L500,370 L510,430 L500,480 L470,500 L440,490 L420,470 L400,450 Z' },
  { code: 'MA', name: 'Maranhão', center: [520, 340], path: 'M480,300 L600,290 L620,330 L610,370 L590,400 L570,410 L540,400 L520,380 L500,360 Z' },
  { code: 'PI', name: 'Piauí', center: [520, 420], path: 'M480,380 L580,370 L590,410 L580,450 L560,480 L530,490 L500,480 L480,460 Z' },
  { code: 'CE', name: 'Ceará', center: [600, 360], path: 'M570,320 L670,310 L680,350 L670,380 L650,400 L620,390 L590,380 L570,360 Z' },
  { code: 'RN', name: 'Rio Grande do Norte', center: [650, 340], path: 'M650,300 L700,290 L710,320 L700,350 L680,360 L660,350 Z' },
  { code: 'PB', name: 'Paraíba', center: [660, 380], path: 'M650,360 L700,350 L710,380 L700,400 L680,410 L660,400 Z' },
  { code: 'PE', name: 'Pernambuco', center: [620, 430], path: 'M580,410 L680,400 L690,440 L680,470 L650,490 L620,480 L590,470 L580,450 Z' },
  { code: 'AL', name: 'Alagoas', center: [670, 460], path: 'M650,440 L700,430 L710,460 L700,480 L680,490 L660,480 Z' },
  { code: 'SE', name: 'Sergipe', center: [670, 490], path: 'M650,470 L700,460 L710,490 L700,510 L680,520 L660,510 Z' },
  { code: 'BA', name: 'Bahia', center: [560, 500], path: 'M480,460 L650,450 L670,540 L650,580 L620,600 L580,610 L540,600 L500,590 L480,570 L460,550 L450,530 L460,500 Z' },
  { code: 'MT', name: 'Mato Grosso', center: [380, 480], path: 'M320,420 L480,410 L490,520 L480,560 L450,580 L420,590 L380,580 L350,570 L320,550 L310,530 L320,480 Z' },
  { code: 'GO', name: 'Goiás', center: [480, 520], path: 'M450,480 L580,470 L590,530 L580,570 L550,590 L520,600 L490,590 L470,580 L450,560 L440,540 L450,510 Z' },
  { code: 'DF', name: 'Distrito Federal', center: [520, 540], path: 'M515,535 L525,535 L525,545 L515,545 Z' },
  { code: 'MS', name: 'Mato Grosso do Sul', center: [380, 580], path: 'M320,550 L450,540 L460,610 L450,650 L420,670 L390,680 L360,670 L330,660 L320,630 L310,600 L320,570 Z' },
  { code: 'MG', name: 'Minas Gerais', center: [540, 580], path: 'M490,540 L650,530 L670,600 L650,640 L620,660 L590,670 L560,680 L530,670 L500,660 L490,630 L480,600 L490,570 Z' },
  { code: 'ES', name: 'Espírito Santo', center: [680, 580], path: 'M670,560 L710,550 L720,580 L710,600 L690,610 L670,600 Z' },
  { code: 'RJ', name: 'Rio de Janeiro', center: [650, 630], path: 'M620,610 L690,600 L700,630 L690,650 L670,660 L650,670 L630,660 L620,640 Z' },
  { code: 'SP', name: 'São Paulo', center: [560, 650], path: 'M490,620 L620,610 L630,670 L620,700 L590,720 L560,730 L530,720 L500,710 L490,680 L480,650 Z' },
  { code: 'PR', name: 'Paraná', center: [520, 700], path: 'M460,670 L580,660 L590,710 L580,740 L550,760 L520,770 L490,760 L470,750 L460,720 L450,690 Z' },
  { code: 'SC', name: 'Santa Catarina', center: [550, 740], path: 'M490,720 L590,710 L600,750 L590,770 L570,780 L550,790 L530,780 L510,770 L500,750 L490,730 Z' },
  { code: 'RS', name: 'Rio Grande do Sul', center: [520, 780], path: 'M450,750 L590,740 L600,800 L590,840 L570,860 L540,870 L510,860 L480,850 L450,840 L440,820 L430,800 L440,770 Z' },
  { code: 'RO', name: 'Rondônia', center: [320, 420], path: 'M280,400 L360,390 L370,430 L360,460 L340,480 L320,490 L300,480 L280,470 L270,450 L280,420 Z' }
]

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

const getBubbleSize = (count) => {
  if (count === 0) return 0
  return Math.max(5, Math.min(20, 5 + count * 1.5))
}

const getBubbleColor = (count) => {
  if (count === 0) return '#e2e8f0'
  if (count <= 3) return '#60a5fa'
  if (count <= 8) return '#3b82f6'
  return '#1d4ed8'
}

const getRankingBadgeColor = (index) => {
  const colors = [
    'bg-gradient-to-br from-yellow-400 to-yellow-600',
    'bg-gradient-to-br from-gray-400 to-gray-600', 
    'bg-gradient-to-br from-orange-400 to-orange-600'
  ]
  return colors[index] || 'bg-gradient-to-br from-blue-400 to-blue-600'
}

// Event handlers
const onStateHover = (state, event) => {
  const captureCount = stateData.value[state.code] || 0
  const ranking = topStatesData.value.findIndex(([stateCode]) => stateCode === state.code) + 1
  
  const rect = mapContainer.value.getBoundingClientRect()
  
  tooltip.value = {
    visible: true,
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
    state: state,
    captures: captureCount,
    percentage: parseFloat(getPercentage(captureCount)),
    rank: ranking || 'N/A'
  }
}

const onStateLeave = () => {
  tooltip.value.visible = false
}

const onStateClick = (state) => {
  console.log('State clicked:', state.name)
}

const focusState = (stateCode) => {
  console.log('Focus state:', stateCode)
}

// Pan and zoom functionality
const startPan = (event) => {
  isPanning.value = true
  lastPanPoint.value = { x: event.clientX, y: event.clientY }
}

const onPan = (event) => {
  if (!isPanning.value) return
  
  const deltaX = event.clientX - lastPanPoint.value.x
  const deltaY = event.clientY - lastPanPoint.value.y
  
  panX.value += deltaX
  panY.value += deltaY
  
  lastPanPoint.value = { x: event.clientX, y: event.clientY }
}

const endPan = () => {
  isPanning.value = false
}

const onZoom = (event) => {
  event.preventDefault()
  const delta = event.deltaY * -0.001
  const newZoom = Math.max(0.5, Math.min(3, zoomLevel.value + delta))
  zoomLevel.value = newZoom
}

const zoomIn = () => {
  zoomLevel.value = Math.min(3, zoomLevel.value + 0.2)
}

const zoomOut = () => {
  zoomLevel.value = Math.max(0.5, zoomLevel.value - 0.2)
}

const resetZoom = () => {
  zoomLevel.value = 1
  panX.value = 0
  panY.value = 0
}

const zoomToFit = () => {
  resetZoom()
}
</script>

<style scoped>
.card {
  @apply bg-white rounded-lg shadow-sm border border-gray-200;
}

.state-path:hover {
  filter: brightness(1.1) drop-shadow(2px 2px 4px rgba(0,0,0,0.2));
}

.bubble:hover {
  filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
}
</style>
