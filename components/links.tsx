import { labels } from "@/content/labels";
import type { Locale } from "@/content/locale";
import type { ReactNode } from "react";
import { casePath } from "@/content/projects";
import type { Project } from "@/content/types";

export function ExternalLink({
  href,
  children,
  locale = "pt",
}: {
  href: string;
  children: ReactNode;
  locale?: Locale;
}) {
  return (
    <a
      className="text-link external-link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}{" "}
      <span aria-hidden="true" className="link-arrow">
        ↗
      </span>
      <span className="sr-only"> ({labels[locale].newTab})</span>
    </a>
  );
}

export function ProjectActions({
  project,
  locale = "pt",
  includeCase = false,
}: {
  project: Project;
  locale?: Locale;
  includeCase?: boolean;
}) {
  if ((!includeCase || !project.caseStudy) && !project.demo && !project.code)
    return null;

  return (
    <div className="action-row">
      {includeCase && project.caseStudy && (
        <a
          className="button button-secondary"
          href={casePath(project.slug, locale)}
        >
          {labels[locale].caseStudy}{" "}
          <span aria-hidden="true" className="link-arrow">
            →
          </span>
        </a>
      )}
      {project.demo && (
        <ExternalLink locale={locale} href={project.demo}>
          {labels[locale].demo}
        </ExternalLink>
      )}
      {project.code && (
        <ExternalLink locale={locale} href={project.code}>
          {labels[locale].code}
        </ExternalLink>
      )}
    </div>
  );
}
