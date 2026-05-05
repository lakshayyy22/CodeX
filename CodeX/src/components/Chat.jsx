import { useState } from "react";
import Screen from "./Screen"

function Chat({ user, messages = [], participants = [] , socket}) {
    const [typed, setTyped] = useState("");
    const SendMessage =() => {
        if(socket?.readyState !== WebSocket.OPEN){
            return;
        }

        socket.send(JSON.stringify({
            type: "chat",
            chat: typed
        }));

        setTyped('');
    }
  return (
    <div className="chat">

      {/* Header */}
      <div className="chat-header">
        <h3>Chat</h3>
        <span className="participants">
          👥 {participants.length}
        </span>
      </div>

      <Screen msgs = {messages} user = {user} />

      {/* Input Area */}
      <div className="chat-input">
        <input placeholder="Type a message..." value = {typed} onChange = {(e) =>setTyped(e.target.value)}/>
        <button onClick = {SendMessage}>Send</button>
      </div>

    </div>
  );
}

export default Chat;