import { useState } from "react"

import { addProject } from "../../../../app/projectsSlice.ts"
import { getAllProjects } from "../../../../app/selectors.ts"
import { Modal } from "../../../../shared/components/Modal.tsx"
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../shared/hooks/store-hooks.ts"
import type { Project } from "../../../../shared/model/projects.types.ts"
import { ProjectCard } from "../ProjectCard/ProjectCard.tsx"
import cls from "./Projects.module.sass"

const Projects = () => {
  const projects = useAppSelector(getAllProjects)
  const dispatch = useAppDispatch()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [projectTitle, setProjectTitle] = useState<string>("")

  const handleClick = () => {
    handleOpenModal()
  }

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => {
    setIsModalOpen(false)
    return
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectTitle(e.target.value)
  }

  const addNewProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newProject: Project = {
      id: -1,
      name: projectTitle,
    }
    dispatch(addProject(newProject))
    setProjectTitle("")
    handleCloseModal()
  }

  return (
    <>
      <div className={cls.container}>
        <button onClick={handleClick}>Add project</button>
        {projects.map(project => {
          return (
            <div key={project.id}>
              <ProjectCard project={project} />
            </div>
          )
        })}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <form onSubmit={addNewProject}>
          <span>Enter project name:</span>
          <input
            type="text"
            name="title"
            value={projectTitle}
            onChange={handleInputChange}
          />
          <button type="submit">Add project</button>
        </form>
      </Modal>
    </>
  )
}

export default Projects
