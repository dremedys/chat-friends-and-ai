import { Link } from 'react-router-dom'
import { FC } from 'react'
import { GetConversationResponseDto } from '@/shared/types/message'
import { formatTimestamp } from '@/entities/conversation/lib/utils'

type Props = {
  isActive?: boolean
  unreadMessageCount?: number
  chat: GetConversationResponseDto
}

export const ConversationItem: FC<Props> = ({ isActive, unreadMessageCount, chat }) => {
  return (
    <Link
      to={`/${chat.user.id}`}
      className={`flex justify-between px-6 tablet:px-10 py-[18px] border-b border-border-gray hover:bg-blue-50 ${isActive ? 'bg-chat' : ''}`}
    >
      <div className="">
        <p className="text-basic-black text-lg font-medium flex items-center gap-x-2">
          {chat.user.firstName} {chat.user.lastName}{' '}
          {chat.user.isAI && (
            <span
              className="py-[0.5px] px-2 text-basic-purple text-base font-semibold border-[2px] border-basic-purple rounded-xl"
              style={{ fontFamily: 'Georgia' }}
            >
              AI
            </span>
          )}
        </p>
        <p className="text-gray-400 block w-[100%] text-base text-ellipsis overflow-hidden whitespace-nowrap">
          <span>{chat.lastMessage.content}</span>
        </p>
      </div>
      <div className="flex flex-col items-end justify-end">
        {unreadMessageCount && (
          <span className="bg-basic-purple text-white w-6 h-6 rounded-full flex justify-center items-center text-sm">
            {unreadMessageCount}
          </span>
        )}
        <p className="text-gray-400 text-sm">{formatTimestamp(chat.lastMessage.timestamp)}</p>
      </div>
    </Link>
  )
}
