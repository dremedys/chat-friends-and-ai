import React, { useState } from 'react'
import toast from 'react-hot-toast'

type Props = {
  onSubmit: (content: string) => void
  disabled: boolean
}

export const MessageInput: React.FC<Props> = ({ onSubmit, disabled }) => {
  const [message, setMessage] = useState('')

  const handleSendMessage = () => {
    const trimmed = message.trim()
    if (trimmed.length) {
      onSubmit(trimmed)
    } else {
      toast.error('No empty messages', { icon: '👀' })
    }
    setMessage('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSendMessage()
  }

  return (
    <div className="flex items-center border-t border-gray-300 bg-white h-[64px]">
      <input
        type="text"
        placeholder={disabled ? 'Wait...' : 'Write a message ...'}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={`flex-grow border-none focus:outline-none text-gray-700 placeholder-gray-500 text-sm h-full`}
        disabled={disabled}
        onKeyDown={handleKeyDown}
      />
      {disabled ? (
        <span className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
          <span className=" w-2 h-2 bg-white" />
        </span>
      ) : (
        <button onClick={handleSendMessage} className="ml-2 p-2">
          <img src="https://www.svgrepo.com/show/442000/send.svg" width={24} />
        </button>
      )}
    </div>
  )
}
