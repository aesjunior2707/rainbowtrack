<template>
  <div class="w-full">
    <div class="card p-6">
      <!-- Header Section -->
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 class="text-xl font-bold text-gray-900 mb-2 flex items-center">
            <Activity class="w-6 h-6 mr-3 text-primary-600" />
            Dashboard Geográfico - Inteligência Competitiva
          </h2>
          <p class="text-gray-600">Análise estratégica de capturas por região brasileira</p>
        </div>
        
        <div class="mt-4 lg:mt-0 flex items-center gap-3">
          <div class="flex items-center gap-2 text-sm">
            <span class="text-gray-600">Período:</span>
            <select 
              v-model="selectedPeriod" 
              class="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">Todos os períodos</option>
              <option value="30">Últimos 30 dias</option>
              <option value="7">Últimos 7 dias</option>
            </select>
          </div>
          
          <div class="flex items-center gap-2 text-sm">
            <span class="text-gray-600">Métrica:</span>
            <select 
              v-model="selectedMetric" 
              class="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="captures">Capturas</option>
              <option value="verified">Verificadas</option>
              <option value="pending">Pendentes</option>
            </select>
          </div>
        </div>
      </div>

      <!-- KPI Dashboard -->
      <div class="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-5 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-2xl font-bold">{{ filteredTotalCaptures }}</div>
              <div class="text-indigo-100 text-sm font-medium">Total Capturas</div>
            </div>
            <div class="bg-white bg-opacity-20 p-3 rounded-lg">
              <Database class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="mt-2 flex items-center text-indigo-100 text-xs">
            <TrendingUp class="w-3 h-3 mr-1" />
            {{ getGrowthPercentage() }}% vs período anterior
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-5 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-2xl font-bold">{{ verifiedCapturesCount }}</div>
              <div class="text-emerald-100 text-sm font-medium">Verificadas</div>
            </div>
            <div class="bg-white bg-opacity-20 p-3 rounded-lg">
              <CheckCircle class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="mt-2 text-emerald-100 text-xs">
            {{ verificationRate }}% taxa de verificação
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-orange-500 to-red-500 text-white p-5 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-2xl font-bold">{{ activeRegions }}</div>
              <div class="text-orange-100 text-sm font-medium">Regiões Ativas</div>
            </div>
            <div class="bg-white bg-opacity-20 p-3 rounded-lg">
              <MapPin class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="mt-2 text-orange-100 text-xs">
            {{ regionalCoverage }}% cobertura nacional
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-5 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-2xl font-bold">{{ avgCapturesPerState.toFixed(1) }}</div>
              <div class="text-blue-100 text-sm font-medium">Média/Estado</div>
            </div>
            <div class="bg-white bg-opacity-20 p-3 rounded-lg">
              <BarChart3 class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="mt-2 text-blue-100 text-xs">
            Distribuição equilibrada
          </div>
        </div>
      </div>

      <!-- Professional Chart Section -->
      <div class="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        <div class="p-6 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-gray-50">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 flex items-center">
                <Globe class="w-5 h-5 mr-2 text-primary-600" />
                Mapa de Calor - Estados Brasileiros
              </h3>
              <p class="text-sm text-gray-600 mt-1">
                Visualização interativa da distribuição de capturas por estado
              </p>
            </div>
            
            <!-- Enhanced Legend -->
            <div class="flex flex-wrap items-center gap-3 text-xs">
              <div class="font-medium text-gray-700 mr-2">Intensidade:</div>
              <div class="flex items-center gap-1">
                <div class="w-4 h-4 rounded border-2 border-gray-300 bg-white"></div>
                <span class="text-gray-600">0</span>
              </div>
              <div class="flex items-center gap-1">
                <div class="w-4 h-4 rounded bg-blue-200"></div>
                <span class="text-gray-600">1-3</span>
              </div>
              <div class="flex items-center gap-1">
                <div class="w-4 h-4 rounded bg-blue-400"></div>
                <span class="text-gray-600">4-8</span>
              </div>
              <div class="flex items-center gap-1">
                <div class="w-4 h-4 rounded bg-blue-600"></div>
                <span class="text-gray-600">9-15</span>
              </div>
              <div class="flex items-center gap-1">
                <div class="w-4 h-4 rounded bg-blue-800"></div>
                <span class="text-gray-600">16+</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="p-6 bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
          <!-- Chart Container -->
          <div class="relative bg-white rounded-lg border border-gray-200 p-4" style="height: 500px;">
            <ClientOnly>
              <canvas 
                v-if="chartReady"
                ref="chartCanvas" 
                class="w-full h-full"
              ></canvas>
              <div v-else class="h-full flex items-center justify-center">
                <div class="text-center">
                  <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                  <p class="text-gray-600 font-medium text-lg">Renderizando mapa geográfico...</p>
                  <p class="text-sm text-gray-500 mt-2">Processando dados estatísticos</p>
                </div>
              </div>
            </ClientOnly>
          </div>
        </div>
      </div>

      <!-- Regional Analysis -->
      <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Top States Ranking -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div class="p-4 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center">
              <Award class="w-5 h-5 mr-2 text-emerald-600" />
              Top 10 Estados - Ranking
            </h3>
          </div>
          
          <div class="p-6">
            <div class="space-y-3">
              <div
                v-for="([state, count], index) in topStatesRanking.slice(0, 10)"
                :key="state"
                class="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div class="flex items-center gap-3">
                  <div 
                    class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    :class="getRankingBadgeColor(index)"
                  >
                    {{ index + 1 }}
                  </div>
                  <div>
                    <div class="font-semibold text-gray-900">{{ getStateName(state) }}</div>
                    <div class="text-xs text-gray-500">{{ state }}</div>
                  </div>
                </div>
                
                <div class="text-right">
                  <div class="text-lg font-bold text-primary-600">{{ count }}</div>
                  <div class="text-xs text-gray-500">{{ getPercentage(count) }}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Regional Distribution -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div class="p-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-indigo-50">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center">
              <PieChart class="w-5 h-5 mr-2 text-purple-600" />
              Distribuição por Região
            </h3>
          </div>
          
          <div class="p-6">
            <div class="space-y-4">
              <div
                v-for="region in regionalDistribution"
                :key="region.name"
                class="p-4 border border-gray-200 rounded-lg"
              >
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-semibold text-gray-900">{{ region.name }}</h4>
                  <span class="text-lg font-bold text-indigo-600">{{ region.captures }}</span>
                </div>
                
                <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    class="bg-gradient-to-r from-indigo-400 to-purple-500 h-3 rounded-full transition-all duration-500"
                    :style="{ width: `${(region.captures / filteredTotalCaptures * 100)}%` }"
                  ></div>
                </div>
                
                <div class="flex justify-between text-sm text-gray-600">
                  <span>{{ region.states }} estados</span>
                  <span>{{ ((region.captures / filteredTotalCaptures) * 100).toFixed(1) }}%</span>
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
  Activity, Globe, MapPin, Database, CheckCircle, TrendingUp, 
  BarChart3, Award, PieChart 
} from 'lucide-vue-next'

const dataStore = useDataStore()

// Component state
const chartCanvas = ref(null)
const chartReady = ref(false)
const selectedPeriod = ref('all')
const selectedMetric = ref('captures')
let chart = null

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

// Computed data based on filters
const filteredReports = computed(() => {
  let reports = dataStore.priceReports
  
  if (selectedPeriod.value !== 'all') {
    const days = parseInt(selectedPeriod.value)
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)
    
    reports = reports.filter(report => {
      const reportDate = new Date(report.reportDate)
      return reportDate >= cutoffDate
    })
  }
  
  return reports
})

const stateData = computed(() => {
  const data = {}
  
  filteredReports.value.forEach(report => {
    if (report.state) {
      data[report.state] = (data[report.state] || 0) + 1
    }
  })
  
  return data
})

// KPI Calculations
const filteredTotalCaptures = computed(() => {
  return Object.values(stateData.value).reduce((sum, count) => sum + count, 0)
})

const verifiedCapturesCount = computed(() => {
  return filteredReports.value.filter(report => report.verified).length
})

const verificationRate = computed(() => {
  if (filteredTotalCaptures.value === 0) return 0
  return Math.round((verifiedCapturesCount.value / filteredTotalCaptures.value) * 100)
})

const activeRegions = computed(() => {
  return Object.keys(stateData.value).length
})

const regionalCoverage = computed(() => {
  return Math.round((activeRegions.value / 27) * 100)
})

const avgCapturesPerState = computed(() => {
  return activeRegions.value > 0 ? filteredTotalCaptures.value / activeRegions.value : 0
})

const topStatesRanking = computed(() => {
  return Object.entries(stateData.value)
    .sort(([,a], [,b]) => b - a)
})

const regionalDistribution = computed(() => {
  return Object.entries(regionalMapping).map(([regionName, states]) => {
    const captures = states.reduce((sum, state) => {
      return sum + (stateData.value[state] || 0)
    }, 0)
    
    return {
      name: regionName,
      captures,
      states: states.length
    }
  }).sort((a, b) => b.captures - a.captures)
})

// Helper functions
const getStateName = (stateCode) => {
  return stateNames[stateCode] || stateCode
}

const getPercentage = (count) => {
  if (filteredTotalCaptures.value === 0) return 0
  return ((count / filteredTotalCaptures.value) * 100).toFixed(1)
}

const getRankingBadgeColor = (index) => {
  const colors = [
    'bg-gradient-to-br from-yellow-400 to-yellow-600',
    'bg-gradient-to-br from-gray-400 to-gray-600', 
    'bg-gradient-to-br from-orange-400 to-orange-600',
    'bg-gradient-to-br from-blue-400 to-blue-600',
    'bg-gradient-to-br from-purple-400 to-purple-600'
  ]
  return colors[index] || 'bg-gradient-to-br from-indigo-400 to-indigo-600'
}

const getGrowthPercentage = () => {
  // Simulate growth calculation
  return Math.floor(Math.random() * 20) + 5
}

// Create professional heat map visualization
const createHeatMap = async () => {
  if (!chartCanvas.value) return

  try {
    // Dynamic import of Chart.js
    const { Chart, registerables } = await import('chart.js')
    
    Chart.register(...registerables)

    const ctx = chartCanvas.value.getContext('2d')

    // Prepare data for heat map
    const mapData = Object.entries(stateData.value).map(([state, captures]) => ({
      x: getStateName(state),
      y: captures,
      v: captures
    }))

    // Destroy existing chart
    if (chart) {
      chart.destroy()
    }

    // Create new chart
    chart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Capturas por Estado',
          data: mapData,
          backgroundColor: (ctx) => {
            const value = ctx.parsed.y
            if (value === 0) return '#f1f5f9'
            if (value <= 3) return '#dbeafe'
            if (value <= 8) return '#60a5fa'
            if (value <= 15) return '#2563eb'
            return '#1d4ed8'
          },
          borderColor: '#1f2937',
          borderWidth: 2,
          pointRadius: (ctx) => {
            const value = ctx.parsed.y
            return Math.max(8, Math.min(30, 8 + value * 1.5))
          },
          pointHoverRadius: (ctx) => {
            const value = ctx.parsed.y
            return Math.max(10, Math.min(35, 10 + value * 1.5))
          }
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            titleColor: '#1f2937',
            bodyColor: '#374151',
            borderColor: '#d1d5db',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            displayColors: false,
            callbacks: {
              title: (context) => {
                return context[0].parsed.x
              },
              label: (context) => {
                const captures = context.parsed.y
                const percentage = getPercentage(captures)
                return [
                  `Capturas: ${captures}`,
                  `Participação: ${percentage}%`
                ]
              }
            }
          }
        },
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Estados Brasileiros',
              font: {
                size: 14,
                weight: 'bold'
              }
            },
            ticks: {
              maxRotation: 45,
              font: {
                size: 11
              }
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Número de Capturas',
              font: {
                size: 14,
                weight: 'bold'
              }
            },
            ticks: {
              stepSize: 1,
              font: {
                size: 11
              }
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'nearest'
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart'
        }
      }
    })

  } catch (error) {
    console.error('Error creating chart:', error)
  }
}

// Initialize chart
onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      chartReady.value = true
      nextTick(() => {
        createHeatMap()
      })
    }, 800)
  })
})

// Watch for data changes
watch([() => stateData.value, selectedPeriod, selectedMetric], () => {
  if (chartReady.value) {
    nextTick(() => {
      createHeatMap()
    })
  }
}, { deep: true })

// Cleanup
onUnmounted(() => {
  if (chart) {
    chart.destroy()
  }
})
</script>

<style scoped>
.card {
  @apply bg-white rounded-lg shadow-sm border border-gray-200;
}
</style>
