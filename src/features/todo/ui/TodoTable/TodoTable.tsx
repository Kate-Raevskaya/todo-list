import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"
import { useMemo, useState } from "react"
import { createPortal } from "react-dom"

import { getTasks } from "../../../../shared/api/projects.ts"
import type { Task } from "../../../../shared/model/projects.types.ts"
import { TaskCard } from "../../../tasks/ui/TaskCard/TaskCard.tsx"
import { getAllColumns } from "../../model/api.ts"
import type { Column } from "../../model/table.types.ts"
import { ColumnContainer } from "./ColumnContainer.tsx"
import cls from "./TodoTable.module.sass"

type Props = {
  projectId: number
}

export const TodoTable = ({ projectId }: Props) => {
  const [tasks, setTasks] = useState<Task[]>(() => getTasks(projectId))
  const [columns, setColumns] = useState<Column[]>(getAllColumns)

  const columnsId = useMemo(() => columns.map(col => col.id), [columns])

  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10, //3px
      },
    }),
  )

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column)
      return
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task)
      return
    }
  }

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null)
    setActiveTask(null)

    const { active, over } = event
    if (!over) {
      return
    }

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) {
      return
    }

    const isActiveColumn = active.data.current?.type === "Column"
    const isOverColumn = over.data.current?.type === "Column"

    if (!isActiveColumn || !isOverColumn) {
      return
    }

    setColumns(columns => {
      const activeColumnIndex = columns.findIndex(col => col.id === activeId)
      const overColumnIndex = columns.findIndex(col => col.id === overId)

      return arrayMove(columns, activeColumnIndex, overColumnIndex)
    })
  }

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) {
      return
    }

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) {
      return
    }
    const isActiveTask = active.data.current?.type === "Task"
    const isOverTask = over.data.current?.type === "Task"

    if (!isActiveTask) {
      return
    }

    //dropping a task over another task
    if (isActiveTask && isOverTask) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(task => task.id === activeId)
        const overIndex = tasks.findIndex(task => task.id === overId)

        tasks[activeIndex].currentStatus = tasks[overIndex].currentStatus

        return arrayMove(tasks, activeIndex, overIndex)
      })
    }
    //dropping a task over a column
    const isOverColumn = over.data.current?.type === "Column"

    if (isActiveTask && isOverColumn) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(task => task.id === activeId)

        const column = columns.find(column => column.id === overId)

        tasks[activeIndex].currentStatus = column!.id

        return arrayMove(tasks, activeIndex, tasks.length)
      })
    }
  }

  return (
    <div className={cls.todoContainer}>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <SortableContext items={columnsId}>
          {columns.map(col => {
            return (
              <ColumnContainer
                tasks={tasks.filter(
                  task =>
                    task.currentStatus.toLowerCase() ===
                    col.title.toLowerCase(),
                )}
                column={col}
                key={col.id}
              />
            )
          })}
        </SortableContext>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                tasks={tasks.filter(
                  task =>
                    task.currentStatus.toLowerCase() ===
                    activeColumn.title.toLowerCase(),
                )}
                column={activeColumn}
              />
            )}
            {activeTask && <TaskCard task={activeTask} />}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  )
}
