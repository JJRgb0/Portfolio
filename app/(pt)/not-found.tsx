import { MissingPage } from "@/components/missing-page";
import { missingMetadata } from "@/lib/metadata";

export const metadata = missingMetadata("pt");

export default function Page() {
  return <MissingPage locale="pt" />;
}
