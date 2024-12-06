import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { toast } from 'react-hot-toast'

type ISocketContext = Socket

const SocketContext = createContext<ISocketContext>({} as Socket)

export const useSocket = () => useContext(SocketContext)

export const SocketProvider: FC<PropsWithChildren> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>()

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_SOCKET_URI, { withCredentials: true })
    setSocket(newSocket)

    socket?.on('connect', () => {
      console.log('connect!')
    })
    socket?.on('connect_error', (e) => {
      console.log('error', e)
      toast.error('Server error')
    })

    return () => {
      newSocket.disconnect()
    }
  }, [])

  return <SocketContext.Provider value={socket as unknown as Socket}>{children}</SocketContext.Provider>
}
