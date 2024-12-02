import { createBrowserRouter } from 'react-router-dom'
import { MainPage } from '@/pages/main'
import { LoginPage } from '@/pages/login'
import { RegisterPage } from '@/pages/register'
import { ROUTES } from '@/shared/constants/router.ts'
import { Layout } from '@/widgets/layout'
import { AuthLayout } from '@/widgets/auth-layout'
import { ErrorBoundary } from '@/widgets/error-boundary'

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
            element: <MainPage />,
          },
        ],
      },
      {
        path: ROUTES.auth.index,
        element: <AuthLayout />,
        children: [
          {
            path: ROUTES.auth.register,
            element: <RegisterPage />,
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
