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

        <!-- Brazil Map with State Boundaries and Bubbles -->
        <div class="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-4 min-h-[500px] flex items-center justify-center overflow-hidden">
          <svg 
            viewBox="0 0 1000 800" 
            class="w-full h-auto max-w-5xl"
            style="filter: drop-shadow(2px 2px 8px rgba(0,0,0,0.1))"
          >
            <!-- Brazil State Boundaries -->
            <g fill="#f8fafc" stroke="#cbd5e1" stroke-width="1">
              <!-- Acre (AC) -->
              <path d="M120 420 L180 415 L185 450 L175 480 L140 485 L115 460 Z" />
              <!-- Alagoas (AL) -->
              <path d="M640 320 L665 315 L670 340 L655 355 L635 350 Z" />
              <!-- Amapá (AP) -->
              <path d="M420 120 L450 115 L455 145 L440 160 L415 155 Z" />
              <!-- Amazonas (AM) -->
              <path d="M80 200 L250 190 L280 250 L250 320 L180 340 L120 310 L85 260 Z" />
              <!-- Bahia (BA) -->
              <path d="M520 280 L620 275 L640 350 L620 420 L560 430 L500 410 L485 360 L505 320 Z" />
              <!-- Ceará (CE) -->
              <path d="M580 200 L650 195 L665 235 L640 260 L570 255 L555 225 Z" />
              <!-- Distrito Federal (DF) -->
              <circle cx="520" cy="360" r="8" />
              <!-- Espírito Santo (ES) -->
              <path d="M640 420 L670 415 L675 450 L655 465 L635 460 Z" />
              <!-- Goiás (GO) -->
              <path d="M450 320 L550 315 L565 380 L540 420 L480 425 L435 385 Z" />
              <!-- Maranhão (MA) -->
              <path d="M480 200 L580 195 L590 250 L550 275 L470 270 L455 225 Z" />
              <!-- Mato Grosso (MT) -->
              <path d="M340 280 L450 275 L465 340 L440 380 L380 385 L320 360 L305 320 Z" />
              <!-- Mato Grosso do Sul (MS) -->
              <path d="M380 380 L450 375 L465 440 L440 480 L390 485 L360 450 L345 415 Z" />
              <!-- Minas Gerais (MG) -->
              <path d="M520 360 L620 355 L640 420 L620 480 L560 485 L500 465 L485 425 L505 390 Z" />
              <!-- Pará (PA) -->
              <path d="M280 160 L450 155 L470 220 L440 270 L380 275 L320 250 L265 225 Z" />
              <!-- Paraíba (PB) -->
              <path d="M640 200 L680 195 L685 225 L665 240 L635 235 Z" />
              <!-- Paraná (PR) -->
              <path d="M480 480 L560 475 L575 520 L550 555 L500 560 L455 535 L440 500 Z" />
              <!-- Pernambuco (PE) -->
              <path d="M580 220 L680 215 L695 260 L670 285 L570 280 L555 245 Z" />
              <!-- Piauí (PI) -->
              <path d="M480 220 L580 215 L590 270 L560 295 L470 290 L455 255 Z" />
              <!-- Rio de Janeiro (RJ) -->
              <path d="M620 450 L670 445 L685 480 L665 495 L615 490 L600 465 Z" />
              <!-- Rio Grande do Norte (RN) -->
              <path d="M650 180 L690 175 L695 205 L675 220 L645 215 Z" />
              <!-- Rio Grande do Sul (RS) -->
              <path d="M440 540 L520 535 L535 580 L510 615 L460 620 L415 595 L400 560 Z" />
              <!-- Rondônia (RO) -->
              <path d="M220 320 L280 315 L295 360 L270 395 L220 400 L195 365 Z" />
              <!-- Roraima (RR) -->
              <path d="M280 80 L350 75 L365 120 L340 155 L270 160 L255 115 Z" />
              <!-- Santa Catarina (SC) -->
              <path d="M500 520 L580 515 L595 555 L570 570 L520 575 L475 550 Z" />
              <!-- São Paulo (SP) -->
              <path d="M540 420 L620 415 L640 470 L615 505 L565 510 L515 485 L500 450 Z" />
              <!-- Sergipe (SE) -->
              <path d="M620 290 L650 285 L655 315 L640 330 L615 325 Z" />
              <!-- Tocantins (TO) -->
              <path d="M440 240 L520 235 L535 300 L510 335 L450 340 L425 305 L410 270 Z" />
            </g>

            <!-- State Bubbles -->
            <!-- Acre -->
            <circle v-if="stateData.AC > 0" cx="150" cy="440" :r="getBubbleSize(stateData.AC)" :fill="getBubbleColor(stateData.AC)" opacity="0.8" class="state-bubble" @click="showStateDetails('AC', stateData.AC)" />
            <text x="150" y="445" text-anchor="middle" class="state-label" pointer-events="none">AC</text>
            
            <!-- Alagoas -->
            <circle v-if="stateData.AL > 0" cx="652" cy="335" :r="getBubbleSize(stateData.AL)" :fill="getBubbleColor(stateData.AL)" opacity="0.8" class="state-bubble" @click="showStateDetails('AL', stateData.AL)" />
            <text x="652" y="340" text-anchor="middle" class="state-label" pointer-events="none">AL</text>
            
            <!-- Amapá -->
            <circle v-if="stateData.AP > 0" cx="437" cy="135" :r="getBubbleSize(stateData.AP)" :fill="getBubbleColor(stateData.AP)" opacity="0.8" class="state-bubble" @click="showStateDetails('AP', stateData.AP)" />
            <text x="437" y="140" text-anchor="middle" class="state-label" pointer-events="none">AP</text>
            
            <!-- Amazonas -->
            <circle v-if="stateData.AM > 0" cx="180" cy="255" :r="getBubbleSize(stateData.AM)" :fill="getBubbleColor(stateData.AM)" opacity="0.8" class="state-bubble" @click="showStateDetails('AM', stateData.AM)" />
            <text x="180" y="260" text-anchor="middle" class="state-label" pointer-events="none">AM</text>
            
            <!-- Bahia -->
            <circle v-if="stateData.BA > 0" cx="570" cy="350" :r="getBubbleSize(stateData.BA)" :fill="getBubbleColor(stateData.BA)" opacity="0.8" class="state-bubble" @click="showStateDetails('BA', stateData.BA)" />
            <text x="570" y="355" text-anchor="middle" class="state-label" pointer-events="none">BA</text>
            
            <!-- Ceará -->
            <circle v-if="stateData.CE > 0" cx="615" cy="225" :r="getBubbleSize(stateData.CE)" :fill="getBubbleColor(stateData.CE)" opacity="0.8" class="state-bubble" @click="showStateDetails('CE', stateData.CE)" />
            <text x="615" y="230" text-anchor="middle" class="state-label" pointer-events="none">CE</text>
            
            <!-- Espírito Santo -->
            <circle v-if="stateData.ES > 0" cx="657" cy="440" :r="getBubbleSize(stateData.ES)" :fill="getBubbleColor(stateData.ES)" opacity="0.8" class="state-bubble" @click="showStateDetails('ES', stateData.ES)" />
            <text x="657" y="445" text-anchor="middle" class="state-label" pointer-events="none">ES</text>
            
            <!-- Goiás -->
            <circle v-if="stateData.GO > 0" cx="500" cy="370" :r="getBubbleSize(stateData.GO)" :fill="getBubbleColor(stateData.GO)" opacity="0.8" class="state-bubble" @click="showStateDetails('GO', stateData.GO)" />
            <text x="500" y="375" text-anchor="middle" class="state-label" pointer-events="none">GO</text>
            
            <!-- Maranhão -->
            <circle v-if="stateData.MA > 0" cx="530" cy="235" :r="getBubbleSize(stateData.MA)" :fill="getBubbleColor(stateData.MA)" opacity="0.8" class="state-bubble" @click="showStateDetails('MA', stateData.MA)" />
            <text x="530" y="240" text-anchor="middle" class="state-label" pointer-events="none">MA</text>
            
            <!-- Mato Grosso -->
            <circle v-if="stateData.MT > 0" cx="395" cy="330" :r="getBubbleSize(stateData.MT)" :fill="getBubbleColor(stateData.MT)" opacity="0.8" class="state-bubble" @click="showStateDetails('MT', stateData.MT)" />
            <text x="395" y="335" text-anchor="middle" class="state-label" pointer-events="none">MT</text>
            
            <!-- Mato Grosso do Sul -->
            <circle v-if="stateData.MS > 0" cx="415" cy="430" :r="getBubbleSize(stateData.MS)" :fill="getBubbleColor(stateData.MS)" opacity="0.8" class="state-bubble" @click="showStateDetails('MS', stateData.MS)" />
            <text x="415" y="435" text-anchor="middle" class="state-label" pointer-events="none">MS</text>
            
            <!-- Minas Gerais -->
            <circle v-if="stateData.MG > 0" cx="570" cy="420" :r="getBubbleSize(stateData.MG)" :fill="getBubbleColor(stateData.MG)" opacity="0.8" class="state-bubble" @click="showStateDetails('MG', stateData.MG)" />
            <text x="570" y="425" text-anchor="middle" class="state-label" pointer-events="none">MG</text>
            
            <!-- Pará -->
            <circle v-if="stateData.PA > 0" cx="375" cy="215" :r="getBubbleSize(stateData.PA)" :fill="getBubbleColor(stateData.PA)" opacity="0.8" class="state-bubble" @click="showStateDetails('PA', stateData.PA)" />
            <text x="375" y="220" text-anchor="middle" class="state-label" pointer-events="none">PA</text>
            
            <!-- Paraíba -->
            <circle v-if="stateData.PB > 0" cx="662" cy="215" :r="getBubbleSize(stateData.PB)" :fill="getBubbleColor(stateData.PB)" opacity="0.8" class="state-bubble" @click="showStateDetails('PB', stateData.PB)" />
            <text x="662" y="220" text-anchor="middle" class="state-label" pointer-events="none">PB</text>
            
            <!-- Paraná -->
            <circle v-if="stateData.PR > 0" cx="520" cy="515" :r="getBubbleSize(stateData.PR)" :fill="getBubbleColor(stateData.PR)" opacity="0.8" class="state-bubble" @click="showStateDetails('PR', stateData.PR)" />
            <text x="520" y="520" text-anchor="middle" class="state-label" pointer-events="none">PR</text>
            
            <!-- Pernambuco -->
            <circle v-if="stateData.PE > 0" cx="630" cy="250" :r="getBubbleSize(stateData.PE)" :fill="getBubbleColor(stateData.PE)" opacity="0.8" class="state-bubble" @click="showStateDetails('PE', stateData.PE)" />
            <text x="630" y="255" text-anchor="middle" class="state-label" pointer-events="none">PE</text>
            
            <!-- Piauí -->
            <circle v-if="stateData.PI > 0" cx="520" cy="255" :r="getBubbleSize(stateData.PI)" :fill="getBubbleColor(stateData.PI)" opacity="0.8" class="state-bubble" @click="showStateDetails('PI', stateData.PI)" />
            <text x="520" y="260" text-anchor="middle" class="state-label" pointer-events="none">PI</text>
            
            <!-- Rio de Janeiro -->
            <circle v-if="stateData.RJ > 0" cx="650" cy="470" :r="getBubbleSize(stateData.RJ)" :fill="getBubbleColor(stateData.RJ)" opacity="0.8" class="state-bubble" @click="showStateDetails('RJ', stateData.RJ)" />
            <text x="650" y="475" text-anchor="middle" class="state-label" pointer-events="none">RJ</text>
            
            <!-- Rio Grande do Norte -->
            <circle v-if="stateData.RN > 0" cx="672" cy="195" :r="getBubbleSize(stateData.RN)" :fill="getBubbleColor(stateData.RN)" opacity="0.8" class="state-bubble" @click="showStateDetails('RN', stateData.RN)" />
            <text x="672" y="200" text-anchor="middle" class="state-label" pointer-events="none">RN</text>
            
            <!-- Rio Grande do Sul -->
            <circle v-if="stateData.RS > 0" cx="477" cy="580" :r="getBubbleSize(stateData.RS)" :fill="getBubbleColor(stateData.RS)" opacity="0.8" class="state-bubble" @click="showStateDetails('RS', stateData.RS)" />
            <text x="477" y="585" text-anchor="middle" class="state-label" pointer-events="none">RS</text>
            
            <!-- Rondônia -->
            <circle v-if="stateData.RO > 0" cx="250" cy="355" :r="getBubbleSize(stateData.RO)" :fill="getBubbleColor(stateData.RO)" opacity="0.8" class="state-bubble" @click="showStateDetails('RO', stateData.RO)" />
            <text x="250" y="360" text-anchor="middle" class="state-label" pointer-events="none">RO</text>
            
            <!-- Roraima -->
            <circle v-if="stateData.RR > 0" cx="315" cy="115" :r="getBubbleSize(stateData.RR)" :fill="getBubbleColor(stateData.RR)" opacity="0.8" class="state-bubble" @click="showStateDetails('RR', stateData.RR)" />
            <text x="315" y="120" text-anchor="middle" class="state-label" pointer-events="none">RR</text>
            
            <!-- Santa Catarina -->
            <circle v-if="stateData.SC > 0" cx="540" cy="545" :r="getBubbleSize(stateData.SC)" :fill="getBubbleColor(stateData.SC)" opacity="0.8" class="state-bubble" @click="showStateDetails('SC', stateData.SC)" />
            <text x="540" y="550" text-anchor="middle" class="state-label" pointer-events="none">SC</text>
            
            <!-- São Paulo -->
            <circle v-if="stateData.SP > 0" cx="580" cy="460" :r="getBubbleSize(stateData.SP)" :fill="getBubbleColor(stateData.SP)" opacity="0.8" class="state-bubble" @click="showStateDetails('SP', stateData.SP)" />
            <text x="580" y="465" text-anchor="middle" class="state-label" pointer-events="none">SP</text>
            
            <!-- Sergipe -->
            <circle v-if="stateData.SE > 0" cx="637" cy="307" :r="getBubbleSize(stateData.SE)" :fill="getBubbleColor(stateData.SE)" opacity="0.8" class="state-bubble" @click="showStateDetails('SE', stateData.SE)" />
            <text x="637" y="312" text-anchor="middle" class="state-label" pointer-events="none">SE</text>
            
            <!-- Tocantins -->
            <circle v-if="stateData.TO > 0" cx="470" cy="290" :r="getBubbleSize(stateData.TO)" :fill="getBubbleColor(stateData.TO)" opacity="0.8" class="state-bubble" @click="showStateDetails('TO', stateData.TO)" />
            <text x="470" y="295" text-anchor="middle" class="state-label" pointer-events="none">TO</text>
          </svg>

          <!-- Tooltip -->
          <div 
            v-if="tooltip.show"
            ref="tooltipRef"
            class="absolute bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm z-10 pointer-events-none transform -translate-x-1/2 -translate-y-full"
            :style="{ left: tooltip.x + 'px', top: (tooltip.y - 10) + 'px' }"
          >
            <div class="font-semibold">{{ getStateName(tooltip.state) }}</div>
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
  if (count <= 3) return 12
  if (count <= 8) return 18
  return 25
}

const getBubbleColor = (count) => {
  if (count === 0) return '#e2e8f0'
  if (count <= 3) return '#99f6e4' // primary-200
  if (count <= 8) return '#2dd4bf' // primary-400
  return '#006E68' // primary-600
}

const getPercentage = (count) => {
  if (totalCaptures.value === 0) return 0
  return ((count / totalCaptures.value) * 100).toFixed(1)
}

const getStateName = (stateCode) => {
  return stateNames[stateCode] || stateCode
}

const showTooltip = (event, state, count) => {
  tooltip.show = true
  tooltip.state = state
  tooltip.count = count
  
  // Get position relative to the container
  const containerRect = event.target.closest('.relative').getBoundingClientRect()
  tooltip.x = event.clientX - containerRect.left
  tooltip.y = event.clientY - containerRect.top
}

const hideTooltip = () => {
  tooltip.show = false
}

const showStateDetails = (state, count) => {
  const stateName = getStateName(state)
  if (count > 0) {
    alert(`${stateName} (${state})\nCapturas: ${count}\nPercentual: ${getPercentage(count)}% do total`)
  } else {
    alert(`${stateName} (${state})\nNenhuma captura registrada ainda.`)
  }
}

// Watch for data changes to make it reactive
watch(() => dataStore.priceReports, () => {
  // Force reactivity update
  nextTick()
}, { deep: true })
</script>

<style scoped>
.card {
  @apply bg-white rounded-lg shadow-sm border border-gray-200;
}

.state-bubble {
  cursor: pointer;
  transition: all 0.3s ease;
}

.state-bubble:hover {
  opacity: 1 !important;
  transform: scale(1.2);
}

.state-label {
  font-size: 10px;
  font-weight: bold;
  fill: #374151;
  pointer-events: none;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .state-label {
    font-size: 8px;
  }
}
</style>
