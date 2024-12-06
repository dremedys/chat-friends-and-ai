import { ConversationItem } from '@/entities/conversation'
import { FC } from 'react'
import { GetConversationResponseDto } from '@/shared/types/message'
import { Spinner } from 'flowbite-react'

type Props = {
  conversations: GetConversationResponseDto[]
  loading: boolean
  isChatOpen: boolean
  userId?: string
}

export const ConversationList: FC<Props> = ({ conversations, loading, isChatOpen, userId }) => {
  return (
    <div
      className={`bg-basic-white ${isChatOpen ? 'hidden' : 'flex-1'} mobile:max-w-[30vw] mobile:flex-auto mobile:block mobile:border-r border-border-gray`}
    >
      {loading ? (
        <div className="w-full h-full flex justify-center pt-[24px]">
          <Spinner color="gray" />
        </div>
      ) : (
        conversations?.map((chat) => (
          <ConversationItem isActive={chat.user.id?.toString() === userId} conversation={chat} key={chat.user.id} />
        ))
      )}
    </div>
  )
}
