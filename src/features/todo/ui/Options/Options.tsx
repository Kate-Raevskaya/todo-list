import { useEffect, useState } from "react"
import { NavLink } from "react-router"

import { getProjectById } from "../../../../app/selectors.ts"
import { Modal } from "../../../../shared/components/Modal.tsx"
import { useAppSelector } from "../../../../shared/hooks/store-hooks.ts"
import { useDebounce } from "../../../../shared/hooks/useDebounce.ts"
import { CreateTaskForm } from "../../../tasks/ui/CreateTaskForm/CreateTaskForm.tsx"
import cls from "./Options.module.sass"

type Props = {
  onFilterChanged: (value: string) => void
  projectId: number
}

export const Options = ({ onFilterChanged, projectId }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")
  const debouncedValue = useDebounce(inputValue, 300)
  const project = useAppSelector(state => getProjectById(state, projectId))

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => {
    setIsModalOpen(false)
    return
  }

  useEffect(() => {
    onFilterChanged(debouncedValue)
  }, [debouncedValue])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setInputValue(e.target.value)
  }

  return (
    <>
      <div className={cls.container}>
        <div className={cls.title}>
          <h3>{project?.name}</h3>
          <NavLink className={cls.backToProjects} to={"/"}>
            К списку проектов
          </NavLink>
        </div>
        <div className={cls.innerContainer}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Введите номер или название задачи..."
          />
          <div className={cls.createButton} onClick={handleOpenModal}></div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <CreateTaskForm
          task={null}
          onCloseModal={handleCloseModal}
          mode="create"
        />
      </Modal>
    </>
  )
}
