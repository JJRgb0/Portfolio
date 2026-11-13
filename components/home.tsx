import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { PageFrame } from "@/components/page-frame";
import { Projects } from "@/components/project-card";
import { EditorialSection } from "@/components/section";
import { Skills } from "@/components/skills";
import { getSite } from "@/content/site";
import { labels } from "@/content/labels";
import type { Locale } from "@/content/locale";

export function Home({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const [projects, skills, about, contact] = site.navigation;
  return (
    <PageFrame locale={locale}>
      <main id="conteudo" className="portfolio-home" tabIndex={-1}>
        <Hero locale={locale} />
        <EditorialSection section={projects}>
          <Projects locale={locale} />
        </EditorialSection>
        <EditorialSection section={skills}>
          <Skills locale={locale} />
        </EditorialSection>
        <EditorialSection section={about}>
          <div className="about-copy">
            {site.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <dl className="education">
              <dt className="mono">{labels[locale].education}</dt>
              <dd>{site.education}</dd>
            </dl>
          </div>
        </EditorialSection>
        <EditorialSection section={contact}>
          <Contact locale={locale} />
        </EditorialSection>
      </main>
    </PageFrame>
  );
}
