import { useContext } from 'react'

import { AuthContext } from '../AuthProvider.component'

export const useAuth = () => useContext(AuthContext)
