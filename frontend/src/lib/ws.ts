import { io, Socket } from 'socket.io-client';
export function connectSocket(url = import.meta.env.VITE_WS_URL || 'ws://localhost:3000') {
  const socket: Socket = io(url, { transports: ['websocket'] });
  return socket;
}
