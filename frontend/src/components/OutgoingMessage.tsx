import { horaMes } from "../helpers/horaMes";

interface OutgoingMessage {
  msg: {
    _id: string;
    de: string;
    mensaje: string;
    para: string;
    updatedAt: Date;
    createdAt: Date;
  };
}

const OutgoingMessage = ({ msg }: OutgoingMessage) => {
  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>{msg.mensaje}</p>
        <span className="time_date"> {horaMes(msg.createdAt)}</span>
      </div>
    </div>
  );
};

export default OutgoingMessage;
