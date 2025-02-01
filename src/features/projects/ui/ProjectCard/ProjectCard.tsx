import { NavLink } from "react-router"

import { initializeTasks } from "../../../../app/tasksSlice.ts"
import { getTasks } from "../../../../shared/api/projects.ts"
import { useAppDispatch } from "../../../../shared/hooks/store-hooks.ts"
import type { Project } from "../../../../shared/model/projects.types.ts"
import cls from "./ProjectCard.module.sass"

type Props = {
  project: Project
}
export const ProjectCard = ({ project }: Props) => {
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(initializeTasks(getTasks(project.id)))
  }

  return (
    <div onClick={handleClick}>
      <NavLink to={`todo/${project.id}`}>
        <div className={cls.container}>{project.name}</div>
      </NavLink>
    </div>
  )
}
