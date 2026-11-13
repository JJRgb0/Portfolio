import { Architecture } from "@/components/case-study/architecture";
import { PurchaseFlow } from "@/components/case-study/purchase-flow";
import { ProjectActions } from "@/components/links";
import { MediaFrame } from "@/components/media-frame";
import { ProjectScope } from "@/components/project-card";
import { Stack } from "@/components/stack";
import { casePath, homePath, type Locale } from "@/content/locale";
import { getCaseStudies } from "@/content/projects";
import { labels } from "@/content/labels";
import { getSite } from "@/content/site";
import { PageFrame } from "@/components/page-frame";
import { notFound } from "next/navigation";

export function CaseStudy({ slug, locale }: { slug: string; locale: Locale }) {
  const caseStudies = getCaseStudies(locale);
  const text = labels[locale];
  const index = caseStudies.findIndex((entry) => entry.slug === slug);
  const project = caseStudies[index];
  if (!project) notFound();

  const { caseStudy: study } = project;
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <PageFrame locale={locale} slug={slug}>
      <main id="conteudo" className="container case-page" tabIndex={-1}>
        <a
          className="text-link back-link"
          href={`${homePath(locale)}#projetos`}
        >
          <span className="link-arrow" aria-hidden="true">
            ←
          </span>{" "}
          {getSite(locale).navigation[0].title}
        </a>
        <header className="case-header">
          <div>
            <h1>{project.name}</h1>
            <p className="case-type">
              {project.type} <span aria-hidden="true">·</span> {project.year}
            </p>
            <ProjectScope project={project} locale={locale} />
          </div>
          <div className="case-actions">
            {project.stack && <Stack items={project.stack} locale={locale} />}
            <ProjectActions project={project} locale={locale} />
          </div>
        </header>
        {project.media && (
          <MediaFrame
            media={project.media}
            index="01"
            locale={locale}
            priority
          />
        )}

        <div className="case-body">
          <section
            aria-labelledby="visao-geral"
            className="case-section grid-twelve"
            data-reveal
          >
            <h2 id="visao-geral">{text.overview}</h2>
            <div className="case-section-content">
              <p className="case-overview">{study.overview}</p>
            </div>
          </section>
          <section
            aria-labelledby="arquitetura"
            className="case-section grid-twelve"
            data-reveal
          >
            <h2 id="arquitetura">{text.architecture}</h2>
            <div className="case-section-content">
              <Architecture
                diagram={study.architecture}
                index={project.media ? "02" : "01"}
              />
            </div>
          </section>
          {study.flow && (
            <section
              aria-labelledby="fluxo"
              className="case-section grid-twelve"
              data-reveal
            >
              <h2 id="fluxo">{text.checkout}</h2>
              <div className="case-section-content">
                <PurchaseFlow steps={study.flow} locale={locale} />
              </div>
            </section>
          )}
          <section
            aria-labelledby="decisoes"
            className="case-section grid-twelve"
            data-reveal
          >
            <h2 id="decisoes">{text.decisions}</h2>
            <div className="case-section-content decision-grid">
              {study.decisions.map(({ title, problem, resolution }) => (
                <article className="decision" key={title}>
                  <h3>{title}</h3>
                  <dl>
                    <dt className="mono">{text.problem}</dt>
                    <dd>{problem}</dd>
                    <dt className="mono">{text.decision}</dt>
                    <dd>{resolution}</dd>
                  </dl>
                </article>
              ))}
            </div>
          </section>
          <section
            aria-labelledby="escopo"
            className="case-section grid-twelve"
            data-reveal
          >
            <h2 id="escopo">{text.features}</h2>
            <ul className="case-section-content feature-list">
              {study.features.map(({ title, description }) => (
                <li key={title}>
                  <strong>{title}.</strong> {description}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <nav className="case-next" aria-label={text.caseNav}>
          <p className="mono">{text.next}</p>
          <a href={casePath(next.slug, locale)}>
            {next.name}{" "}
            <span className="link-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </nav>
      </main>
    </PageFrame>
  );
}
