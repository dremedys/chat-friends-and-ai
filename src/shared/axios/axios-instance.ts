import axios from 'axios'
import { CustomEvents } from '../events'
import { STORAGE_KEYS } from '@/shared/constants'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URI,
  withCredentials: true,
})

axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response && error.response.status === 401 && !!localStorage.getItem(STORAGE_KEYS.isAuth)) {
      const event = new Event(CustomEvents.UNAUTHORIZED)
      window.dispatchEvent(event)
    }

    return Promise.reject(error)
  },
)
