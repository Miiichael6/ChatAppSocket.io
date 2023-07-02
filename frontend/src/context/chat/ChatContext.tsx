import { createContext, useReducer } from "react";
import { chatReducer } from "./ChatReducer";

export const ChatContext = createContext<any>({});

export interface InitialState {
  uid: string | null;
  chatActivo: any;
  usuarios: [];
  mensajes: any[];
}

export const initialState: InitialState = {
  uid: "",
  chatActivo: null, // uid al que le quiero enviar mensajes
  usuarios: [],
  mensajes: [],
};

interface ChatProvider {
  children: React.ReactNode;
}

const ChatProvider = ({ children }: ChatProvider) => {
  const [chatState, dispatch] = useReducer(chatReducer, initialState);

  const data = {
    chatState,
    dispatch,
  };
  return <ChatContext.Provider value={data}>{children}</ChatContext.Provider>;
};

export default ChatProvider;
