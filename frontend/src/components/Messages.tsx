import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import SendMessage from "./SendMessage";
import { useContext } from "react";
const Messages = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  return (
    <div className="mesgs">
      <div id="mensajes" className="msg_history">
        {chatState.mensajes.map((messsage: any) =>
          // recibiendo mensaje
          messsage.para === auth.uid ? (
            <IncomingMessage key={messsage._id} msg={messsage} />
          ) : (
            <OutgoingMessage key={messsage._id} msg={messsage} />
          )
        )}

        {/* <IncomingMessage />

        <OutgoingMessage /> */}
      </div>

      <SendMessage />
    </div>
  );
};

export default Messages;
