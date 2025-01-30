import { NavLink } from "react-router"

import type { Project } from "../../../../shared/model/projects.types.ts"
import cls from "./ProjectCard.module.sass"

type Props = {
  project: Project
}
export const ProjectCard = ({ project }: Props) => {
  return (
    <NavLink to={`todo/${project.id}`}>
      <div className={cls.container}>{project.name}</div>
    </NavLink>
  )
}
