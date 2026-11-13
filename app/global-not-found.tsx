import { DocumentLayout } from "@/components/document-layout";
import { MissingPage } from "@/components/missing-page";
import { missingMetadata } from "@/lib/metadata";

export const metadata = missingMetadata("pt");

export default function GlobalNotFound() {
  return (
    <DocumentLayout locale="pt">
      <MissingPage locale="pt" />
    </DocumentLayout>
  );
}
