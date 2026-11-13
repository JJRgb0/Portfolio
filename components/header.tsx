import { labels } from "@/content/labels";
import {
  casePath,
  homePath,
  notFoundPath,
  htmlLanguage,
  type Locale,
} from "@/content/locale";
import { getSite } from "@/content/site";

export function Header({
  locale,
  slug,
  missing,
}: {
  locale: Locale;
  slug?: string;
  missing?: boolean;
}) {
  const site = getSite(locale);
  const text = labels[locale];
  const home = homePath(locale);
  const languageHref = (target: Locale) =>
    slug
      ? casePath(slug, target)
      : missing
        ? notFoundPath(target)
        : homePath(target);

  return (
    <header className="site-header">
      <a className="skip-link button" href="#conteudo">
        {text.skip}
      </a>
      <div className="container header-inner">
        <a className="wordmark" href={home}>
          <span className="wordmark-icon" aria-hidden="true">
            RG
          </span>
          {site.name}
        </a>
        <nav className="desktop-navigation" aria-label={text.nav}>
          <Navigation locale={locale} />
        </nav>
        <div className="header-actions">
          {site.resume && (
            <a
              className="desktop-resume button button-secondary"
              href={site.resume}
              download
            >
              {text.resume}
            </a>
          )}
          <div
            className="language-switch"
            role="group"
            aria-label={locale === "pt" ? "Idioma" : "Language"}
          >
            {(["pt", "en"] as const).map((target) => (
              <a
                key={target}
                href={languageHref(target)}
                lang={htmlLanguage[target]}
                hrefLang={htmlLanguage[target]}
                aria-current={locale === target ? "page" : undefined}
                aria-label={target === "pt" ? "PT — Português" : "EN — English"}
                data-language-switch={slug || missing ? undefined : ""}
              >
                {target.toUpperCase()}
              </a>
            ))}
          </div>
          <button
            className="menu-toggle button button-secondary"
            type="button"
            aria-expanded="false"
            aria-controls="menu-mobile"
            aria-haspopup="dialog"
          >
            {text.menu}
          </button>
        </div>
      </div>
      <dialog id="menu-mobile" className="mobile-menu" aria-label={text.menu}>
        <div className="container">
          <div className="mobile-menu-top">
            <span className="wordmark">{site.name}</span>
            <button
              className="button button-secondary"
              type="button"
              data-close-menu
            >
              {text.close}
            </button>
          </div>
          <nav aria-label={text.nav}>
            <Navigation locale={locale} />
          </nav>
          {site.resume && (
            <a className="button button-secondary" href={site.resume} download>
              {text.download}
            </a>
          )}
        </div>
      </dialog>
    </header>
  );
}

function Navigation({ locale }: { locale: Locale }) {
  return (
    <ul>
      {getSite(locale).navigation.map(({ id, title }) => (
        <li key={id}>
          <a
            className="header-link"
            href={`${homePath(locale)}#${id}`}
            data-section={id}
          >
            {title}
          </a>
        </li>
      ))}
    </ul>
  );
}
