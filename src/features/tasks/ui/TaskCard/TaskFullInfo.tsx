import { getAllTasks } from "../../../../app/selectors.ts"
import { deleteTask } from "../../../../app/tasksSlice.ts"
import { Comments } from "../../../../shared/components/Comments.tsx"
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../shared/hooks/store-hooks.ts"
import type { Task } from "../../../../shared/model/projects.types.ts"
import { SubTasks } from "./SubTasks.tsx"
import cls from "./TaskFullInfo.module.sass"

type Props = {
  task: Task
  onCloseModal: () => void
  onChangeIsEdit: () => void
}

export const TaskFullInfo = ({ task, onCloseModal, onChangeIsEdit }: Props) => {
  const allTasks = useAppSelector(getAllTasks)
  const dispatch = useAppDispatch()

  const subTasks: Task[] = allTasks.filter(t =>
    task.subTasks.find(id => id === t.id),
  )

  const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(deleteTask(task.id))
    onCloseModal()
  }

  const onEdit = () => {
    onChangeIsEdit()
  }

  return (
    <div className={cls.container}>
      <span># {task.id}</span>
      <h4>{task.title}</h4>
      <div className={cls.options}>
        <button onClick={onEdit}>edit</button>
        <button onClick={onDelete}>delete task</button>
      </div>
      <p>
        <b>Описание:</b> {task.description}
      </p>
      <p>
        <b>Создана:</b> {task.createdDate}
      </p>
      <p>
        <b>Время в процессе:</b> {task.timeInProgress}
      </p>
      <p>
        <b>Дата окончания:</b> {task.endDate}
      </p>
      <p>
        <b>Приоритет:</b> {task.priority}
      </p>
      <p>
        <b>Статус:</b> {task.currentStatus}
      </p>

      <div>
        <h4>Вложенные файлы:</h4>
        {task.files.length > 0 ? (
          <ul>
            {task.files.map(file => (
              <li key={file.id}>
                <a href={file.url} target="_blank" rel="noopener noreferrer">
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>Нет вложенных файлов</p>
        )}
      </div>

      <div>
        <h4>Подзадачи:</h4>
        <SubTasks subTasks={subTasks} />
      </div>

      <div>
        <h4>Комментарии:</h4>
        <Comments taskId={task.id} parentId={null} />
      </div>
    </div>
  )
}
