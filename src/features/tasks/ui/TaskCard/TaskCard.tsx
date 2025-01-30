import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import type { Task } from "../../../../shared/model/projects.types.ts"
import cls from "./TaskCard.module.sass"

type Props = {
  task: Task
}

export const TaskCard = ({ task }: Props) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`${cls.taskCard} ${cls[task.currentStatus]} ${cls.draggingTask}`}
      >
        <span>#{task.id}</span>
        <h4>{task.title}</h4>
        <p>
          <b>Время в процессе:</b> {task.timeInProgress}
        </p>
        <p>
          <b>Приоритет:</b> {task.priority}
        </p>
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${cls.taskCard} ${cls[task.currentStatus]}`}
    >
      <span>#{task.id}</span>
      <h4>{task.title}</h4>
      <p>
        <b>Время в процессе:</b> {task.timeInProgress}
      </p>
      <p>
        <b>Приоритет:</b> {task.priority}
      </p>
    </div>
  )
}

// export const TaskCard = ({ task }: Props) => {
//   const renderSubTasks = (subTasks: Task[]) => {
//     return subTasks.length > 0 ? (
//       <ul>
//         {subTasks.map(subTask => (
//           <li key={subTask.id}>{subTask.title}</li>
//         ))}
//       </ul>
//     ) : (
//       <p>Нет подзадач</p>
//     )
//   }
//
//   const renderComments = (comments: Comment[]) => {
//     return comments.length > 0 ? (
//       <div className={cls.comments}>
//         {comments.map(comment => (
//           <div key={comment.id} className={cls.comment}>
//             <p>
//               <span>{comment.author}</span> ({comment.date}):
//             </p>
//             <p>{comment.text}</p>
//             {comment.replies.length > 0 && (
//               <div className={cls.replies}>
//                 {renderComments(comment.replies)}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     ) : (
//       <p>Нет комментариев</p>
//     )
//   }
//
//   return (
//     <div className={`${cls.taskCard} ${cls[task.currentStatus]}`}>
//       <span># {task.id}</span>
//       <h4>{task.title}</h4>
//       {/*<p>*/}
//       {/*  <b>Описание:</b> {task.description}*/}
//       {/*</p>*/}
//       {/*<p>*/}
//       {/*  <b>Создана:</b> {task.createdDate}*/}
//       {/*</p>*/}
//       <p>
//         <b>Время в процессе:</b> {task.timeInProgress}
//       </p>
//       {/*<p>*/}
//       {/*  <b>Дата окончания:</b> {task.endDate}*/}
//       {/*</p>*/}
//       <p>
//         <b>Приоритет:</b> {task.priority}
//       </p>
//       {/*<p>*/}
//       {/*  <b>Статус:</b> {task.currentStatus}*/}
//       {/*</p>*/}
//
//       {/*<div>*/}
//       {/*  <h4>Вложенные файлы:</h4>*/}
//       {/*  {task.files.length > 0 ? (*/}
//       {/*    <ul>*/}
//       {/*      {task.files.map(file => (*/}
//       {/*        <li key={file.id}>*/}
//       {/*          <a href={file.url} target="_blank" rel="noopener noreferrer">*/}
//       {/*            {file.name}*/}
//       {/*          </a>*/}
//       {/*        </li>*/}
//       {/*      ))}*/}
//       {/*    </ul>*/}
//       {/*  ) : (*/}
//       {/*    <p>Нет вложенных файлов</p>*/}
//       {/*  )}*/}
//       {/*</div>*/}
//
//       {/*<div>*/}
//       {/*  <h4>Подзадачи:</h4>*/}
//       {/*  {renderSubTasks(task.subTasks)}*/}
//       {/*</div>*/}
//
//       {/*<div>*/}
//       {/*  <h4>Комментарии:</h4>*/}
//       {/*  {renderComments(task.comments)}*/}
//       {/*</div>*/}
//     </div>
//   )
// }
