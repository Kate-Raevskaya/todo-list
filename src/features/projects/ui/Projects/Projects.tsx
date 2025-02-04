import { useEffect, useRef, useState } from "react"

import { AddButton } from "../../../../shared/components/AddButton.tsx"
import { Modal } from "../../../../shared/components/Modal.tsx"
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../shared/hooks/store-hooks.ts"
import projectImage from "../../../../shared/images/project.png"
import type { Project } from "../../../../shared/model/projects.types.ts"
import { addProject } from "../../../../store/projectsSlice.ts"
import { getAllProjects } from "../../../../store/selectors.ts"
import { ProjectCard } from "../ProjectCard/ProjectCard.tsx"
import cls from "./Projects.module.sass"

const Projects = () => {
  const projects = useAppSelector(getAllProjects)
  const dispatch = useAppDispatch()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [projectTitle, setProjectTitle] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isModalOpen])

  const handleClick = () => {
    handleOpenModal()
  }

  const handleOpenModal = () => setIsModalOpen(true)

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setProjectTitle("")
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
    <div className={cls.mainContainer}>
      <div className={cls.top}>
        <h1>Мои проекты</h1>
        <div className={cls.container}>
          {projects.length > 0 ? (
            projects.map(project => {
              return (
                <div key={project.id}>
                  <ProjectCard project={project} />
                </div>
              )
            })
          ) : (
            <div className={cls.epptyProjects}>
              <img src={projectImage} alt="projects" />
              <p>Нажмите на кпопку, чтобы добавить свой первый проект</p>
            </div>
          )}
        </div>
      </div>
      <div className={cls.bottom}>
        <div className={cls.addButton} onClick={handleClick}>
          <div>Добавить проект</div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className={cls.addProjectForm}>
          <h2>Введите название проекта:</h2>
          <form onSubmit={addNewProject}>
            <input
              type="text"
              name="title"
              ref={inputRef}
              required={true}
              value={projectTitle}
              onChange={handleInputChange}
            />
            <AddButton title="Добавить проект" />
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default Projects
