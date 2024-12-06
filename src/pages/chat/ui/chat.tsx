import { useGetProfile } from '@/shared/api/auth'
import { FC, useEffect, useRef } from 'react'
import { MessageItem, GetMessageResponseWithStatus } from '@/entities/message'

import { ChatEmpty } from './chat-empty'
import { ChatError } from './chat-error'

type Props = {
  messages: GetMessageResponseWithStatus[]
  isLoading: boolean
  errorState: {
    isError: boolean
    onRetry: () => void
  }
}

export const Chat: FC<Props> = ({ messages, isLoading, errorState }) => {
  const { data: currentUser } = useGetProfile(true)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => {
      ref.current?.scroll({ top: ref.current.scrollHeight, behavior: 'smooth' })
    }, 300)
  }, [messages])

  return (
    <div className="px-10 overflow-auto" id="chat" style={{ height: 'calc(100vh - 76px - 64px - 92px)' }} ref={ref}>
      {isLoading ? null : messages.length ? (
        messages.map((msg) => (
          <MessageItem
            isError={msg.isError}
            key={msg.id}
            isFromMe={msg.fromUserId === currentUser?.id}
            content={msg.content}
          />
        ))
      ) : (
        <ChatEmpty />
      )}
      {errorState.isError && <ChatError onRetry={errorState.onRetry} />}
    </div>
  )
}
