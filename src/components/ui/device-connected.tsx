import { Bluetooth } from "lucide-react";

type DeviceConnectedProps = {
  deviceIcon: string;
  deviceName: string;
  deviceSerialNumber: string;
  onClick: () => void;
};
const DeviceConnected = ({
  deviceIcon,
  deviceName,
  deviceSerialNumber,
  onClick,
}: DeviceConnectedProps) => {
  return (
    <div
      className="flex flex-row bg-white rounded-4xl p-5 shadow-[0_4px_4px_rgba(0,0,0,0.25)]  justify-between cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-row gap-5 items-center">
        <img
          src={deviceIcon ? deviceIcon : ""}
          alt=""
          className="bg-gray-400 w-20 h-20 rounded-full"
        />
        <div className="flex flex-col text-xl gap-2">
          <p className="font-bold">{deviceName}</p>
          <p className="text-gray-500 text-lg">{`${deviceSerialNumber}`}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 h-fit">
        <div className="bg-blue-500 p-1 rounded-full text-white">
          <Bluetooth />
        </div>
        <p className="bg-green-300 h-fit px-4 py-1 rounded-3xl">Online</p>
      </div>
    </div>
  );
};

export default DeviceConnected;
