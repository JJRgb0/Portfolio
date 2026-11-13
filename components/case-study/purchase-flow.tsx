import type { Locale } from "@/content/locale";
import type { FlowStep } from "@/content/types";
import { Stack } from "../stack";

export function PurchaseFlow({
  steps,
  locale,
}: {
  steps: FlowStep[];
  locale: Locale;
}) {
  return (
    <ol className="purchase-flow">
      {steps.map((step, index) => (
        <li key={step.title}>
          <span className="flow-number mono" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            <Stack items={step.systems} locale={locale} />
          </div>
        </li>
      ))}
    </ol>
  );
}
