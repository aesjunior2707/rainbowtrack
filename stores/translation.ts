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
          tracking: 'Rastreamento',
          customers: 'Clientes',
          catalog: 'Catálogo'
        },
        dashboard: {
          title: 'Dashboard - Rainbow Track',
          welcome: 'Bem-vindo ao Rainbow Track, {name}!',
          sales_month: 'Vendas deste Mês',
          goals_achieved: 'Metas Alcançadas',
          active_deals: 'Negócios Ativos',
          customers: 'Clientes',
          recent_deals: 'Negócios Recentes',
          top_products: 'Produtos Mais Vendidos',
          quick_actions: 'Ações Rápidas',
          new_deal: 'Novo Negócio',
          new_customer: 'Novo Cliente',
          products: 'Produtos'
        },
        deals: {
          title: 'Rastreamento de Negócios',
          new_deal: 'Novo Negócio',
          new_tracking: 'Novo Rastreamento',
          deal_number: 'Negócio #{id}',
          order_date: 'Data do Pedido:',
          delivery_date: 'Data de Entrega:',
          payment_method: 'Método de Pagamento:',
          payment_terms: 'Condições:',
          products: 'Produtos:',
          additional_products: '+{count} produto(s) adicional(is)',
          sent_by_email: 'Enviado por email',
          no_deals: 'Nenhum negócio encontrado',
          create_first: 'Criar Primeiro Negócio',
          back: 'Voltar',
          customer: 'Cliente',
          select_customer: 'Selecionar Cliente',
          deal_details: 'Detalhes do Negócio',
          select_payment_method: 'Selecionar Método de Pagamento',
          select_payment_terms: 'Selecionar Condições de Pagamento',
          send_by_email: 'Enviar por Email',
          cancel: 'Cancelar',
          confirm_deal: 'Confirmar Negócio'
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
          tracking: 'Tracking',
          customers: 'Customers',
          catalog: 'Catalog'
        },
        dashboard: {
          title: 'Dashboard - Rainbow Track',
          welcome: 'Welcome to Rainbow Track, {name}!',
          sales_month: 'Sales This Month',
          goals_achieved: 'Goals Achieved',
          active_deals: 'Active Deals',
          customers: 'Customers',
          recent_deals: 'Recent Deals',
          top_products: 'Top Products',
          quick_actions: 'Quick Actions',
          new_deal: 'New Deal',
          new_customer: 'New Customer',
          products: 'Products'
        },
        deals: {
          title: 'Deal Tracking',
          new_deal: 'New Deal',
          new_tracking: 'New Tracking',
          deal_number: 'Deal #{id}',
          order_date: 'Order Date:',
          delivery_date: 'Delivery Date:',
          payment_method: 'Payment Method:',
          payment_terms: 'Terms:',
          products: 'Products:',
          additional_products: '+{count} additional product(s)',
          sent_by_email: 'Sent by email',
          no_deals: 'No deals found',
          create_first: 'Create First Deal',
          back: 'Back',
          customer: 'Customer',
          select_customer: 'Select Customer',
          deal_details: 'Deal Details',
          select_payment_method: 'Select Payment Method',
          select_payment_terms: 'Select Payment Terms',
          send_by_email: 'Send by Email',
          cancel: 'Cancel',
          confirm_deal: 'Confirm Deal'
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
          tracking: 'Seguimiento',
          customers: 'Clientes',
          catalog: 'Catálogo'
        },
        dashboard: {
          title: 'Panel - Rainbow Track',
          welcome: '¡Bienvenido a Rainbow Track, {name}!',
          sales_month: 'Ventas Este Mes',
          goals_achieved: 'Metas Alcanzadas',
          active_deals: 'Negocios Activos',
          customers: 'Clientes',
          recent_deals: 'Negocios Recientes',
          top_products: 'Productos Principales',
          quick_actions: 'Acciones Rápidas',
          new_deal: 'Nuevo Negocio',
          new_customer: 'Nuevo Cliente',
          products: 'Productos'
        },
        deals: {
          title: 'Seguimiento de Negocios',
          new_deal: 'Nuevo Negocio',
          new_tracking: 'Nuevo Seguimiento',
          deal_number: 'Negocio #{id}',
          order_date: 'Fecha del Pedido:',
          delivery_date: 'Fecha de Entrega:',
          payment_method: 'Método de Pago:',
          payment_terms: 'Condiciones:',
          products: 'Productos:',
          additional_products: '+{count} producto(s) adicional(es)',
          sent_by_email: 'Enviado por email',
          no_deals: 'No se encontraron negocios',
          create_first: 'Crear Primer Negocio',
          back: 'Volver',
          customer: 'Cliente',
          select_customer: 'Seleccionar Cliente',
          deal_details: 'Detalles del Negocio',
          select_payment_method: 'Seleccionar Método de Pago',
          select_payment_terms: 'Seleccionar Condiciones de Pago',
          send_by_email: 'Enviar por Email',
          cancel: 'Cancelar',
          confirm_deal: 'Confirmar Negocio'
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
          tracking: '跟踪',
          customers: '客户',
          catalog: '目录'
        },
        dashboard: {
          title: '仪表板 - Rainbow Track',
          welcome: '欢迎使用 Rainbow Track，{name}！',
          sales_month: '本月销售额',
          goals_achieved: '目标达成',
          active_deals: '活跃交易',
          customers: '客户',
          recent_deals: '最近交易',
          top_products: '热门产品',
          quick_actions: '快速操作',
          new_deal: '新交易',
          new_customer: '新客户',
          products: '产品'
        },
        deals: {
          title: '交易跟踪',
          new_deal: '新交易',
          new_tracking: '新跟踪',
          deal_number: '交易 #{id}',
          order_date: '订单日期：',
          delivery_date: '交付日期：',
          payment_method: '付款方式：',
          payment_terms: '付款条件：',
          products: '产品：',
          additional_products: '+{count} 个其他产品',
          sent_by_email: '已通过邮件发送',
          no_deals: '未找到交易',
          create_first: '创建第一个交易',
          back: '返回',
          customer: '客户',
          select_customer: '选择客户',
          deal_details: '交易详情',
          select_payment_method: '选择付款方式',
          select_payment_terms: '选择付款条件',
          send_by_email: '通过邮件发送',
          cancel: '取消',
          confirm_deal: '确认交易'
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