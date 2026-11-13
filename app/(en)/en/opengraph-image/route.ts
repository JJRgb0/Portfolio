import { getSite } from "@/content/site";
import { socialImage } from "@/lib/social-image";

export const dynamic = "force-static";

export function GET() {
  const site = getSite("en");
  return socialImage(site.name, site.role);
}
