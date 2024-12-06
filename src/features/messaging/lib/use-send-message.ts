import { GetMessageResponseWithStatus } from '@/entities/message'
import { GetMessageResponseDto, SendMessageRequest } from '@/shared/types/message'
import { Dispatch, SetStateAction } from 'react'
import { useSendMessageQuery } from '@/shared/api/message'

import { TEMP_MESSAGE_ID } from './constants'

export const useSendMessage = (
  messages: GetMessageResponseWithStatus[],
  setMessages: Dispatch<SetStateAction<GetMessageResponseWithStatus[]>>,
  userId?: number,
  currentUserId?: number,
) => {
  const { mutateAsync: postMessage, isError: isPostMessageError, isPending: isPostingMessage } = useSendMessageQuery()

  const removeLastErrorMessage = () => {
    setMessages((prev) => prev.slice(0, prev.length - 1))
  }

  // Updating UI while message is being sent to server
  const pushTemporaryMessageWhileServerResponse = (body: SendMessageRequest) => {
    const timestamp = ''
    const tempMessage = { ...body, fromUserId: currentUserId!, id: TEMP_MESSAGE_ID, timestamp }
    setMessages((prev) => [...prev, tempMessage])
  }

  const replaceTemporaryMessageToResponseMessageA = (data: GetMessageResponseDto) => {
    setMessages((prev) => [...prev.slice(0, -1), data])
  }

  const handleSendMessage = async (content: string, isRetry?: boolean) => {
    if (isRetry) {
      removeLastErrorMessage()
    }
    const body = { content, toUserId: userId! }
    pushTemporaryMessageWhileServerResponse(body)
    try {
      const data = await postMessage(body)
      replaceTemporaryMessageToResponseMessageA(data)
    } catch (e) {
      console.log(e)
    }
  }

  const handleResendMessageOnError = () => {
    const errorMessage = messages[-1]
    handleSendMessage(errorMessage.content, true)
  }

  return { handleSendMessage, isPostingMessage, isPostMessageError, handleResendMessageOnError }
}
