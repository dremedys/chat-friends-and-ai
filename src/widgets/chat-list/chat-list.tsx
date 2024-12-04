import { useParams } from 'react-router-dom'
import { ChatPreviewItem } from 'src/entities/chat-preview'
import { useEffect, useState } from 'react'
import { UserSearchModal } from '@/features/user-search'
import { useGetChats } from '@/shared/api/message'
import { useSocket } from '@/shared/providers'
import { GetMessageResponseDto } from '@/shared/types/message'
import { useGetProfile } from '@/shared/api/auth'

export const ChatList = () => {
  const { userId } = useParams()
  const socket = useSocket()

  const [isUserSearchModalOpen, setIsUserSearchModalOpen] = useState<boolean>(false)
  const { data, refetch } = useGetChats()
  const { data: profile } = useGetProfile(true)

  useEffect(() => {
    socket?.on('new_chat', (msg: GetMessageResponseDto) => {
      if (msg.fromUserId === profile?.id || msg.fromUserId === profile?.id) {
        refetch()
      }
    })
  }, [socket, profile?.id])

  return (
    <div
      className={`bg-basic-white ${userId ? 'hidden' : 'flex-1'} mobile:flex-[0.3]  mobile:block mobile:border-r border-border-gray`}
    >
      <div className=" px-6 tablet:pl-10 flex items-center border-b border-border-gray text-2xl font-semibold h-[76px] flex">
        <span>Messages</span>
        <img
          src="https://cdn-icons-png.flaticon.com/512/6423/6423944.png"
          className="w-12 ml-auto cursor-pointer"
          title="New message"
          onClick={() => setIsUserSearchModalOpen(true)}
        />
      </div>

      {data?.map((chat) => (
        <ChatPreviewItem isActive={chat.user.id?.toString() === userId} chat={chat} key={chat.user.id} />
      ))}

      {isUserSearchModalOpen && (
        <UserSearchModal isOpen={isUserSearchModalOpen} onClose={() => setIsUserSearchModalOpen(false)} />
      )}
    </div>
  )
}
