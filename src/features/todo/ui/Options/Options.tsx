import { useEffect, useState } from "react"
import { NavLink } from "react-router"

import { Modal } from "../../../../shared/components/Modal.tsx"
import { useDebounce } from "../../../../shared/hooks/useDebounce.ts"
import search from "../../../../shared/images/search-icon.svg"
import type { Project } from "../../../../shared/model/projects.types.ts"
import { CreateTaskForm } from "../../../tasks/ui/CreateTaskForm/CreateTaskForm.tsx"
import cls from "./Options.module.sass"

type Props = {
  onFilterChanged: (value: string) => void
  project: Project
}

export const Options = ({ onFilterChanged, project }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")
  const debouncedValue = useDebounce(inputValue, 300)

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => {
    setIsModalOpen(false)
    return
  }

  const handleSetInputValue = () => {
    setInputValue("")
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
          <div className={cls.inputWrapper}>
            <label htmlFor="search-input" className={cls.searchLabel}>
              <img src={search} className={cls.searchIcon} alt="search" />
            </label>
            <input
              id="search-input"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Искать по номеру или названию задачи..."
            />
          </div>
          <div className={cls.createButton} onClick={handleOpenModal}></div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <CreateTaskForm
          task={null}
          onCloseModal={handleCloseModal}
          onSetInputValue={handleSetInputValue}
          mode="create"
        />
      </Modal>
    </>
  )
}
