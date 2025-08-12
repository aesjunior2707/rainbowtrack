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
    nextReportId: 19,

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
      {
        id: 1,
        name: 'Acegol',
        category: 'defensivos',
        brand: 'Acegol',
        packaging: '1L',
        registeredCrops: ['Soja', 'Milho', 'Algodão'],
        description: 'Inseticida sistêmico',
        competitorProduct: 'Acetamiprid Nortox 200 SP',
        isMainCompetitor: true
      },
      {
        id: 2,
        name: 'Acegol',
        category: 'defensivos',
        brand: 'Acegol',
        packaging: '500ml',
        registeredCrops: ['Soja', 'Feijão'],
        description: 'Inseticida neonicotinoide',
        competitorProduct: 'Java 200 SP',
        isMainCompetitor: false
      },
      {
        id: 3,
        name: 'Acegol',
        category: 'defensivos',
        brand: 'Acegol',
        packaging: '250ml',
        registeredCrops: ['Hortaliças', 'Fruticultura'],
        description: 'Inseticida para cultivos especiais',
        competitorProduct: 'Aceta CCAB',
        isMainCompetitor: false
      },
      {
        id: 4,
        name: 'Acegol',
        category: 'defensivos',
        brand: 'Acegol',
        packaging: '2L',
        registeredCrops: ['Todas as culturas'],
        description: 'Inseticida concentrado',
        competitorProduct: 'Generics',
        isMainCompetitor: false
      },
      {
        id: 5,
        name: 'Acemip',
        category: 'defensivos',
        brand: 'Acemip',
        packaging: '1L',
        registeredCrops: ['Soja', 'Milho'],
        description: 'Inseticida sistêmico',
        competitorProduct: 'Acetamiprid Nortox 200 SP',
        isMainCompetitor: true
      },
      {
        id: 6,
        name: 'Acemip',
        category: 'defensivos',
        brand: 'Acemip',
        packaging: '500ml',
        registeredCrops: ['Algodão', 'Café'],
        description: 'Inseticida seletivo',
        competitorProduct: 'Java 200 SP',
        isMainCompetitor: false
      },
      {
        id: 7,
        name: 'Acemip',
        category: 'defensivos',
        brand: 'Acemip',
        packaging: '250ml',
        registeredCrops: ['Fruticultura'],
        description: 'Inseticida para frutas',
        competitorProduct: 'Aceta CCAB',
        isMainCompetitor: false
      },
      {
        id: 8,
        name: 'Acemip',
        category: 'defensivos',
        brand: 'Acemip',
        packaging: '2L',
        registeredCrops: ['Todas as culturas'],
        description: 'Inseticida de amplo espectro',
        competitorProduct: 'Generics',
        isMainCompetitor: false
      },
      {
        id: 9,
        name: 'Aceway',
        category: 'defensivos',
        brand: 'Aceway',
        packaging: '1L',
        registeredCrops: ['Soja', 'Milho'],
        description: 'Herbicida pós-emergente',
        competitorProduct: 'Sperto',
        isMainCompetitor: true
      },
      {
        id: 10,
        name: 'Aceway',
        category: 'defensivos',
        brand: 'Aceway',
        packaging: '500ml',
        registeredCrops: ['Cana', 'Pastagem'],
        description: 'Herbicida seletivo',
        competitorProduct: 'Afiado',
        isMainCompetitor: false
      },
      {
        id: 11,
        name: 'Aceway',
        category: 'defensivos',
        brand: 'Aceway',
        packaging: '2L',
        registeredCrops: ['Feijão', 'Sorgo'],
        description: 'Herbicida de contato',
        competitorProduct: 'Forceps',
        isMainCompetitor: false
      },
      {
        id: 12,
        name: 'Aceway',
        category: 'defensivos',
        brand: 'Aceway',
        packaging: '5L',
        registeredCrops: ['Todas as culturas'],
        description: 'Herbicida total',
        competitorProduct: 'Generics',
        isMainCompetitor: false
      },
      {
        id: 13,
        name: 'Adiconstar',
        category: 'defensivos',
        brand: 'Adiconstar',
        packaging: '1L',
        registeredCrops: ['Soja', 'Algodão'],
        description: 'Fungicida sistêmico',
        competitorProduct: 'Priori Top',
        isMainCompetitor: true
      },
      {
        id: 14,
        name: 'Adiconstar',
        category: 'defensivos',
        brand: 'Adiconstar',
        packaging: '500ml',
        registeredCrops: ['Milho', 'Feijão'],
        description: 'Fungicida preventivo',
        competitorProduct: 'Vitene',
        isMainCompetitor: false
      },
      {
        id: 15,
        name: 'Adiconstar',
        category: 'defensivos',
        brand: 'Adiconstar',
        packaging: '250ml',
        registeredCrops: ['Café', 'Citros'],
        description: 'Fungicida curativo',
        competitorProduct: 'Ozean',
        isMainCompetitor: false
      },
      {
        id: 16,
        name: 'Adiconstar',
        category: 'defensivos',
        brand: 'Adiconstar',
        packaging: '2L',
        registeredCrops: ['Todas as culturas'],
        description: 'Fungicida de amplo espectro',
        competitorProduct: 'Generics',
        isMainCompetitor: false
      },
      {
        id: 17,
        name: 'Ametrina 500 Sc Rainbow',
        category: 'defensivos',
        brand: 'Ametrina 500 Sc Rainbow',
        packaging: '1L',
        registeredCrops: ['Milho', 'Sorgo'],
        description: 'Herbicida pré-emergente',
        competitorProduct: 'Gesapax SC',
        isMainCompetitor: true
      },
      {
        id: 18,
        name: 'Ametrina 500 Sc Rainbow',
        category: 'defensivos',
        brand: 'Ametrina 500 Sc Rainbow',
        packaging: '5L',
        registeredCrops: ['Cana'],
        description: 'Herbicida para cana',
        competitorProduct: 'MegaBR',
        isMainCompetitor: false
      },
      {
        id: 19,
        name: 'Ametrina 500 Sc Rainbow',
        category: 'defensivos',
        brand: 'Ametrina 500 Sc Rainbow',
        packaging: '20L',
        registeredCrops: ['Soja'],
        description: 'Herbicida concentrado',
        competitorProduct: 'Compass',
        isMainCompetitor: false
      },
      {
        id: 20,
        name: 'Ametrina 500 Sc Rainbow',
        category: 'defensivos',
        brand: 'Ametrina 500 Sc Rainbow',
        packaging: '200L',
        registeredCrops: ['Todas as culturas'],
        description: 'Herbicida a granel',
        competitorProduct: 'Generics',
        isMainCompetitor: false
      },
      {
        id: 21,
        name: 'Ametrina 800 Wg Rainbow',
        category: 'defensivos',
        brand: 'Ametrina 800 Wg Rainbow',
        packaging: '1kg',
        registeredCrops: ['Milho', 'Sorgo'],
        description: 'Herbicida granulado',
        competitorProduct: 'Ametrina Nortox',
        isMainCompetitor: true
      },
      {
        id: 22,
        name: 'Ametrina 800 Wg Rainbow',
        category: 'defensivos',
        brand: 'Ametrina 800 Wg Rainbow',
        packaging: '500g',
        registeredCrops: ['Cana'],
        description: 'Herbicida seletivo',
        competitorProduct: 'MegaBR',
        isMainCompetitor: false
      },
      {
        id: 23,
        name: 'Ametrina 800 Wg Rainbow',
        category: 'defensivos',
        brand: 'Ametrina 800 Wg Rainbow',
        packaging: '25kg',
        registeredCrops: ['Soja'],
        description: 'Herbicida ensacado',
        competitorProduct: 'Compass',
        isMainCompetitor: false
      },
      {
        id: 24,
        name: 'Ametrina 800 Wg Rainbow',
        category: 'defensivos',
        brand: 'Ametrina 800 Wg Rainbow',
        packaging: '10kg',
        registeredCrops: ['Todas as culturas'],
        description: 'Herbicida concentrado',
        competitorProduct: 'Generics',
        isMainCompetitor: false
      },
      {
        id: 25,
        name: 'Arrantool',
        category: 'defensivos',
        brand: 'Arrantool',
        packaging: '1L',
        registeredCrops: ['Todas as culturas'],
        description: 'Inseticida universal',
        competitorProduct: 'Generics',
        isMainCompetitor: true
      },
      {
        id: 26,
        name: 'Atesalor Xtra',
        category: 'defensivos',
        brand: 'Atesalor Xtra',
        packaging: '1L',
        registeredCrops: ['Soja', 'Milho'],
        description: 'Inseticida sistêmico',
        competitorProduct: 'Dinamic',
        isMainCompetitor: true
      },
      {
        id: 27,
        name: 'Atesalor Xtra',
        category: 'defensivos',
        brand: 'Atesalor Xtra',
        packaging: '500ml',
        registeredCrops: ['Algodão'],
        description: 'Inseticida de contato',
        competitorProduct: 'Magneto SC',
        isMainCompetitor: false
      },
      {
        id: 28,
        name: 'Atesalor Xtra',
        category: 'defensivos',
        brand: 'Atesalor Xtra',
        packaging: '2L',
        registeredCrops: ['Feijão'],
        description: 'Inseticida concentrado',
        competitorProduct: 'Metz',
        isMainCompetitor: false
      },
      {
        id: 29,
        name: 'Atesalor Xtra',
        category: 'defensivos',
        brand: 'Atesalor Xtra',
        packaging: '5L',
        registeredCrops: ['Todas as culturas'],
        description: 'Inseticida de amplo espectro',
        competitorProduct: 'Generics',
        isMainCompetitor: false
      },
      {
        id: 30,
        name: 'Atraer Wg',
        category: 'defensivos',
        brand: 'Atraer Wg',
        packaging: '1kg',
        registeredCrops: ['Milho', 'Soja'],
        description: 'Herbicida granulado',
        competitorProduct: 'Proof',
        isMainCompetitor: true
      },
      {
        id: 31,
        name: 'Atraer Wg',
        category: 'defensivos',
        brand: 'Atraer Wg',
        packaging: '500g',
        registeredCrops: ['Sorgo'],
        description: 'Herbicida seletivo',
        competitorProduct: 'Gesaprim 500',
        isMainCompetitor: false
      },
      {
        id: 32,
        name: 'Atraer Wg',
        category: 'defensivos',
        brand: 'Atraer Wg',
        packaging: '25kg',
        registeredCrops: ['Cana'],
        description: 'Herbicida ensacado',
        competitorProduct: 'Ultimato SC',
        isMainCompetitor: false
      },
      {
        id: 33,
        name: 'Atraer Wg',
        category: 'defensivos',
        brand: 'Atraer Wg',
        packaging: '10kg',
        registeredCrops: ['Todas as culturas'],
        description: 'Herbicida concentrado',
        competitorProduct: 'Generics',
        isMainCompetitor: false
      },
      {
        id: 34,
        name: 'Atrazina 500 Sc Rainbow',
        category: 'defensivos',
        brand: 'Atrazina 500 Sc Rainbow',
        packaging: '1L',
        registeredCrops: ['Milho', 'Sorgo'],
        description: 'Herbicida pré-emergente',
        competitorProduct: 'Proof',
        isMainCompetitor: true
      },
      {
        id: 35,
        name: 'Atrazina 500 Sc Rainbow',
        category: 'defensivos',
        brand: 'Atrazina 500 Sc Rainbow',
        packaging: '5L',
        registeredCrops: ['Soja'],
        description: 'Herbicida concentrado',
        competitorProduct: 'AclamadoBR',
        isMainCompetitor: false
      },
      {
        id: 36,
        name: 'Atrazina 500 Sc Rainbow',
        category: 'defensivos',
        brand: 'Atrazina 500 Sc Rainbow',
        packaging: '20L',
        registeredCrops: ['Cana'],
        description: 'Herbicida para cana',
        competitorProduct: 'Ultimato SC',
        isMainCompetitor: false
      },
      {
        id: 37,
        name: 'Atrazina 500 Sc Rainbow',
        category: 'defensivos',
        brand: 'Atrazina 500 Sc Rainbow',
        packaging: '200L',
        registeredCrops: ['Todas as culturas'],
        description: 'Herbicida a granel',
        competitorProduct: 'Generics',
        isMainCompetitor: false
      },
      {
        id: 38,
        name: 'Besroute',
        category: 'fertilizers',
        brand: 'Besroute',
        packaging: '1L',
        registeredCrops: ['Soja', 'Milho'],
        description: 'Bioestimulante vegetal',
        competitorProduct: 'Acadian',
        isMainCompetitor: true
      },
      {
        id: 39,
        name: 'Besroute',
        category: 'fertilizers',
        brand: 'Besroute',
        packaging: '500ml',
        registeredCrops: ['Algodão'],
        description: 'Estimulante de crescimento',
        competitorProduct: 'Biozyme',
        isMainCompetitor: false
      },
      {
        id: 40,
        name: 'Besroute',
        category: 'fertilizers',
        brand: 'Besroute',
        packaging: '250ml',
        registeredCrops: ['Hortaliças'],
        description: 'Bioestimulante para hortaliças',
        competitorProduct: 'Booster',
        isMainCompetitor: false
      },
      {
        id: 41,
        name: 'Besroute',
        category: 'fertilizers',
        brand: 'Besroute',
        packaging: '5L',
        registeredCrops: ['Fruticultura'],
        description: 'Estimulante para frutas',
        competitorProduct: 'Stimulate',
        isMainCompetitor: false
      },
      {
        id: 42,
        name: 'Besroute',
        category: 'fertilizers',
        brand: 'Besroute',
        packaging: '20L',
        registeredCrops: ['Todas as culturas'],
        description: 'Bioestimulante concentrado',
        competitorProduct: 'Nutriduo',
        isMainCompetitor: false
      },
      {
        id: 43,
        name: 'Besular',
        category: 'fertilizers',
        brand: 'Besular',
        packaging: '1L',
        registeredCrops: ['Soja', 'Milho'],
        description: 'Fertilizante foliar',
        competitorProduct: 'Biotrac',
        isMainCompetitor: true
      },
      {
        id: 44,
        name: 'Besular',
        category: 'fertilizers',
        brand: 'Besular',
        packaging: '500ml',
        registeredCrops: ['Algodão'],
        description: 'Nutrição foliar',
        competitorProduct: 'Foltron',
        isMainCompetitor: false
      },
      {
        id: 45,
        name: 'Besular',
        category: 'fertilizers',
        brand: 'Besular',
        packaging: '250ml',
        registeredCrops: ['Hortaliças'],
        description: 'Fertilizante completo',
        competitorProduct: 'Concorde',
        isMainCompetitor: false
      },
      {
        id: 46,
        name: 'Besular',
        category: 'fertilizers',
        brand: 'Besular',
        packaging: '5L',
        registeredCrops: ['Café'],
        description: 'Nutrição para café',
        competitorProduct: 'Progen',
        isMainCompetitor: false
      },
      {
        id: 47,
        name: 'Besular',
        category: 'fertilizers',
        brand: 'Besular',
        packaging: '20L',
        registeredCrops: ['Todas as culturas'],
        description: 'Fertilizante universal',
        competitorProduct: 'Megafol',
        isMainCompetitor: false
      },
      {
        id: 48,
        name: 'Blowout',
        category: 'defensivos',
        brand: 'Blowout',
        packaging: '1L',
        registeredCrops: ['Soja', 'Milho'],
        description: 'Herbicida dessecante',
        competitorProduct: 'Reglone',
        isMainCompetitor: true
      },
      {
        id: 49,
        name: 'Blowout',
        category: 'defensivos',
        brand: 'Blowout',
        packaging: '5L',
        registeredCrops: ['Algodão'],
        description: 'Dessecante de contato',
        competitorProduct: 'Helmoquat',
        isMainCompetitor: false
      },
      {
        id: 50,
        name: 'Blowout',
        category: 'defensivos',
        brand: 'Blowout',
        packaging: '20L',
        registeredCrops: ['Feijão'],
        description: 'Herbicida concentrado',
        competitorProduct: 'Diquat CCAB',
        isMainCompetitor: false
      },
      {
        id: 51,
        name: 'Blowout',
        category: 'defensivos',
        brand: 'Blowout',
        packaging: '200L',
        registeredCrops: ['Todas as culturas'],
        description: 'Dessecante a granel',
        competitorProduct: 'Generics',
        isMainCompetitor: false
      },
      {
        id: 52,
        name: 'Boscalid',
        category: 'defensivos',
        brand: 'Boscalid',
        packaging: '1kg',
        registeredCrops: ['Todas as culturas'],
        description: 'Fungicida sistêmico',
        competitorProduct: 'Generics',
        isMainCompetitor: true
      },
      {
        id: 53,
        name: 'Cadilac',
        category: 'defensivos',
        brand: 'Cadilac',
        packaging: '1kg',
        registeredCrops: ['Soja', 'Milho'],
        description: 'Fungicida protetor',
        competitorProduct: 'Unizeb Gold',
        isMainCompetitor: true
      },
      {
        id: 54,
        name: 'Cadilac',
        category: 'defensivos',
        brand: 'Cadilac',
        packaging: '25kg',
        registeredCrops: ['Algodão'],
        description: 'Fungicida multissítio',
        competitorProduct: 'Dithane',
        isMainCompetitor: false
      },
      {
        id: 55,
        name: 'Cadilac',
        category: 'defensivos',
        brand: 'Cadilac',
        packaging: '500g',
        registeredCrops: ['Feijão'],
        description: 'Fungicida preventivo',
        competitorProduct: 'Mancozeb Nortox',
        isMainCompetitor: false
      },
      {
        id: 56,
        name: 'Cadilac',
        category: 'defensivos',
        brand: 'Cadilac',
        packaging: '10kg',
        registeredCrops: ['Todas as culturas'],
        description: 'Fungicida concentrado',
        competitorProduct: 'Generics',
        isMainCompetitor: false
      },
      {
        id: 57,
        name: 'Captive',
        category: 'defensivos',
        brand: 'Captive',
        packaging: '1L',
        registeredCrops: ['Soja', 'Milho'],
        description: 'Fungicida sistêmico',
        competitorProduct: 'Captan SC',
        isMainCompetitor: true
      },
      {
        id: 58,
        name: 'Captive',
        category: 'defensivos',
        brand: 'Captive',
        packaging: '500ml',
        registeredCrops: ['Algodão'],
        description: 'Fungicida preventivo',
        competitorProduct: 'Orthocide',
        isMainCompetitor: false
      },
      {
        id: 59,
        name: 'Captive',
        category: 'defensivos',
        brand: 'Captive',
        packaging: '5L',
        registeredCrops: ['Todas as culturas'],
        description: 'Fungicida concentrado',
        competitorProduct: 'Generics',
        isMainCompetitor: false
      },
      {
        id: 60,
        name: 'Cleaner Xtra',
        category: 'defensivos',
        brand: 'Cleaner Xtra',
        packaging: '1L',
        registeredCrops: ['Soja', 'Milho'],
        description: 'Fungicida sistêmico',
        competitorProduct: 'Bravonil SC',
        isMainCompetitor: true
      }
    ],

    priceReports: [
      // Reports for Cerrado Norte users
      {
        id: 1,
        competitorId: 1,
        reportDate: '2025-01-15',
        reportedBy: 2, // Felipe Tenorio
        customerName: 'Fazenda São José',
        notes: 'Acegol apresentando bom desempenho contra acetamiprid',
        verified: false,
        region: 'Cerrado Norte',
        state: 'MT',
        paymentCondition: 'SAFRA_2026',
        currencyId: 1,
        products: [
          {
            productId: 1, // Acegol
            competitorPrice: 165.00
          }
        ]
      },
      {
        id: 2,
        competitorId: 2,
        reportDate: '2025-01-18',
        reportedBy: 3, // Rodrigo Rocha
        customerName: 'Agropecuária Bandeirantes',
        notes: 'Preço competitivo para Acemip, cliente interessado',
        verified: true,
        region: 'Cerrado Norte',
        state: 'GO',
        paymentCondition: '90_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 5, // Acemip
            competitorPrice: 158.50
          },
          {
            productId: 9, // Aceway
            competitorPrice: 145.20
          }
        ]
      },
      {
        id: 3,
        competitorId: 1,
        reportDate: '2025-01-20',
        reportedBy: 4, // Gilberto Silva
        customerName: 'Cooperativa Rural Verde',
        notes: 'Adiconstar mostrando eficácia superior ao Priori Top',
        verified: false,
        region: 'Cerrado Norte',
        state: 'MT',
        paymentCondition: '120_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 13, // Adiconstar
            competitorPrice: 195.75
          }
        ]
      },
      {
        id: 4,
        competitorId: 3,
        reportDate: '2025-01-22',
        reportedBy: 5, // Raphael Siqueira
        customerName: 'Fazenda Santa Clara',
        notes: 'Ametrina 500 SC Rainbow com excelente residual',
        verified: true,
        region: 'Cerrado Norte',
        state: 'GO',
        paymentCondition: 'SAFRA_2026',
        currencyId: 1,
        products: [
          {
            productId: 17, // Ametrina 500 Sc Rainbow
            competitorPrice: 88.90
          }
        ]
      },
      {
        id: 5,
        competitorId: 2,
        reportDate: '2025-01-25',
        reportedBy: 6, // Layson Costa
        customerName: 'Agronegócio Primavera',
        notes: 'Besroute apresentou resultados impressionantes na soja',
        verified: false,
        region: 'Cerrado Norte',
        state: 'MT',
        paymentCondition: '60_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 38, // Besroute
            competitorPrice: 125.30
          },
          {
            productId: 43, // Besular
            competitorPrice: 98.45
          }
        ]
      },
      // Reports for Cerrado Centro users
      {
        id: 6,
        competitorId: 1,
        reportDate: '2025-01-16',
        reportedBy: 7, // Marcos Martins
        customerName: 'Fazenda Dourados',
        notes: 'Blowout eficiente na dessecação, cliente satisfeito',
        verified: true,
        region: 'Cerrado Centro',
        state: 'MS',
        paymentCondition: '90_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 48, // Blowout
            competitorPrice: 142.80
          }
        ]
      },
      {
        id: 7,
        competitorId: 3,
        reportDate: '2025-01-19',
        reportedBy: 8, // Ademir Borghi
        customerName: 'Cooperativa Campo Grande',
        notes: 'Cadilac superando Unizeb Gold em proteção',
        verified: false,
        region: 'Cerrado Centro',
        state: 'MS',
        paymentCondition: 'SAFRA_2026',
        currencyId: 1,
        products: [
          {
            productId: 53, // Cadilac
            competitorPrice: 78.60
          }
        ]
      },
      {
        id: 8,
        competitorId: 2,
        reportDate: '2025-01-21',
        reportedBy: 9, // Giovani Cavalari
        customerName: 'Agropecuária Horizonte',
        notes: 'Captive com ótimo controle, preço interessante',
        verified: true,
        region: 'Cerrado Centro',
        state: 'MT',
        paymentCondition: '120_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 57, // Captive
            competitorPrice: 186.40
          }
        ]
      },
      {
        id: 9,
        competitorId: 1,
        reportDate: '2025-01-24',
        reportedBy: 10, // Marcus Palomares
        customerName: 'Fazenda Rio Verde',
        notes: 'Cleaner Xtra demonstrando superioridade ao Bravonil SC',
        verified: false,
        region: 'Cerrado Centro',
        state: 'GO',
        paymentCondition: '150_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 60, // Cleaner Xtra
            competitorPrice: 203.15
          }
        ]
      },
      {
        id: 10,
        competitorId: 4,
        reportDate: '2025-01-26',
        reportedBy: 11, // Leonardo Alexandrino
        customerName: 'Cooperativa Cerrado Sul',
        notes: 'Atrazina 500 SC Rainbow com residual excelente',
        verified: true,
        region: 'Cerrado Centro',
        state: 'MT',
        paymentCondition: 'SAFRA_2026',
        currencyId: 1,
        products: [
          {
            productId: 34, // Atrazina 500 Sc Rainbow
            competitorPrice: 92.75
          },
          {
            productId: 30, // Atraer Wg
            competitorPrice: 115.80
          }
        ]
      },
      // Reports for Cana users
      {
        id: 11,
        competitorId: 2,
        reportDate: '2025-01-17',
        reportedBy: 14, // Gustavo Avila
        customerName: 'Usina São Paulo',
        notes: 'Atesalor Xtra eficaz no controle de pragas da cana',
        verified: false,
        region: 'Cana',
        state: 'SP',
        paymentCondition: '90_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 26, // Atesalor Xtra
            competitorPrice: 172.90
          }
        ]
      },
      {
        id: 12,
        competitorId: 3,
        reportDate: '2025-01-23',
        reportedBy: 15, // Eduardo Martelli
        customerName: 'Cooperativa Canavieira',
        notes: 'Arrantool universal, boa opção para diversas pragas',
        verified: true,
        region: 'Cana',
        state: 'SP',
        paymentCondition: '60_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 25, // Arrantool
            competitorPrice: 134.60
          }
        ]
      },
      // Reports for MT users
      {
        id: 13,
        competitorId: 1,
        reportDate: '2025-01-27',
        reportedBy: 23, // Celso Junior
        customerName: 'Fazenda Parecis',
        notes: 'Boscalid apresentando excelente controle fúngico',
        verified: false,
        region: 'MT',
        state: 'MT',
        paymentCondition: 'SAFRA_2026',
        currencyId: 1,
        products: [
          {
            productId: 52, // Boscalid
            competitorPrice: 245.80
          }
        ]
      },
      {
        id: 14,
        competitorId: 2,
        reportDate: '2025-01-28',
        reportedBy: 24, // João Neto
        customerName: 'Agropecuária Tangará',
        notes: 'Ametrina 800 WG Rainbow com ótima solubilidade',
        verified: true,
        region: 'MT',
        state: 'MT',
        paymentCondition: '120_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 21, // Ametrina 800 Wg Rainbow
            competitorPrice: 165.45
          }
        ]
      },
      // Reports for Sul users
      {
        id: 15,
        competitorId: 3,
        reportDate: '2025-01-29',
        reportedBy: 31, // José Edberto
        customerName: 'Cooperativa Tritícola',
        notes: 'Produtos Rainbow com excelente aceitação no Sul',
        verified: false,
        region: 'Sul',
        state: 'RS',
        paymentCondition: '90_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 1, // Acegol
            competitorPrice: 158.30
          },
          {
            productId: 5, // Acemip
            competitorPrice: 151.75
          }
        ]
      },
      {
        id: 16,
        competitorId: 4,
        reportDate: '2025-01-30',
        reportedBy: 32, // Lucas Calixto
        customerName: 'Agronegócio Gaúcho',
        notes: 'Fertilizantes Besroute e Besular com resultados superiores',
        verified: true,
        region: 'Sul',
        state: 'RS',
        paymentCondition: 'SAFRA_2026',
        currencyId: 1,
        products: [
          {
            productId: 38, // Besroute
            competitorPrice: 128.90
          },
          {
            productId: 43, // Besular
            competitorPrice: 102.35
          }
        ]
      },
      // Reports for KA users
      {
        id: 17,
        competitorId: 1,
        reportDate: '2025-01-31',
        reportedBy: 37, // Filipe Campos
        customerName: 'Fazenda Key Account',
        notes: 'Portfolio completo Rainbow atendendo grandes produtores',
        verified: false,
        region: 'KA',
        state: 'MT',
        paymentCondition: '180_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 13, // Adiconstar
            competitorPrice: 189.50
          },
          {
            productId: 17, // Ametrina 500 Sc Rainbow
            competitorPrice: 86.75
          },
          {
            productId: 48, // Blowout
            competitorPrice: 138.25
          }
        ]
      },
      {
        id: 18,
        competitorId: 2,
        reportDate: '2025-02-01',
        reportedBy: 38, // Ricardo Leite
        customerName: 'Grupo Agropecuário Nacional',
        notes: 'Grandes volumes, preços especiais negociados',
        verified: true,
        region: 'KA',
        state: 'GO',
        paymentCondition: 'SAFRA_2026',
        currencyId: 1,
        products: [
          {
            productId: 53, // Cadilac
            competitorPrice: 75.20
          },
          {
            productId: 57, // Captive
            competitorPrice: 179.80
          },
          {
            productId: 60, // Cleaner Xtra
            competitorPrice: 195.60
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
