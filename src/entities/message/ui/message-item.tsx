import { FC } from 'react'

type Props = {
  isFromMe: boolean
  content: string
  isError?: boolean
}

export const MessageItem: FC<Props> = ({ isFromMe, content, isError }) => {
  return (
    <div className={`flex ${isFromMe ? 'justify-self-end' : 'justify-self-start'} my-6 mobile:  max-w-[70%]`}>
      <div
        className={`max-w-max px-6 py-3 rounded-2xl text-base ${
          isFromMe ? 'bg-basic-purple text-white' : 'bg-gray-100 text-black'
        } ${isError ? 'bg-red-500' : ''}`}
      >
        {content}
      </div>
    </div>
  )
}
