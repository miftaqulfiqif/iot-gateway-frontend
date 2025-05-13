import { useState } from "react";
import { Bluetooth, EthernetPort, Key, LandPlot, Wifi } from "lucide-react";

type Props = {
  isActive: boolean;
  setInactive: () => void;
  setBluetoothActive: () => void;
};

export const AddDeviceModal = ({
  isActive,
  setInactive,
  setBluetoothActive,
}: Props) => {
  const handleConfirm = () => {
    alert("OK");
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
        <p className="font-semibold text-xl mb-2">Select Connection</p>
        <div className="flex flex-row gap-4">
          <div
            className="w-[300px] h-[300px] bg-blue-500 hover:bg-blue-400 rounded-2xl text-white items-center flex flex-col justify-center gap-2 shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            onClick={setBluetoothActive}
          >
            <Bluetooth className="w-10 h-10" />
            <p>Bluetooth</p>
          </div>
          <div className="w-[300px] h-[300px] bg-blue-500 hover:bg-blue-400 rounded-2xl text-white items-center flex flex-row justify-center gap-4 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <div className="items-center flex flex-col justify-center gap-2 ">
              <Wifi className="w-10 h-10" />
              <p>Wi-Fi</p>
            </div>
            <div className="w-1 h-14 bg-white transform rotate-12"></div>
            <div className="items-center flex flex-col justify-center gap-2">
              <EthernetPort className="w-10 h-10" />
              <p>LAN</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
