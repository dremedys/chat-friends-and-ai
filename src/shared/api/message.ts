import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/shared/axios'
import { GetChatResponseDto, GetMessageResponseDto } from '@/shared/types/message'

export const useGetMessages = (userId?: string) => {
  return useQuery({
    queryFn: () =>
      axiosInstance.get<GetMessageResponseDto[]>(`/chat/history`, { params: { userId } }).then((res) => res.data),
    queryKey: ['messages', userId],
    enabled: userId !== undefined,
    staleTime: Infinity,
  })
}

export const useGetChats = () => {
  return useQuery({
    queryFn: () => axiosInstance.get<GetChatResponseDto[]>(`/chat/conversations`).then((res) => res.data),
    queryKey: ['chats'],
  })
}
