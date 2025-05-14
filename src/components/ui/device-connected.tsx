import { Bluetooth, CpuIcon, EthernetPort, Wifi } from "lucide-react";

type DeviceConnectedProps = {
  deviceIcon: string;
  deviceName: string;
  deviceMac: string;
  deviceConnection: string;
  url?: string;
};
const DeviceConnected = ({
  deviceIcon,
  deviceName,
  deviceMac,
  deviceConnection,
  url,
}: DeviceConnectedProps) => {
  const handleClick = () => {
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <div
      className="flex flex-row bg-white rounded-4xl p-5 shadow-[0_4px_4px_rgba(0,0,0,0.25)]  justify-between cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex flex-row gap-4 items-center">
        {deviceIcon ? (
          <img
            src={deviceIcon}
            alt=""
            className="bg-white object-cover w-20 h-20 rounded-full"
          />
        ) : (
          <CpuIcon className="w-12 h-12" />
        )}
        <div className="flex flex-col text-lg gap-1">
          <p className="font-semibold">{deviceName}</p>
          <p className="text-base text-gray-600">{deviceMac}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 h-fit">
        {
          {
            bluetooth: (
              <div className="bg-blue-500 p-1 rounded-full text-white">
                <Bluetooth />
              </div>
            ),
            wifi: (
              <div className="bg-blue-500 p-1 rounded-full text-white">
                <Wifi />
              </div>
            ),
            lan: (
              <div className="bg-blue-500 p-1 rounded-full text-white">
                <EthernetPort />
              </div>
            ),
          }[deviceConnection]
        }
        <p className="bg-green-300 h-fit px-4 py-1 rounded-3xl text-sm">
          Online
        </p>
      </div>
    </div>
  );
};

export default DeviceConnected;
