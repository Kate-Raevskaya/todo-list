import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useState } from "react"

import { Modal } from "../../../../shared/components/Modal.tsx"
import type { Task } from "../../../../shared/model/projects.types.ts"
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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

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
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`${cls.taskCard} ${cls[task.currentStatus]}`}
        onClick={handleOpenModal}
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

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <TaskFullInfo task={task} />
      </Modal>
    </>
  )
}
