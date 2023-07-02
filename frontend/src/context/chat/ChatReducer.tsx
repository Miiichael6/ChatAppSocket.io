import { types } from "../../types/chat-types";
import { InitialState } from "./ChatContext";

type State = InitialState;
type Action = { type: string; payload: any };

export const chatReducer = (state: State, action: Action) => {
  switch (action.type) {
    case types.usuariosCargados:
      return {
        ...state,
        usuarios: action.payload,
      };
    case types.activarChat:
      if (state.chatActivo === action.payload) return state;

      return {
        ...state,
        chatActivo: action.payload,
        mensajes: [],
      };

    default:
      return state;
  }
};
