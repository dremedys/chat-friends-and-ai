import React, { useState } from 'react'

type Props = {
  onSend: (value: string) => void
}

export const MessageInput: React.FC<Props> = ({ onSend }) => {
  const [message, setMessage] = useState('')

  const handleSendMessage = () => {
    const trimmed = message.replace(/^\s+/, '')
    if (trimmed.length) {
      onSend(trimmed)
    }
    setMessage('')
  }

  return (
    <div className="flex items-center border-t border-gray-300 bg-white h-[64px]">
      <input
        type="text"
        placeholder="Write a message ..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow border-none focus:outline-none text-gray-700 placeholder-gray-500 text-sm h-full"
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSendMessage()
        }}
      />
      <button
        onClick={handleSendMessage}
        className="ml-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="h-5 w-5 text-gray-600"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default MessageInput
