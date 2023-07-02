import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import SendMessage from "./SendMessage";
const Messages = () => {
  const msgs = [1, 2, 3, 4, 5, 6, 78, 9, 10];

  return (
    <div className="mesgs">
      <div className="msg_history">
        {msgs.map((messsage) =>
          messsage % 2 ? <IncomingMessage /> : <OutgoingMessage />
        )}

        {/* <IncomingMessage />

        <OutgoingMessage /> */}
      </div>

      <SendMessage />
    </div>
  );
};

export default Messages;
