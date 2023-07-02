import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";

const SendMessage = () => {
  const [mensaje, setMensaje] = useState("")
  const { socket } = useContext(SocketContext)
  const { auth } = useContext(AuthContext)
  const { chatState } = useContext(ChatContext)


  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setMensaje(value);
  }

  const handlerSubmit= (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(mensaje.trim() === "" || mensaje.length === 0) return;
    setMensaje("");


    socket.emit("mensaje-personal", {
      de: auth.uid,
      para: chatState.chatActivo,
      mensaje: mensaje
    })
  }

  return (
    <form onSubmit={(e) => handlerSubmit(e)}>
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input type="text" className="write_msg" placeholder="Mensaje..."  value={mensaje} onChange={(e) => handlerChange(e)}/>
        </div>
        <div className="col-sm-3 text-center">
          <button className="msg_send_btn mt-3" type="submit">
            enviar
          </button>
        </div>
      </div>
    </form>
  );
};

export default SendMessage;
