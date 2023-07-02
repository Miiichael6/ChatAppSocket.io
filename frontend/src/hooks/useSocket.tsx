import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";


interface SocketData {
  socket: any;
  online: boolean;
  conectarSocket: () => void;
  desconectarSocket: () => void;
}

export const useSocket = (serverPath: string): SocketData => {
  // const socket = useMemo(
  //   () => io(serverPath, { transports: ["websocket"] }),
  //   [serverPath]
  // );
  const [socket, setSocket] = useState<any>(null);
  const [online, setOnline] = useState(false);

  const conectarSocket = useCallback(() => {
    const token = localStorage.getItem("token")
    const socketTemp = io(serverPath, {
      transports: ["websocket"],
      autoConnect: true,
      forceNew: true, // siempre a a conectar una nueva conexión
      query: {
        Bearer_token: token
      }
    });

    setSocket(socketTemp);
  }, [serverPath]);

  const desconectarSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  useEffect(() => {
    setOnline(socket?.connected);
  }, [socket]);

  useEffect(() => {
    socket?.on("connect", () => setOnline(true));
  }, [socket]);

  useEffect(() => {
    socket?.on("disconnect", () => setOnline(false));
  }, [socket]);

  return {
    socket,
    online,
    conectarSocket,
    desconectarSocket,
  };
};
