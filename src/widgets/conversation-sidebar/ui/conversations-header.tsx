import { FC } from 'react'

type Props = {
  onNewChatClick: () => void
  onAiChatClick: () => void
}

export const ConversationsHeader: FC<Props> = ({ onNewChatClick, onAiChatClick }) => {
  return (
    <div className=" px-6 tablet:pl-10 flex items-center border-b border-border-gray text-2xl font-semibold h-[76px]">
      <span>Messages</span>
      <img
        src="https://cdn-icons-png.flaticon.com/512/6423/6423944.png"
        className="w-12 ml-auto cursor-pointer"
        title="New message"
        onClick={onNewChatClick}
      />
      <span
        className="w-[36px] h-[24px] flex shrink-0 items-center justify-center  bg-gradient-to-br from-purple-500 to-purple-200 rounded-[10px] cursor-pointer"
        onClick={onAiChatClick}
      >
        <div className="bg-white w-[80%] h-[80%]  flex shrink-0 items-center justify-center  rounded-[8px] text-basic-purple text-base font-semibold">
          AI
        </div>
      </span>
    </div>
  )
}
