import { useContext } from 'react'

import { AuthContext } from '../auth-provider.tsx'

export const useAuth = () => useContext(AuthContext)
