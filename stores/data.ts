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
        competitorId: 1,
        reportDate: '2024-01-15',
        reportedBy: 1,
        notes: 'Cliente mencionou que está considerando trocar de fornecedor',
        verified: false,
        region: 'REG001',
        state: 'SP',
        paymentCondition: 'A_VISTA',

        currencyId: 1,
        products: [
          {
            productId: 1,
            competitorPrice: 142.50
          }
        ]
      },
      {
        id: 2,
        competitorId: 2,
        reportDate: '2024-01-12',
        reportedBy: 1,
        notes: 'Preço promocional válido até fim do mês',
        verified: true,
        region: 'REG001',
        state: 'GO',
        paymentCondition: 'A_VISTA',

        currencyId: 1,
        products: [
          {
            productId: 4,
            competitorPrice: 135.00
          }
        ]
      },
      {
        id: 3,
        competitorId: 3,
        reportDate: '2024-01-10',
        reportedBy: 2,
        notes: 'Concorrente oferecendo desconto por volume',
        verified: true,
        region: 'REG002',
        state: 'MG',
        paymentCondition: 'SAFRA_2026',

        currencyId: 1,
        products: [
          {
            productId: 7,
            competitorPrice: 98.75
          }
        ]
      },
      {
        id: 4,
        competitorId: 4,
        reportDate: '2024-01-08',
        reportedBy: 1,
        notes: 'Preço competitivo, cliente satisfeito com qualidade',
        verified: false,
        region: 'REG001',
        state: 'PR',
        paymentCondition: '90_DIAS',

        currencyId: 1,
        products: [
          {
            productId: 2,
            competitorPrice: 89.90
          }
        ]
      },
      {
        id: 5,
        competitorId: 1,
        reportDate: '2024-01-05',
        reportedBy: 2,
        notes: 'Produto similar, embalagem diferente',
        verified: true,
        region: 'REG002',
        state: 'RS',
        paymentCondition: 'SAFRINHA_2026',

        currencyId: 1,
        products: [
          {
            productId: 5,
            competitorPrice: 78.50
          }
        ]
      },
      {
        id: 6,
        competitorId: 2,
        reportDate: '2025-01-31',
        reportedBy: 1,
        notes: 'Cotação completa com múltiplos produtos para análise competitiva',
        verified: false,
        region: 'REG001',
        state: 'SP',
        paymentCondition: 'A_VISTA',

        currencyId: 1,
        products: [
          {
            productId: 1,
            competitorPrice: 145.75
          },
          {
            productId: 2,
            competitorPrice: 92.30
          },
          {
            productId: 4,
            competitorPrice: 138.90
          },
          {
            productId: 7,
            competitorPrice: 105.50
          },
          {
            productId: 8,
            competitorPrice: 67.80
          }
        ]
      },
      {
        id: 7,
        competitorId: 1,
        reportDate: '2025-01-30',
        reportedBy: 1,
        notes: 'Captura recente para teste do dashboard',
        verified: true,
        region: 'REG001',
        state: 'MG',
        paymentCondition: 'A_VISTA',

        currencyId: 1,
        products: [
          {
            productId: 3,
            competitorPrice: 156.90
          }
        ]
      },
      // Capturas dos novos representantes
      {
        id: 8,
        competitorId: 1,
        reportDate: '2025-02-01',
        reportedBy: 2, // Felipe Tenorio
        notes: 'Cliente interessado em mudança de fornecedor',
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
        id: 9,
        competitorId: 2,
        reportDate: '2025-02-02',
        reportedBy: 3, // Rodrigo Rocha
        notes: 'Preço competitivo na região',
        verified: true,
        region: 'Cerrado Norte',
        state: 'GO',
        paymentCondition: 'SAFRA_2026',
        currencyId: 1,
        products: [
          {
            productId: 4,
            competitorPrice: 132.50
          },
          {
            productId: 7,
            competitorPrice: 95.80
          }
        ]
      },
      {
        id: 10,
        competitorId: 3,
        reportDate: '2025-02-03',
        reportedBy: 7, // Marcos Martins
        notes: 'Oferta especial para grandes volumes',
        verified: false,
        region: 'Cerrado Centro',
        state: 'MT',
        paymentCondition: '120_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 2,
            competitorPrice: 88.90
          }
        ]
      },
      {
        id: 11,
        competitorId: 4,
        reportDate: '2025-02-04',
        reportedBy: 14, // Gustavo Avila
        notes: 'Produto para cultura de cana-de-açúcar',
        verified: true,
        region: 'Cana',
        state: 'SP',
        paymentCondition: '60_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 5,
            competitorPrice: 76.40
          },
          {
            productId: 8,
            competitorPrice: 68.20
          }
        ]
      },
      {
        id: 12,
        competitorId: 1,
        reportDate: '2025-02-05',
        reportedBy: 23, // Celso Junior
        notes: 'Concorrente muito ativo na região MT',
        verified: false,
        region: 'MT',
        state: 'MT',
        paymentCondition: 'SAFRINHA_2026',
        currencyId: 1,
        products: [
          {
            productId: 6,
            competitorPrice: 125.30
          }
        ]
      },
      {
        id: 13,
        competitorId: 2,
        reportDate: '2025-02-06',
        reportedBy: 31, // José Edberto
        notes: 'Boa aceitação dos produtores na região Sul',
        verified: true,
        region: 'Sul',
        state: 'RS',
        paymentCondition: '150_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 3,
            competitorPrice: 159.70
          },
          {
            productId: 9,
            competitorPrice: 112.80
          }
        ]
      },
      {
        id: 14,
        competitorId: 3,
        reportDate: '2025-02-07',
        reportedBy: 37, // Filipe Campos
        notes: 'Primeira captura na região KA',
        verified: false,
        region: 'KA',
        state: 'BA',
        paymentCondition: 'A_VISTA',
        currencyId: 1,
        products: [
          {
            productId: 1,
            competitorPrice: 143.60
          }
        ]
      },
      {
        id: 15,
        competitorId: 4,
        reportDate: '2025-02-08',
        reportedBy: 8, // Ademir Borghi
        notes: 'Capturas múltiplas para análise completa',
        verified: true,
        region: 'Cerrado Centro',
        state: 'GO',
        paymentCondition: '180_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 4,
            competitorPrice: 136.20
          },
          {
            productId: 5,
            competitorPrice: 79.50
          },
          {
            productId: 8,
            competitorPrice: 66.80
          }
        ]
      },
      {
        id: 16,
        competitorId: 1,
        reportDate: '2025-02-09',
        reportedBy: 18, // Elcio Daroz
        notes: 'Setor sucroalcooleiro em expansão',
        verified: false,
        region: 'Cana',
        state: 'SP',
        paymentCondition: '210_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 7,
            competitorPrice: 103.40
          }
        ]
      },
      {
        id: 17,
        competitorId: 2,
        reportDate: '2025-02-10',
        reportedBy: 26, // Ronaldo Américo
        notes: 'Farmer satisfeito com resultado',
        verified: true,
        region: 'MT',
        state: 'MT',
        paymentCondition: '240_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 2,
            competitorPrice: 91.30
          },
          {
            productId: 6,
            competitorPrice: 128.90
          }
        ]
      },
      // Mais capturas dos representantes
      {
        id: 18,
        competitorId: 3,
        reportDate: '2025-02-11',
        reportedBy: 4, // Gilberto Silva
        notes: 'Cliente fiel ao concorrente, difícil conversão',
        verified: true,
        region: 'Cerrado Norte',
        state: 'GO',
        paymentCondition: '30_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 3,
            competitorPrice: 154.80
          }
        ]
      },
      {
        id: 19,
        competitorId: 4,
        reportDate: '2025-02-12',
        reportedBy: 5, // Raphael Siqueira
        notes: 'Preço agressivo para conquistar market share',
        verified: false,
        region: 'Cerrado Norte',
        state: 'MT',
        paymentCondition: '270_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 1,
            competitorPrice: 141.90
          },
          {
            productId: 4,
            competitorPrice: 129.80
          }
        ]
      },
      {
        id: 20,
        competitorId: 1,
        reportDate: '2025-02-13',
        reportedBy: 6, // Layson Costa
        notes: 'Produto com boa performance técnica',
        verified: true,
        region: 'Cerrado Norte',
        state: 'BA',
        paymentCondition: 'SAFRA_2026',
        currencyId: 1,
        products: [
          {
            productId: 7,
            competitorPrice: 98.60
          }
        ]
      },
      {
        id: 21,
        competitorId: 2,
        reportDate: '2025-02-14',
        reportedBy: 9, // Giovani Cavalari
        notes: 'Concorrência acirrada na região Centro-Oeste',
        verified: false,
        region: 'Cerrado Centro',
        state: 'MS',
        paymentCondition: '360_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 2,
            competitorPrice: 87.40
          },
          {
            productId: 5,
            competitorPrice: 74.20
          },
          {
            productId: 9,
            competitorPrice: 108.50
          }
        ]
      },
      {
        id: 22,
        competitorId: 3,
        reportDate: '2025-02-15',
        reportedBy: 10, // Marcus Palomares
        notes: 'Estratégia de preços diferenciada por região',
        verified: true,
        region: 'Cerrado Centro',
        state: 'GO',
        paymentCondition: 'A_VISTA',
        currencyId: 1,
        products: [
          {
            productId: 6,
            competitorPrice: 122.70
          }
        ]
      },
      {
        id: 23,
        competitorId: 4,
        reportDate: '2025-02-16',
        reportedBy: 11, // Leonardo Alexandrino
        notes: 'Cliente interessado em mudança de marca',
        verified: false,
        region: 'Cerrado Centro',
        state: 'MT',
        paymentCondition: '90_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 8,
            competitorPrice: 65.90
          },
          {
            productId: 1,
            competitorPrice: 146.30
          }
        ]
      },
      {
        id: 24,
        competitorId: 1,
        reportDate: '2025-02-17',
        reportedBy: 12, // Felipe Lima
        notes: 'Parceria técnica bem estabelecida',
        verified: true,
        region: 'Cerrado Centro',
        state: 'GO',
        paymentCondition: '120_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 3,
            competitorPrice: 158.90
          }
        ]
      },
      {
        id: 25,
        competitorId: 2,
        reportDate: '2025-02-18',
        reportedBy: 13, // Ricsandrelly Vilela
        notes: 'Oferta promocional de fim de safra',
        verified: false,
        region: 'Cerrado Centro',
        state: 'MS',
        paymentCondition: 'SAFRINHA_2026',
        currencyId: 1,
        products: [
          {
            productId: 4,
            competitorPrice: 131.50
          },
          {
            productId: 7,
            competitorPrice: 96.80
          }
        ]
      },
      {
        id: 26,
        competitorId: 3,
        reportDate: '2025-02-19',
        reportedBy: 15, // Eduardo Martelli
        notes: 'Aplicação específica para cana-de-açúcar',
        verified: true,
        region: 'Cana',
        state: 'SP',
        paymentCondition: '60_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 2,
            competitorPrice: 89.70
          }
        ]
      },
      {
        id: 27,
        competitorId: 4,
        reportDate: '2025-02-20',
        reportedBy: 16, // Artur Cunha
        notes: 'Competição direta em herbicidas',
        verified: false,
        region: 'Cana',
        state: 'SP',
        paymentCondition: '150_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 8,
            competitorPrice: 67.30
          },
          {
            productId: 9,
            competitorPrice: 110.40
          }
        ]
      },
      {
        id: 28,
        competitorId: 1,
        reportDate: '2025-02-21',
        reportedBy: 17, // Adriano Oliani
        notes: 'Programa de fidelidade muito atrativo',
        verified: true,
        region: 'Cana',
        state: 'SP',
        paymentCondition: '180_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 5,
            competitorPrice: 77.90
          }
        ]
      },
      {
        id: 29,
        competitorId: 2,
        reportDate: '2025-02-22',
        reportedBy: 19, // Pamela Andrade
        notes: 'Tecnologia diferenciada no produto',
        verified: false,
        region: 'Cana',
        state: 'MG',
        paymentCondition: '210_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 1,
            competitorPrice: 144.70
          },
          {
            productId: 6,
            competitorPrice: 126.50
          }
        ]
      },
      {
        id: 30,
        competitorId: 3,
        reportDate: '2025-02-23',
        reportedBy: 20, // Eric Arantes
        notes: 'Mercado em crescimento para biológicos',
        verified: true,
        region: 'Cana',
        state: 'GO',
        paymentCondition: '240_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 3,
            competitorPrice: 161.20
          }
        ]
      },
      {
        id: 31,
        competitorId: 4,
        reportDate: '2025-02-24',
        reportedBy: 21, // Ricardo Gonçalves
        notes: 'Forte presença no varejo especializado',
        verified: false,
        region: 'Cana',
        state: 'SP',
        paymentCondition: 'A_VISTA',
        currencyId: 1,
        products: [
          {
            productId: 4,
            competitorPrice: 133.80
          },
          {
            productId: 8,
            competitorPrice: 69.10
          }
        ]
      },
      {
        id: 32,
        competitorId: 1,
        reportDate: '2025-02-25',
        reportedBy: 22, // Letieri Augusto
        notes: 'Suporte técnico diferenciado',
        verified: true,
        region: 'Cana',
        state: 'MG',
        paymentCondition: '30_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 7,
            competitorPrice: 99.80
          }
        ]
      },
      {
        id: 33,
        competitorId: 2,
        reportDate: '2025-02-26',
        reportedBy: 24, // João Neto
        notes: 'Expansão para novos territórios',
        verified: false,
        region: 'MT',
        state: 'MT',
        paymentCondition: '60_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 2,
            competitorPrice: 92.30
          },
          {
            productId: 5,
            competitorPrice: 75.60
          }
        ]
      },
      {
        id: 34,
        competitorId: 3,
        reportDate: '2025-02-27',
        reportedBy: 25, // Fernando Souza
        notes: 'Política de descontos por volume',
        verified: true,
        region: 'MT',
        state: 'MT',
        paymentCondition: '90_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 9,
            competitorPrice: 105.90
          }
        ]
      },
      {
        id: 35,
        competitorId: 4,
        reportDate: '2025-02-28',
        reportedBy: 27, // Willian Quinteiro
        notes: 'Inovação constante em formulações',
        verified: false,
        region: 'MT',
        state: 'MT',
        paymentCondition: '120_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 1,
            competitorPrice: 147.50
          },
          {
            productId: 3,
            competitorPrice: 162.80
          },
          {
            productId: 6,
            competitorPrice: 127.90
          }
        ]
      },
      {
        id: 36,
        competitorId: 1,
        reportDate: '2025-03-01',
        reportedBy: 28, // Thiago Silva
        notes: 'Relacionamento de longo prazo com o cliente',
        verified: true,
        region: 'MT',
        state: 'MT',
        paymentCondition: '150_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 4,
            competitorPrice: 134.90
          }
        ]
      },
      {
        id: 37,
        competitorId: 2,
        reportDate: '2025-03-02',
        reportedBy: 29, // Antonio Neto
        notes: 'Estratégia de penetração em novos clientes',
        verified: false,
        region: 'MT',
        state: 'MT',
        paymentCondition: '180_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 7,
            competitorPrice: 101.20
          },
          {
            productId: 8,
            competitorPrice: 70.40
          }
        ]
      },
      {
        id: 38,
        competitorId: 3,
        reportDate: '2025-03-03',
        reportedBy: 30, // Luciano Juchem
        notes: 'Parceria estratégica com distribuidores',
        verified: true,
        region: 'MT',
        state: 'MT',
        paymentCondition: 'SAFRA_2026',
        currencyId: 1,
        products: [
          {
            productId: 2,
            competitorPrice: 88.50
          }
        ]
      },
      {
        id: 39,
        competitorId: 4,
        reportDate: '2025-03-04',
        reportedBy: 32, // Lucas Calixto
        notes: 'Adaptação às condições climáticas do Sul',
        verified: false,
        region: 'Sul',
        state: 'RS',
        paymentCondition: '210_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 5,
            competitorPrice: 78.80
          },
          {
            productId: 9,
            competitorPrice: 113.60
          }
        ]
      },
      {
        id: 40,
        competitorId: 1,
        reportDate: '2025-03-05',
        reportedBy: 33, // Rodrigo Wolfman
        notes: 'Excelente performance em condições adversas',
        verified: true,
        region: 'Sul',
        state: 'SC',
        paymentCondition: '240_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 1,
            competitorPrice: 149.90
          }
        ]
      },
      {
        id: 41,
        competitorId: 2,
        reportDate: '2025-03-06',
        reportedBy: 34, // Rodrigo Marcondes
        notes: 'Tendência de alta nos preços regionais',
        verified: false,
        region: 'Sul',
        state: 'PR',
        paymentCondition: '270_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 3,
            competitorPrice: 164.50
          },
          {
            productId: 6,
            competitorPrice: 129.70
          }
        ]
      },
      {
        id: 42,
        competitorId: 3,
        reportDate: '2025-03-07',
        reportedBy: 35, // Marcela Rodrigues
        notes: 'Foco em sustentabilidade e eficiência',
        verified: true,
        region: 'Sul',
        state: 'RS',
        paymentCondition: '360_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 4,
            competitorPrice: 137.40
          }
        ]
      },
      {
        id: 43,
        competitorId: 4,
        reportDate: '2025-03-08',
        reportedBy: 36, // Leandro Almeida
        notes: 'Programa de capacitação para aplicadores',
        verified: false,
        region: 'Sul',
        state: 'SC',
        paymentCondition: 'A_VISTA',
        currencyId: 1,
        products: [
          {
            productId: 7,
            competitorPrice: 102.80
          },
          {
            productId: 8,
            competitorPrice: 71.90
          }
        ]
      },
      {
        id: 44,
        competitorId: 1,
        reportDate: '2025-03-09',
        reportedBy: 38, // Ricardo Leite
        notes: 'Primeiro contato na região KA',
        verified: true,
        region: 'KA',
        state: 'BA',
        paymentCondition: '30_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 2,
            competitorPrice: 90.60
          }
        ]
      },
      {
        id: 45,
        competitorId: 2,
        reportDate: '2025-03-10',
        reportedBy: 39, // Jose Barbosa
        notes: 'Mercado em desenvolvimento na região',
        verified: false,
        region: 'KA',
        state: 'PE',
        paymentCondition: '60_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 5,
            competitorPrice: 76.30
          },
          {
            productId: 1,
            competitorPrice: 145.20
          }
        ]
      },
      {
        id: 46,
        competitorId: 3,
        reportDate: '2025-03-11',
        reportedBy: 40, // Nilson Liasch
        notes: 'Adaptação para culturas regionais específicas',
        verified: true,
        region: 'KA',
        state: 'AL',
        paymentCondition: '90_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 9,
            competitorPrice: 107.50
          }
        ]
      },
      {
        id: 47,
        competitorId: 4,
        reportDate: '2025-03-12',
        reportedBy: 41, // Fábio Taniguti
        notes: 'Investimento em canais digitais de vendas',
        verified: false,
        region: 'KA',
        state: 'CE',
        paymentCondition: '120_DIAS',
        currencyId: 1,
        products: [
          {
            productId: 3,
            competitorPrice: 160.80
          },
          {
            productId: 4,
            competitorPrice: 139.10
          },
          {
            productId: 8,
            competitorPrice: 72.60
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
