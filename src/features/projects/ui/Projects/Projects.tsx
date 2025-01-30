import { getAllProjects } from "../../../../shared/api/projects.ts"
import type { Project } from "../../../../shared/model/projects.types.ts"
import { ProjectCard } from "../ProjectCard/ProjectCard.tsx"
import cls from "./Projects.module.sass"

const Projects = () => {
  const projects: Project[] = getAllProjects()

  return (
    <div className={cls.container}>
      {projects.map(project => {
        return (
          <div key={project.id}>
            <ProjectCard project={project} />
          </div>
        )
      })}
    </div>
  )
}

export default Projects
