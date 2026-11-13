import type { Locale } from "./locale";

export const site = {
  name: "Rubens Galani",
  role: "Desenvolvedor Full Stack",
  description:
    "Desenvolvedor full stack. E-commerce com pagamentos e frete integrados, APIs em Node.js, interfaces 3D e contribuição em projeto de equipe.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://rubens-dmg.vercel.app",
  email: "rubensgalani@gmail.com" as string | null,
  linkedIn: "https://www.linkedin.com/in/rubens-dmg/",
  github: "https://github.com/JJRgb0",
  resume: null as string | null,
  source: "https://github.com/JJRgb0/Portfolio",
  discloseAx: true,
  navigation: [
    { id: "projetos", title: "Projetos" },
    { id: "competencias", title: "Competências" },
    { id: "sobre", title: "Sobre" },
    { id: "contato", title: "Contato" },
  ],
  hero: {
    title: "Aplicações",
    emphasis: "em movimento.",
    description:
      "Desenvolvo aplicações web de ponta a ponta, da modelagem de dados e das integrações às interfaces que as pessoas usam.",
  },
  about: [
    "Desenvolvedor full stack com experiência em projetos de ponta a ponta: modelagem de dados, APIs, interfaces e integrações com serviços de pagamento, envio e e-mail.",
    "Formação em desenvolvimento web por estudo próprio e pelo curso CS50 (2025). Atuação em projetos próprios, entregas para clientes e contribuições em base de código compartilhada, incluindo testes de integração de rotas HTTP.",
  ],
  education: "CS50 (2025)",
  availability: "Aberto a oportunidades como desenvolvedor full stack.",
  builtWith: "Construído com Next.js, TypeScript e Tailwind CSS",
  notFound: "Página não encontrada.",
};

const englishSite: typeof site = {
  ...site,
  role: "Full Stack Developer",
  description:
    "Full stack developer working on e-commerce, payment and shipping integrations, Node.js APIs, and interactive 3D interfaces.",
  navigation: [
    { id: "projetos", title: "Projects" },
    { id: "competencias", title: "Skills" },
    { id: "sobre", title: "About" },
    { id: "contato", title: "Contact" },
  ],
  hero: {
    title: "Applications",
    emphasis: "in motion.",
    description:
      "I build web applications end to end, from data modeling and integrations to the interfaces people use.",
  },
  about: [
    "Full stack developer with hands-on experience in data modeling, APIs, interfaces, and integrations for payments, shipping, and email.",
    "Studied web development independently and through CS50 (2025). Work includes independent projects, client work, and contributions to a shared codebase, including HTTP route integration tests.",
  ],
  availability: "Open to full stack developer opportunities.",
  builtWith: "Built with Next.js, TypeScript, and Tailwind CSS",
  notFound: "Page not found.",
};

export function getSite(locale: Locale) {
  return locale === "en" ? englishSite : site;
}
