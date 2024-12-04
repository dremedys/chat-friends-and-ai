import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

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

    return () => {
      newSocket.disconnect()
    }
  }, [])

  return <SocketContext.Provider value={socket as unknown as Socket}>{children}</SocketContext.Provider>
}
