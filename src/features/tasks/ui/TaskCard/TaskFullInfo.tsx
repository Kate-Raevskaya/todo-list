import { Comments } from "../../../../shared/components/Comments.tsx"
import { Files } from "../../../../shared/components/Files.tsx"
import { transformDate } from "../../../../shared/hepers/date-transform.ts"
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../shared/hooks/store-hooks.ts"
import type { Task } from "../../../../shared/model/projects.types.ts"
import { getAllTasks } from "../../../../store/selectors.ts"
import { deleteTask } from "../../../../store/tasksSlice.ts"
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
      <div className={cls.taskId}>#{task.id}</div>
      <h4>{task.title}</h4>
      <div className={cls.options}>
        <button className={cls.editButton} onClick={onEdit}>
          Редактировать
        </button>
        <button className={cls.deleteButton} onClick={onDelete}>
          Удалить задачу
        </button>
      </div>
      <div className={cls.desc}>
        <b>Описание:</b>
        <span>{task.description}</span>
      </div>
      <div>
        <b>Создана:</b> {task.createdDate}
      </div>
      <div>
        <b>Время в работе:</b> {task.timeInProgress}ч
      </div>
      {task.endDate && (
        <div>
          <b>Дата окончания:</b> {transformDate(task.endDate)}
        </div>
      )}
      <div>
        <b>Приоритет:</b>{" "}
        <span className={cls[task.priority]}>{task.priority}</span>
      </div>
      <div>
        <b>Статус:</b> {task.currentStatus}
      </div>

      <div>
        <b>Вложенные файлы:</b>
        <Files files={task.files} />
      </div>

      <div>
        <b>Подзадачи:</b>
        <SubTasks subTasks={subTasks} />
      </div>

      <div>
        <b>Комментарии:</b>
        <Comments taskId={task.id} parentId={null} />
      </div>
    </div>
  )
}
