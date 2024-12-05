import { Link, useParams } from 'react-router-dom'
import { MessageInput } from '@/features/message-input'
import { useGetUserById } from '@/shared/api/user.ts'
import { Chat } from '@/features/chat'
import { GetMessageResponseDto, SendMessageRequest } from '@/shared/types/message.ts'
import { useGetProfile } from '@/shared/api/auth.ts'
import { useGetMessages } from '@/shared/api/message.ts'
import { ROUTES } from '@/shared/constants/router.ts'
import { useSocket } from '@/shared/providers'
import { useEffect, useState } from 'react'

export const ChatPage = () => {
  const { userId } = useParams()
  const { data } = useGetProfile(true)
  const { data: messagesData, isLoading } = useGetMessages(userId)
  const [messages, setMessages] = useState<GetMessageResponseDto[]>([])

  useEffect(() => {
    if (messagesData) setMessages(messagesData)
  }, [messagesData])

  const { data: user } = useGetUserById(userId ? Number(userId) : undefined)
  const socket = useSocket()

  const handleMessage = (content: string) => {
    const body: SendMessageRequest = { content, toUserId: Number(userId), fromUserId: data?.id ?? 0 }

    socket?.emit('message', body)
  }

  useEffect(() => {
    socket?.on(`message`, (msg: GetMessageResponseDto) => {
      if (data?.id === msg.fromUserId || data?.id === msg.toUserId) {
        setMessages((prev) => [...prev, msg])
      }
    })
  }, [socket, data])

  return (
    <div className="bg-chat flex-1 flex flex-col">
      <header className="px-6 tablet:px-10 py-[18px] bg-basic-white h-[76px] border-b border-border-gray flex items-start gap-x-1">
        <Link to={ROUTES.index} className="tablet:hidden">
          <img src="back.svg" className="mt-[4px]" />
        </Link>
        <div>
          <p className="text-lg">{user ? `${user?.firstName} ${user?.lastName}` : 'Loading...'}</p>
          <p className="text-gray-400">Online</p>
        </div>
      </header>
      <Chat messages={messages ?? []} isLoading={isLoading} />
      <MessageInput onSubmit={handleMessage} />
    </div>
  )
}
