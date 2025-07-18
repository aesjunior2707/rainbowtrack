import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => ({
    customers: [
      {
        id: 1,
        name: 'João Silva',
        email: 'joao.silva@fazenda.com',
        phone: '(11) 98765-4321',
        company: 'Fazenda São José',
        address: 'Rua das Plantas, 123 - Ribeirão Preto, SP',
        region: 'São Paulo'
      },
      {
        id: 2,
        name: 'Maria Santos',
        email: 'maria.santos@agricultura.com',
        phone: '(21) 99876-5432',
        company: 'Agricultura Santos Ltda',
        address: 'Av. do Campo, 456 - Goiânia, GO',
        region: 'Goiás'
      },
      {
        id: 3,
        name: 'Pedro Oliveira',
        email: 'pedro.oliveira@plantio.com',
        phone: '(31) 91234-5678',
        company: 'Plantio Oliveira',
        address: 'Estrada Rural, 789 - Uberlândia, MG',
        region: 'Minas Gerais'
      },
      {
        id: 4,
        name: 'Ana Costa',
        email: 'ana.costa@agronegocio.com',
        phone: '(41) 92345-6789',
        company: 'Agronegócio Costa',
        address: 'Fazenda Boa Vista, s/n - Cascavel, PR',
        region: 'Paraná'
      },
      {
        id: 5,
        name: 'Carlos Ferreira',
        email: 'carlos.ferreira@rural.com',
        phone: '(51) 93456-7890',
        company: 'Rural Ferreira',
        address: 'Sítio Esperança, 321 - Passo Fundo, RS',
        region: 'Rio Grande do Sul'
      }
    ],

    competitors: [
      {
        id: 1,
        name: 'AgroRival',
        type: 'Distribuidor',
        region: 'Nacional',
        contact: 'contato@agrorival.com',
        phone: '(11) 3333-4444',
        marketShare: 25,
        active: true
      },
      {
        id: 2,
        name: 'CropCompetitor',
        type: 'Fabricante',
        region: 'Sul/Sudeste',
        contact: 'vendas@cropcompetitor.com',
        phone: '(21) 5555-6666',
        marketShare: 18,
        active: true
      },
      {
        id: 3,
        name: 'FarmSolutions',
        type: 'Distribuidor',
        region: 'Centro-Oeste',
        contact: 'info@farmsolutions.com',
        phone: '(62) 7777-8888',
        marketShare: 15,
        active: true
      },
      {
        id: 4,
        name: 'AgriTech Pro',
        type: 'Fabricante',
        region: 'Nacional',
        contact: 'comercial@agritechpro.com',
        phone: '(11) 9999-0000',
        marketShare: 12,
        active: true
      }
    ],

    currencies: [
      {
        id: 1,
        code: 'BRL',
        name: 'Real Brasileiro',
        symbol: 'R$',
        active: true
      },
      {
        id: 2,
        code: 'USD',
        name: 'Dólar Americano',
        symbol: '$',
        active: true
      },
      {
        id: 3,
        code: 'EUR',
        name: 'Euro',
        symbol: '€',
        active: true
      },
      {
        id: 4,
        code: 'ARS',
        name: 'Peso Argentino',
        symbol: '$',
        active: true
      }
    ],

    products: [
      // Fungicides
      {
        id: 1,
        name: 'FungMax Pro',
        category: 'fungicides',
        brand: 'AgroTech',
        packaging: '1L',
        registeredCrops: ['Soja', 'Milho', 'Trigo'],
        description: 'Fungicida sistêmico para controle preventivo',
        ourPrice: 125.50
      },
      {
        id: 2,
        name: 'ProtectFung 500',
        category: 'fungicides',
        brand: 'CropGuard',
        packaging: '500ml',
        registeredCrops: ['Café', 'Algodão', 'Cana'],
        description: 'Fungicida de contato para aplicação foliar',
        ourPrice: 89.90
      },
      {
        id: 3,
        name: 'BioFung Elite',
        category: 'fungicides',
        brand: 'BioAgro',
        packaging: '2L',
        registeredCrops: ['Soja', 'Feijão', 'Milho'],
        description: 'Fungicida biológico de amplo espectro',
        ourPrice: 156.00
      },

      // Insecticides
      {
        id: 4,
        name: 'InsecKill Max',
        category: 'insecticides',
        brand: 'AgroTech',
        packaging: '1L',
        registeredCrops: ['Soja', 'Milho', 'Algodão'],
        description: 'Inseticida sistêmico para controle de pragas',
        ourPrice: 98.75
      },
      {
        id: 5,
        name: 'BugStop 300',
        category: 'insecticides',
        brand: 'CropGuard',
        packaging: '300ml',
        registeredCrops: ['Café', 'Citros', 'Tomate'],
        description: 'Inseticida de contato para jardins e cultivos',
        ourPrice: 67.50
      },
      {
        id: 6,
        name: 'ThripsEnd Pro',
        category: 'insecticides',
        brand: 'BioAgro',
        packaging: '1.5L',
        registeredCrops: ['Soja', 'Milho', 'Feijão'],
        description: 'Inseticida especializado para controle de trips',
        ourPrice: 134.20
      },

      // Herbicides
      {
        id: 7,
        name: 'WeedOut Ultra',
        category: 'herbicides',
        brand: 'AgroTech',
        packaging: '1L',
        registeredCrops: ['Soja', 'Milho', 'Cana'],
        description: 'Herbicida pós-emergente seletivo',
        ourPrice: 78.90
      },
      {
        id: 8,
        name: 'GrassKiller 400',
        category: 'herbicides',
        brand: 'CropGuard',
        packaging: '400ml',
        registeredCrops: ['Café', 'Citros', 'Eucalipto'],
        description: 'Herbicida para controle de gramíneas',
        ourPrice: 56.30
      },
      {
        id: 9,
        name: 'TotalHerb Plus',
        category: 'herbicides',
        brand: 'BioAgro',
        packaging: '2L',
        registeredCrops: ['Soja', 'Milho', 'Algodão'],
        description: 'Herbicida total para pré-plantio',
        ourPrice: 112.45
      }
    ],

    priceReports: [
      {
        id: 1,
        productId: 1,
        customerId: 1,
        competitorId: 1,
        competitorPrice: 118.00,
        currencyId: 1,
        reportDate: '2024-01-15',
        reportedBy: 1, // user ID
        notes: 'Cliente mencionou que está considerando trocar de fornecedor',
        verified: false,
        region: 'São Paulo'
      },
      {
        id: 2,
        productId: 4,
        customerId: 2,
        competitorId: 2,
        competitorPrice: 105.50,
        currencyId: 1,
        reportDate: '2024-01-12',
        reportedBy: 1,
        notes: 'Preço promocional válido até fim do mês',
        verified: true,
        region: 'Goiás'
      },
      {
        id: 3,
        productId: 7,
        customerId: 3,
        competitorId: 3,
        competitorPrice: 72.90,
        currencyId: 1,
        reportDate: '2024-01-10',
        reportedBy: 2,
        notes: 'Concorrente oferecendo desconto por volume',
        verified: true,
        region: 'Minas Gerais'
      },
      {
        id: 4,
        productId: 2,
        customerId: 4,
        competitorId: 4,
        competitorPrice: 85.00,
        currencyId: 1,
        reportDate: '2024-01-08',
        reportedBy: 1,
        notes: 'Preço competitivo, cliente satisfeito com qualidade',
        verified: false,
        region: 'Paraná'
      },
      {
        id: 5,
        productId: 5,
        customerId: 5,
        competitorId: 1,
        competitorPrice: 64.90,
        currencyId: 1,
        reportDate: '2024-01-05',
        reportedBy: 2,
        notes: 'Produto similar, embalagem diferente',
        verified: true,
        region: 'Rio Grande do Sul'
      }
    ]
  }),

  actions: {
    addCustomer(customer: any) {
      const newCustomer = {
        ...customer,
        id: Math.max(...this.customers.map(c => c.id)) + 1
      }
      this.customers.push(newCustomer)
      return newCustomer
    },

    addCompetitor(competitor: any) {
      const newCompetitor = {
        ...competitor,
        id: Math.max(...this.competitors.map(c => c.id)) + 1,
        active: true
      }
      this.competitors.push(newCompetitor)
      return newCompetitor
    },

    addPriceReport(report: any) {
      const newReport = {
        ...report,
        id: Math.max(...this.priceReports.map(r => r.id)) + 1,
        verified: false
      }
      this.priceReports.push(newReport)
      return newReport
    },

    getCustomerById(id: number) {
      return this.customers.find(c => c.id === id)
    },

    getCompetitorById(id: number) {
      return this.competitors.find(c => c.id === id)
    },

    getCurrencyById(id: number) {
      return this.currencies.find(c => c.id === id)
    },

    getProductById(id: number) {
      return this.products.find(p => p.id === id)
    },

    getProductsByCategory(category: string) {
      return this.products.filter(p => p.category === category)
    },

    getPriceReportsByProduct(productId: number) {
      return this.priceReports.filter(r => r.productId === productId)
    },

    getPriceReportsByCompetitor(competitorId: number) {
      return this.priceReports.filter(r => r.competitorId === competitorId)
    },

    getPriceReportsByRegion(region: string) {
      return this.priceReports.filter(r => r.region === region)
    },

    getRecentPriceReports(limit: number = 10) {
      return this.priceReports
        .sort((a, b) => new Date(b.reportDate).getTime() - new Date(a.reportDate).getTime())
        .slice(0, limit)
    },

    getCompetitorRanking() {
      const competitorReports = this.competitors.map(competitor => {
        const reports = this.getPriceReportsByCompetitor(competitor.id)
        return {
          ...competitor,
          reportCount: reports.length,
          avgPrice: reports.length > 0 ? 
            reports.reduce((sum, r) => sum + r.competitorPrice, 0) / reports.length : 0
        }
      }).sort((a, b) => b.reportCount - a.reportCount)
      
      return competitorReports
    },

    getPriceComparison() {
      return this.products.map(product => {
        const reports = this.getPriceReportsByProduct(product.id)
        const avgCompetitorPrice = reports.length > 0 ? 
          reports.reduce((sum, r) => sum + r.competitorPrice, 0) / reports.length : 0
        
        return {
          ...product,
          avgCompetitorPrice,
          priceDifference: product.ourPrice - avgCompetitorPrice,
          reportCount: reports.length
        }
      })
    }
  }
})