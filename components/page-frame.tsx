import type { ReactNode } from "react";
import type { Locale } from "@/content/locale";
import { Footer } from "./footer";
import { Header } from "./header";

export function PageFrame({
  children,
  locale,
  slug,
  missing,
}: {
  children: ReactNode;
  locale: Locale;
  slug?: string;
  missing?: boolean;
}) {
  return (
    <>
      <Header locale={locale} slug={slug} missing={missing} />
      {children}
      <Footer locale={locale} />
    </>
  );
}
