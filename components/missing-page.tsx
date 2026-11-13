import { homePath, type Locale } from "@/content/locale";
import { labels } from "@/content/labels";
import { getSite } from "@/content/site";
import { PageFrame } from "./page-frame";

export function MissingPage({ locale }: { locale: Locale }) {
  return (
    <PageFrame locale={locale} missing>
      <main id="conteudo" className="container not-found" tabIndex={-1}>
        <h1>{getSite(locale).notFound}</h1>
        <a className="button button-primary" href={homePath(locale)}>
          {labels[locale].back}
        </a>
      </main>
    </PageFrame>
  );
}
