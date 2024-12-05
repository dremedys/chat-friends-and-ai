import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/shared/axios'

export const useGetAiBotId = () => {
  return useQuery({
    queryFn: () => axiosInstance.get<{ id: number }>('/ai/ai-bot-id').then((res) => res.data),
    staleTime: Infinity,
    queryKey: ['ai-id'],
  })
}
