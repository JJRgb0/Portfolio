import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/case-study/page";
import { getCaseStudies } from "@/content/projects";
import { caseMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };
const locale = "pt";
const studies = getCaseStudies(locale);

export const dynamicParams = false;
export function generateStaticParams() {
  return studies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = studies.find((entry) => entry.slug === slug);
  if (!project) notFound();
  return caseMetadata(project, locale);
}

export default async function Page({ params }: Props) {
  return <CaseStudy slug={(await params).slug} locale={locale} />;
}
