import type { Locale } from "./locale";

export const skills = [
  {
    group: "Front-end",
    items:
      "TypeScript, JavaScript, React, Next.js (App Router), Tailwind CSS, HTML e CSS responsivos, Redux Toolkit",
    evidence: ["kdlux", "golden-ace", "concertinasnc", "petsart"],
  },
  {
    group: "Back-end e dados",
    items: "Node.js, Express, PostgreSQL, Prisma, Redis",
    teamItems: "SQLite, NestJS (em equipe)",
    evidence: ["kdlux", "golden-ace", "ax"],
  },
  {
    group: "Integrações",
    items:
      "Mercado Pago, Melhor Envio, ViaCEP, Resend, Cloudinary, NextAuth (credenciais e Google), webhooks com verificação de assinatura",
    evidence: ["kdlux"],
  },
  {
    group: "Qualidade e entrega",
    items: "Zod, GitHub Actions, Docker, Vercel",
    teamItems: "Vitest, Supertest",
    evidence: ["ax", "kdlux", "concertinasnc"],
  },
  {
    group: "Interação e gráficos",
    items:
      "Three.js, React Three Fiber, Web Audio API, integração com Unity WebGL",
    evidence: ["golden-ace"],
  },
];

const englishSkills = [
  {
    group: "Front end",
    items:
      "TypeScript, JavaScript, React, Next.js (App Router), Tailwind CSS, responsive HTML and CSS, Redux Toolkit",
  },
  {
    group: "Back end and data",
    items: "Node.js, Express, PostgreSQL, Prisma, Redis",
    teamItems: "SQLite, NestJS (team project)",
  },
  {
    group: "Integrations",
    items:
      "Mercado Pago, Melhor Envio, ViaCEP, Resend, Cloudinary, NextAuth (credentials and Google), webhook signature verification",
  },
  {
    group: "Quality and delivery",
    items: "Zod, GitHub Actions, Docker, Vercel",
    teamItems: "Vitest, Supertest",
  },
  {
    group: "Interaction and graphics",
    items:
      "Three.js, React Three Fiber, Web Audio API, Unity WebGL integration",
  },
] satisfies { group: string; items: string; teamItems?: string }[];

export const getSkills = (locale: Locale) =>
  locale === "pt"
    ? skills
    : skills.map((skill, index) => ({ ...skill, ...englishSkills[index] }));
