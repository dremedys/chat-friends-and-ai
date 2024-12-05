import { GetMessageResponseDto } from '@/shared/types/message'
import { useGetProfile } from '@/shared/api/auth'
import { FC, useEffect, useRef } from 'react'
import { MessageItem } from 'src/entities/message'
import { ChatEmpty } from './chat-empty.tsx'

type Props = {
  messages: GetMessageResponseDto[]
  isLoading: boolean
}
export const Chat: FC<Props> = ({ messages, isLoading }) => {
  const { data } = useGetProfile(true)
  const myUserId = data?.id
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => {
      ref.current?.scroll({ top: ref.current.scrollHeight, behavior: 'smooth' })
    }, 300)
  }, [messages])

  return (
    <div className="px-10 overflow-auto" id="chat" style={{ height: 'calc(100vh - 76px - 64px - 92px)' }} ref={ref}>
      {isLoading ? null : messages.length ? (
        messages.map((msg) => <MessageItem key={msg.id} isFromMe={msg.fromUserId === myUserId} content={msg.content} />)
      ) : (
        <ChatEmpty />
      )}
    </div>
  )
}
