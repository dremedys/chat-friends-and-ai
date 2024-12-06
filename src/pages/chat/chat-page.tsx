import { useParams } from 'react-router-dom'
import { MessageInput, useSendMessage, useHandleMessage } from '@/features/messaging'
import { useGetUserById } from '@/shared/api/user'
import { useGetProfile } from '@/shared/api/auth'
import { useState } from 'react'
import { GetMessageResponseWithStatus } from '@/entities/message'

import { ChatHeader } from './ui/chat-header'
import { Chat } from './ui/chat'

export const ChatPage = () => {
  const { userId } = useParams()
  const [messages, setMessages] = useState<GetMessageResponseWithStatus[]>([])

  const { data: currentUser } = useGetProfile(true)
  const { data: user } = useGetUserById(userId ? Number(userId) : undefined)

  const { isMessageHistoryLoading } = useHandleMessage(setMessages, user?.id, currentUser?.id)
  const { handleResendMessageOnError, handleSendMessage, isPostMessageError, isPostingMessage } = useSendMessage(
    messages,
    setMessages,
    user?.id,
    currentUser?.id,
  )

  return (
    <div className="bg-chat flex-1 flex flex-col">
      <ChatHeader user={user} />
      <Chat
        messages={messages ?? []}
        isLoading={isMessageHistoryLoading}
        errorState={{ isError: isPostMessageError, onRetry: handleResendMessageOnError }}
      />
      <MessageInput
        disabled={isPostingMessage || isPostMessageError || isMessageHistoryLoading}
        onSubmit={handleSendMessage}
      />
    </div>
  )
}
