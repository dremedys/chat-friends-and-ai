import { useCallback, useState } from 'react'

export const useModalState = (isModalOpen: boolean = false) => {
  const [isOpen, setIsOpen] = useState<boolean>(isModalOpen)

  const handleModalOpen = useCallback((): void => {
    setIsOpen(true)
  }, [])

  const handleModalClose = useCallback((): void => {
    setIsOpen(false)
  }, [])

  return {
    isOpen,
    handleModalOpen,
    handleModalClose,
  }
}
