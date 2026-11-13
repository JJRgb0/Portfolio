import { getSite } from "@/content/site";
import { socialImage } from "@/lib/social-image";

export const dynamic = "force-static";

export function GET() {
  const site = getSite("pt");
  return socialImage(site.name, site.role);
}
