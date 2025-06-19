import { useState } from "react";
import {
  Bluetooth,
  Cpu,
  EthernetPort,
  Key,
  LandPlot,
  ScanSearch,
  Wifi,
} from "lucide-react";
import { useSocketHandler } from "@/hooks/socket/SocketHandler";
import { Devices } from "@/models/DeviceModel";
import { ConnectingDeviceModal } from "./connecting-device-modal";

type Props = {
  isActive: boolean;
  setInactive: () => void;
};

export const AddDeviceBluetooth = ({ isActive, setInactive }: Props) => {
  const {
    userId,
    eventScan,
    devices,
    deleteDevice,
    isScanning,
    eventConnectDevice,
    startDigitProIDA,
  } = useSocketHandler();
  const [selectedDevice, setSelectedDevice] = useState<Devices | null>(null);
  const [connectingDevice, setConnectingDevice] = useState(false);

  const handleSelectDevice = (device: Devices) => {
    setSelectedDevice(device);
  };

  return (
    <div
      onClick={setInactive}
      className={`fixed top-0 left-0 w-full h-full bg-transparent bg-opacity-50 z-40 transition-opacity duration-300 ${
        isActive ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ backdropFilter: "blur(5px)", background: "rgba(0, 0, 0, 0.2)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-1/2 left-1/2 transform bg-white rounded-xl p-8 z-50 w-2xl h-[600px] transition-all duration-300 ease-in-out
        ${
          isActive
            ? "opacity-100 scale-100 translate-x-[-50%] translate-y-[-50%]"
            : "opacity-0 scale-95 translate-x-[-50%] translate-y-[-40%]"
        }
      `}
      >
        <div className="flex flex-col gap-4 h-full">
          <div className="flex flex-row items-center justify-between">
            <p className="font-bold text-xl">Connection devices - Bluetooth</p>
            <button
              className="flex flex-row items-center gap-3 bg-blue-500 text-white font-bold py-2 px-4 rounded-2xl disabled:opacity-50 text-lg shadow-[0_4px_4px_rgba(0,0,0,0.25)] cursor-pointer"
              disabled={isScanning}
              onClick={eventScan}
            >
              <ScanSearch className="w-8 h-8" />
              Scan Devices
            </button>
          </div>
          <ul className="flex flex-col gap-2 mt-4 justify-between h-full">
            <div className="flex flex-row bg-white rounded-2xl gap-4 h-full">
              <div className="flex flex-col w-full gap-4">
                <p className="text-lg">Available Devices</p>
                {devices.length > 0 ? (
                  <ul className="space-y-3 max-h-80 overflow-y-auto px-2 pb-10">
                    {devices.map((device) => (
                      <div
                        key={device.id}
                        onClick={() => handleSelectDevice(device)}
                        className={`flex px-4 py-2 items-center rounded-2xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] pl-4 cursor-pointer justify-between ${
                          selectedDevice?.id === device.id
                            ? "bg-blue-100 font-semibold"
                            : "bg-blue-100 "
                        }`}
                      >
                        <div className="flex flex-row gap-3 items-center">
                          <Cpu className="w-10 h-10" />
                          <div className="flex flex-col">
                            <p className="text-lg">{device.device}</p>
                            <p className="text-sm">{device.mac}</p>
                          </div>
                        </div>
                        <div className="flex flex-row gap-2 bg-green-300 px-4 py-2 rounded-full">
                          <p>ONLINE</p>
                        </div>
                      </div>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 mx-auto my-10">
                    {isScanning
                      ? "Scanning..."
                      : "No devices found, press scan button"}
                  </p>
                )}
              </div>
            </div>
            <button
              className={`bg-blue-500 text-white font-bold py-2 rounded-xl w-full mt-4 shadow-[0_4px_4px_rgba(0,0,0,0.25)] ${
                selectedDevice && devices.length > 0
                  ? "cursor-pointer"
                  : "opacity-50 cursor-not-allowed"
              }`}
              onClick={() => {
                if (selectedDevice) {
                  setConnectingDevice(true);
                }
              }}
              disabled={devices.length === 0}
            >
              {isScanning ? "Scanning..." : "Connect Device"}
            </button>
          </ul>
        </div>
      </div>
      {/* Modal Connecting Device */}
      {connectingDevice && (
        <ConnectingDeviceModal
          isActive={true}
          setInactive={() => {
            setConnectingDevice(false);
          }}
          selectedDevice={selectedDevice}
        />
      )}
    </div>
  );
};
