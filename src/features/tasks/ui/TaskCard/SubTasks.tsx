import type { Task } from "../../../../shared/model/projects.types.ts"

type Props = {
  subTasks: Task[]
}

export const SubTasks = ({ subTasks }: Props) => {
  return subTasks.length > 0 ? (
    <ul>
      {subTasks.map(subTask => (
        <li key={subTask.id}>
          #{subTask.id} {subTask.title}
        </li>
      ))}
    </ul>
  ) : (
    <p>Нет подзадач</p>
  )
}
