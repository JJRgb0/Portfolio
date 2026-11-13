import { labels } from "@/content/labels";
import type { Locale } from "@/content/locale";
import { getSite } from "@/content/site";
import { FlowDiagram } from "./flow-diagram";
import { ExternalLink } from "./links";

export function Hero({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const text = labels[locale];
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker">{site.role}</p>
          <h1 id="hero-title">
            {site.hero.title} <span>{site.hero.emphasis}</span>
          </h1>
          <p className="hero-description">{site.hero.description}</p>
          <div className="action-row hero-actions">
            <a className="button button-primary" href="#projetos">
              {text.projects}{" "}
              <span aria-hidden="true" className="link-arrow">
                ↓
              </span>
            </a>
            {site.resume && (
              <a
                className="button button-secondary"
                href={site.resume}
                download
              >
                {text.download}
              </a>
            )}
            <ExternalLink locale={locale} href={site.github}>
              GitHub
            </ExternalLink>
            {site.linkedIn && (
              <ExternalLink locale={locale} href={site.linkedIn}>
                LinkedIn
              </ExternalLink>
            )}
          </div>
        </div>
        <FlowDiagram locale={locale} />
      </div>
    </section>
  );
}
