import { defineStore } from 'pinia'

export const useTranslationStore = defineStore('translation', {
  state: () => ({
    currentLocale: 'pt-BR',
    translations: {
      'pt-BR': {
        app: {
          name: 'Rainbow Track',
          description: 'Sistema de Rastreamento e Vendas Agrícolas'
        },
        auth: {
          login: 'Entrar',
          username: 'Usuário',
          password: 'Senha',
          remember: 'Lembrar',
          forgot_password: 'Esqueceu a senha?',
          loading: 'Carregando...',
          invalid_credentials: 'Usuário ou senha inválidos',
          login_failed: 'Falha no login. Tente novamente.',
          demo_users: 'Usuários Demo:',
          logout: 'Sair'
        },
        navigation: {
          dashboard: 'Painel',
          tracking: 'Capturas',
          catalog: 'Catálogo',
          competitors: 'Concorrentes'
        },
        dashboard: {
          title: 'Inteligência Competitiva - Rainbow Track',
          welcome: 'Bem-vindo ao Rainbow Track, {name}!',
          price_reports_month: 'Capturas este Mês',
          verified_reports: 'Capturas Verificadas',
          active_competitors: 'Concorrentes Ativos',
          products: 'Produtos',
          recent_reports: 'Capturas Recentes',
          competitor_ranking: 'Ranking de Concorrentes',
          quick_actions: 'Ações Rápidas',
          new_report: 'Nova Captura',
          products: 'Produtos',
          price_trends: 'Tendências de Preços',
          market_analysis: 'Análise de Mercado'
        },
        reports: {
          title: 'Capturas',
          new_report: 'Nova Captura',
          report_number: 'Captura #{id}',
          report_date: 'Data da Captura:',
          competitor: 'Concorrente:',
          product: 'Produto:',
          region: 'Região:',
          notes: 'Observações:',
          verified: 'Verificado',
          no_reports: 'Nenhuma captura encontrada',
          create_first: 'Criar Primeira Captura',
          back: 'Voltar',
          select_competitor: 'Selecionar Concorrente',
          select_product: 'Selecionar Produto',
          report_details: 'Detalhes da Captura',
          cancel: 'Cancelar',
          confirm_report: 'Confirmar Captura'
        },
        competitors: {
          title: 'Concorrentes - Rainbow Track',
          new_competitor: 'Novo Concorrente',
          name: 'Nome',
          type: 'Tipo',
          region: 'Região',
          contact: 'Contato',
          phone: 'Telefone',
          market_share: 'Participação de Mercado (%)',
          report_count: 'Capturas Coletadas',
          no_competitors: 'Nenhum concorrente encontrado',
          types: {
            manufacturer: 'Fabricante',
            distributor: 'Distribuidor',
            retailer: 'Varejista',
            cooperative: 'Cooperativa'
          }
        },
        products: {
          title: 'Catálogo de Produtos',
          category: 'Categoria',
          search: 'Buscar produtos...',
          packaging: 'Embalagem:',
          registered_crops: 'Cultivos Registrados:',
          add_product: 'Adicionar Produto',
          selected_products: '{count} produto(s) selecionado(s)',
          quantity: 'Qty:',
          no_products: 'Nenhum produto encontrado',
          categories: {
            fungicides: 'Fungicidas',
            insecticides: 'Inseticidas',
            herbicides: 'Herbicidas'
          }
        },
        common: {
          view: 'Visualizar',
          edit: 'Editar',
          delete: 'Excluir',
          close: 'Fechar',
          save: 'Salvar',
          cancel: 'Cancelar',
          loading: 'Carregando...',
          search: 'Pesquisar',
          total: 'Total',
          date: 'Data',
          actions: 'Ações'
        }
      },
      'en': {
        app: {
          name: 'Rainbow Track',
          description: 'Agricultural Sales Tracking System'
        },
        auth: {
          login: 'Login',
          username: 'Username',
          password: 'Password',
          remember: 'Remember',
          forgot_password: 'Forgot password?',
          loading: 'Loading...',
          invalid_credentials: 'Invalid username or password',
          login_failed: 'Login failed. Please try again.',
          demo_users: 'Demo Users:',
          logout: 'Logout'
        },
        navigation: {
          dashboard: 'Dashboard',
          tracking: 'Captures',
          catalog: 'Catalog',
          competitors: 'Competitors'
        },
        dashboard: {
          title: 'Competitive Intelligence - Rainbow Track',
          welcome: 'Welcome to Rainbow Track, {name}!',
          price_reports_month: 'Captures This Month',
          verified_reports: 'Verified Captures',
          active_competitors: 'Active Competitors',
          products: 'Products',
          recent_reports: 'Recent Captures',
          competitor_ranking: 'Competitor Ranking',
          quick_actions: 'Quick Actions',
          new_report: 'New Capture',
          products: 'Products',
          price_trends: 'Price Trends',
          market_analysis: 'Market Analysis'
        },
        reports: {
          title: 'Captures',
          new_report: 'New Capture',
          report_number: 'Capture #{id}',
          report_date: 'Capture Date:',
          competitor: 'Competitor:',
          product: 'Product:',
          region: 'Region:',
          notes: 'Notes:',
          verified: 'Verified',
          no_reports: 'No captures found',
          create_first: 'Create First Capture',
          back: 'Back',
          select_competitor: 'Select Competitor',
          select_product: 'Select Product',
          report_details: 'Capture Details',
          cancel: 'Cancel',
          confirm_report: 'Confirm Capture'
        },
        competitors: {
          title: 'Competitors - Rainbow Track',
          new_competitor: 'New Competitor',
          name: 'Name',
          type: 'Type',
          region: 'Region',
          contact: 'Contact',
          phone: 'Phone',
          market_share: 'Market Share (%)',
          report_count: 'Captures Collected',
          no_competitors: 'No competitors found',
          types: {
            manufacturer: 'Manufacturer',
            distributor: 'Distributor',
            retailer: 'Retailer',
            cooperative: 'Cooperative'
          }
        },
        products: {
          title: 'Product Catalog',
          category: 'Category',
          search: 'Search products...',
          packaging: 'Packaging:',
          registered_crops: 'Registered Crops:',
          add_product: 'Add Product',
          selected_products: '{count} product(s) selected',
          quantity: 'Qty:',
          total: 'Total: ${amount}',
          no_products: 'No products found',
          categories: {
            fungicides: 'Fungicides',
            insecticides: 'Insecticides',
            herbicides: 'Herbicides'
          }
        },
        common: {
          view: 'View',
          edit: 'Edit',
          delete: 'Delete',
          close: 'Close',
          save: 'Save',
          cancel: 'Cancel',
          loading: 'Loading...',
          search: 'Search',
          total: 'Total',
          date: 'Date',
          actions: 'Actions'
        }
      },
      'es': {
        app: {
          name: 'Rainbow Track',
          description: 'Sistema de Seguimiento de Ventas Agrícolas'
        },
        auth: {
          login: 'Iniciar Sesión',
          username: 'Usuario',
          password: 'Contraseña',
          remember: 'Recordar',
          forgot_password: '¿Olvidaste la contraseña?',
          loading: 'Cargando...',
          invalid_credentials: 'Usuario o contraseña inválidos',
          login_failed: 'Error de inicio de sesión. Inténtalo de nuevo.',
          demo_users: 'Usuarios Demo:',
          logout: 'Cerrar Sesión'
        },
        navigation: {
          dashboard: 'Panel',
          tracking: 'Capturas',
          catalog: 'Catálogo',
          competitors: 'Competidores'
        },
        dashboard: {
          title: 'Inteligencia Competitiva - Rainbow Track',
          welcome: '¡Bienvenido a Rainbow Track, {name}!',
          price_reports_month: 'Capturas Este Mes',
          verified_reports: 'Capturas Verificadas',
          active_competitors: 'Competidores Activos',
          products: 'Productos',
          recent_reports: 'Capturas Recientes',
          competitor_ranking: 'Ranking de Competidores',
          quick_actions: 'Acciones Rápidas',
          new_report: 'Nueva Captura',
          products: 'Productos',
          price_trends: 'Tendencias de Precios',
          market_analysis: 'Análisis de Mercado'
        },
        reports: {
          title: 'Capturas',
          new_report: 'Nueva Captura',
          report_number: 'Captura #{id}',
          report_date: 'Fecha de la Captura:',
          competitor: 'Competidor:',
          product: 'Producto:',
          region: 'Región:',
          notes: 'Notas:',
          verified: 'Verificado',
          no_reports: 'No se encontraron capturas',
          create_first: 'Crear Primera Captura',
          back: 'Volver',
          select_competitor: 'Seleccionar Competidor',
          select_product: 'Seleccionar Producto',
          report_details: 'Detalles de la Captura',
          cancel: 'Cancelar',
          confirm_report: 'Confirmar Captura'
        },
        competitors: {
          title: 'Competidores - Rainbow Track',
          new_competitor: 'Nuevo Competidor',
          name: 'Nombre',
          type: 'Tipo',
          region: 'Región',
          contact: 'Contacto',
          phone: 'Teléfono',
          market_share: 'Participación de Mercado (%)',
          report_count: 'Capturas Recolectadas',
          avg_price: 'Precio Promedio',
          no_competitors: 'No se encontraron competidores',
          types: {
            manufacturer: 'Fabricante',
            distributor: 'Distribuidor',
            retailer: 'Minorista',
            cooperative: 'Cooperativa'
          }
        },
        products: {
          title: 'Catálogo de Productos',
          category: 'Categoría',
          search: 'Buscar productos...',
          packaging: 'Empaque:',
          registered_crops: 'Cultivos Registrados:',
          add_product: 'Agregar Producto',
          selected_products: '{count} producto(s) seleccionado(s)',
          quantity: 'Cant:',
          no_products: 'No se encontraron productos',
          categories: {
            fungicides: 'Fungicidas',
            insecticides: 'Insecticidas',
            herbicides: 'Herbicidas'
          }
        },
        common: {
          view: 'Ver',
          edit: 'Editar',
          delete: 'Eliminar',
          close: 'Cerrar',
          save: 'Guardar',
          cancel: 'Cancelar',
          loading: 'Cargando...',
          search: 'Buscar',
          total: 'Total',
          date: 'Fecha',
          actions: 'Acciones'
        }
      },
      'zh': {
        app: {
          name: 'Rainbow Track',
          description: '农业销售跟踪系统'
        },
        auth: {
          login: '登录',
          username: '用户名',
          password: '密码',
          remember: '记住我',
          forgot_password: '忘记密码？',
          loading: '加载中...',
          invalid_credentials: '用户名或密码无效',
          login_failed: '登录失败。请重试。',
          demo_users: '演示用户：',
          logout: '退出'
        },
        navigation: {
          dashboard: '仪表板',
          tracking: '捕获',
          catalog: '目录',
          competitors: '竞争对手'
        },
        dashboard: {
          title: '竞争情报 - Rainbow Track',
          welcome: '欢迎使用 Rainbow Track，{name}！',
          price_reports_month: '本月捕获',
          verified_reports: '已验证捕获',
          active_competitors: '活跃竞争对手',
          products: '产品',
          recent_reports: '最近捕获',
          competitor_ranking: '竞争对手排名',
          quick_actions: '快速操作',
          new_report: '新捕获',
          products: '产品',
          price_trends: '价格趋势',
          market_analysis: '市场分析'
        },
        reports: {
          title: '捕获',
          new_report: '新捕获',
          report_number: '捕获 #{id}',
          report_date: '捕获日期：',
          competitor: '竞争对手：',
          product: '产品：',
          region: '地区：',
          notes: '备注：',
          verified: '已验证',
          no_reports: '未找到捕获',
          create_first: '创建第一个捕获',
          back: '返回',
          select_competitor: '选择竞争对手',
          select_product: '选择产品',
          report_details: '捕获详情',
          cancel: '取消',
          confirm_report: '确认捕获'
        },
        competitors: {
          title: '竞争对手 - Rainbow Track',
          new_competitor: '新竞争对手',
          name: '名称',
          type: '类型',
          region: '地区',
          contact: '联系方式',
          phone: '电话',
          market_share: '市场份额 (%)',
          report_count: '收集的捕获',
          no_competitors: '未找到竞争对手',
          types: {
            manufacturer: '制造商',
            distributor: '分销商',
            retailer: '零售商',
            cooperative: '合作社'
          }
        },
        products: {
          title: '产品目录',
          category: '类别',
          search: '搜索产品...',
          packaging: '包装：',
          registered_crops: '注册作物：',
          add_product: '添加产品',
          selected_products: '已选择 {count} 个产品',
          quantity: '数量：',
          no_products: '未找到产品',
          categories: {
            fungicides: '杀菌剂',
            insecticides: '杀虫剂',
            herbicides: '除草剂'
          }
        },
        common: {
          view: '查看',
          edit: '编辑',
          delete: '删除',
          close: '关闭',
          save: '保存',
          cancel: '取消',
          loading: '加载中...',
          search: '搜索',
          total: '总计',
          date: '日期',
          actions: '操作'
        }
      }
    }
  }),

  actions: {
    setLocale(locale: string) {
      if (this.translations[locale]) {
        this.currentLocale = locale
        if (process.client) {
          localStorage.setItem('rainbow_locale', locale)
        }
      }
    },

    initLocale() {
      if (process.client) {
        const stored = localStorage.getItem('rainbow_locale')
        if (stored && this.translations[stored]) {
          this.currentLocale = stored
        }
      }
    },

    t(key: string, params?: Record<string, any>): string {
      const keys = key.split('.')
      let value = this.translations[this.currentLocale]
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k]
        } else {
          return key // Return key if translation not found
        }
      }
      
      if (typeof value === 'string' && params) {
        return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
          return params[paramKey] || match
        })
      }
      
      return typeof value === 'string' ? value : key
    }
  },

  getters: {
    availableLocales: () => [
      { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'es', name: 'Español', flag: '🇪🇸' },
      { code: 'zh', name: '中文', flag: '🇨🇳' }
    ],
    
    currentLocaleName(): string {
      const locale = this.availableLocales.find(l => l.code === this.currentLocale)
      return locale ? locale.name : 'Português'
    }
  }
})