import React, { useState, useEffect } from 'react'
import { Modal, Button, TextInput, Spinner } from 'flowbite-react'

interface User {
  id: number
  name: string
  email: string
}

interface UserSearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const UserSearchModal: React.FC<UserSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState<string>('')
  const [results, setResults] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true)
      // Имитация API-запроса
      const timeoutId = setTimeout(() => {
        // Статический список пользователей для примера
        const users: User[] = [
          { id: 1, name: 'Алиса', email: 'alice@example.com' },
          { id: 2, name: 'Боб', email: 'bob@example.com' },
          { id: 3, name: 'Чарли', email: 'charlie@example.com' },
        ]
        const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(query.toLowerCase()))
        setResults(filteredUsers)
        setIsLoading(false)
      }, 500)

      return () => clearTimeout(timeoutId)
    } else {
      setResults([])
    }
  }, [query])

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Поиск пользователей</Modal.Header>
      <Modal.Body>
        <TextInput placeholder="Введите имя для поиска..." value={query} onChange={(e) => setQuery(e.target.value)} />
        {isLoading ? (
          <div className="flex justify-center mt-4">
            <Spinner size="lg" />
          </div>
        ) : (
          <ul className="mt-4">
            {results.map((user) => (
              <li key={user.id} className="p-2 border-b">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </li>
            ))}
          </ul>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UserSearchModal
