import { useEffect, useState } from "react"
import { NavLink } from "react-router"

import { getAllTasks } from "../../../../app/selectors.ts"
import { Modal } from "../../../../shared/components/Modal.tsx"
import { useAppSelector } from "../../../../shared/hooks/store-hooks.ts"
import { useDebounce } from "../../../../shared/hooks/useDebounce.ts"
import { CreateTaskForm } from "../../../tasks/ui/CreateTaskForm/CreateTaskForm.tsx"
import cls from "./Options.module.sass"

type Props = {
  onFilterChanged: (value: string) => void
}

export const Options = ({ onFilterChanged }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")
  const debouncedValue = useDebounce(inputValue, 300)

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
        <NavLink to={"/"}>Back to all projects</NavLink>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type title or task number..."
        />
        <button onClick={handleOpenModal}>Create new task</button>
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
