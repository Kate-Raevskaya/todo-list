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
      setTimeout(() => setIsAnimating(true), 30)
    } else {
      setIsAnimating(false)
      setTimeout(() => setIsVisible(false), 300)
    }
  }, [isOpen])

  if (!isVisible) {
    return null
  }

  return (
    <>
      {createPortal(
        <div
          className={`${cls.modalOverlay} ${cls[isAnimating ? "open" : "close"]}`}
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
