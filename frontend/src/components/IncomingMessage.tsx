import {horaMes} from "../helpers/horaMes"
interface IncomingMessage {
  msg: {
    _id: string;
    de: string;
    mensaje: string;
    para: string;
    updatedAt: Date;
    createdAt: Date;
  };
}

const IncomingMessage = ({ msg }: IncomingMessage) => {

  return (
    <div className="incoming_msg">
      <div className="incoming_msg_img">
        <img
          src="https://ptetutorials.com/images/user-profile.png"
          alt="sunil"
        />
      </div>
      <div className="received_msg">
        <div className="received_withd_msg">
          <p>{msg.mensaje}</p>
          <span className="time_date"> {horaMes(msg.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default IncomingMessage;
