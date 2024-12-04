import React, { useState, useEffect } from 'react'
import { Modal, TextInput, Spinner } from 'flowbite-react'
import { useSearchUser } from '@/shared/api/user'
import { useDebounce } from '@/shared/hooks/use-debounce'
import { useNavigate } from 'react-router-dom'

interface UserSearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export const UserSearchModal: React.FC<UserSearchModalProps> = ({ isOpen, onClose }) => {
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

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>New chat</Modal.Header>
      <Modal.Body>
        <TextInput placeholder="Enter email or name of user" value={query} onChange={(e) => setQuery(e.target.value)} />
        {isPending ? (
          <div className="flex justify-center mt-4">
            <Spinner size="lg" />
          </div>
        ) : debouncedQuery.trim().length ? (
          <ul className="mt-4">
            {data?.data.map((user) => (
              <div onClick={() => handleClickUser(user.id)} key={user.email} className="p-2 border-b">
                <p className="font-semibold">{user.firstName}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            ))}
          </ul>
        ) : null}
      </Modal.Body>
    </Modal>
  )
}
