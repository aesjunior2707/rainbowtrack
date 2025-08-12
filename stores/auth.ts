import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    isAuthenticated: false,
    users: [
      {
        id: 1,
        username: 'admin',
        password: 'admin123',
        name: 'Administrador',
        email: 'admin@rainbow.com',
        role: 'admin',
        defaultRegion: 'Rainbow Brasil'
      },
      {
        id: 42,
        username: 'leonardo.campos',
        password: '123',
        name: 'Leonardo Campos',
        email: 'leonardo.campos@rainbow.com',
        role: 'admin',
        defaultRegion: 'Rainbow Brasil'
      },
      // Sales Rep Unif. - Cerrado Norte
      {
        id: 2,
        username: 'felipe.tenorio',
        password: '123',
        name: 'Felipe Tenorio',
        email: 'felipe.tenorio@rainbow.com',
        role: 'user',
        defaultRegion: 'Cerrado Norte'
      },
      {
        id: 3,
        username: 'rodrigo.rocha',
        password: '123',
        name: 'Rodrigo Rocha',
        email: 'rodrigo.rocha@rainbow.com',
        role: 'user',
        defaultRegion: 'Cerrado Norte'
      },
      {
        id: 4,
        username: 'gilberto.silva',
        password: '123',
        name: 'Gilberto Silva',
        email: 'gilberto.silva@rainbow.com',
        role: 'user',
        defaultRegion: 'Cerrado Norte'
      },
      {
        id: 5,
        username: 'raphael.siqueira',
        password: '123',
        name: 'Raphael Siqueira',
        email: 'raphael.siqueira@rainbow.com',
        role: 'user',
        defaultRegion: 'Cerrado Norte'
      },
      {
        id: 6,
        username: 'layson.costa',
        password: '123',
        name: 'Layson Costa',
        email: 'layson.costa@rainbow.com',
        role: 'user',
        defaultRegion: 'Cerrado Norte'
      },
      {
        id: 7,
        username: 'marcos.martins',
        password: '123',
        name: 'Marcos Martins',
        email: 'marcos.martins@rainbow.com',
        role: 'user',
        defaultRegion: 'Cerrado Centro'
      },
      {
        id: 8,
        username: 'ademir.borghi',
        password: '123',
        name: 'Ademir Borghi',
        email: 'ademir.borghi@rainbow.com',
        role: 'user',
        defaultRegion: 'Cerrado Centro'
      },
      {
        id: 9,
        username: 'giovani.cavalari',
        password: '123',
        name: 'Giovani Cavalari',
        email: 'giovani.cavalari@rainbow.com',
        role: 'user',
        defaultRegion: 'Cerrado Centro'
      },
      {
        id: 10,
        username: 'marcus.palomares',
        password: '123',
        name: 'Marcus Palomares',
        email: 'marcus.palomares@rainbow.com',
        role: 'user',
        defaultRegion: 'Cerrado Centro'
      },
      {
        id: 11,
        username: 'leonardo.alexandrino',
        password: '123',
        name: 'Leonardo Alexandrino',
        email: 'leonardo.alexandrino@rainbow.com',
        role: 'user',
        defaultRegion: 'Cerrado Centro'
      },
      {
        id: 12,
        username: 'felipe.lima',
        password: '123',
        name: 'Felipe Lima',
        email: 'felipe.lima@rainbow.com',
        role: 'user',
        defaultRegion: 'Cerrado Centro'
      },
      {
        id: 13,
        username: 'ricsandrelly.vilela',
        password: '123',
        name: 'Ricsandrelly Vilela',
        email: 'ricsandrelly.vilela@rainbow.com',
        role: 'user',
        defaultRegion: 'Cerrado Centro'
      },
      {
        id: 14,
        username: 'gustavo.avila',
        password: '123',
        name: 'Gustavo Avila',
        email: 'gustavo.avila@rainbow.com',
        role: 'user',
        defaultRegion: 'Cana'
      },
      {
        id: 15,
        username: 'eduardo.martelli',
        password: '123',
        name: 'Eduardo Martelli',
        email: 'eduardo.martelli@rainbow.com',
        role: 'user',
        defaultRegion: 'Cana'
      },
      {
        id: 16,
        username: 'artur.cunha',
        password: '123',
        name: 'Artur Cunha',
        email: 'artur.cunha@rainbow.com',
        role: 'user',
        defaultRegion: 'Cana'
      },
      {
        id: 17,
        username: 'adriano.oliani',
        password: '123',
        name: 'Adriano Oliani',
        email: 'adriano.oliani@rainbow.com',
        role: 'user',
        defaultRegion: 'Cana'
      },
      {
        id: 18,
        username: 'elcio.daroz',
        password: '123',
        name: 'Elcio Daroz',
        email: 'elcio.daroz@rainbow.com',
        role: 'user',
        defaultRegion: 'Cana'
      },
      {
        id: 19,
        username: 'pamela.andrade',
        password: '123',
        name: 'Pamela Andrade',
        email: 'pamela.andrade@rainbow.com',
        role: 'user',
        defaultRegion: 'Cana'
      },
      {
        id: 20,
        username: 'eric.arantes',
        password: '123',
        name: 'Eric Arantes',
        email: 'eric.arantes@rainbow.com',
        role: 'user',
        defaultRegion: 'Cana'
      },
      {
        id: 21,
        username: 'ricardo.goncalves',
        password: '123',
        name: 'Ricardo Gonçalves',
        email: 'ricardo.goncalves@rainbow.com',
        role: 'user',
        defaultRegion: 'Cana'
      },
      {
        id: 22,
        username: 'letieri.augusto',
        password: '123',
        name: 'Letieri Augusto',
        email: 'letieri.augusto@rainbow.com',
        role: 'user',
        defaultRegion: 'Cana'
      },
      {
        id: 23,
        username: 'celso.junior',
        password: '123',
        name: 'Celso Junior',
        email: 'celso.junior@rainbow.com',
        role: 'user',
        defaultRegion: 'MT'
      },
      {
        id: 24,
        username: 'joao.neto',
        password: '123',
        name: 'João Neto',
        email: 'joao.neto@rainbow.com',
        role: 'user',
        defaultRegion: 'MT'
      },
      {
        id: 25,
        username: 'fernando.souza',
        password: '123',
        name: 'Fernando Souza',
        email: 'fernando.souza@rainbow.com',
        role: 'user',
        defaultRegion: 'MT'
      },
      {
        id: 26,
        username: 'ronaldo.americo',
        password: '123',
        name: 'Ronaldo Américo',
        email: 'ronaldo.americo@rainbow.com',
        role: 'user',
        defaultRegion: 'MT'
      },
      {
        id: 27,
        username: 'willian.quinteiro',
        password: '123',
        name: 'Willian Quinteiro',
        email: 'willian.quinteiro@rainbow.com',
        role: 'user',
        defaultRegion: 'MT'
      },
      {
        id: 28,
        username: 'thiago.silva',
        password: '123',
        name: 'Thiago Silva',
        email: 'thiago.silva@rainbow.com',
        role: 'user',
        defaultRegion: 'MT'
      },
      {
        id: 29,
        username: 'antonio.neto',
        password: '123',
        name: 'Antonio Neto',
        email: 'antonio.neto@rainbow.com',
        role: 'user',
        defaultRegion: 'MT'
      },
      {
        id: 30,
        username: 'luciano.juchem',
        password: '123',
        name: 'Luciano Juchem',
        email: 'luciano.juchem@rainbow.com',
        role: 'user',
        defaultRegion: 'MT'
      },
      {
        id: 31,
        username: 'jose.edberto',
        password: '123',
        name: 'José Edberto',
        email: 'jose.edberto@rainbow.com',
        role: 'user',
        defaultRegion: 'Sul'
      },
      {
        id: 32,
        username: 'lucas.calixto',
        password: '123',
        name: 'Lucas Calixto',
        email: 'lucas.calixto@rainbow.com',
        role: 'user',
        defaultRegion: 'Sul'
      },
      {
        id: 33,
        username: 'rodrigo.wolfman',
        password: '123',
        name: 'Rodrigo Wolfman',
        email: 'rodrigo.wolfman@rainbow.com',
        role: 'user',
        defaultRegion: 'Sul'
      },
      {
        id: 34,
        username: 'rodrigo.marcondes',
        password: '123',
        name: 'Rodrigo Marcondes',
        email: 'rodrigo.marcondes@rainbow.com',
        role: 'user',
        defaultRegion: 'Sul'
      },
      {
        id: 35,
        username: 'marcela.rodrigues',
        password: '123',
        name: 'Marcela Rodrigues',
        email: 'marcela.rodrigues@rainbow.com',
        role: 'user',
        defaultRegion: 'Sul'
      },
      {
        id: 36,
        username: 'leandro.almeida',
        password: '123',
        name: 'Leandro Almeida',
        email: 'leandro.almeida@rainbow.com',
        role: 'user',
        defaultRegion: 'Sul'
      },
      {
        id: 37,
        username: 'filipe.campos',
        password: '123',
        name: 'Filipe Campos',
        email: 'filipe.campos@rainbow.com',
        role: 'user',
        defaultRegion: 'KA'
      },
      {
        id: 38,
        username: 'ricardo.leite',
        password: '123',
        name: 'Ricardo Leite',
        email: 'ricardo.leite@rainbow.com',
        role: 'user',
        defaultRegion: 'KA'
      },
      {
        id: 39,
        username: 'jose.barbosa',
        password: '123',
        name: 'Jose Barbosa',
        email: 'jose.barbosa@rainbow.com',
        role: 'user',
        defaultRegion: 'KA'
      },
      {
        id: 40,
        username: 'nilson.liasch',
        password: '123',
        name: 'Nilson Liasch',
        email: 'nilson.liasch@rainbow.com',
        role: 'user',
        defaultRegion: 'KA'
      },
      {
        id: 41,
        username: 'fabio.taniguti',
        password: '123',
        name: 'Fábio Taniguti',
        email: 'fabio.taniguti@rainbow.com',
        role: 'user',
        defaultRegion: 'KA'
      }
    ]
  }),

  actions: {
    async login(username: string, password: string) {
      const user = this.users.find(u => u.username === username && u.password === password)
      
      if (user) {
        this.user = user
        this.isAuthenticated = true
        
        // Store in localStorage for persistence
        if (process.client) {
          localStorage.setItem('rainbow_user', JSON.stringify(user))
        }
        
        return true
      }
      
      return false
    },

    async logout() {
      this.user = null
      this.isAuthenticated = false
      
      if (process.client) {
        localStorage.removeItem('rainbow_user')
      }
    },

    async checkAuth() {
      if (process.client) {
        try {
          const stored = localStorage.getItem('rainbow_user')
          if (stored) {
            const user = JSON.parse(stored)
            // Verify user still exists in our users array
            const validUser = this.users.find(u => u.id === user.id)
            if (validUser) {
              this.user = user
              this.isAuthenticated = true
            } else {
              // User no longer valid, clear storage
              localStorage.removeItem('rainbow_user')
            }
          }
        } catch (error) {
          // Clear corrupted data
          localStorage.removeItem('rainbow_user')
        }
      }
    }
  }
})
