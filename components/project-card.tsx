import type { Locale } from "@/content/locale";
import {
  projectAnchor,
  getProjectGroups,
  getProjects,
} from "@/content/projects";
import type { Project } from "@/content/types";
import { ProjectActions } from "./links";
import { MediaFrame } from "./media-frame";
import { Stack } from "./stack";

export function ProjectScope({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  return (
    <p className="mono project-scope">
      {getProjectGroups(locale)[project.group].scope}
    </p>
  );
}

function ProjectCard({
  project,
  index,
  locale,
}: {
  project: Project;
  index: number;
  locale: Locale;
}) {
  return (
    <article
      id={projectAnchor(project.slug)}
      aria-labelledby={`nome-${project.slug}`}
      className={`project-card project-${project.group}`}
      data-project={project.slug}
      tabIndex={-1}
      data-reveal
    >
      <div className="project-intro">
        <div className="project-meta mono">
          <span>{project.type}</span> <span aria-hidden="true">·</span>{" "}
          <span>{project.year}</span>
        </div>
        <h3 id={`nome-${project.slug}`} className="project-name">
          {project.name}
        </h3>
        <ProjectScope project={project} locale={locale} />
      </div>
      {project.media && (
        <MediaFrame
          media={project.media}
          locale={locale}
          index={String(index + 1).padStart(2, "0")}
        />
      )}
      <div className="project-info">
        <p className="project-summary">{project.summary}</p>
        {project.highlights && (
          <ul className="project-highlights">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        {project.stack && <Stack items={project.stack} locale={locale} />}
        <ProjectActions project={project} locale={locale} includeCase />
      </div>
    </article>
  );
}

export function Projects({ locale }: { locale: Locale }) {
  const projects = getProjects(locale);
  const projectGroups = getProjectGroups(locale);
  const featured = projects.filter((project) => project.group === "featured");

  return (
    <div className="projects">
      <div className="featured-projects">
        {featured.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            locale={locale}
          />
        ))}
      </div>
      {(["client", "team", "experiment"] as const).map((group) => {
        const entries = projects.filter((project) => project.group === group);
        if (!entries.length) return null;
        return (
          <div className="project-group" key={group}>
            <p className="mono project-group-label">
              {projectGroups[group].title}
            </p>
            <div className={`project-group-grid group-${group}`}>
              {entries.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={index}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
