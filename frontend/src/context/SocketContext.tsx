import React, { useContext, useEffect } from "react";
import { createContext } from "react";
import { useSocket } from "../hooks/useSocket";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "./chat/ChatContext";
import { types } from "../types/chat-types";
import { scrollToBottomAnimated } from "../helpers/scrollToBottom";

export const SocketContext = createContext<any>({});

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const { socket, online, conectarSocket, desconectarSocket } = useSocket(
    "http://localhost:4000"
  );
  const { auth } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    if (auth.logged) conectarSocket();
  }, [auth, conectarSocket]);

  useEffect(() => {
    if (!auth.logged) desconectarSocket();
  }, [auth, desconectarSocket]);

  useEffect(() => {
    socket?.on("lista-de-usuarios", (users: any) => {
      dispatch({ type: types.usuariosCargados, payload: users });
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("mensaje-personal", (mensaje: any) => {
      // dispatch
      dispatch({ type: types.nuevoMensaje, payload: mensaje });
      // mover scroll
      scrollToBottomAnimated("mensajes");
    });
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
