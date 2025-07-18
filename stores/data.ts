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
        address: 'Rua das Plantas, 123 - Ribeirão Preto, SP'
      },
      {
        id: 2,
        name: 'Maria Santos',
        email: 'maria.santos@agricultura.com',
        phone: '(21) 99876-5432',
        company: 'Agricultura Santos Ltda',
        address: 'Av. do Campo, 456 - Goiânia, GO'
      },
      {
        id: 3,
        name: 'Pedro Oliveira',
        email: 'pedro.oliveira@plantio.com',
        phone: '(31) 91234-5678',
        company: 'Plantio Oliveira',
        address: 'Estrada Rural, 789 - Uberlândia, MG'
      },
      {
        id: 4,
        name: 'Ana Costa',
        email: 'ana.costa@agronegocio.com',
        phone: '(41) 92345-6789',
        company: 'Agronegócio Costa',
        address: 'Fazenda Boa Vista, s/n - Cascavel, PR'
      },
      {
        id: 5,
        name: 'Carlos Ferreira',
        email: 'carlos.ferreira@rural.com',
        phone: '(51) 93456-7890',
        company: 'Rural Ferreira',
        address: 'Sítio Esperança, 321 - Passo Fundo, RS'
      }
    ],

    products: [
      // Fungicides
      {
        id: 1,
        name: 'FungMax Pro',
        category: 'fungicides',
        price: 125.50,
        brand: 'AgroTech',
        packaging: '1L',
        registeredCrops: ['Soja', 'Milho', 'Trigo'],
        description: 'Fungicida sistêmico para controle preventivo'
      },
      {
        id: 2,
        name: 'ProtectFung 500',
        category: 'fungicides',
        price: 89.90,
        brand: 'CropGuard',
        packaging: '500ml',
        registeredCrops: ['Café', 'Algodão', 'Cana'],
        description: 'Fungicida de contato para aplicação foliar'
      },
      {
        id: 3,
        name: 'BioFung Elite',
        category: 'fungicides',
        price: 156.00,
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
        price: 98.75,
        brand: 'AgroTech',
        packaging: '1L',
        registeredCrops: ['Soja', 'Milho', 'Algodão'],
        description: 'Inseticida sistêmico para controle de pragas'
      },
      {
        id: 5,
        name: 'BugStop 300',
        category: 'insecticides',
        price: 67.50,
        brand: 'CropGuard',
        packaging: '300ml',
        registeredCrops: ['Café', 'Citros', 'Tomate'],
        description: 'Inseticida de contato para jardins e cultivos'
      },
      {
        id: 6,
        name: 'ThripsEnd Pro',
        category: 'insecticides',
        price: 134.20,
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
        price: 78.90,
        brand: 'AgroTech',
        packaging: '1L',
        registeredCrops: ['Soja', 'Milho', 'Cana'],
        description: 'Herbicida pós-emergente seletivo'
      },
      {
        id: 8,
        name: 'GrassKiller 400',
        category: 'herbicides',
        price: 56.30,
        brand: 'CropGuard',
        packaging: '400ml',
        registeredCrops: ['Café', 'Citros', 'Eucalipto'],
        description: 'Herbicida para controle de gramíneas'
      },
      {
        id: 9,
        name: 'TotalHerb Plus',
        category: 'herbicides',
        price: 112.45,
        brand: 'BioAgro',
        packaging: '2L',
        registeredCrops: ['Soja', 'Milho', 'Algodão'],
        description: 'Herbicida total para pré-plantio'
      }
    ],

    deals: [
      {
        id: 1,
        customerId: 1,
        products: [
          { productId: 1, quantity: 10, price: 125.50 },
          { productId: 4, quantity: 5, price: 98.75 }
        ],
        orderDate: '2024-01-15',
        deliveryDate: '2024-01-25',
        paymentMethod: 'credit_card',
        paymentTerms: '30_days',
        total: 1748.75,
        status: 'confirmed',
        sendByEmail: true
      },
      {
        id: 2,
        customerId: 2,
        products: [
          { productId: 2, quantity: 8, price: 89.90 },
          { productId: 7, quantity: 12, price: 78.90 }
        ],
        orderDate: '2024-01-10',
        deliveryDate: '2024-01-20',
        paymentMethod: 'bank_transfer',
        paymentTerms: '60_days',
        total: 1666.00,
        status: 'pending',
        sendByEmail: false
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

    addDeal(deal: any) {
      const newDeal = {
        ...deal,
        id: Math.max(...this.deals.map(d => d.id)) + 1,
        status: 'pending'
      }
      this.deals.push(newDeal)
      return newDeal
    },

    getCustomerById(id: number) {
      return this.customers.find(c => c.id === id)
    },

    getProductById(id: number) {
      return this.products.find(p => p.id === id)
    },

    getProductsByCategory(category: string) {
      return this.products.filter(p => p.category === category)
    }
  }
})