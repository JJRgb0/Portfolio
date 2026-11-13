import { MissingPage } from "@/components/missing-page";
import { missingMetadata } from "@/lib/metadata";

export const metadata = missingMetadata("en");

export default function Page() {
  return <MissingPage locale="en" />;
}
