export type Locale = "pt" | "en";

export const htmlLanguage = { pt: "pt-BR", en: "en" } as const;
export const homePath = (locale: Locale) => (locale === "en" ? "/en/" : "/");
export const casePath = (slug: string, locale: Locale = "pt") =>
  locale === "en" ? `/en/projects/${slug}/` : `/projetos/${slug}/`;
export const notFoundPath = (locale: Locale) =>
  locale === "en" ? "/en/404/" : "/404.html";
