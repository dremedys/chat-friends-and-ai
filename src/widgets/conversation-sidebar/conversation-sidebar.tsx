import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import { useSocket } from '@/shared/providers'
import { useGetAiBotId } from '@/shared/api/ai'
import { useGetConversations } from '@/shared/api/message'
import { useGetProfile } from '@/shared/api/auth'
import { GetMessageResponseDto } from '@/shared/types/message'
import { ConversationsHeader } from './ui/conversations-header'
import { UserSearchModal } from '@/features/user-search'
import { ConversationList } from './ui/conversation-list'
import { useModalState } from '@/shared/hooks/use-modal'

export const ConversationSidebar = () => {
  const { userId } = useParams()
  const navigate = useNavigate()

  const isChatOpen = useMemo(() => !!userId, [userId])
  const socket = useSocket()
  const { data: aiData } = useGetAiBotId()

  const userSearchModalState = useModalState()
  const { data: conversations, refetch: refetchConversations, isLoading: conversationsLoading } = useGetConversations()
  const { data: profile } = useGetProfile(true)

  useEffect(() => {
    const socketHandler = (message: GetMessageResponseDto) => {
      // TODO Not safe :( Redo on server side.
      const newMessageIsForCurrentChat = message.fromUserId === profile?.id || message.toUserId === profile?.id
      if (newMessageIsForCurrentChat) {
        refetchConversations()
      }
    }
    socket?.on('new_chat', socketHandler)

    return () => {
      socket?.off('new_chat', socketHandler)
    }
  }, [socket, profile?.id])

  return (
    <div
      className={`bg-basic-white ${isChatOpen ? 'hidden' : 'flex-1'} mobile:max-w-[30vw] mobile:flex-auto mobile:block mobile:border-r border-border-gray`}
    >
      <ConversationsHeader
        onNewChatClick={userSearchModalState.handleModalOpen}
        onAiChatClick={() => navigate(`/${aiData?.id}`)}
      />
      <ConversationList
        conversations={conversations ?? []}
        loading={conversationsLoading}
        isChatOpen={isChatOpen}
        userId={userId}
      />

      <UserSearchModal isOpen={userSearchModalState.isOpen} onClose={userSearchModalState.handleModalClose} />
    </div>
  )
}
