import { AppRouter } from '@/app/router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/shared/api/query-client'
import { AlertProvider, AuthProvider, SocketProvider, ThemeProvider } from '@/shared/providers'

function App() {
  return (
    <ThemeProvider>
      <AlertProvider>
        <QueryClientProvider client={queryClient}>
          <SocketProvider>
            <AuthProvider>
              <AppRouter />
            </AuthProvider>
          </SocketProvider>
        </QueryClientProvider>
      </AlertProvider>
    </ThemeProvider>
  )
}

export default App
