import { labels } from "@/content/labels";
import type { Locale } from "@/content/locale";
import { getSite } from "@/content/site";
import { ExternalLink } from "./links";

export function Contact({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const text = labels[locale];
  return (
    <div className="contact">
      <p>{site.availability}</p>
      {site.email && (
        <div className="email-row">
          <a className="email-link" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <button
            className="button button-secondary"
            type="button"
            data-copy-email
            data-copied={text.copied}
            data-copy-fallback={text.copyFallback}
          >
            {text.copy}
          </button>
        </div>
      )}
      <p className="copy-feedback mono" aria-live="polite" />
      <div className="action-row">
        {site.linkedIn && (
          <ExternalLink locale={locale} href={site.linkedIn}>
            LinkedIn
          </ExternalLink>
        )}
        <ExternalLink locale={locale} href={site.github}>
          GitHub
        </ExternalLink>
        {site.resume && (
          <a className="text-link" href={site.resume} download>
            {text.resume} (PDF)
          </a>
        )}
      </div>
    </div>
  );
}
