import { types } from "../../types/chat-types";
import { InitialState, initialState } from "./ChatContext";

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
    case types.nuevoMensaje:
      if (
        state.chatActivo === action.payload.de ||
        state.chatActivo === action.payload.para
      ) {
        return {
          ...state,
          mensajes: [...state.mensajes, action.payload],
        };
      } else {
        return state;
      }
    case types.cargarChat:
      return {
        ...state,
        mensajes: [...action.payload],
      };

    case types.purgarData:
      return { ...initialState };

    default:
      return state;
  }
};
