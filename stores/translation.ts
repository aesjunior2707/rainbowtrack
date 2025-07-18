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
          tracking: 'Relatórios de Preços',
          customers: 'Clientes',
          catalog: 'Catálogo',
          competitors: 'Concorrentes'
        },
        dashboard: {
          title: 'Inteligência Competitiva - Rainbow Track',
          welcome: 'Bem-vindo ao Rainbow Track, {name}!',
          price_reports_month: 'Relatórios este Mês',
          verified_reports: 'Relatórios Verificados',
          active_competitors: 'Concorrentes Ativos',
          customers: 'Clientes',
          recent_reports: 'Relatórios Recentes',
          competitor_ranking: 'Ranking de Concorrentes',
          quick_actions: 'Ações Rápidas',
          new_report: 'Novo Relatório',
          new_customer: 'Novo Cliente',
          products: 'Produtos',
          price_trends: 'Tendências de Preços',
          market_analysis: 'Análise de Mercado'
        },
        reports: {
          title: 'Relatórios de Preços',
          new_report: 'Novo Relatório',
          report_number: 'Relatório #{id}',
          report_date: 'Data do Relatório:',
          competitor: 'Concorrente:',
          competitor_price: 'Preço do Concorrente:',
          our_price: 'Nosso Preço:',
          customer: 'Cliente:',
          product: 'Produto:',
          currency: 'Moeda:',
          region: 'Região:',
          notes: 'Observações:',
          verified: 'Verificado',
          no_reports: 'Nenhum relatório encontrado',
          create_first: 'Criar Primeiro Relatório',
          back: 'Voltar',
          select_customer: 'Selecionar Cliente',
          select_competitor: 'Selecionar Concorrente',
          select_product: 'Selecionar Produto',
          select_currency: 'Selecionar Moeda',
          report_details: 'Detalhes do Relatório',
          cancel: 'Cancelar',
          confirm_report: 'Confirmar Relatório',
          price_difference: 'Diferença de Preço',
          competitive_advantage: 'Vantagem Competitiva',
          competitive_disadvantage: 'Desvantagem Competitiva'
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
          report_count: 'Relatórios Coletados',
          avg_price: 'Preço Médio',
          no_competitors: 'Nenhum concorrente encontrado',
          types: {
            manufacturer: 'Fabricante',
            distributor: 'Distribuidor',
            retailer: 'Varejista',
            cooperative: 'Cooperativa'
          }
        },
        customers: {
          title: 'Clientes - Rainbow Track',
          new_customer: 'Novo Cliente',
          search: 'Pesquisar',
          no_customers: 'Nenhum cliente encontrado',
          name: 'Nome',
          company: 'Empresa',
          email: 'Email',
          phone: 'Telefone',
          address: 'Endereço',
          save: 'Salvar',
          cancel: 'Cancelar'
        },
        products: {
          title: 'Catálogo de Produtos',
          category: 'Categoria',
          search: 'Buscar produtos...',
          price: 'Preço:',
          packaging: 'Embalagem:',
          registered_crops: 'Cultivos Registrados:',
          add_product: 'Adicionar Produto',
          selected_products: '{count} produto(s) selecionado(s)',
          quantity: 'Qty:',
          total: 'Total: R$ {amount}',
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
          tracking: 'Price Reports',
          customers: 'Customers',
          catalog: 'Catalog',
          competitors: 'Competitors'
        },
        dashboard: {
          title: 'Competitive Intelligence - Rainbow Track',
          welcome: 'Welcome to Rainbow Track, {name}!',
          price_reports_month: 'Reports This Month',
          verified_reports: 'Verified Reports',
          active_competitors: 'Active Competitors',
          customers: 'Customers',
          recent_reports: 'Recent Reports',
          competitor_ranking: 'Competitor Ranking',
          quick_actions: 'Quick Actions',
          new_report: 'New Report',
          new_customer: 'New Customer',
          products: 'Products',
          price_trends: 'Price Trends',
          market_analysis: 'Market Analysis'
        },
        reports: {
          title: 'Price Reports',
          new_report: 'New Report',
          report_number: 'Report #{id}',
          report_date: 'Report Date:',
          competitor: 'Competitor:',
          competitor_price: 'Competitor Price:',
          our_price: 'Our Price:',
          customer: 'Customer:',
          product: 'Product:',
          currency: 'Currency:',
          region: 'Region:',
          notes: 'Notes:',
          verified: 'Verified',
          no_reports: 'No reports found',
          create_first: 'Create First Report',
          back: 'Back',
          select_customer: 'Select Customer',
          select_competitor: 'Select Competitor',
          select_product: 'Select Product',
          select_currency: 'Select Currency',
          report_details: 'Report Details',
          cancel: 'Cancel',
          confirm_report: 'Confirm Report',
          price_difference: 'Price Difference',
          competitive_advantage: 'Competitive Advantage',
          competitive_disadvantage: 'Competitive Disadvantage'
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
          report_count: 'Reports Collected',
          avg_price: 'Average Price',
          no_competitors: 'No competitors found',
          types: {
            manufacturer: 'Manufacturer',
            distributor: 'Distributor',
            retailer: 'Retailer',
            cooperative: 'Cooperative'
          }
        },
        customers: {
          title: 'Customers - Rainbow Track',
          new_customer: 'New Customer',
          search: 'Search',
          no_customers: 'No customers found',
          name: 'Name',
          company: 'Company',
          email: 'Email',
          phone: 'Phone',
          address: 'Address',
          save: 'Save',
          cancel: 'Cancel'
        },
        products: {
          title: 'Product Catalog',
          category: 'Category',
          search: 'Search products...',
          price: 'Price:',
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
          tracking: 'Informes de Precios',
          customers: 'Clientes',
          catalog: 'Catálogo',
          competitors: 'Competidores'
        },
        dashboard: {
          title: 'Inteligencia Competitiva - Rainbow Track',
          welcome: '¡Bienvenido a Rainbow Track, {name}!',
          price_reports_month: 'Informes Este Mes',
          verified_reports: 'Informes Verificados',
          active_competitors: 'Competidores Activos',
          customers: 'Clientes',
          recent_reports: 'Informes Recientes',
          competitor_ranking: 'Ranking de Competidores',
          quick_actions: 'Acciones Rápidas',
          new_report: 'Nuevo Informe',
          new_customer: 'Nuevo Cliente',
          products: 'Productos',
          price_trends: 'Tendencias de Precios',
          market_analysis: 'Análisis de Mercado'
        },
        reports: {
          title: 'Informes de Precios',
          new_report: 'Nuevo Informe',
          report_number: 'Informe #{id}',
          report_date: 'Fecha del Informe:',
          competitor: 'Competidor:',
          competitor_price: 'Precio del Competidor:',
          our_price: 'Nuestro Precio:',
          customer: 'Cliente:',
          product: 'Producto:',
          currency: 'Moneda:',
          region: 'Región:',
          notes: 'Notas:',
          verified: 'Verificado',
          no_reports: 'No se encontraron informes',
          create_first: 'Crear Primer Informe',
          back: 'Volver',
          select_customer: 'Seleccionar Cliente',
          select_competitor: 'Seleccionar Competidor',
          select_product: 'Seleccionar Producto',
          select_currency: 'Seleccionar Moneda',
          report_details: 'Detalles del Informe',
          cancel: 'Cancelar',
          confirm_report: 'Confirmar Informe',
          price_difference: 'Diferencia de Precio',
          competitive_advantage: 'Ventaja Competitiva',
          competitive_disadvantage: 'Desventaja Competitiva'
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
          report_count: 'Informes Recolectados',
          avg_price: 'Precio Promedio',
          no_competitors: 'No se encontraron competidores',
          types: {
            manufacturer: 'Fabricante',
            distributor: 'Distribuidor',
            retailer: 'Minorista',
            cooperative: 'Cooperativa'
          }
        },
        customers: {
          title: 'Clientes - Rainbow Track',
          new_customer: 'Nuevo Cliente',
          search: 'Buscar',
          no_customers: 'No se encontraron clientes',
          name: 'Nombre',
          company: 'Empresa',
          email: 'Email',
          phone: 'Teléfono',
          address: 'Dirección',
          save: 'Guardar',
          cancel: 'Cancelar'
        },
        products: {
          title: 'Catálogo de Productos',
          category: 'Categoría',
          search: 'Buscar productos...',
          price: 'Precio:',
          packaging: 'Empaque:',
          registered_crops: 'Cultivos Registrados:',
          add_product: 'Agregar Producto',
          selected_products: '{count} producto(s) seleccionado(s)',
          quantity: 'Cant:',
          total: 'Total: ${amount}',
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
          tracking: '价格报告',
          customers: '客户',
          catalog: '目录',
          competitors: '竞争对手'
        },
        dashboard: {
          title: '竞争情报 - Rainbow Track',
          welcome: '欢迎使用 Rainbow Track，{name}！',
          price_reports_month: '本月报告',
          verified_reports: '已验证报告',
          active_competitors: '活跃竞争对手',
          customers: '客户',
          recent_reports: '最近报告',
          competitor_ranking: '竞争对手排名',
          quick_actions: '快速操作',
          new_report: '新报告',
          new_customer: '新客户',
          products: '产品',
          price_trends: '价格趋势',
          market_analysis: '市场分析'
        },
        reports: {
          title: '价格报告',
          new_report: '新报告',
          report_number: '报告 #{id}',
          report_date: '报告日期：',
          competitor: '竞争对手：',
          competitor_price: '竞争对手价格：',
          our_price: '我们的价格：',
          customer: '客户：',
          product: '产品：',
          currency: '货币：',
          region: '地区：',
          notes: '备注：',
          verified: '已验证',
          no_reports: '未找到报告',
          create_first: '创建第一个报告',
          back: '返回',
          select_customer: '选择客户',
          select_competitor: '选择竞争对手',
          select_product: '选择产品',
          select_currency: '选择货币',
          report_details: '报告详情',
          cancel: '取消',
          confirm_report: '确认报告',
          price_difference: '价格差异',
          competitive_advantage: '竞争优势',
          competitive_disadvantage: '竞争劣势'
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
          report_count: '收集的报告',
          avg_price: '平均价格',
          no_competitors: '未找到竞争对手',
          types: {
            manufacturer: '制造商',
            distributor: '分销商',
            retailer: '零售商',
            cooperative: '合作社'
          }
        },
        customers: {
          title: '客户 - Rainbow Track',
          new_customer: '新客户',
          search: '搜索',
          no_customers: '未找到客户',
          name: '姓名',
          company: '公司',
          email: '邮箱',
          phone: '电话',
          address: '地址',
          save: '保存',
          cancel: '取消'
        },
        products: {
          title: '产品目录',
          category: '类别',
          search: '搜索产品...',
          price: '价格：',
          packaging: '包装：',
          registered_crops: '注册作物：',
          add_product: '添加产品',
          selected_products: '已选择 {count} 个产品',
          quantity: '数量：',
          total: '总计：¥{amount}',
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