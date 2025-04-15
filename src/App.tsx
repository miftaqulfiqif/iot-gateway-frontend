import { useState } from "react";
import { useSocketHandler } from "./hooks/SocketHandler";

function App() {
  const { userId, handleMessage } = useSocketHandler();
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleMessage({ user_id: userId, data: { message } });
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Socket.IO Room Join Test</h1>

      <p>{`Join to Room ${userId}`}</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ketik pesan..."
        />
        <button type="submit">Kirim</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default App;
