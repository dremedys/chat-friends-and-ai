import React, { useState, useEffect } from 'react'
import { Modal, TextInput, Spinner } from 'flowbite-react'
import { useSearchUser } from '@/shared/api/user'
import { useDebounce } from '@/shared/hooks/use-debounce'
import { useNavigate } from 'react-router-dom'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const UserSearchModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const [query, setQuery] = useState<string>('')
  const debouncedQuery = useDebounce(query, 500)
  const { data: usersResult, mutate: searchUserMutate, isPending } = useSearchUser()

  useEffect(() => {
    if (debouncedQuery.trim().length > 0) {
      searchUserMutate(debouncedQuery.trim())
    }
  }, [debouncedQuery])

  const handleClickUser = (id: number) => {
    onClose()
    navigate(`/${id}`)
  }

  const renderContent = () => {
    if (isPending) {
      return <Spinner color="purple" size="xl" />
    }
    if (!debouncedQuery.trim().length) {
      return null
    }
    if (usersResult?.data.length) {
      return (
        <ul className="w-full">
          {usersResult?.data.map((user) => (
            <li
              onClick={() => handleClickUser(user.id)}
              key={user.email}
              className="p-2 border-b cursor-pointer border-chat border rounded-xl w-full flex justify-between items-center mb-4"
            >
              <div>
                <p className="font-semibold">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/6423/6423944.png"
                className="ml-auto cursor-pointer"
                width={39}
                height="auto"
                title="New message"
              />
            </li>
          ))}
        </ul>
      )
    } else {
      return <p>User not found :(</p>
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
