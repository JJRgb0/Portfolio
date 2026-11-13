import { getCaseStudies } from "@/content/projects";
import { socialImage } from "@/lib/social-image";

const studies = getCaseStudies("en");
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return studies.map(({ slug }) => ({ slug }));
}

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const project = studies.find((entry) => entry.slug === slug);
  if (!project) return new Response(null, { status: 404 });
  return socialImage(project.name, project.type);
}
