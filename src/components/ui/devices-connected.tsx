import { Bluetooth, EthernetPort, Wifi } from "lucide-react";

type DevicesConnectedProps = {
  device: string;
  deviceName: string;
  deviceMac: string;
  deviceConnection: string;
};
export const DevicesConnected = ({
  device,
  deviceName,
  deviceMac,
  deviceConnection,
}: DevicesConnectedProps) => {
  return (
    <div className="flex flex-col gap-1 bg-white p-4 rounded-2xl">
      <p className="font-bold text-xl mb-2">{deviceName}</p>
      <p>Device : </p>
      <p className="font-bold">{device}</p>
      <p>MAC Address : </p>
      <p className="font-bold">{deviceMac}</p>
      <p>Connection : </p>
      <div className="flex flex-row gap-2 items-center">
        {
          {
            bluetooth: (
              <div className="bg-blue-500 p-1 rounded-full text-white w-fit">
                <Bluetooth />
              </div>
            ),
            wifi: (
              <div className="bg-blue-500 p-1 rounded-full text-white w-fit">
                <Wifi />
              </div>
            ),
            lan: (
              <div className="bg-blue-500 p-1 rounded-full text-white w-fit">
                <EthernetPort />
              </div>
            ),
          }[deviceConnection]
        }
        <p className="font-bold">{deviceConnection}</p>
      </div>
    </div>
  );
};
