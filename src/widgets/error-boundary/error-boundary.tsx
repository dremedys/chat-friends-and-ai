import { Button } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/router.ts'

export const ErrorBoundary = () => {
  // const error = useRouteError()
  const navigate = useNavigate()

  return (
    <div>
      <h1>Oopsss...</h1>
      Something went wrong :(
      <Button onClick={() => navigate(ROUTES.index)}>Back to main page</Button>
    </div>
  )
}