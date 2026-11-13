import { projectAnchor, getProjects } from "@/content/projects";
import { labels } from "@/content/labels";
import type { Locale } from "@/content/locale";
import { getSite } from "@/content/site";
import { getSkills } from "@/content/skills";

export function Skills({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const text = labels[locale];
  const projects = getProjects(locale);
  return (
    <table className="skills-table">
      <caption className="sr-only">{text.skillCaption}</caption>
      <thead>
        <tr>
          <th scope="col">{text.skillGroup}</th>
          <th scope="col">{text.skillTools}</th>
          <th scope="col">{text.evidence}</th>
        </tr>
      </thead>
      <tbody>
        {getSkills(locale).map(({ group, items, teamItems, evidence }) => (
          <tr key={group}>
            <th scope="row">{group}</th>
            <td>
              {items}
              {site.discloseAx && teamItems ? `, ${teamItems}` : ""}
            </td>
            <td>
              <ul className="skill-evidence" aria-label={text.evidence}>
                {evidence.map((slug) => {
                  const project = projects.find((entry) => entry.slug === slug);
                  return (
                    project && (
                      <li key={slug}>
                        <a
                          className="text-link"
                          href={`#${projectAnchor(slug)}`}
                        >
                          {project.name}
                        </a>
                      </li>
                    )
                  );
                })}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
