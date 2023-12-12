import cn from 'classnames'

import { IModalProps, ModalContext } from 'providers/ModalProvider/ModalProvider'
import { FC, useContext } from 'react'
import styles from './Modal.module.scss'

export const Modal: FC<IModalProps> = ({ modalElement, isOpen }) => {
  const { closeModal } = useContext(ModalContext)

  return (
    <div
      className={cn(isOpen && styles.active, styles.modalWrapper)}
      onClick={closeModal}
    >
      <div className={styles.modal} onClick={event => event.stopPropagation()}>
        {modalElement}
      </div>
    </div>
  )
}
