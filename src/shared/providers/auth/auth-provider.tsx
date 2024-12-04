import React, { createContext, useCallback, useEffect, useState } from 'react'

import { CustomEvents } from 'src/shared/events'
import { removeLocalStorageItems } from 'src/shared/utils'

import { AuthContextType, AuthProviderProps, UserContext } from './types'
import { STORAGE_KEYS } from '@/shared/constants'
import { useLogout } from '@/shared/api/auth'

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(!!localStorage.getItem(STORAGE_KEYS.isAuth))
  const [user, setUser] = useState<UserContext>()
  const { mutateAsync: logout } = useLogout()

  const setIsAuthAndRemoveStorage = () => {
    removeLocalStorageItems()
    setIsAuth(false)
  }

  const handleLogout = useCallback(async () => {
    if (!localStorage.getItem(STORAGE_KEYS.isAuth)) {
      setIsAuthAndRemoveStorage()
      return
    }

    await logout(undefined, {
      onError: () => {
        removeLocalStorageItems([STORAGE_KEYS.isAuth])
      },
      onSuccess: () => {
        setIsAuthAndRemoveStorage()
      },
      onSettled: () => {
        window.location.reload()
      },
    })
  }, [logout])

  useEffect(() => {
    const unAuthLogout = () => {
      removeLocalStorageItems()
      setIsAuth(false)
    }

    const handleForcedLogout = () => {
      handleLogout()
    }

    window.addEventListener(CustomEvents.UNAUTHORIZED, unAuthLogout)
    window.addEventListener(CustomEvents.FORSE_TO_LOGOUT, handleForcedLogout)

    return () => {
      window.removeEventListener(CustomEvents.UNAUTHORIZED, unAuthLogout)
      window.removeEventListener(CustomEvents.FORSE_TO_LOGOUT, handleForcedLogout)
    }
  }, [setIsAuth, handleLogout])

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        handleLogout,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
