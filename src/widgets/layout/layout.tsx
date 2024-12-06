import { useAuth } from '@/shared/providers'
import { ROUTES } from '@/shared/constants/router'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { PropsWithChildren } from 'react'
import { Header } from '@/widgets/header'
import { ConversationSidebar } from 'src/widgets/conversation-sidebar'

const PATH_FOR_NON_AUTHS = [ROUTES.auth.register, ROUTES.auth.login]

export const Layout = ({ children }: PropsWithChildren) => {
  const { isAuth } = useAuth()
  const { pathname } = useLocation()

  if (!isAuth && pathname !== ROUTES.auth.login && pathname !== ROUTES.auth.register) {
    return <Navigate to={`${ROUTES.auth.index}/${ROUTES.auth.login}`} />
  }

  if (isAuth && PATH_FOR_NON_AUTHS.includes(pathname)) {
    return <Navigate to={ROUTES.index} />
  }

  return (
    <div className="flex flex-col min-h-screen min-h-screen">
      <Header />
      <div className="content flex h-full items-stretch flex-1">
        <ConversationSidebar />
        {children ?? <Outlet />}
      </div>
    </div>
  )
}
