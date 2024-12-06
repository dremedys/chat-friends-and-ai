import { AppRouter } from '@/app/router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/shared/api/query-client'
import { AuthProvider, SocketProvider, ThemeProvider } from '@/shared/providers'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <SocketProvider>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </SocketProvider>
      </QueryClientProvider>
      <Toaster />
    </ThemeProvider>
  )
}

export default App
