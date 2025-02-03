import { type ReactNode, useEffect, useState } from "react"
import { createPortal } from "react-dom"

import cls from "./Modal.module.sass"

type Props = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export const Modal = ({ isOpen, onClose, children }: Props) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setTimeout(() => setIsAnimating(true), 10) // Даем время для применения CSS-классов
    } else {
      setIsAnimating(false)
      setTimeout(() => setIsVisible(false), 300) // Удаляем из DOM после анимации
    }
  }, [isOpen])

  if (!isVisible) {
    return null
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <>
      {createPortal(
        <div
          className={`${cls.modalOverlay} ${cls[isAnimating ? "open" : "close"]}`}
          onClick={handleOverlayClick}
        >
          <div className={cls.modalContent}>
            <button className={cls.closeButton} onClick={onClose}>
              &#xD7;
            </button>
            {children}
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
