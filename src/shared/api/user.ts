import { useMutation, useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/shared/axios'
import { GetProfileResponse } from '@/shared/types/auth'

export const useSearchUser = () => {
  return useMutation({
    mutationFn: (query: string) => axiosInstance.get<GetProfileResponse[]>('/users/search', { params: { query } }),
    throwOnError: false,
  })
}

export const useGetUserById = (id?: number) => {
  return useQuery({
    queryFn: () => axiosInstance.get<GetProfileResponse>(`/users/${id}`).then((res) => res.data),
    throwOnError: false,
    queryKey: ['getUser', id],
    enabled: typeof id === 'number',
  })
}
