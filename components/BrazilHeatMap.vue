<template>
  <div class="w-full">
    <div class="card p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <MapPin class="w-5 h-5 mr-2 text-primary-600" />
        Análise de Densidade Competitiva por Região
      </h2>
      
      <div class="relative w-full">
        <!-- Enhanced Stats Grid -->
        <div class="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 rounded-xl shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-2xl font-bold">{{ totalCaptures }}</div>
                <div class="text-primary-100 text-sm">Volume Consolidado</div>
              </div>
              <div class="bg-white bg-opacity-20 p-3 rounded-lg">
                <FileText class="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white p-4 rounded-xl shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-2xl font-bold">{{ activeStates }}</div>
                <div class="text-secondary-100 text-sm">Regiões em Operação</div>
              </div>
              <div class="bg-white bg-opacity-20 p-3 rounded-lg">
                <MapPin class="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-2xl font-bold">{{ topState.state }}</div>
                <div class="text-blue-100 text-sm">Região de Destaque</div>
              </div>
              <div class="bg-white bg-opacity-20 p-3 rounded-lg">
                <TrendingUp class="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-2xl font-bold">{{ averagePerState.toFixed(1) }}</div>
                <div class="text-purple-100 text-sm">Indicador de Eficiência</div>
              </div>
              <div class="bg-white bg-opacity-20 p-3 rounded-lg">
                <BarChart3 class="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <!-- Professional Heat Map -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div class="p-4 border-b border-gray-100 bg-gray-50">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Mapa de Calor - Brasil</h3>
                <p class="text-sm text-gray-600">Distribuição geográfica das capturas competitivas</p>
              </div>
              
              <!-- Legend -->
              <div class="flex items-center gap-4 text-sm">
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 rounded bg-gray-200"></div>
                  <span class="text-gray-600">Sem dados</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 rounded bg-primary-200"></div>
                  <span class="text-gray-600">Baixo</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 rounded bg-primary-400"></div>
                  <span class="text-gray-600">Médio</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 rounded bg-primary-600"></div>
                  <span class="text-gray-600">Alto</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="p-6">
            <ClientOnly>
              <apexchart
                v-if="chartReady"
                type="treemap"
                height="400"
                :options="chartOptions"
                :series="chartSeries"
              />
              <div v-else class="h-96 flex items-center justify-center bg-gray-50 rounded-lg">
                <div class="text-center">
                  <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                  <p class="text-gray-500">Carregando mapa...</p>
                </div>
              </div>
            </ClientOnly>
          </div>
        </div>

        <!-- Detailed State Analysis -->
        <div class="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div class="p-4 border-b border-gray-100 bg-gray-50">
            <h3 class="text-lg font-semibold text-gray-900">Análise Detalhada por Estado</h3>
          </div>
          
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="[state, count] in topStatesData"
                :key="state"
                class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-semibold text-gray-900">{{ getStateName(state) }}</h4>
                  <span class="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                    {{ state }}
                  </span>
                </div>
                
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Capturas:</span>
                    <span class="font-semibold text-primary-600">{{ count }}</span>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Participação:</span>
                    <span class="font-semibold text-gray-900">{{ getPercentage(count) }}%</span>
                  </div>
                  
                  <!-- Progress bar -->
                  <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      class="bg-gradient-to-r from-primary-400 to-primary-600 h-2 rounded-full transition-all duration-300"
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
import { MapPin, FileText, TrendingUp, BarChart3 } from 'lucide-vue-next'

const dataStore = useDataStore()

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

// Chart state
const chartReady = ref(false)

// Calculate captures by state
const stateData = computed(() => {
  const data = {}
  
  // Count captures by state
  dataStore.priceReports.forEach(report => {
    if (report.state) {
      data[report.state] = (data[report.state] || 0) + 1
    }
  })
  
  return data
})

// Computed stats
const totalCaptures = computed(() => {
  return Object.values(stateData.value).reduce((sum, count) => sum + count, 0)
})

const activeStates = computed(() => {
  return Object.keys(stateData.value).length
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
    .slice(0, 6)
})

// Helper functions
const getStateName = (stateCode) => {
  return stateNames[stateCode] || stateCode
}

const getPercentage = (count) => {
  if (totalCaptures.value === 0) return 0
  return ((count / totalCaptures.value) * 100).toFixed(1)
}

const getIntensityColor = (count) => {
  const max = Math.max(...Object.values(stateData.value))
  if (max === 0) return '#f8fafc'
  
  const intensity = count / max
  if (intensity <= 0.25) return '#e2e8f0'
  if (intensity <= 0.5) return '#99f6e4'
  if (intensity <= 0.75) return '#2dd4bf'
  return '#006E68'
}

// ApexCharts configuration
const chartOptions = computed(() => ({
  chart: {
    type: 'treemap',
    height: 400,
    fontFamily: 'Inter, ui-sans-serif, system-ui',
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false
      }
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
    }
  },
  title: {
    text: '',
    align: 'left',
    style: {
      fontSize: '16px',
      fontWeight: 600,
      color: '#1f2937'
    }
  },
  plotOptions: {
    treemap: {
      enableShades: true,
      shadeIntensity: 0.5,
      reverseNegativeShade: true,
      useFillColorAsStroke: false,
      borderRadius: 4,
      dataLabels: {
        format: 'scale'
      },
      distributed: false,
      colorScale: {
        ranges: [
          {
            from: 0,
            to: 0,
            color: '#f1f5f9',
            name: 'Sem dados'
          },
          {
            from: 1,
            to: 3,
            color: '#ccfbf1',
            name: 'Baixo (1-3)'
          },
          {
            from: 4,
            to: 8,
            color: '#5eead4',
            name: 'Médio (4-8)'
          },
          {
            from: 9,
            to: 999,
            color: '#006E68',
            name: 'Alto (9+)'
          }
        ]
      }
    }
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '14px',
      fontWeight: 600,
      colors: ['#1f2937']
    },
    formatter: function(text, op) {
      return [text, `${op.value} capturas`]
    }
  },
  colors: ['#006E68', '#14b8a6', '#2dd4bf', '#5eead4', '#99f6e4', '#ccfbf1'],
  legend: {
    show: false
  },
  tooltip: {
    enabled: true,
    style: {
      fontSize: '12px',
      fontFamily: 'Inter, ui-sans-serif, system-ui'
    },
    custom: function({series, seriesIndex, dataPointIndex, w}) {
      const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex]
      const percentage = getPercentage(data.y)
      
      return `
        <div class="bg-white p-3 rounded-lg shadow-lg border">
          <div class="font-semibold text-gray-900 mb-1">${data.x}</div>
          <div class="text-primary-600 font-semibold">${data.y} capturas</div>
          <div class="text-sm text-gray-500">${percentage}% do total</div>
        </div>
      `
    }
  },
  responsive: [{
    breakpoint: 768,
    options: {
      dataLabels: {
        style: {
          fontSize: '12px'
        }
      }
    }
  }]
}))

const chartSeries = computed(() => {
  const data = Object.entries(stateData.value).map(([state, count]) => ({
    x: getStateName(state),
    y: count
  }))
  
  return [{
    data: data
  }]
})

// Initialize chart
onMounted(() => {
  nextTick(() => {
    chartReady.value = true
  })
})
</script>

<style scoped>
.card {
  @apply bg-white rounded-lg shadow-sm border border-gray-200;
}
</style>
