import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/projects";
import { casePath, homePath } from "@/content/locale";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pairs = [
    [homePath("pt"), homePath("en")],
    ...caseStudies.map(({ slug }) => [casePath(slug), casePath(slug, "en")]),
  ];
  const absolute = (path: string) => new URL(path, site.url).href;
  return pairs.flatMap(([pt, en]) =>
    [pt, en].map((path) => ({
      url: absolute(path),
      alternates: { languages: { "pt-BR": absolute(pt), en: absolute(en) } },
    })),
  );
}
