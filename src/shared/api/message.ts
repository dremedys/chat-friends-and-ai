import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/shared/axios'
import { GetConversationResponseDto, GetMessageResponseDto } from '@/shared/types/message'

export const useGetConversations = () => {
  return useQuery({
    queryFn: () => axiosInstance.get<GetConversationResponseDto[]>(`/chat/conversations`).then((res) => res.data),
    queryKey: ['chats'],
  })
}

export const useGetMessages = (userId?: string) => {
  return useQuery({
    queryFn: () =>
      axiosInstance.get<GetMessageResponseDto[]>(`/chat/history`, { params: { userId } }).then((res) => res.data),
    queryKey: ['messages', userId],
    enabled: userId !== undefined,
    staleTime: 60_000 * 5,
  })
}
