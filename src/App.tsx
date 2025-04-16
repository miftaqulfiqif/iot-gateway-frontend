import { useState } from "react";
import { useSocketHandler } from "./hooks/SocketHandler";
import { Devices } from "./models/DeviceModel";

function App() {
  const { userId, eventScan, devices } = useSocketHandler();
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Socket.IO Room Join Test</h1>

      <p>{`Join to Room ${userId}`}</p>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={eventScan}
      >
        Scan
      </button>

      <ul>
        <p>Test</p>
        {devices.map((device) => (
          <li key={device.id}>{device.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
