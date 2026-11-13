import type { CaseStudy } from "./types";

export const kdLux: CaseStudy = {
  overview:
    "Loja virtual de semijoias desenvolvida de ponta a ponta com Next.js (App Router), TypeScript e PostgreSQL. Cobre catálogo com variações, conta de usuário, carrinho, checkout com Mercado Pago e Melhor Envio, painel administrativo, webhooks de pagamento e rastreio e e-mails transacionais.",
  architecture: {
    caption: "Componentes e integrações da loja",
    description:
      "O navegador acessa o Next.js. O servidor usa PostgreSQL via Prisma, Redis para carrinho, checkout, limites e cache de token, e integra Mercado Pago, Melhor Envio, ViaCEP, Resend e Cloudinary. Mercado Pago e Melhor Envio retornam webhooks aos Route Handlers.",
    nodes: [
      {
        title: "Navegador",
        details: ["Catálogo e checkout"],
        center: [94, 174],
        mobileCenter: [160, 58],
      },
      {
        title: "Next.js",
        details: [
          "Componentes de servidor",
          "Server Actions",
          "Route Handlers",
        ],
        center: [318, 174],
        mobileCenter: [160, 178],
      },
      {
        title: "PostgreSQL",
        details: ["Prisma"],
        center: [632, 60],
        mobileCenter: [82, 318],
      },
      {
        title: "Redis",
        details: ["Carrinho · cache · limites"],
        center: [632, 169],
        mobileCenter: [238, 318],
      },
      {
        title: "Serviços externos",
        details: [
          "Mercado Pago · Melhor Envio",
          "ViaCEP · Resend · Cloudinary",
        ],
        center: [632, 278],
        mobileCenter: [160, 440],
      },
    ],
    connections: [
      { desktop: "M180 174H220", mobile: "M160 94V128" },
      { desktop: "M414 149H470V60H511", mobile: "M118 226V252H82V281" },
      { desktop: "M414 169H511", mobile: "M202 226V252H238V281" },
      { desktop: "M414 191H470V263H511", mobile: "M90 225V248H8V430H53" },
      {
        desktop: "M511 293H449V212H414",
        mobile: "M266 450H312V237H231V222",
        dashed: true,
      },
    ],
  },
  flow: [
    {
      title: "Carrinho",
      description:
        "Cookie HTTP-only identifica o visitante e um hash no Redis guarda os itens. No login, o carrinho anônimo é incorporado ao da conta.",
      systems: ["Redis"],
    },
    {
      title: "Entrega",
      description:
        "Consulta de CEP e cotação de frete, com cache por CEP de uma hora.",
      systems: ["ViaCEP", "Melhor Envio", "Redis"],
    },
    {
      title: "Desconto",
      description:
        "Cupons fixos ou percentuais com validação de vigência, valor mínimo, teto de desconto e limites de uso por cupom e por usuário.",
      systems: ["PostgreSQL"],
    },
    {
      title: "Pagamento",
      description:
        "Payment Brick para Pix, cartão tokenizado e boleto. Os dados seguem para uma ação no servidor.",
      systems: ["Mercado Pago"],
    },
    {
      title: "Confirmação no servidor",
      description:
        "Itens, estoque e preços são revalidados contra o banco e o total é recalculado com desconto e frete antes de solicitar o pagamento. Pedido, pagamento, uso de cupom e baixa de estoque são gravados em uma única transação.",
      systems: ["PostgreSQL", "Prisma"],
    },
    {
      title: "Webhook de pagamento",
      description:
        "A assinatura HMAC é verificada e o status é consultado no provedor antes de atualizar o pedido. Cancelamento, rejeição ou estorno repõem o estoque e revertem o uso do cupom.",
      systems: ["Mercado Pago"],
    },
    {
      title: "Expedição",
      description:
        "Emissão de etiqueta (inclusão, pagamento, geração e impressão) e atualização do pedido por webhook de rastreamento.",
      systems: ["Melhor Envio", "Redis"],
    },
    {
      title: "Comunicação",
      description:
        "E-mails transacionais: confirmação com dados de Pix ou boleto, aviso à administração, etiqueta e envio.",
      systems: ["Resend", "React Email"],
    },
  ],
  decisions: [
    {
      title: "Variantes com SKU",
      problem:
        "Produtos com várias opções precisam de preço e estoque independentes por combinação.",
      resolution:
        "Estrutura Produto → Opções → Valores → SKU, com unicidade de SKU por produto. O formulário administrativo gera as combinações.",
    },
    {
      title: "Consistência de pedido e estoque",
      problem:
        "Concorrência e falhas parciais podem gerar estoque negativo ou cupom consumido sem pedido.",
      resolution:
        "Transações Prisma na criação do pedido, com verificação de saldo negativo, e reversão de estoque e cupom no webhook de cancelamento.",
    },
    {
      title: "Confiança no servidor",
      problem:
        "Valores vindos do cliente e notificações externas precisam ser validados.",
      resolution:
        "Preços e totais recalculados no servidor. Webhooks com assinatura e confirmação no provedor. Papel de acesso verificado no roteamento e novamente nas ações. Limite de requisições por janela deslizante no Redis.",
    },
    {
      title: "Leitura e cache",
      problem:
        "Listagens e páginas de produto têm leitura frequente e mutações pontuais.",
      resolution:
        "Tags de cache do Next.js por domínio (produtos, carrinho, checkout, pedidos), invalidadas nas mutações. Busca, ordenação e paginação na URL.",
    },
  ],
  features: [
    {
      title: "Catálogo",
      description:
        "Coleções e categorias, busca com debounce, galeria, avaliações com média recalculada em transação e itens relacionados.",
    },
    {
      title: "Conta",
      description:
        "Cadastro com código de verificação, login por credenciais e Google, recuperação de senha, endereços e histórico de pedidos.",
    },
    {
      title: "Painel",
      description:
        "Produtos (opções e SKUs), categorias, coleções, cupons e pedidos (filtros, cancelamento, devolução, etiqueta). Upload de mídia ao Cloudinary.",
    },
    {
      title: "Ambiente",
      description:
        "Docker Compose com PostgreSQL. GitHub Actions com lint e checagem de formatação em pull requests.",
    },
  ],
};

export const goldenAce: CaseStudy = {
  overview:
    "Arcade retrô executado no navegador: gabinete 3D com menus, configuração de controles e um jogo Snake integrado, com ranking online servido por API própria. Desenvolvido de ponta a ponta com React, Three.js e Node.js.",
  architecture: {
    caption: "Cena 3D, integração com Unity e API de ranking",
    description:
      "O navegador executa React, React Three Fiber, Redux Toolkit e Web Audio API. A cena troca mensagens com o build Unity WebGL em um iframe. O cliente acessa a API Express, que usa PostgreSQL via Prisma. Cliente e API são hospedados separadamente na Vercel.",
    nodes: [
      {
        title: "Navegador",
        details: ["React · React Three Fiber", "Redux Toolkit · Web Audio API"],
        center: [130, 173],
        mobileCenter: [160, 66],
      },
      {
        title: "Unity WebGL",
        details: ["iframe · SendMessage"],
        center: [405, 70],
        mobileCenter: [82, 207],
      },
      {
        title: "API Express",
        details: ["Rotas · controllers · services"],
        center: [405, 248],
        mobileCenter: [238, 207],
      },
      {
        title: "PostgreSQL",
        details: ["Prisma"],
        center: [658, 248],
        mobileCenter: [238, 326],
      },
    ],
    connections: [
      {
        desktop: "M250 148H271V70H307",
        mobile: "M114 110V141H82V170",
        direction: "both",
      },
      { desktop: "M250 199H271V248H288", mobile: "M207 110V141H238V170" },
      { desktop: "M520 248H575", mobile: "M238 245V289" },
    ],
  },
  decisions: [
    {
      title: "Interface dentro da cena 3D",
      problem: "Menus e jogo precisam existir na tela do gabinete.",
      resolution:
        "Conteúdo HTML projetado na superfície 3D com Drei, mantendo menus e jogo como componentes React.",
    },
    {
      title: "Comunicação com o Unity",
      problem: "O jogo roda isolado em um iframe.",
      resolution:
        "Configuração de teclas e volume enviada por SendMessage, eventos de teclado reproduzidos no iframe e mensagens de saída recebidas por listener.",
    },
    {
      title: "Hospedagem do build WebGL",
      problem: "Arquivos Unity exigem cabeçalhos específicos.",
      resolution:
        "Content-Encoding Brotli e tipos MIME próprios para JavaScript, WebAssembly e dados, definidos na configuração de hospedagem.",
    },
    {
      title: "Ranking",
      problem: "A tabela tem tamanho fixo e recebe envios do cliente.",
      resolution:
        "Dez posições em ordem decrescente. Pontuação superior substitui a menor quando a tabela está cheia. Envio com verificação de integridade por hash SHA-256.",
    },
  ],
  features: [
    {
      title: "Controles",
      description:
        "Joystick por ponteiro e teclado, com mapeamento de teclas personalizável.",
    },
    {
      title: "Ajustes",
      description: "Brilho e volume, persistidos em localStorage.",
    },
    {
      title: "Áudio",
      description: "Carregamento e decodificação de sons pela Web Audio API.",
    },
    {
      title: "Ranking",
      description: "Consulta e envio de pontuações por duas operações HTTP.",
    },
  ],
};
