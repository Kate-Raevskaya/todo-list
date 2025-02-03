import type { Task } from "../../../../shared/model/projects.types.ts"
import cls from "./SubTasks.module.sass"

type Props = {
  subTasks: Task[]
}

export const SubTasks = ({ subTasks }: Props) => {
  return subTasks.length > 0 ? (
    <ul>
      {subTasks.map(subTask => (
        <li key={subTask.id}>
          <p className={cls.subTask}>
            #{subTask.id} <b>{subTask.title}</b>
          </p>
        </li>
      ))}
    </ul>
  ) : (
    <p className={cls.noSubTask}>Нет подзадач</p>
  )
}
