import { useState } from "react";
import { useSocketHandler } from "../hooks/SocketHandler";
import type { Devices } from "../models/DeviceModel";
import MainLayout from "../components/layouts/main-layout";

function Devices() {
  const {
    userId,
    eventScan,
    devices,
    deleteDevice,
    isScanning,
    eventConnectDevice,
    startDigitProIDA,
    dummyScan,
  } = useSocketHandler();
  const [selectedDevice, setSelectedDevice] = useState<Devices | null>(null);

  const handleSelectDevice = (device: Devices) => {
    setSelectedDevice(device);
    console.log("Device selected:", device);
  };

  return (
    <MainLayout title="Devices">
      <div className="flex flex-col gap-5">
        <p className="font-bold text-3xl">Connect devices</p>

        <p className="font-bold text-xl">Available Devices</p>
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

        {devices && devices.length > 0 && (
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
        )}

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 mt-4"
          disabled={isScanning}
          onClick={dummyScan}
        >
          Scan Device Nearby
        </button>

        <div className="flex flex-row gap-4 mt-20">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            onClick={startDigitProIDA}
          >
            Start Digit Pro IDA
          </button>

          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            onClick={() => {
              deleteDevice(selectedDevice?.mac || "");
              console.log(
                "Device deleted successfully, mac : ",
                selectedDevice?.mac
              );
            }}
          >
            Delete Digit Pro IDA
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

export default Devices;
