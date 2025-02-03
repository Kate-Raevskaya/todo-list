import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  MouseSensor,
  TouchSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"
import { useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"

import { getAllTasks } from "../../../../app/selectors.ts"
import { moveTask } from "../../../../app/tasksSlice.ts"
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../shared/hooks/store-hooks.ts"
import type { Task } from "../../../../shared/model/projects.types.ts"
import { TaskCard } from "../../../tasks/ui/TaskCard/TaskCard.tsx"
import { getAllColumns } from "../../model/api.ts"
import type { Column } from "../../model/table.types.ts"
import { ColumnContainer } from "./ColumnContainer.tsx"
import cls from "./TodoTable.module.sass"

type Props = {
  projectId: number
  filter: string
}

export const TodoTable = ({ projectId, filter }: Props) => {
  const allTasks = useAppSelector(state => getAllTasks(state))
  const tasks = allTasks.filter(
    task =>
      task.id.toString().toLowerCase().startsWith(filter) ||
      task.title.toLowerCase().startsWith(filter),
  )
  const dispatch = useAppDispatch()
  const timeout = useRef<NodeJS.Timeout>()
  const [columns, setColumns] = useState<Column[]>(getAllColumns)

  const columnsId = useMemo(() => columns.map(col => col.id), [columns])

  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10, //10px
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
      clearTimeout(timeout.current)
      timeout.current = setTimeout(() => {
        const activeIndex = tasks.findIndex(task => task.id === activeId)
        const overIndex = tasks.findIndex(task => task.id === overId)
        dispatch(
          moveTask(tasks[overIndex].currentStatus, activeIndex, overIndex),
        )
      }, 10)
    }
    // dropping a task over a column
    const isOverColumn = over.data.current?.type === "Column"

    if (isActiveTask && isOverColumn) {
      clearTimeout(timeout.current)
      timeout.current = setTimeout(() => {
        const activeIndex = tasks.findIndex(task => task.id === activeId)
        const column = columns.find(column => column.id === overId)
        dispatch(moveTask(column!.id, activeIndex, tasks.length - 1))
      }, 10)
    }
  }

  return (
    <div className={cls.todoContainer}>
      <DndContext
        collisionDetection={pointerWithin}
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
