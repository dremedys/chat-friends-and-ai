import { AppRouter } from '@/app/router'
import { AuthProvider } from '@/shared/providers'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/shared/api/query-client'
import { SocketProvider } from '@/shared/providers'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </SocketProvider>
    </QueryClientProvider>
  )
}

export default App
