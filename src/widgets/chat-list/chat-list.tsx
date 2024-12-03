import { useParams } from 'react-router-dom'
import { ChatPreviewItem } from 'src/entities/chat-preview'

export const ChatList = () => {
  const { id } = useParams()

  return (
    <div
      className={`bg-basic-white ${id ? 'hidden' : 'flex-1'} tablet:w-[300px] tablet:block tablet:border-r border-border-gray`}
    >
      <div className=" px-6 tablet:pl-10 flex items-center border-b border-border-gray text-2xl font-semibold h-[76px] flex">
        <span>Messages</span>
        <img src="https://cdn-icons-png.flaticon.com/512/6423/6423944.png" className="w-12 ml-auto cursor-pointer" />
      </div>
      <ChatPreviewItem />
      <ChatPreviewItem unreadMessageCount={12} />
      <ChatPreviewItem />
    </div>
  )
}
