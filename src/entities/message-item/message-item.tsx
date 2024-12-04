import { FC } from 'react'

type Props = {
  isFromMe: boolean
  text: string
}
export const MessageItem: FC<Props> = ({ isFromMe, text }) => {
  return (
    <div className={`flex ${isFromMe ? 'justify-end' : 'justify-start'} my-6`}>
      <div
        className={`max-w-max px-6 py-3 text-sm rounded-2xl text-base ${
          isFromMe ? 'bg-basic-purple text-white' : 'bg-gray-100 text-black'
        }`}
      >
        {text}
      </div>
    </div>
  )
}
