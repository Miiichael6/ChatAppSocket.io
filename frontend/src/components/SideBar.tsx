import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import SideBarChatItem from "./SideBarChatItem";
import { useContext } from "react";

interface ChatItem {
  nombre: string;
  email: string;
  online: boolean;
  uid: string;
}

const SideBar = () => {
  const { auth } = useContext(AuthContext);
  console.log(auth.uid);
  const { chatState } = useContext(ChatContext);

  return (
    <div className="inbox_chat">
      {chatState.usuarios
        .filter((users: ChatItem) => users.uid !== auth.uid)
        .map((user: ChatItem) => (
          <SideBarChatItem
            key={user.uid}
            nombre={user.nombre}
            email={user.email}
            online={user.online}
            uid={user.uid}
          />
        ))}

      <div className="extra_space"></div>
    </div>
  );
};

export default SideBar;
