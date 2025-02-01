import { useState } from "react"

import { getAllTasks } from "../../../../app/selectors.ts"
import { addTask, editTask } from "../../../../app/tasksSlice.ts"
import { Modal } from "../../../../shared/components/Modal.tsx"
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../shared/hooks/store-hooks.ts"
import type { Task } from "../../../../shared/model/projects.types.ts"
import { SubTasks } from "../TaskCard/SubTasks.tsx"
import cls from "./CreateTaskForm.module.sass"

type Props = {
  task: Task | null
  mode: "edit" | "create"
  onCloseModal: () => void
  onAddSubTask?: (id: number) => void
}

export const CreateTaskForm = ({
  task,
  onCloseModal,
  mode,
  onAddSubTask,
}: Props) => {
  const allTasks = useAppSelector(getAllTasks)
  const dispatch = useAppDispatch()
  const [myTask, setMyTask] = useState<Task>(
    task || {
      id: Math.floor(Math.random() * 10000),
      title: "",
      description: "",
      createdDate: new Date().toISOString().split("T")[0],
      timeInProgress: "",
      endDate: "",
      priority: "high",
      files: [],
      currentStatus: "queue",
      subTasks: [],
      comments: [],
    },
  )

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => {
    setIsModalOpen(false)
    return
  }

  const subTasks: Task[] = allTasks.filter(t =>
    myTask.subTasks.find(id => id === t.id),
  )

  const handleChangeTask = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    e.preventDefault()
    const { name, value } = e.target
    setMyTask(prev => {
      return {
        ...prev,
        [name]: value,
      }
    })
    setMyTask({ ...myTask, [name]: value })
  }

  const handleAddSubTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // dispatch(editTask(myTask))
    handleOpenModal()
  }

  const handleEditTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(editTask(myTask))
    onCloseModal()
  }

  const handleAddTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(addTask(myTask))
    if (onAddSubTask) {
      onAddSubTask(myTask.id)
    }
    onCloseModal()
  }

  const addSubTask = (id: number) => {
    setMyTask(prev => {
      return { ...prev, subTasks: [...prev.subTasks, id] }
    })
  }

  return (
    <>
      <div className={cls.formContainer}>
        {mode === "edit" && <span>Редактирование задачи</span>}
        {mode === "create" && <span>Создание задачи</span>}

        {mode === "edit" && <span>#{myTask?.id}</span>}

        <form>
          <label>
            <p>Заголовок</p>
            <input
              type="text"
              name="title"
              value={myTask?.title}
              onChange={handleChangeTask}
            />
          </label>
          <label>
            <p>Описание</p>
            <input
              type="text"
              name="description"
              value={myTask?.description}
              onChange={handleChangeTask}
            />
          </label>
          <label>
            <p>Время в работе</p>
            <input
              type="text"
              name="timeInProgress"
              value={myTask?.timeInProgress}
              onChange={handleChangeTask}
            />
          </label>
          <label>
            <p>Дата окончания</p>
            <input
              type="text"
              name="endDate"
              value={myTask?.endDate}
              onChange={handleChangeTask}
            />
          </label>
          <label>
            <p>Приоритет</p>
            <select
              name="priority"
              defaultValue={myTask?.priority}
              onChange={handleChangeTask}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          <label>
            <p>Вложенные файлы</p>
            <input
              type="text"
              name="files"
              value="сюда надо файлы"
              onChange={handleChangeTask}
            />
          </label>
          <label>
            <p>Текущий статус</p>
            <select
              name="currentStatus"
              defaultValue={myTask?.currentStatus}
              onChange={handleChangeTask}
            >
              <option value="queue">Queue</option>
              <option value="development">Development</option>
              <option value="done">Done</option>
            </select>
          </label>

          {mode === "edit" && (
            <div>
              <p>Подзадачи</p>
              <SubTasks subTasks={subTasks || []} />
              <button className={cls.addSubTaskBtn} onClick={handleAddSubTask}>
                Добавить подзадачу
              </button>
            </div>
          )}

          {mode === "edit" && (
            <button onClick={handleEditTask}>Сохранить</button>
          )}
          {mode === "create" && (
            <button onClick={handleAddTask}>Добавить задачу</button>
          )}
        </form>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <CreateTaskForm
          task={null}
          onCloseModal={handleCloseModal}
          mode="create"
          onAddSubTask={addSubTask}
        />
      </Modal>
    </>
  )
}
