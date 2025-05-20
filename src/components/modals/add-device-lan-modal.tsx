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
import { useSocketHandler } from "@/hooks/SocketHandler";
import { Devices } from "@/models/DeviceModel";

type Props = {
  isActive: boolean;
  setInactive: () => void;
};

export const AddDeviceLan = ({ isActive, setInactive }: Props) => {
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
    <div
      onClick={setInactive}
      className={`fixed top-0 left-0 w-full h-full bg-transparent bg-opacity-50 z-40 transition-opacity duration-300 ${
        isActive ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ backdropFilter: "blur(5px)", background: "rgba(0, 0, 0, 0.2)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-1/2 left-1/2 transform bg-white rounded-xl p-8 z-50 w-2xl h-fit transition-all duration-300 ease-in-out
        ${
          isActive
            ? "opacity-100 scale-100 translate-x-[-50%] translate-y-[-50%]"
            : "opacity-0 scale-95 translate-x-[-50%] translate-y-[-40%]"
        }
      `}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between">
            <p className="font-bold text-xl">Connection devices</p>
          </div>
          <ul className="mt-4 space-y-2">
            <div className="flex flex-row bg-white rounded-2xl gap-4 ">
              <div className="flex flex-col w-full gap-4">
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg p-2"
                />
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
                  eventConnectDevice(selectedDevice);
                }
              }}
              disabled={devices.length === 0}
            >
              {isScanning ? "Scanning..." : "Connect Device"}
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};
