
import { Modal } from 'components/ui/Modal/Modal'
import {
  FC,
  PropsWithChildren,
  ReactNode,
  createContext,
  useState
} from 'react'

export interface IModalProps {
  isOpen: boolean
  modalElement: ReactNode
}

interface IModalContext {
  openModal: (component: ReactNode) => void
  closeModal: () => void
}

export const ModalContext = createContext<IModalContext>({} as IModalContext)

export const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [modal, setModal] = useState<IModalProps>({
    isOpen: false,
    modalElement: '',
  })

  const openModal = (component: ReactNode) => {
    setModal({
      isOpen: true,
      modalElement: component,
    })
  }

  const closeModal = () => {
    setModal({
      isOpen: false,
      modalElement: '',
    })
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      <Modal isOpen={modal.isOpen} modalElement={modal.modalElement} />
      {children}
    </ModalContext.Provider>
  )
}
