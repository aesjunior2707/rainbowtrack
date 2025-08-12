<template>
  <div class="w-full">
    <div class="card p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <MapPin class="w-5 h-5 mr-2 text-primary-600" />
        Capturas por Estado
      </h2>
      
      <div class="relative w-full">
        <!-- Legend -->
        <div class="mb-4 flex items-center gap-4 text-sm">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-primary-200"></div>
            <span class="text-gray-600">Baixo (1-5)</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded-full bg-primary-400"></div>
            <span class="text-gray-600">Médio (6-15)</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-5 h-5 rounded-full bg-primary-600"></div>
            <span class="text-gray-600">Alto (16+)</span>
          </div>
        </div>

        <!-- Brazil Map with Bubbles -->
        <div class="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden">
          <svg
            viewBox="0 0 800 600"
            class="w-full h-auto max-w-4xl"
            style="filter: drop-shadow(2px 2px 8px rgba(0,0,0,0.15))"
          >
            <!-- Brazil outline (simplified) -->
            <path 
              d="M150 100 L200 80 L280 90 L350 85 L420 95 L480 110 L520 130 L550 160 L580 200 L590 250 L585 300 L575 350 L560 400 L540 440 L510 470 L470 490 L420 500 L370 505 L320 500 L270 490 L220 475 L180 450 L150 420 L130 380 L125 340 L130 300 L140 260 L145 220 L150 180 L155 140 Z"
              fill="#f8fafc"
              stroke="#e2e8f0"
              stroke-width="2"
            />
            
            <!-- State bubbles with data -->
            <!-- Mato Grosso (MT) -->
            <circle
              :cx="360"
              :cy="280"
              :r="getBubbleSize(stateData.MT)"
              :fill="getBubbleColor(stateData.MT)"
              :opacity="0.8"
              class="cursor-pointer transition-all duration-300 hover:opacity-100 hover:scale-110"
              style="transform-origin: center; animation: pulse 2s ease-in-out infinite"
              @mouseenter="showTooltip($event, 'MT', stateData.MT)"
              @mouseleave="hideTooltip"
              @click="showStateDetails('MT', stateData.MT)"
            />
            <text x="360" y="285" text-anchor="middle" class="text-xs font-semibold fill-white">
              MT
            </text>
            
            <!-- Goiás (GO) -->
            <circle
              :cx="420"
              :cy="320"
              :r="getBubbleSize(stateData.GO)"
              :fill="getBubbleColor(stateData.GO)"
              :opacity="0.8"
              class="cursor-pointer transition-all duration-300 hover:opacity-100 hover:scale-110"
              style="transform-origin: center; animation: pulse 2s ease-in-out infinite; animation-delay: 0.2s"
              @mouseenter="showTooltip($event, 'GO', stateData.GO)"
              @mouseleave="hideTooltip"
            />
            <text x="420" y="325" text-anchor="middle" class="text-xs font-semibold fill-white">
              GO
            </text>

            <!-- Mato Grosso do Sul (MS) -->
            <circle
              :cx="340"
              :cy="380"
              :r="getBubbleSize(stateData.MS)"
              :fill="getBubbleColor(stateData.MS)"
              :opacity="0.8"
              class="cursor-pointer transition-all duration-300 hover:opacity-100 hover:scale-110"
              style="transform-origin: center; animation: pulse 2s ease-in-out infinite; animation-delay: 0.4s"
              @mouseenter="showTooltip($event, 'MS', stateData.MS)"
              @mouseleave="hideTooltip"
            />
            <text x="340" y="385" text-anchor="middle" class="text-xs font-semibold fill-white">
              MS
            </text>

            <!-- São Paulo (SP) -->
            <circle
              :cx="480"
              :cy="420"
              :r="getBubbleSize(stateData.SP)"
              :fill="getBubbleColor(stateData.SP)"
              :opacity="0.8"
              class="cursor-pointer transition-all duration-300 hover:opacity-100 hover:scale-110"
              style="transform-origin: center; animation: pulse 2s ease-in-out infinite; animation-delay: 0.6s"
              @mouseenter="showTooltip($event, 'SP', stateData.SP)"
              @mouseleave="hideTooltip"
            />
            <text x="480" y="425" text-anchor="middle" class="text-xs font-semibold fill-white">
              SP
            </text>

            <!-- Rio Grande do Sul (RS) -->
            <circle
              :cx="420"
              :cy="520"
              :r="getBubbleSize(stateData.RS)"
              :fill="getBubbleColor(stateData.RS)"
              :opacity="0.8"
              class="cursor-pointer transition-all duration-300 hover:opacity-100 hover:scale-110"
              style="transform-origin: center; animation: pulse 2s ease-in-out infinite; animation-delay: 0.8s"
              @mouseenter="showTooltip($event, 'RS', stateData.RS)"
              @mouseleave="hideTooltip"
            />
            <text x="420" y="525" text-anchor="middle" class="text-xs font-semibold fill-white">
              RS
            </text>

            <!-- Bahia (BA) -->
            <circle
              :cx="500"
              :cy="220"
              :r="getBubbleSize(stateData.BA)"
              :fill="getBubbleColor(stateData.BA)"
              :opacity="0.8"
              class="cursor-pointer transition-all duration-300 hover:opacity-100 hover:scale-110"
              style="transform-origin: center; animation: pulse 2s ease-in-out infinite; animation-delay: 1s"
              @mouseenter="showTooltip($event, 'BA', stateData.BA)"
              @mouseleave="hideTooltip"
            />
            <text x="500" y="225" text-anchor="middle" class="text-xs font-semibold fill-white">
              BA
            </text>
          </svg>

          <!-- Tooltip -->
          <div
            v-if="tooltip.show"
            ref="tooltipRef"
            class="absolute bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm z-10 pointer-events-none transform -translate-x-1/2 -translate-y-full"
            :style="{ left: tooltip.x + 'px', top: (tooltip.y - 10) + 'px' }"
          >
            <div class="font-semibold">{{ tooltip.state }}</div>
            <div>{{ tooltip.count }} capturas</div>
            <div class="text-xs text-gray-300">{{ getPercentage(tooltip.count) }}% do total</div>
            <!-- Arrow -->
            <div class="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
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

// Calculate captures by state
const stateData = computed(() => {
  const data = {
    MT: 0,
    GO: 0,
    MS: 0,
    SP: 0,
    RS: 0,
    BA: 0
  }
  
  dataStore.priceReports.forEach(report => {
    if (data.hasOwnProperty(report.state)) {
      data[report.state]++
    }
  })
  
  return data
})

// Tooltip state
const tooltip = reactive({
  show: false,
  x: 0,
  y: 0,
  state: '',
  count: 0
})

const tooltipRef = ref(null)

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
  return { state: topStateEntry?.[0] || '-', count: max }
})

const averagePerState = computed(() => {
  return totalCaptures.value / activeStates.value || 0
})

// Helper functions
const getBubbleSize = (count) => {
  if (count === 0) return 0
  if (count <= 5) return 15
  if (count <= 15) return 25
  return 35
}

const getBubbleColor = (count) => {
  if (count === 0) return '#e2e8f0'
  if (count <= 5) return '#99f6e4' // primary-200
  if (count <= 15) return '#2dd4bf' // primary-400
  return '#006E68' // primary-600
}

const getPercentage = (count) => {
  if (totalCaptures.value === 0) return 0
  return ((count / totalCaptures.value) * 100).toFixed(1)
}

const showTooltip = (event, state, count) => {
  tooltip.show = true
  tooltip.state = state
  tooltip.count = count

  // Get position relative to the SVG container
  const rect = event.target.closest('svg').getBoundingClientRect()
  const containerRect = event.target.closest('.relative').getBoundingClientRect()

  // Position tooltip above the circle
  tooltip.x = event.clientX - containerRect.left
  tooltip.y = event.clientY - containerRect.top
}

const hideTooltip = () => {
  tooltip.show = false
}
</script>

<style scoped>
.card {
  @apply bg-white rounded-lg shadow-sm border border-gray-200;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 0.9;
  }
}

/* Disable animation on smaller screens for better performance */
@media (max-width: 768px) {
  circle {
    animation: none !important;
  }
}
</style>
