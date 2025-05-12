import { io, Socket } from 'socket.io-client'
import { useEffect, useRef, useState } from 'react'

let socket: Socket

export const useSocket = () => {
  const [connected, setConnected] = useState(false)
  const socketRef = useRef<Socket>(null)

  useEffect(() => {
    if (!socket) {
      socket = io(import.meta.env.VITE_API_URL || 'http://localhost:3000')
    }

    socketRef.current = socket

    socket.on('connect', () => setConnected(true))
    socket.on('disconnect', () => setConnected(false))

    return () => {
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [])

  return { socket: socketRef.current, connected }
}