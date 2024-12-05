import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAlert } from 'react-alert'

type ISocketContext = Socket

const SocketContext = createContext<ISocketContext>({} as Socket)

export const useSocket = () => useContext(SocketContext)

export const SocketProvider: FC<PropsWithChildren> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>()
  const alert = useAlert()

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_SOCKET_URI, { withCredentials: true })
    setSocket(newSocket)

    socket?.on('connect', () => {
      console.log('connect!')
    })
    socket?.on('connect_error', (e) => {
      console.log('error', e)
      alert.error('Server error')
    })

    return () => {
      newSocket.disconnect()
    }
  }, [])

  return <SocketContext.Provider value={socket as unknown as Socket}>{children}</SocketContext.Provider>
}
