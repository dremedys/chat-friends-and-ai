import { createBrowserRouter } from 'react-router-dom'
import { NoOpenChatPage } from 'src/pages/no-open-chat'
import { LoginPage } from '@/pages/login'
import { RegistrationPage } from 'src/pages/registration'
import { ROUTES } from '@/shared/constants/router'
import { Layout } from '@/widgets/layout'
import { AuthLayout } from '@/widgets/auth-layout'
import { ErrorBoundary } from '@/widgets/error-boundary'
import { ChatPage } from '@/pages/chat'

export const router = createBrowserRouter([
  {
    path: ROUTES.index,
    errorElement: <ErrorBoundary />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <NoOpenChatPage />,
          },
          {
            path: ROUTES.chat.index,
            element: <ChatPage />,
          },
        ],
      },
      {
        path: ROUTES.auth.index,
        element: <AuthLayout />,
        children: [
          {
            path: ROUTES.auth.register,
            element: <RegistrationPage />,
          },
          {
            path: ROUTES.auth.login,
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
])
