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
          price_trends: 'Tendências de Preços',
          market_analysis: 'Análise de Mercado',
          market_intelligence: 'Análise de Market Intelligence • Dados Consolidados',
          geographic_analysis: 'Análise Geoespacial',
          select_visualization: 'Selecione a visualização para análise estratégica',
          visualization: 'Visualização',
          geographic_distribution: 'Distribuição Geográfica',
          density_analysis: 'Análise de Densidade'
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
          confirm_report: 'Confirmar Captura',
          all_competitors: 'Todos os Concorrentes',
          all_regions: 'Todas as Regiões',
          all_status: 'Todos os Status',
          pending: 'Pendentes'
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
          select_region: 'Selecionar Região',
          search_placeholder: 'Pesquisar concorrentes...',
          all_types: 'Todos os Tipos',
          all_regions: 'Todas as Regiões',
          types: {
            manufacturer: 'Fabricante',
            distributor: 'Distribuidor',
            retailer: 'Varejista',
            cooperative: 'Cooperativa'
          },
          regions: {
            reg001: 'Região 001',
            reg002: 'Região 002',
            reg003: 'Região 003'
          }
        },
        products: {
          title: 'Catálogo de Produtos',
          category: 'Categoria',
          search: 'Buscar produtos...',
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
        },
        maps: {
          territorial_distribution: 'Distribuição Territorial de Capturas Competitivas',
          competitive_density: 'Análise de Densidade Competitiva por Região',
          no_data: 'Sem dados',
          low_density: 'Baixa densidade',
          medium_density: 'Densidade média',
          high_density: 'Alta densidade',
          total_volume: 'Volume Total',
          consolidated_volume: 'Volume Consolidado',
          active_regions: 'Regiões Ativas',
          operating_regions: 'Regiões em Operação',
          regional_leader: 'Líder Regional',
          featured_region: 'Região de Destaque',
          performance_index: 'Índice de Performance',
          efficiency_indicator: 'Indicador de Eficiência',
          heat_map_brazil: 'Mapa de Calor - Brasil',
          strategic_analysis: 'Análise estratégica de performance territorial',
          detailed_breakdown: 'Breakdown Regional Detalhado',
          captures: 'Capturas',
          participation: 'Participação'
        },
        pwa: {
          install_title: 'Instalar Rainbow Track',
          install_description: 'Acesso rápido sem navegador',
          install: 'Instalar',
          offline_mode: 'Modo offline - Algumas funcionalidades podem estar limitadas'
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
          price_trends: 'Price Trends',
          market_analysis: 'Market Analysis',
          market_intelligence: 'Market Intelligence Analysis • Consolidated Data',
          geographic_analysis: 'Geospatial Analysis',
          select_visualization: 'Select visualization for strategic analysis',
          visualization: 'Visualization',
          geographic_distribution: 'Geographic Distribution',
          density_analysis: 'Density Analysis'
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
          confirm_report: 'Confirm Capture',
          all_competitors: 'All Competitors',
          all_regions: 'All Regions',
          all_status: 'All Status',
          pending: 'Pending'
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
          select_region: 'Select Region',
          search_placeholder: 'Search competitors...',
          all_types: 'All Types',
          all_regions: 'All Regions',
          types: {
            manufacturer: 'Manufacturer',
            distributor: 'Distributor',
            retailer: 'Retailer',
            cooperative: 'Cooperative'
          },
          regions: {
            reg001: 'Region 001',
            reg002: 'Region 002',
            reg003: 'Region 003'
          }
        },
        products: {
          title: 'Product Catalog',
          category: 'Category',
          search: 'Search products...',
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
        },
        maps: {
          territorial_distribution: 'Territorial Distribution of Competitive Captures',
          competitive_density: 'Competitive Density Analysis by Region',
          no_data: 'No data',
          low_density: 'Low density',
          medium_density: 'Medium density',
          high_density: 'High density',
          total_volume: 'Total Volume',
          consolidated_volume: 'Consolidated Volume',
          active_regions: 'Active Regions',
          operating_regions: 'Operating Regions',
          regional_leader: 'Regional Leader',
          featured_region: 'Featured Region',
          performance_index: 'Performance Index',
          efficiency_indicator: 'Efficiency Indicator',
          heat_map_brazil: 'Heat Map - Brazil',
          strategic_analysis: 'Strategic analysis of territorial performance',
          detailed_breakdown: 'Detailed Regional Breakdown',
          captures: 'Captures',
          participation: 'Participation'
        },
        pwa: {
          install_title: 'Install Rainbow Track',
          install_description: 'Quick access without browser',
          install: 'Install',
          offline_mode: 'Offline mode - Some features may be limited'
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
          price_trends: 'Tendencias de Precios',
          market_analysis: 'Análisis de Mercado',
          market_intelligence: 'Análisis de Inteligencia de Mercado • Datos Consolidados',
          geographic_analysis: 'Análisis Geoespacial',
          select_visualization: 'Seleccione la visualización para análisis estratégico',
          visualization: 'Visualización',
          geographic_distribution: 'Distribución Geográfica',
          density_analysis: 'Análisis de Densidad'
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
          confirm_report: 'Confirmar Captura',
          all_competitors: 'Todos los Competidores',
          all_regions: 'Todas las Regiones',
          all_status: 'Todos los Estados',
          pending: 'Pendientes'
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
          select_region: 'Seleccionar Región',
          search_placeholder: 'Buscar competidores...',
          all_types: 'Todos los Tipos',
          all_regions: 'Todas las Regiones',
          types: {
            manufacturer: 'Fabricante',
            distributor: 'Distribuidor',
            retailer: 'Minorista',
            cooperative: 'Cooperativa'
          },
          regions: {
            reg001: 'Región 001',
            reg002: 'Región 002',
            reg003: 'Región 003'
          }
        },
        products: {
          title: 'Catálogo de Productos',
          category: 'Categoría',
          search: 'Buscar productos...',
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
        },
        maps: {
          territorial_distribution: 'Distribución Territorial de Capturas Competitivas',
          competitive_density: 'Análisis de Densidad Competitiva por Región',
          no_data: 'Sin datos',
          low_density: 'Baja densidad',
          medium_density: 'Densidad media',
          high_density: 'Alta densidad',
          total_volume: 'Volumen Total',
          consolidated_volume: 'Volumen Consolidado',
          active_regions: 'Regiones Activas',
          operating_regions: 'Regiones en Operación',
          regional_leader: 'Líder Regional',
          featured_region: 'Región Destacada',
          performance_index: 'Índice de Rendimiento',
          efficiency_indicator: 'Indicador de Eficiencia',
          heat_map_brazil: 'Mapa de Calor - Brasil',
          strategic_analysis: 'Análisis estratégico del rendimiento territorial',
          detailed_breakdown: 'Desglose Regional Detallado',
          captures: 'Capturas',
          participation: 'Participación'
        },
        pwa: {
          install_title: 'Instalar Rainbow Track',
          install_description: 'Acceso rápido sin navegador',
          install: 'Instalar',
          offline_mode: 'Modo offline - Algunas funciones pueden estar limitadas'
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
          price_trends: '价格趋势',
          market_analysis: '市场分析',
          market_intelligence: '市场情报分析 • 综合数据',
          geographic_analysis: '地理空间分析',
          select_visualization: '选择可视化进��战略分析',
          visualization: '可视化',
          geographic_distribution: '地理分布',
          density_analysis: '密度分析'
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
          confirm_report: '确认捕获',
          all_competitors: '所有竞争对手',
          all_regions: '所有地区',
          all_status: '所有状态',
          pending: '待处理'
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
          report_count: '��集的捕获',
          no_competitors: '未找到竞争对手',
          select_region: '选择地区',
          search_placeholder: '搜索竞争对手...',
          all_types: '所有类型',
          all_regions: '所有地区',
          types: {
            manufacturer: '制造商',
            distributor: '分销商',
            retailer: '零售商',
            cooperative: '合作社'
          },
          regions: {
            reg001: '地区 001',
            reg002: '地区 002',
            reg003: '地区 003'
          }
        },
        products: {
          title: '产品目录',
          category: '类别',
          search: '搜索产品...',
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
        },
        maps: {
          territorial_distribution: '竞争捕获的领土分布',
          competitive_density: '按地区的竞争密度分析',
          no_data: '无数据',
          low_density: '低密度',
          medium_density: '中等密度',
          high_density: '高密度',
          total_volume: '总量',
          consolidated_volume: '综合量',
          active_regions: '活跃地区',
          operating_regions: '运营地区',
          regional_leader: '地区领导者',
          featured_region: '特色地区',
          performance_index: '性能指数',
          efficiency_indicator: '效率指标',
          heat_map_brazil: '热力图 - 巴西',
          strategic_analysis: '领土绩效战略分析',
          detailed_breakdown: '详细区域细分',
          captures: '捕获',
          participation: '参与'
        },
        pwa: {
          install_title: '安装 Rainbow Track',
          install_description: '无需浏览器快速访问',
          install: '安装',
          offline_mode: '离线模式 - 某些功能可能受限'
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
