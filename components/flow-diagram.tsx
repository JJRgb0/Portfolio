import { labels } from "@/content/labels";
import { getMapProjects, projectAnchor } from "@/content/projects";
import type { Locale } from "@/content/locale";

const technologies = [
  "TypeScript",
  "React",
  "Next.js",
  "PostgreSQL",
  "Three.js",
];
const links = [
  {
    from: "kdlux",
    to: "golden-ace",
    path: "M278 107H339Q350 107 350 118V174Q350 185 361 185H455",
  },
  {
    from: "kdlux",
    to: "chess-os",
    path: "M154 180V278Q154 290 166 290H355Q366 290 366 301V364Q366 375 377 375H488",
  },
  { from: "golden-ace", to: "chess-os", path: "M608 232V350" },
];

export function FlowDiagram({ locale }: { locale: Locale }) {
  const text = labels[locale];
  const projects = getMapProjects(locale);

  return (
    <section className="project-map" aria-label={text.map} data-project-map>
      <div className="map-board">
        <svg
          className="map-traces"
          viewBox="0 0 760 480"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {links.map(({ from, to, path }) => {
            const first = projects.find(({ slug }) => slug === from);
            const second = projects.find(({ slug }) => slug === to);
            const shared = technologies.filter(
              (tech) =>
                first?.stack?.includes(tech) && second?.stack?.includes(tech),
            );
            return (
              <g
                key={path}
                data-map-edge
                data-from={from}
                data-to={to}
                data-technologies={shared.join("|")}
              >
                <path className="map-wire" d={path} />
                <path className="map-pulse" d={path} pathLength="1" />
              </g>
            );
          })}
          <circle cx="350" cy="150" r="4" />
          <circle cx="238" cy="290" r="4" />
          <circle cx="608" cy="306" r="4" />
        </svg>

        <div className="map-filters">
          <h2>{text.map}</h2>
          <p>{text.mapIntro}</p>
          <p
            className="sr-only"
            data-map-status
            data-matches={text.mapMatches}
            aria-live="polite"
          />
          <div className="map-buttons" role="group" aria-label={text.filter}>
            <button type="button" data-map-tech="" aria-pressed="true">
              {text.all}
            </button>
            {technologies.map((tech) => (
              <button
                type="button"
                key={tech}
                data-map-tech={tech}
                aria-pressed="false"
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        <nav className="map-projects" aria-label={text.mapNav}>
          {projects.map(
            ({ slug, name, media, stack }) =>
              media && (
                <a
                  key={slug}
                  className="map-project"
                  href={`#${projectAnchor(slug)}`}
                  data-map-project={slug}
                  data-technologies={stack?.join("|")}
                >
                  <div className="map-image">
                    {/* eslint-disable-next-line @next/next/no-img-element -- A cena usa a mesma captura WebP do projeto, em largura fixa. */}
                    <img
                      src={media.poster.replace(".webp", "-720.webp")}
                      alt=""
                      width={720}
                      height={450}
                    />
                  </div>
                  <span className="map-project-name">
                    <span>{name}</span>
                    <span className="map-project-match" aria-hidden="true">
                      ✓
                    </span>
                    <span className="map-project-arrow" aria-hidden="true">
                      ↘
                    </span>
                  </span>
                </a>
              ),
          )}
        </nav>
      </div>
    </section>
  );
}
