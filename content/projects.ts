import { goldenAce, kdLux } from "./case-studies";
import { englishGoldenAce, englishKdLux } from "./case-studies.en";
import { casePath } from "./locale";
import type { Locale } from "./locale";
import { site } from "./site";
import type { Project } from "./types";

export const projectGroups = {
  featured: { scope: "Projeto próprio · ponta a ponta" },
  client: { title: "Entregas para clientes", scope: "Cliente · ponta a ponta" },
  team: { title: "Em equipe", scope: "Equipe · contribuição individual" },
  experiment: {
    title: "Experimento",
    scope: "Experimento · implementação gerada com IA",
  },
};

const catalog: Project[] = [
  {
    slug: "kdlux",
    name: "kdLux",
    type: "E-commerce de semijoias",
    year: "2025–2026",
    group: "featured",
    summary:
      "Loja virtual completa: catálogo com variações, checkout com Pix, cartão e boleto, cálculo de frete, painel administrativo e e-mails transacionais.",
    highlights: [
      "Modelo de produto com opções, variantes e SKU, com estoque e preço por combinação.",
      "Checkout com Mercado Pago, cotação de frete no Melhor Envio e confirmação de pagamento por webhook assinado.",
      "Pedido, estoque e cupom atualizados em transação, com reposição automática em cancelamentos.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Tailwind CSS",
    ],
    demo: "https://kdlux.com.br/",
    media: {
      poster: "/projects/kdlux/poster.webp",
      alt: "Vitrine da kdLux com fotografias de semijoias, preços e opções para salvar os produtos.",
      width: 2880,
      height: 1800,
      caption: "Catálogo de produtos",
      video: {
        webm: "/projects/kdlux/loop.webm",
        mp4: "/projects/kdlux/loop.mp4",
      },
    },
    caseStudy: kdLux,
  },
  {
    slug: "golden-ace",
    name: "Golden Ace",
    type: "Arcade 3D no navegador com ranking online",
    year: "2025",
    group: "featured",
    summary:
      "Gabinete retrô em 3D com menus e jogo Snake integrados à tela, controles personalizáveis e ranking com as 10 maiores pontuações servido por API própria.",
    highlights: [
      "Cena em React Three Fiber com iluminação animada, pós-processamento (bloom) e interface HTML projetada na tela do gabinete.",
      "Integração com build Unity WebGL: configuração de teclas e volume enviada ao jogo, mensagens de saída recebidas pela aplicação.",
      "API Node.js e Express com Prisma e PostgreSQL; envio de pontuação com verificação de integridade por hash SHA-256.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Three.js",
      "React Three Fiber",
      "Redux Toolkit",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
    ],
    demo: "https://golden-ace-arcade.vercel.app/",
    code: "https://github.com/JJRgb0/GoldenAce",
    media: {
      poster: "/projects/golden-ace/poster.webp",
      alt: "Gabinete Golden Ace em 3D com joystick, iluminação violeta e o jogo Snake na tela.",
      width: 2880,
      height: 1800,
      caption: "Gabinete 3D com a seleção de jogos",
      video: {
        webm: "/projects/golden-ace/loop.webm",
        mp4: "/projects/golden-ace/loop.mp4",
      },
    },
    caseStudy: goldenAce,
  },
  {
    slug: "concertinasnc",
    name: "ConcertinasNC",
    type: "Site de serviços com pedido de orçamento",
    year: "2026",
    group: "client",
    summary:
      "Site institucional para empresa de instalação e manutenção, com galeria de trabalhos, formulário de orçamento e contato por WhatsApp. Envio de e-mail por API Node.js com validação (Zod) e eventos de conversão (Meta Pixel).",
    stack: [
      "React",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "Express",
      "Nodemailer",
    ],
  },
  {
    slug: "petsart",
    name: "PetsArt",
    type: "Vitrine de encomendas artesanais",
    year: "2026",
    group: "client",
    summary:
      "Catálogo de serviços e galeria de trabalhos com carregamento progressivo, pedido encaminhado ao WhatsApp e rastreamento de conversões (Google Ads, Smartlook).",
    stack: ["React", "Vite", "TypeScript", "Tailwind CSS", "Vercel Functions"],
  },
  {
    slug: "ax",
    name: "AX",
    type: "Gestão de equipamentos de prevenção contra incêndio",
    year: "2026",
    group: "team",
    summary:
      "Monorepo (Bun, Turbo) com NestJS, Next.js e Prisma. Contribuição em modelos de dados, controllers e services, correção de bugs, ajustes de estado em Redux e testes de integração de rotas HTTP com Vitest e Supertest.",
  },
  {
    slug: "chess-os",
    name: "Chess OS",
    type: "Plataforma de xadrez no navegador",
    year: "2026",
    group: "experiment",
    summary:
      "Partidas com relógio, análise com Stockfish em WebAssembly, bots Maia via ONNX Runtime em Web Workers, puzzles e perfis de jogador. API NestJS para contas e sincronização.",
    stack: ["React", "TypeScript", "Vite", "Three.js", "NestJS"],
    demo: "https://chess-os-delta.vercel.app/",
    media: {
      poster: "/projects/chess-os/poster.webp",
      alt: "Tabuleiro e opções de partida contra o bot no Chess OS.",
      width: 2880,
      height: 1800,
      caption: "Tabuleiro e configuração da partida",
    },
  },
];

export const projects = catalog.filter(
  (project) => project.slug !== "ax" || site.discloseAx,
);

export const caseStudies = projects.filter(
  (
    project,
  ): project is Project & { caseStudy: NonNullable<Project["caseStudy"]> } =>
    Boolean(project.caseStudy),
);

export { casePath };
export const projectAnchor = (slug: string) => `projeto-${slug}`;

const englishGroups: typeof projectGroups = {
  featured: { scope: "Independent project · end to end" },
  client: { title: "Client work", scope: "Client project · end to end" },
  team: { title: "Team work", scope: "Team project · individual contribution" },
  experiment: {
    title: "Experiment",
    scope: "Experiment · AI-generated implementation",
  },
};

const translations: Record<
  string,
  Pick<Project, "type" | "summary" | "highlights"> & {
    mediaText?: Pick<NonNullable<Project["media"]>, "alt" | "caption">;
  }
> = {
  kdlux: {
    type: "Jewelry e-commerce",
    summary:
      "An online jewelry store with product variants, Pix, card, and boleto payments, shipping quotes, an admin dashboard, and transactional email.",
    highlights: [
      "Product options, variants, and SKUs with stock and pricing per combination.",
      "Mercado Pago checkout, shipping quotes from Melhor Envio, and payment confirmation through a signed webhook.",
      "A single transaction updates the order, inventory, and coupon usage. Cancellation restores stock automatically.",
    ],
    mediaText: {
      alt: "kdLux storefront showing jewelry, prices, and options to save products.",
      caption: "Product catalog",
    },
  },
  "golden-ace": {
    type: "3D browser arcade with an online leaderboard",
    summary:
      "A retro 3D cabinet with menus, Snake, customizable controls, and a top-ten leaderboard served by a custom API.",
    highlights: [
      "React Three Fiber scene with animated lights, bloom, and an HTML interface projected onto the cabinet screen.",
      "Unity WebGL integration sends key bindings and volume to the game and listens for exit messages.",
      "Node.js and Express API with Prisma and PostgreSQL. Score submissions use SHA-256 integrity checks.",
    ],
    mediaText: {
      alt: "3D Golden Ace cabinet with a joystick, purple lighting, and Snake on the screen.",
      caption: "3D cabinet and game selection",
    },
  },
  concertinasnc: {
    type: "Service website with quote requests",
    summary:
      "An installation and maintenance website with a project gallery, quote form, and WhatsApp contact. A Node.js API sends email, validates requests with Zod, and tracks conversions with Meta Pixel.",
  },
  petsart: {
    type: "Custom craft commissions",
    summary:
      "A service catalog and progressively loaded gallery, with orders routed to WhatsApp and conversion tracking through Google Ads and Smartlook.",
  },
  ax: {
    type: "Fire safety equipment management",
    summary:
      "Bun and Turbo monorepo with NestJS, Next.js, and Prisma. Contributions covered data models, controllers and services, bug fixes, Redux state, and HTTP route integration tests with Vitest and Supertest.",
  },
  "chess-os": {
    type: "Browser-based chess platform",
    summary:
      "Timed games, Stockfish analysis through WebAssembly, Maia bots through ONNX Runtime in Web Workers, puzzles, and player profiles. A NestJS API handles accounts and synchronization.",
    mediaText: {
      alt: "Chess OS board and settings for playing against the bot.",
      caption: "Chessboard and match setup",
    },
  },
};

export const getProjectGroups = (locale: Locale) =>
  locale === "en" ? englishGroups : projectGroups;

export function getProjects(locale: Locale): Project[] {
  if (locale === "pt") return projects;
  return projects.map((project) => {
    const { mediaText, ...text } = translations[project.slug];
    const study =
      project.slug === "kdlux"
        ? englishKdLux
        : project.slug === "golden-ace"
          ? englishGoldenAce
          : undefined;
    return {
      ...project,
      ...text,
      media: project.media && { ...project.media, ...mediaText },
      caseStudy: study,
    };
  });
}

export function getCaseStudies(locale: Locale) {
  return getProjects(locale).filter(
    (
      project,
    ): project is Project & { caseStudy: NonNullable<Project["caseStudy"]> } =>
      Boolean(project.caseStudy),
  );
}

const featuredSlugs = ["kdlux", "golden-ace", "chess-os"];

export const getMapProjects = (locale: Locale) =>
  getProjects(locale).filter(({ slug }) => featuredSlugs.includes(slug));
