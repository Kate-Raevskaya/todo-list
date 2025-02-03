import { NavLink } from "react-router"

import type { Project } from "../../../../shared/model/projects.types.ts"
import cls from "./ProjectCard.module.sass"

type Props = {
  project: Project
}
export const ProjectCard = ({ project }: Props) => {
  return (
    <NavLink className={cls.projectLink} to={`todo/${project.id}`}>
      {project.name}
    </NavLink>
  )
}
