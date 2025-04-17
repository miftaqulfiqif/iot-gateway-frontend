import { useState } from "react";
import { useSocketHandler } from "./hooks/SocketHandler";
import type { Devices } from "./models/DeviceModel";

function App() {
  const { userId, eventScan, devices, isScanning, eventConnectDevice } =
    useSocketHandler();
  const [selectedDevice, setSelectedDevice] = useState<Devices | null>(null);

  const handleSelectDevice = (device: Devices) => {
    setSelectedDevice(device);
    console.log("Device selected:", device);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Socket.IO Room Join Test</h1>

      <p>{`Join to Room ${userId}`}</p>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        disabled={isScanning}
        onClick={eventScan}
      >
        Scan
      </button>

      <ul className="mt-4 space-y-2">
        {isScanning && <li className="italic text-gray-500">Scanning...</li>}
        {Array.isArray(devices) &&
          devices.map((device) => (
            <li
              key={device.mac}
              onClick={() => handleSelectDevice(device)}
              className={`p-2 border rounded cursor-pointer ${
                selectedDevice?.mac === device.mac
                  ? "bg-green-200 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              {device.name}
            </li>
          ))}
      </ul>

      {selectedDevice && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="text-lg font-bold mb-2">Selected Device</h2>
          <p>
            <strong>Name:</strong> {selectedDevice.name}
          </p>
          <p>
            <strong>MAC:</strong> {selectedDevice.mac}
          </p>
          <p>
            <strong>RSSI:</strong> {selectedDevice.rssi}
          </p>
          <p>
            <strong>Distance:</strong> {selectedDevice.distance.toFixed(2)} m
          </p>
        </div>
      )}

      <div className="mt-6 p-4 border rounded bg-gray-50">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={() => {
            selectedDevice && eventConnectDevice(selectedDevice);
          }}
        >
          Connect Device
        </button>
      </div>
    </div>
  );
}

export default App;
