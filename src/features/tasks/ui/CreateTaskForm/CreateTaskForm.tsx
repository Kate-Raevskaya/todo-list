import type { FilePondInitialFile } from "filepond"
import "filepond/dist/filepond.min.css"
import { useState } from "react"
import { FilePond } from "react-filepond"

import { AddButton } from "../../../../shared/components/AddButton.tsx"
import { Modal } from "../../../../shared/components/Modal.tsx"
import { dateNow } from "../../../../shared/hepers/date-transform.ts"
import { saveFile } from "../../../../shared/hepers/files.ts"
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../shared/hooks/store-hooks.ts"
import type { Task } from "../../../../shared/model/projects.types.ts"
import { getAllTasks, getCurrentProject } from "../../../../store/selectors.ts"
import { addTask, editTask } from "../../../../store/tasksSlice.ts"
import { SubTasks } from "../TaskCard/SubTasks.tsx"
import cls from "./CreateTaskForm.module.sass"

type Props = {
  task: Task | null
  mode: "edit" | "create"
  onCloseModal: () => void
  onAddSubTask?: (id: number) => void
  onSetInputValue?: () => void
}

export const CreateTaskForm = ({
  task,
  onCloseModal,
  mode,
  onAddSubTask,
  onSetInputValue,
}: Props) => {
  const allTasks = useAppSelector(getAllTasks)
  const currentProject = useAppSelector(getCurrentProject)
  const dispatch = useAppDispatch()
  const [myTask, setMyTask] = useState<Task>(
    task || {
      id: -1,
      projectId: currentProject!,
      title: "",
      description: "",
      createdDate: dateNow(),
      timeInProgress: "0",
      endDate: "",
      priority: "high",
      files: [],
      currentStatus: "queue",
      subTasks: [],
    },
  )

  const [files, setFiles] = useState<any[]>(
    task
      ? task?.files.map((file): FilePondInitialFile => {
          return {
            source: file.id,
            options: {
              type: "local",
              file: { name: file.name, size: file.size, type: file.type },
            },
          }
        })
      : [],
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
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
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
    handleOpenModal()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (onSetInputValue) {
      onSetInputValue()
    }

    const newTask: Task = {
      ...myTask,
      files: files.map(file => {
        const fileId =
          typeof file.serverId === "string"
            ? file.serverId
            : Date.now().toString()
        return {
          id: fileId,
          name: file.file.name,
          size: file.file.size,
          type: file.file.type,
        }
      }),
    }

    if (mode === "edit") {
      dispatch(editTask(newTask))
      onCloseModal()
    }
    if (mode === "create") {
      dispatch(addTask(newTask))
      if (onAddSubTask) {
        onAddSubTask(newTask.id)
      }
      onCloseModal()
    }
  }

  const addSubTask = (id: number) => {
    setMyTask(prev => {
      return { ...prev, subTasks: [...prev.subTasks, id] }
    })
  }

  return (
    <>
      <div className={cls.formContainer}>
        {mode === "edit" && <h3>Редактирование задачи</h3>}
        {mode === "create" && <h3>Создание задачи</h3>}

        {mode === "edit" && <h4>#{myTask?.id}</h4>}

        <form onSubmit={handleSubmit}>
          <label>
            <p>Заголовок</p>
            <input
              type="text"
              name="title"
              required={true}
              min={1}
              value={myTask?.title}
              onChange={handleChangeTask}
            />
          </label>
          <label>
            <p>Описание</p>
            <textarea
              name="description"
              value={myTask?.description}
              onChange={handleChangeTask}
            />
          </label>
          <label>
            <p>Время в работе, в часах</p>
            <input
              type="number"
              name="timeInProgress"
              min={0}
              value={myTask?.timeInProgress}
              onChange={handleChangeTask}
            />
          </label>
          <label>
            <p>Дата окончания</p>
            <input
              type="date"
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
            <FilePond
              server={{
                process: (
                  fieldName,
                  file,
                  metadata,
                  load,
                  error,
                  progress,
                  abort,
                  transfer,
                  options,
                ) => {
                  progress(false, 0, 0)
                  saveFile(file)
                    .then(result => {
                      if (result) {
                        load(result)
                      }
                    })
                    .catch(() => {
                      error("file exists")
                    })

                  return {
                    abort: () => {
                      abort()
                    },
                  }
                },
              }}
              files={files}
              allowReorder={true}
              allowMultiple={true}
              onupdatefiles={setFiles}
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
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
            <div className={cls.subTasks}>
              <p className={cls.title}>Подзадачи</p>
              <SubTasks subTasks={subTasks || []} />
              <button className={cls.addSubTaskBtn} onClick={handleAddSubTask}>
                Добавить подзадачу
              </button>
            </div>
          )}
          <AddButton
            title={mode === "edit" ? "Сохранить" : "Добавить задачу"}
          />
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
