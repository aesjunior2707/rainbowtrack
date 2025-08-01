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
        defaultRegion: 'Brasil'
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
