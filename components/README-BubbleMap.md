# Brazil Bubble Map Component

## Visão Geral

O componente `BrazilBubbleMap.vue` é um mapa interativo de bolhas que mostra a distribuição de capturas por estado brasileiro. Este componente é exibido exclusivamente para usuários com permissão de administrador.

## Funcionalidades

### 🗺️ Mapa Interativo
- **Visualização por Estados**: Mostra os principais estados do Brasil (MT, GO, MS, SP, RS, BA)
- **Bolhas Proporcionais**: O tamanho das bolhas varia conforme a quantidade de capturas
- **Cores Dinâmicas**: Sistema de cores baseado na intensidade dos dados
  - Cinza: 0 capturas
  - Verde claro: 1-5 capturas  
  - Verde médio: 6-15 capturas
  - Verde escuro: 16+ capturas

### 🎨 Design Moderno
- **Animações Sutis**: Efeito pulse nos círculos com delays escalonados
- **Gradiente de Fundo**: Fundo com gradiente elegante
- **Responsividade**: Adaptado para desktop e mobile
- **Sombras e Efeitos**: Drop shadow e hover effects

### 📊 Estatísticas em Tempo Real
- **Total de Capturas**: Soma de todas as capturas registradas
- **Estados Ativos**: Quantidade de estados com capturas
- **Estado Líder**: Estado com maior número de capturas
- **Média por Estado**: Média de capturas por estado ativo

### 🔍 Interatividade
- **Tooltip Dinâmico**: Ao passar o mouse, mostra:
  - Nome do estado
  - Número de capturas
  - Percentual do total
- **Click para Detalhes**: Click nos círculos mostra informações detalhadas
- **Hover Effects**: Efeitos visuais ao passar o mouse

## Tecnologias Utilizadas

- **Vue 3 Composition API**
- **SVG para o Mapa**: Renderização vetorial escalável
- **Tailwind CSS**: Sistema de cores e styling
- **Lucide Icons**: Ícones modernos
- **CSS Animations**: Animações personalizadas

## Integração com o Sistema

### Acesso Restrito
O componente só é exibido para usuários com `role === 'admin'`:

```vue
<div v-if="authStore.user?.role === 'admin'">
  <BrazilBubbleMap />
</div>
```

### Fonte de Dados
Os dados são obtidos automaticamente da store `dataStore.priceReports`, agrupando por estado baseado no campo `state` de cada relatório.

### Cores do Tema
Utiliza as cores primárias definidas no `tailwind.config.js`:
- `primary-200`: #99f6e4
- `primary-400`: #2dd4bf  
- `primary-600`: #006E68

## Performance

### Otimizações
- **Animações Desabilitadas**: Em telas menores para melhor performance
- **Computadas Reativas**: Dados calculados automaticamente
- **SVG Leve**: Mapa simplificado para carregamento rápido

### Responsividade
- Desktop: Mapa completo com animações
- Mobile: Versão otimizada sem animações
- Tooltip: Posicionamento adaptativo

## Extensibilidade

O componente pode ser facilmente estendido para:
- Adicionar mais estados
- Incluir filtros por período
- Mostrar diferentes métricas
- Integrar com mapas reais (Google Maps, Leaflet)
- Adicionar drill-down para cidades

## Exemplo de Uso

```vue
<template>
  <ClientOnly>
    <div v-if="authStore.user?.role === 'admin'">
      <BrazilBubbleMap />
    </div>
  </ClientOnly>
</template>
```

Este componente oferece uma experiência visual moderna e informativa para administradores analisarem a distribuição geográfica das capturas de forma intuitiva e atrativa.
