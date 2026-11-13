import type { ReactNode } from "react";
import { site } from "@/content/site";

type SectionData = (typeof site.navigation)[number];

export function EditorialSection({
  section,
  children,
}: {
  section: SectionData;
  children: ReactNode;
}) {
  return (
    <section
      id={section.id}
      className="container editorial-section grid-twelve"
      aria-labelledby={`titulo-${section.id}`}
    >
      <h2 id={`titulo-${section.id}`} className="section-label">
        {section.title}
      </h2>
      <div className="section-content">{children}</div>
    </section>
  );
}
