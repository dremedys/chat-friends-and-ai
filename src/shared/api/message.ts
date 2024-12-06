import { useMutation, useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/shared/axios'
import { GetConversationResponseDto, GetMessageResponseDto, SendMessageRequest } from '@/shared/types/message'

export const useGetConversations = () => {
  return useQuery({
    queryFn: () => axiosInstance.get<GetConversationResponseDto[]>(`/chat/conversations`).then((res) => res.data),
    queryKey: ['chats'],
  })
}

export const useGetMessageHistory = (userId?: number) => {
  return useQuery({
    queryFn: () =>
      axiosInstance.get<GetMessageResponseDto[]>(`/chat/history`, { params: { userId } }).then((res) => res.data),
    queryKey: ['messages', userId],
    enabled: false,
    staleTime: 60_000 * 5,
  })
}

export const useSendMessageQuery = () => {
  return useMutation({
    mutationFn: (msg: SendMessageRequest) =>
      axiosInstance.post<GetMessageResponseDto>(`/chat/message`, msg).then((res) => res.data),
  })
}
