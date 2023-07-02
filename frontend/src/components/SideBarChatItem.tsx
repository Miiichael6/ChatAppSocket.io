import { useContext } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { types } from "../types/chat-types";
import axios from "axios";
import { scrollToBottom } from "../helpers/scrollToBottom";
interface SideBarChatItemProps {
  nombre: string;
  email: string;
  online: boolean;
  uid: string;
}

const SideBarChatItem = ({ nombre, online, uid }: SideBarChatItemProps) => {
  const { dispatch, chatState } = useContext(ChatContext);
  const { chatActivo } = chatState;

  const handleClick = async () => {
    try {
      dispatch({ type: types.activarChat, payload: uid });
      const token: string = localStorage.getItem("token") || "";

      console.log(import.meta.env.VITE_API_URL);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/messages/${uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({type: types.cargarChat, payload: data.messages})
      console.log(data);
    } catch (error: any) {
      console.log(error.response.data);
    }
    scrollToBottom("mensajes")
  };

  // cargar los mensajes

  // active_chat

  return (
    <div
      className={`chat_list ${uid === chatActivo ? "active_chat" : ""}`}
      onClick={handleClick}
    >
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"
            alt="sunil"
          />
        </div>
        <div className="chat_ib">
          <h5>{nombre}</h5>
          {online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBarChatItem;
