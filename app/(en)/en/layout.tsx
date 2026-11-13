import type { Metadata } from "next";
import { DocumentLayout } from "@/components/document-layout";
import { site } from "@/content/site";

export const metadata: Metadata = { metadataBase: new URL(site.url) };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DocumentLayout locale="en">{children}</DocumentLayout>;
}
