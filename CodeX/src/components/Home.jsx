import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const nav = useNavigate();

  const joinRoom = () => {
    if (!name || !room) return;
    localStorage.setItem("name", name);
    nav(`/editor/${room}`);
  };

  const createRoom = () => {
    if (!name) return;
    const roomId = crypto.randomUUID();
    localStorage.setItem("name", name);
    nav(`/editor/${roomId}`);
  };

  return (
    <div className="home">
      <h1>🚀 Collab Editor</h1>

      <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />

      <button onClick={createRoom}>Create Room</button>

      <input placeholder="Room ID" value={room} onChange={(e) => setRoom(e.target.value)} />

      <button onClick={joinRoom}>Join Room</button>
    </div>
  );
}

export default Home;