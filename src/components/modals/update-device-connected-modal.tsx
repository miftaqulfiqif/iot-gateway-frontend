import { useEffect, useState } from "react";
import { Bluetooth, EthernetPort, Key, LandPlot, Wifi } from "lucide-react";
import { Devices } from "@/models/DeviceModel";

type Props = {
  isActive: boolean;
  setInactive: () => void;
  device: Devices;
};

export const UpdateDeviceConnected = ({
  isActive,
  setInactive,
  device,
}: Props) => {
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setInactive();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  console.log("DEVICES : ", device);

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
        <p className="font-semibold text-xl mb-2">Edit Device Connected</p>
        <div className="flex flex-col gap-4"></div>
      </div>
    </div>
  );
};
