import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => ({
    customers: [
      {
        id: 1,
        name: 'João Silva Agropecuária',
        document: '123.456.789-10',
        type: 'Pessoa Física',
        region: 'Centro-Oeste',
        city: 'Sorriso',
        state: 'MT',
        phone: '(65) 99999-1111',
        email: 'joao@agropecuaria.com',
        active: true
      },
      {
        id: 2,
        name: 'Fazenda Santa Clara Ltda',
        document: '12.345.678/0001-90',
        type: 'Pessoa Jurídica',
        region: 'Sul',
        city: 'Passo Fundo',
        state: 'RS',
        phone: '(54) 88888-2222',
        email: 'contato@santaclara.com.br',
        active: true
      },
      {
        id: 3,
        name: 'Cooperativa Agronegócio Verde',
        document: '98.765.432/0001-11',
        type: 'Cooperativa',
        region: 'Sudeste',
        city: 'Ribeirão Preto',
        state: 'SP',
        phone: '(16) 77777-3333',
        email: 'vendas@cooperverde.coop.br',
        active: true
      },
      {
        id: 4,
        name: 'Maria Costa Cultivos',
        document: '987.654.321-00',
        type: 'Pessoa Física',
        region: 'Nordeste',
        city: 'Barreiras',
        state: 'BA',
        phone: '(77) 66666-4444',
        email: 'maria@cultivos.com',
        active: true
      },
      {
        id: 5,
        name: 'Agronegócio Cerrado S/A',
        document: '11.222.333/0001-44',
        type: 'Pessoa Jurídica',
        region: 'Centro-Oeste',
        city: 'Primavera do Leste',
        state: 'MT',
        phone: '(66) 55555-5555',
        email: 'comercial@cerradosa.com.br',
        active: true
      }
    ],
    nextReportId: 48, // Track next available ID (updated for new reports)

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
      // Defensivos
      {
        id: 1,
        name: 'Acept',
        category: 'defensivos',
        brand: 'Acept',
        packaging: '1L',
        registeredCrops: ['Soja', 'Milho', 'Algodão'],
        description: 'Inseticida sistêmico',
        competitorProduct: 'Actaramid Nortox 200 SC',
        isMainCompetitor: false
      },
      {
        id: 2,
        name: 'Acept Advanced',
        category: 'defensivos', 
        brand: 'Acept',
        packaging: '500ml',
        registeredCrops: ['Soja', 'Feijão'],
        description: 'Inseticida de contato',
        competitorProduct: 'Actara CAS',
        isMainCompetitor: true
      },
      {
        id: 3,
        name: 'Actynite',
        category: 'defensivos',
        brand: 'Actynite',
        packaging: '1L', 
        registeredCrops: ['Soja', 'Algodão'],
        description: 'Fungicida preventivo',
        competitorProduct: 'Acre SC AR',
        isMainCompetitor: false
      },
      {
        id: 4,
        name: 'Actynite Pro',
        category: 'defensivos',
        brand: 'Actynite',
        packaging: '500ml',
        registeredCrops: ['Cana', 'Milho'],
        description: 'Fungicida curativo',
        competitorProduct: 'Genéricos',
        isMainCompetitor: true
      },
      {
        id: 5,
        name: 'Acronise',
        category: 'defensivos',
        brand: 'Acronise',
        packaging: '1L',
        registeredCrops: ['Milho', 'Sorgo'],
        description: 'Herbicida pós-emergente',
        competitorProduct: 'Eloncas',
        isMainCompetitor: true
      },
      {
        id: 6,
        name: 'Acolahar',
        category: 'defensivos',
        brand: 'Acolahar',
        packaging: '1L',
        registeredCrops: ['Café', 'Citros'],
        description: 'Inseticida acaricida',
        competitorProduct: 'Viterre',
        isMainCompetitor: false
      },
      {
        id: 7,
        name: 'Acelerador',
        category: 'defensivos',
        brand: 'Acelerador',
        packaging: '500ml',
        registeredCrops: ['Todas as culturas'],
        description: 'Adjuvante espalhante',
        competitorProduct: 'Grasade SC',
        isMainCompetitor: false
      },
      {
        id: 8,
        name: 'Aviculture',
        category: 'defensivos',
        brand: 'Aviculture',
        packaging: '1L',
        registeredCrops: ['Aves', 'Suínos'],
        description: 'Desinfetante veterinário',
        competitorProduct: 'Genéricos',
        isMainCompetitor: false
      },
      // Sementes
      {
        id: 9,
        name: 'Alvorada 500 SC Rainbow',
        category: 'seeds',
        brand: 'Alvorada',
        packaging: '60000 sementes',
        registeredCrops: ['Milho'],
        description: 'Híbrido de milho precoce',
        competitorProduct: 'Genéricos',
        isMainCompetitor: false
      },
      {
        id: 10,
        name: 'Alvorada Wag Rainbow',
        category: 'seeds',
        brand: 'Alvorada',
        packaging: '80000 sementes',
        registeredCrops: ['Milho'],
        description: 'Milho para silagem',
        competitorProduct: 'MegaB8',
        isMainCompetitor: true
      },
      // Fertilizantes
      {
        id: 11,
        name: 'Bovitec',
        category: 'fertilizers',
        brand: 'Bovitec',
        packaging: '25kg',
        registeredCrops: ['Pastagem'],
        description: 'Fertilizante para pastagem',
        competitorProduct: 'Genéricos',
        isMainCompetitor: false
      },
      {
        id: 12,
        name: 'Bovitec Premium',
        category: 'fertilizers',
        brand: 'Bovitec',
        packaging: '50kg',
        registeredCrops: ['Bovinos'],
        description: 'Suplemento bovino',
        competitorProduct: 'Mineral SC',
        isMainCompetitor: true
      },
      // Inoculantes
      {
        id: 13,
        name: 'Bionema',
        category: 'inoculants',
        brand: 'Bionema',
        packaging: '1L',
        registeredCrops: ['Soja'],
        description: 'Inoculante para soja',
        competitorProduct: 'Nitrosoil SC',
        isMainCompetitor: false
      },
      {
        id: 14,
        name: 'Bionema Plus',
        category: 'inoculants',
        brand: 'Bionema',
        packaging: '500ml',
        registeredCrops: ['Feijão'],
        description: 'Inoculante leguminosas',
        competitorProduct: 'Genéricos',
        isMainCompetitor: true
      },
      // Biológicos
      {
        id: 15,
        name: 'Bicontrol',
        category: 'biologicals',
        brand: 'Bicontrol',
        packaging: '1L',
        registeredCrops: ['Soja', 'Milho'],
        description: 'Controle biológico',
        competitorProduct: 'Genéricos',
        isMainCompetitor: false
      },
      {
        id: 16,
        name: 'Bicontrol Pro',
        category: 'biologicals',
        brand: 'Bicontrol',
        packaging: '500ml',
        registeredCrops: ['Hortaliças'],
        description: 'Biodefensivo',
        competitorProduct: 'Fahran',
        isMainCompetitor: true
      }
    ],

    priceReports: [
      // Samples with new product IDs
      {
        id: 1,
        competitorId: 1,
        reportDate: '2025-02-01',
        reportedBy: 2,
        notes: 'Produto com boa aceitação no mercado',
        verified: false,
        region: 'Cerrado Norte',
        state: 'MT',
        paymentCondition: '90_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 1,
            competitorPrice: 148.00
          }
        ]
      },
      {
        id: 2,
        competitorId: 2,
        reportDate: '2025-02-02',
        reportedBy: 3,
        notes: 'Preço competitivo na região',
        verified: true,
        region: 'Cerrado Norte',
        state: 'GO',
        paymentCondition: 'SAFRA_2026',
        currencyId: 1,
        products: [
          {
            productId: 2,
            competitorPrice: 132.50
          },
          {
            productId: 5,
            competitorPrice: 95.80
          }
        ]
      },
      {
        id: 3,
        competitorId: 3,
        reportDate: '2025-02-03',
        reportedBy: 7,
        notes: 'Oferta especial para grandes volumes',
        verified: false,
        region: 'Cerrado Centro',
        state: 'MT',
        paymentCondition: '120_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 3,
            competitorPrice: 88.90
          }
        ]
      }
    ]
  }),

  actions: {

    addCompetitor(competitor: any) {
      // Check if current user is admin (this would need to be passed or accessed somehow)
      // For now, we'll add the validation at the component level
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
        id: this.nextReportId++,
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

    getCustomerById(id: number) {
      return this.customers.find(c => c.id === id)
    },

    getProductsByCategory(category: string) {
      return this.products.filter(p => p.category === category)
    },

    getMainCompetitorProducts() {
      return this.products.filter(p => p.isMainCompetitor)
    },

    getPriceReportsByProduct(productId: number) {
      return this.priceReports.filter(r => {
        // Support both old and new format
        if (r.products && Array.isArray(r.products)) {
          return r.products.some(p => p.productId === productId)
        }
        return r.productId === productId
      })
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
    },

    getCustomersByUserRegion() {
      return (userRegion: string, isAdmin: boolean) => {
        if (isAdmin) {
          return this.customers.filter(customer => customer.active)
        }
        return this.customers.filter(customer =>
          customer.active && customer.region === userRegion
        )
      }
    }
  }
})
