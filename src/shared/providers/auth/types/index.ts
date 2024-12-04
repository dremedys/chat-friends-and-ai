import { Dispatch } from 'react'
import { GetProfileResponse } from '@/shared/types/auth'

export interface AuthContextType {
  isAuth: boolean
  setIsAuth: Dispatch<boolean>
  handleLogout: () => void
  user: UserContext | undefined
  setUser: React.Dispatch<React.SetStateAction<UserContext | undefined>>
}

export type UserContext = GetProfileResponse

export interface AuthProviderProps {
  children?: React.ReactNode
}
