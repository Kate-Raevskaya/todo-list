import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useState } from "react"

import { getCommentForTask } from "../../../../shared/api/comments.ts"
import { Modal } from "../../../../shared/components/Modal.tsx"
import { useAppDispatch } from "../../../../shared/hooks/store-hooks.ts"
import type { Task } from "../../../../shared/model/projects.types.ts"
import { initializeComments } from "../../../../store/commentsSlice.ts"
import { CreateTaskForm } from "../CreateTaskForm/CreateTaskForm.tsx"
import cls from "./TaskCard.module.sass"
import { TaskFullInfo } from "./TaskFullInfo.tsx"

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
  const dispatch = useAppDispatch()

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isEditMode, setIsEditMode] = useState<boolean>(false)

  const handleOpenModal = () => {
    dispatch(initializeComments(getCommentForTask(task.id)))
    setIsModalOpen(true)
  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setIsEditMode(false)
    return
  }
  const handeChangeEditMode = () => setIsEditMode(!isEditMode)

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
        <p>#{task.id}</p>
        <h3>{task.title}</h3>
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
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`${cls.taskCard} ${cls[task.currentStatus]}`}
        onClick={handleOpenModal}
      >
        <p>#{task.id}</p>
        <h3>{task.title}</h3>
        <p>
          <b>Время в процессе: </b>
          {task.timeInProgress}
        </p>
        <p>
          <b>Приоритет: </b>
          <span className={cls[task.priority]}>{task.priority}</span>
        </p>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {isEditMode ? (
          <>
            <div
              className={cls.goBackButton}
              onClick={() => setIsEditMode(false)}
            >
              Назад
            </div>
            <CreateTaskForm
              task={task}
              onCloseModal={handleCloseModal}
              mode="edit"
            />
          </>
        ) : (
          <TaskFullInfo
            task={task}
            onCloseModal={handleCloseModal}
            onChangeIsEdit={handeChangeEditMode}
          />
        )}
      </Modal>
    </>
  )
}
