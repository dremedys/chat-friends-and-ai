import { Link } from 'react-router-dom'
import { FC } from 'react'
import { GetConversationResponseDto } from '@/shared/types/message'
import { formatTimestamp } from '@/entities/conversation/lib/utils'

type Props = {
  isActive?: boolean
  unreadMessageCount?: number
  conversation: GetConversationResponseDto
}

export const ConversationItem: FC<Props> = ({ isActive, unreadMessageCount, conversation }) => {
  return (
    <Link
      to={`/${conversation.user.id}`}
      className={`flex justify-between gap-x-1 px-6 tablet:px-10 py-[18px] border-b border-border-gray hover:bg-blue-50 ${isActive ? 'bg-chat' : ''}`}
    >
      <div className="overflow-hidden">
        <p
          className={`text-basic-black text-lg font-medium flex items-center gap-x-2 $ ${conversation.user.isAI ? 'py-[0.5px] bg-gradient-to-br from-purple-500 to-purple-200  px-2 text-basic-white text-base font-semibold rounded-xl' : ''}`}
        >
          {conversation.user.firstName} {conversation.user.lastName}
        </p>
        <p className="text-gray-400 block w-[100%] text-base text-ellipsis overflow-hidden whitespace-nowrap">
          <span>{conversation.lastMessage.content}</span>
        </p>
      </div>
      <div className="flex flex-col items-end justify-end">
        {unreadMessageCount && (
          <span className="bg-basic-purple text-white w-6 h-6 rounded-full flex justify-center items-center text-sm">
            {unreadMessageCount}
          </span>
        )}
        <p className="text-gray-400 text-sm">{formatTimestamp(conversation.lastMessage.timestamp)}</p>
      </div>
    </Link>
  )
}
