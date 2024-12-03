import { Link } from 'react-router-dom'
import { MessageInput } from '@/features/message-input'
import { MessageItem } from '@/entities/message-item'

export const ChatWindow = () => {
  return (
    <div className={`bg-chat flex-1 flex flex-col overflow-auto`}>
      <header className="px-6 tablet:px-10 py-[18px] bg-basic-white h-[76px] border-b border-border-gray flex items-start gap-x-1">
        <Link to={'/'} className="tablet:hidden">
          <img src="back.svg" className="mt-[4px]" />
        </Link>
        <div>
          <p className="text-lg">Alan Turing</p>
          <p className="text-gray-400">Online</p>
        </div>
      </header>
      <div className="px-10 overflow-auto" style={{ height: 'calc(100vh - 76px - 64px - 92px)' }}>
        <MessageItem isFromMe={false} />
        <MessageItem isFromMe={true} />
        <MessageItem isFromMe={false} />
        <MessageItem isFromMe={true} /> <MessageItem isFromMe={false} />
        <MessageItem isFromMe={true} /> <MessageItem isFromMe={false} />
        <MessageItem isFromMe={true} /> <MessageItem isFromMe={false} />
        <MessageItem isFromMe={true} /> <MessageItem isFromMe={false} />
        <MessageItem isFromMe={true} /> <MessageItem isFromMe={false} />
        <MessageItem isFromMe={true} /> <MessageItem isFromMe={false} />
        <MessageItem isFromMe={true} /> <MessageItem isFromMe={false} />
        <MessageItem isFromMe={true} /> <MessageItem isFromMe={false} />
        <MessageItem isFromMe={true} /> <MessageItem isFromMe={false} />
        <MessageItem isFromMe={true} /> <MessageItem isFromMe={false} />
        <MessageItem isFromMe={true} /> <MessageItem isFromMe={false} />
        <MessageItem isFromMe={true} /> <MessageItem isFromMe={false} />
        <MessageItem isFromMe={true} /> <MessageItem isFromMe={false} />
        <MessageItem isFromMe={true} /> <MessageItem isFromMe={false} />
        <MessageItem isFromMe={true} /> <MessageItem isFromMe={false} />
        <MessageItem isFromMe={true} />
      </div>
      <MessageInput />
    </div>
  )
}
