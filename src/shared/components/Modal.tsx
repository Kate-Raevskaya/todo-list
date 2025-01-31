import type { ReactNode } from "react"
import { createPortal } from "react-dom"

import cls from "./Modal.module.sass"

type Props = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export const Modal = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) {
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
        <div className={cls.modalOverlay} onClick={handleOverlayClick}>
          <div className={cls.modalContent}>
            <button className={cls.closeButton} onClick={onClose}>
              X
            </button>
            {children}
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
