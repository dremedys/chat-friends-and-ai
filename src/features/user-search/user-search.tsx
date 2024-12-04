import React, { useState, useEffect } from 'react'
import { Modal, TextInput, Spinner } from 'flowbite-react'
import { useSearchUser } from '@/shared/api/user'
import { useDebounce } from '@/shared/hooks/use-debounce'
import { useNavigate } from 'react-router-dom'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const UserSearchModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const [query, setQuery] = useState<string>('')
  const debouncedQuery = useDebounce(query, 500)
  const { data, mutate, isPending } = useSearchUser()

  useEffect(() => {
    if (debouncedQuery.trim().length > 0) {
      mutate(debouncedQuery.trim())
    }
  }, [debouncedQuery])

  const handleClickUser = (id: number) => {
    onClose()
    navigate(`/${id}`)
  }

  const renderContent = () => {
    if (isPending) {
      return <Spinner size="lg" />
    }
    if (!debouncedQuery.trim().length) {
      return null
    }
    if (data?.data.length) {
      return data?.data.map((user) => (
        <div onClick={() => handleClickUser(user.id)} key={user.email} className="p-2 border-b">
          <p className="font-semibold">{user.firstName}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      ))
    } else {
      return <div>User not found :(</div>
    }
  }

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>New chat</Modal.Header>
      <Modal.Body>
        <TextInput placeholder="Enter email or name of user" value={query} onChange={(e) => setQuery(e.target.value)} />

        <div className="flex justify-center mt-4 min-h-[300px]"> {renderContent()}</div>
      </Modal.Body>
    </Modal>
  )
}
