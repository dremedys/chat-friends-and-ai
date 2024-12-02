import { useAuth } from '@/shared/providers'
import { ROUTES } from '@/shared/constants/router.ts'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useGetProfile, useLogout } from '@/shared/api/auth.ts'
import { Button } from 'flowbite-react'
import { removeLocalStorageItems } from '@/shared/utils'
import { PropsWithChildren } from 'react'

const PATH_FOR_NON_AUTHS = [ROUTES.auth.register, ROUTES.auth.login]

export const Layout = ({ children }: PropsWithChildren) => {
  const { isAuth, setIsAuth } = useAuth()
  const { pathname } = useLocation()
  const { data } = useGetProfile(isAuth)
  const { mutate } = useLogout()

  if (!isAuth && pathname !== ROUTES.auth.login && pathname !== ROUTES.auth.register) {
    return <Navigate to={`${ROUTES.auth.index}/${ROUTES.auth.login}`} />
  }

  if (isAuth && PATH_FOR_NON_AUTHS.includes(pathname)) {
    return <Navigate to={ROUTES.index} />
  }

  return (
    <div>
      <header>
        {data?.firstName}
        <Button
          onClick={() => {
            mutate()
            removeLocalStorageItems()
            setIsAuth(false)
          }}
        >
          Logout
        </Button>
      </header>
      {children ?? <Outlet />}
    </div>
  )
}
