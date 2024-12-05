import { useMutation, useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/shared/axios'
import { AuthLoginRequest, AuthRegisterRequest, GetProfileResponse } from '@/shared/types/auth'

export const useLogin = () => {
  return useMutation({
    mutationFn: (body: AuthLoginRequest) => axiosInstance.post('/auth/login', body),
  })
}

export const useRegister = () => {
  return useMutation({
    mutationFn: (body: AuthRegisterRequest) => axiosInstance.post('/auth/register', body),
  })
}

export const useLogout = () => {
  return useMutation({ mutationFn: () => axiosInstance.post('/auth/logout') })
}

export const useGetProfile = (enabled: boolean) => {
  return useQuery({
    enabled,
    queryKey: ['my-profile'],
    queryFn: () => axiosInstance.get<GetProfileResponse>('/profile/me').then((res) => res.data),
    throwOnError: false,
    staleTime: Infinity,
  })
}
