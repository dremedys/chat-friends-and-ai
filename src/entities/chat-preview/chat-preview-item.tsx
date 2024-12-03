import { Link } from 'react-router-dom'
import { FC } from 'react'

type Props = {
  isActive?: boolean
  unreadMessageCount?: number
}

export const ChatPreviewItem: FC<Props> = ({ isActive, unreadMessageCount }) => {
  return (
    <Link
      to={'/id'}
      className={`flex justify-between px-6 tablet:px-10 py-[18px] border-b border-border-gray hover:bg-blue-50 ${isActive ? 'bg-chat-preview' : ''}`}
    >
      <div className="">
        <p className="text-basic-black text-lg font-medium">Alan Turing</p>
        <p className="text-gray-400 block w-[100%] text-base text-ellipsis overflow-hidden whitespace-nowrap">
          <span>Send me moneySend me money Send me money Send me moneySend me money</span>
        </p>
      </div>
      <div className="flex flex-col items-end justify-end">
        {unreadMessageCount && (
          <span className="bg-basic-purple text-white w-6 h-6 rounded-full flex justify-center items-center text-sm">
            {unreadMessageCount}
          </span>
        )}
        <p className="text-gray-400 text-sm">12:32</p>
      </div>
    </Link>
  )
}
