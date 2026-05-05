import Editor from "./Editor";
import Options from "./Options";
import Chat from "./Chat";
import { useEffect, useState } from "react";

const SERVER = "ws://localhost:8080";

function FullWindow({ user }) {
  const [socket, setSocket] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [partList, setPartList] = useState([]);
  const [editorInstance, setEditorInstance] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(SERVER);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "New User",
          user: user.name,
          project: user.project,
        })
      );
    };

    ws.onmessage = (event) => {
      let rec;
      try {
        rec = JSON.parse(event.data);
      } catch {
        return;
      }

      if (rec.type === "welcome" || rec.type === "ChatMessage") {
        setMsgs((prev) => [...prev, rec]);
      } else if (rec.type === "Participants") {
        setPartList(rec.list);
      }
    };

    setSocket(ws);
  }, []);

  return (
    <div className="container">
      <Chat user={user} messages={msgs} participants={partList} socket={socket} />

      <div className="editor-wrapper">
        <Options editor={editorInstance} />
        <Editor user={user} setEditor={setEditorInstance} roomId={user.project} />
      </div>
    </div>
  );
}

export default FullWindow;