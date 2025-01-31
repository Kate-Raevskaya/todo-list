import type { Comment, Task } from "../../../../shared/model/projects.types.ts"
import cls from "./TaskFullInfo.module.sass"

type Props = {
  task: Task
}

export const TaskFullInfo = ({ task }: Props) => {
  const renderSubTasks = (subTasks: Task[]) => {
    return subTasks.length > 0 ? (
      <ul>
        {subTasks.map(subTask => (
          <li key={subTask.id}>{subTask.title}</li>
        ))}
      </ul>
    ) : (
      <p>Нет подзадач</p>
    )
  }

  const renderComments = (comments: Comment[]) => {
    return comments.length > 0 ? (
      <div className={cls.comments}>
        {comments.map(comment => (
          <div key={comment.id} className={cls.comment}>
            <p>
              <span>{comment.author}</span> ({comment.date}):
            </p>
            <p>{comment.text}</p>
            {comment.replies.length > 0 && (
              <div className={cls.replies}>
                {renderComments(comment.replies)}
              </div>
            )}
          </div>
        ))}
      </div>
    ) : (
      <p>Нет комментариев</p>
    )
  }

  const onDelete = () => {}
  const onEdit = () => {}

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
        {renderSubTasks(task.subTasks)}
      </div>

      <div>
        <h4>Комментарии:</h4>
        {renderComments(task.comments)}
      </div>
    </div>
  )
}
