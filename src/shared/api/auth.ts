import { useMutation, useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/shared/axios'
import { AuthLoginRequest, AuthRegisterRequest, GetProfileResponse } from '@/shared/types/auth.ts'
import { AxiosError } from 'axios'

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: AuthLoginRequest) => axiosInstance.post('/auth/login', { email, password }),
    throwOnError: (error: AxiosError<{ message: string }>) => {
      const errorStatus = error?.response?.data.message
      return errorStatus !== 'invalid_credentials'
    },
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
    queryKey: ['me'],
    queryFn: () => axiosInstance.get<GetProfileResponse>('/profile/me').then((res) => res.data),
    throwOnError: false,
  })
}
