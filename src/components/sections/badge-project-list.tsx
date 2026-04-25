import type { Project } from "@/data/projects"

export interface BadgeProjectListProps {
  projects: Project[]
}

export function BadgeProjectList({ projects }: BadgeProjectListProps) {
  return (
    <ol className="project-list">
      {projects.map((project, index) => (
        <li key={project.id}>
          <span className="project-number">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="project-name">
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                {project.title}
              </a>
            </h3>
            <p>{project.description}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
