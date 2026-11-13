import type { Metadata } from "next";
import {
  casePath,
  homePath,
  notFoundPath,
  type Locale,
} from "@/content/locale";
import { getSite } from "@/content/site";
import type { Project } from "@/content/types";

export function metadataFor({
  title,
  description,
  path,
  locale = "pt",
  languages,
}: {
  title: string;
  description: string;
  path: string;
  locale?: Locale;
  languages?: Record<string, string>;
}): Metadata {
  const site = getSite(locale);
  const imagePath =
    path === notFoundPath(locale)
      ? `${homePath(locale)}opengraph-image`
      : `${path}opengraph-image`;
  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: { canonical: path, languages },
    openGraph: {
      type: "website",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      alternateLocale: locale === "pt" ? "en_US" : "pt_BR",
      siteName: site.name,
      title,
      description,
      url: path,
      images: [{ url: imagePath, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imagePath],
    },
  };
}

export function homeMetadata(locale: Locale) {
  const site = getSite(locale);
  return metadataFor({
    title: `${site.name} — ${site.role}`,
    description: site.description,
    path: homePath(locale),
    locale,
    languages: {
      "pt-BR": homePath("pt"),
      en: homePath("en"),
      "x-default": homePath("pt"),
    },
  });
}

export function caseMetadata(project: Project, locale: Locale) {
  return metadataFor({
    title: `${project.name} — ${project.type} | ${getSite(locale).name}`,
    description: project.summary,
    path: casePath(project.slug, locale),
    locale,
    languages: {
      "pt-BR": casePath(project.slug),
      en: casePath(project.slug, "en"),
    },
  });
}

export function missingMetadata(locale: Locale): Metadata {
  const site = getSite(locale);
  return {
    ...metadataFor({
      title: `${site.notFound} | ${site.name}`,
      description: site.notFound,
      path: notFoundPath(locale),
      locale,
    }),
    robots: { index: false, follow: false },
  };
}
