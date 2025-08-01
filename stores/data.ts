import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => ({
    customers: [],

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
        description: 'Fungicida sistêmico para controle preventivo'
      },
      {
        id: 2,
        name: 'ProtectFung 500',
        category: 'fungicides',
        brand: 'CropGuard',
        packaging: '500ml',
        registeredCrops: ['Caf��', 'Algodão', 'Cana'],
        description: 'Fungicida de contato para aplicação foliar'
      },
      {
        id: 3,
        name: 'BioFung Elite',
        category: 'fungicides',
        brand: 'BioAgro',
        packaging: '2L',
        registeredCrops: ['Soja', 'Feijão', 'Milho'],
        description: 'Fungicida biológico de amplo espectro'
      },

      // Insecticides
      {
        id: 4,
        name: 'InsecKill Max',
        category: 'insecticides',
        brand: 'AgroTech',
        packaging: '1L',
        registeredCrops: ['Soja', 'Milho', 'Algodão'],
        description: 'Inseticida sistêmico para controle de pragas'
      },
      {
        id: 5,
        name: 'BugStop 300',
        category: 'insecticides',
        brand: 'CropGuard',
        packaging: '300ml',
        registeredCrops: ['Café', 'Citros', 'Tomate'],
        description: 'Inseticida de contato para jardins e cultivos'
      },
      {
        id: 6,
        name: 'ThripsEnd Pro',
        category: 'insecticides',
        brand: 'BioAgro',
        packaging: '1.5L',
        registeredCrops: ['Soja', 'Milho', 'Feijão'],
        description: 'Inseticida especializado para controle de trips'
      },

      // Herbicides
      {
        id: 7,
        name: 'WeedOut Ultra',
        category: 'herbicides',
        brand: 'AgroTech',
        packaging: '1L',
        registeredCrops: ['Soja', 'Milho', 'Cana'],
        description: 'Herbicida pós-emergente seletivo'
      },
      {
        id: 8,
        name: 'GrassKiller 400',
        category: 'herbicides',
        brand: 'CropGuard',
        packaging: '400ml',
        registeredCrops: ['Café', 'Citros', 'Eucalipto'],
        description: 'Herbicida para controle de gramíneas'
      },
      {
        id: 9,
        name: 'TotalHerb Plus',
        category: 'herbicides',
        brand: 'BioAgro',
        packaging: '2L',
        registeredCrops: ['Soja', 'Milho', 'Algodão'],
        description: 'Herbicida total para pré-plantio'
      }
    ],

    priceReports: [
      {
        id: 1,
        productId: 1,
        customerId: 1,
        competitorId: 1,
        competitorPrice: 142.50,
        currencyId: 1,
        reportDate: '2024-01-15',
        reportedBy: 1, // user ID
        notes: 'Cliente mencionou que está considerando trocar de fornecedor',
        verified: false,
        region: 'REG001',
        state: 'SP',
        paymentCondition: 'BOLETO_60',
        paymentMethod: 'BOLETO'
      },
      {
        id: 2,
        productId: 4,
        competitorId: 2,
        competitorPrice: 135.00,
        reportDate: '2024-01-12',
        reportedBy: 1,
        notes: 'Preço promocional válido até fim do mês',
        verified: true,
        region: 'REG001',
        state: 'GO',
        paymentCondition: 'A_VISTA',
        paymentMethod: 'PIX'
      },
      {
        id: 3,
        productId: 7,
        competitorId: 3,
        competitorPrice: 98.75,
        reportDate: '2024-01-10',
        reportedBy: 2,
        notes: 'Concorrente oferecendo desconto por volume',
        verified: true,
        region: 'REG002',
        state: 'MG',
        paymentCondition: 'POS_COLHEITA',
        paymentMethod: 'TRANSFERENCIA'
      },
      {
        id: 4,
        productId: 2,
        competitorId: 4,
        competitorPrice: 89.90,
        reportDate: '2024-01-08',
        reportedBy: 1,
        notes: 'Preço competitivo, cliente satisfeito com qualidade',
        verified: false,
        region: 'REG001',
        state: 'PR',
        paymentCondition: 'BOLETO_90',
        paymentMethod: 'BOLETO'
      },
      {
        id: 5,
        productId: 5,
        competitorId: 1,
        competitorPrice: 78.50,
        reportDate: '2024-01-05',
        reportedBy: 2,
        notes: 'Produto similar, embalagem diferente',
        verified: true,
        region: 'REG002',
        state: 'RS',
        paymentCondition: 'BARTER',
        paymentMethod: 'DOCUMENTO'
      }
    ]
  }),

  actions: {

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
          reportCount: reports.length
        }
      }).sort((a, b) => b.reportCount - a.reportCount)

      return competitorReports
    },

    verifyPriceReport(reportId: number, verifiedBy: number) {
      const report = this.priceReports.find(r => r.id === reportId)
      if (report) {
        report.verified = true
        report.verifiedBy = verifiedBy
        report.verifiedAt = new Date().toISOString()
      }
      return report
    },

    updatePriceReport(reportId: number, updatedData: any) {
      const reportIndex = this.priceReports.findIndex(r => r.id === reportId)
      if (reportIndex !== -1) {
        this.priceReports[reportIndex] = { ...this.priceReports[reportIndex], ...updatedData }
        return this.priceReports[reportIndex]
      }
      return null
    },

    updateCompetitor(competitorId: number, updatedData: any) {
      const competitorIndex = this.competitors.findIndex(c => c.id === competitorId)
      if (competitorIndex !== -1) {
        this.competitors[competitorIndex] = { ...this.competitors[competitorIndex], ...updatedData }
        return this.competitors[competitorIndex]
      }
      return null
    },

    deleteCompetitor(competitorId: number) {
      const competitorIndex = this.competitors.findIndex(c => c.id === competitorId)
      if (competitorIndex !== -1) {
        // Check if competitor has reports
        const hasReports = this.priceReports.some(r => r.competitorId === competitorId)
        if (hasReports) {
          throw new Error('Não é possível excluir um concorrente que possui capturas associadas.')
        }

        this.competitors.splice(competitorIndex, 1)
        return true
      }
      return false
    }
  },

  getters: {
    getCompetitorsByUserRegion() {
      return (userRegion: string, isAdmin: boolean) => {
        if (isAdmin) {
          return this.competitors
        }
        return this.competitors.filter(competitor => competitor.region === userRegion)
      }
    }
  }
})
