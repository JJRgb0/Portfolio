import localFont from "next/font/local";
import Script from "next/script";
import { getSite } from "@/content/site";
import { htmlLanguage, type Locale } from "@/content/locale";
import "../app/globals.css";

const sans = localFont({
  src: "../assets/fonts/geist.woff2",
  weight: "400 600",
  display: "swap",
  variable: "--font-geist",
});

const mono = localFont({
  src: "../assets/fonts/geist-mono.woff2",
  weight: "500",
  display: "swap",
  variable: "--font-mono",
});

export function DocumentLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const site = getSite(locale);
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    url: site.url,
    ...(site.email && { email: `mailto:${site.email}` }),
    sameAs: [site.github, site.linkedIn].filter(Boolean),
  };

  return (
    <html
      lang={htmlLanguage[locale]}
      id="topo"
      className={`${sans.variable} ${mono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(person).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        {process.env.NODE_ENV === "development" && (
          <Script src="/interactions.js" strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}
