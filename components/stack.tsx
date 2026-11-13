import { labels } from "@/content/labels";
import type { Locale } from "@/content/locale";
export function Stack({
  items,
  locale = "pt",
}: {
  items: string[];
  locale?: Locale;
}) {
  return (
    <ul className="chip-list" aria-label={labels[locale].stack}>
      {items.map((item) => (
        <li className="chip mono" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}
