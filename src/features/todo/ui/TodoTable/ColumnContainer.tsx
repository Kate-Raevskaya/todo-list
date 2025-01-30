import { SortableContext, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useMemo } from "react"

import type { Task } from "../../../../shared/model/projects.types.ts"
import { TaskCard } from "../../../tasks/ui/TaskCard/TaskCard.tsx"
import type { Column } from "../../model/table.types.ts"
import cls from "./TodoTable.module.sass"

type ColumnContainerProps = {
  column: Column
  tasks: Task[]
}

export const ColumnContainer = ({ column, tasks }: ColumnContainerProps) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  })

  const tasksIds = useMemo(() => {
    return tasks.map(task => task.id)
  }, [tasks])

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`${cls.colContainer} ${cls.colEmpty}`}
      ></div>
    )
  }

  return (
    <div className={cls.colContainer} ref={setNodeRef} style={style}>
      <div className={cls.title} {...attributes} {...listeners}>
        {column.title}
      </div>
      <div className={cls.tasksContainer}>
        <SortableContext items={tasksIds}>
          {tasks.map(task => {
            return <TaskCard key={task.id} task={task} />
          })}
        </SortableContext>
      </div>
    </div>
  )
}
