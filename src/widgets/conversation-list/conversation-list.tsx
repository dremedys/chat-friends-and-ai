import { useNavigate, useParams } from 'react-router-dom'
import { ConversationItem } from 'src/entities/conversation'
import { useEffect, useState } from 'react'
import { UserSearchModal } from '@/features/user-search'
import { useGetConversations } from '@/shared/api/message'
import { useSocket } from '@/shared/providers'
import { GetMessageResponseDto } from '@/shared/types/message'
import { useGetProfile } from '@/shared/api/auth'
import { Spinner } from 'flowbite-react'
import { useGetAiBotId } from '@/shared/api/ai.ts'

export const ConversationList = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const socket = useSocket()
  const { data: aiData } = useGetAiBotId()

  const [isUserSearchModalOpen, setIsUserSearchModalOpen] = useState<boolean>(false)
  const { data, refetch, isLoading } = useGetConversations()
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
      <div className=" px-6 tablet:pl-10 flex items-center border-b border-border-gray text-2xl font-semibold h-[76px]">
        <span>Messages</span>
        <img
          src="https://cdn-icons-png.flaticon.com/512/6423/6423944.png"
          className="w-12 ml-auto cursor-pointer"
          title="New message"
          onClick={() => setIsUserSearchModalOpen(true)}
        />
        <span
          className="py-[0.5px] px-2 text-basic-purple text-base font-semibold border-[2px] border-basic-purple rounded-xl cursor-pointer"
          style={{ fontFamily: 'Georgia' }}
          onClick={() => navigate(`/${aiData?.id}`)}
        >
          AI
        </span>
      </div>

      {isLoading ? (
        <div className="bg-chat w-full h-full flex justify-center pt-[24px]">
          <Spinner color="gray" />
        </div>
      ) : (
        data?.map((chat) => (
          <ConversationItem isActive={chat.user.id?.toString() === userId} chat={chat} key={chat.user.id} />
        ))
      )}

      {isUserSearchModalOpen && (
        <UserSearchModal isOpen={isUserSearchModalOpen} onClose={() => setIsUserSearchModalOpen(false)} />
      )}
    </div>
  )
}
