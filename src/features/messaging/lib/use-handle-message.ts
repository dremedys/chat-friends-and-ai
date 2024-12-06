import { GetMessageResponseWithStatus } from '@/entities/message'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useSocket } from '@/shared/providers'
import { useGetMessageHistory } from '@/shared/api/message'
import { GetMessageResponseDto } from '@/shared/types/message'

export const useHandleMessage = (
  setMessages: Dispatch<SetStateAction<GetMessageResponseWithStatus[]>>,
  userId?: number,
  currentUserId?: number,
) => {
  const socket = useSocket()

  const { isLoading: isMessageHistoryLoading, refetch: fetchMessageHistory } = useGetMessageHistory(userId)

  useEffect(() => {
    const socketHandler = (message: GetMessageResponseDto) => {
      if (
        (currentUserId === message.toUserId && userId === message.fromUserId) ||
        (userId === message.toUserId && currentUserId === message.fromUserId)
      ) {
        setMessages((prev) => [...prev, message])
      }
    }
    socket?.on(`message`, socketHandler)

    return () => {
      socket?.off('message', socketHandler)
    }
  }, [socket, currentUserId, userId])

  const fetchInitialMessageHistory = async () => {
    try {
      const res = await fetchMessageHistory()
      setMessages(res.data ?? [])
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (userId) {
      fetchInitialMessageHistory()
    }
  }, [userId])

  return { isMessageHistoryLoading, fetchInitialMessageHistory }
}
