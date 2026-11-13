import { labels } from "@/content/labels";
import type { Locale } from "@/content/locale";
import { getSite } from "@/content/site";
import { ExternalLink } from "./links";

export function Footer({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const text = labels[locale];
  return (
    <footer className="container site-footer">
      <div className="footer-inner">
        <span>
          © {new Date().getUTCFullYear()} {site.name}
        </span>
        <span>{site.builtWith}</span>
        <ExternalLink locale={locale} href={site.source}>
          {text.source}
        </ExternalLink>
      </div>
    </footer>
  );
}
