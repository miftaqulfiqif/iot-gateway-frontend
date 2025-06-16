import { Bluetooth, EthernetPort, Wifi } from "lucide-react";

type DevicesConnectedProps = {
  device: string;
  deviceName: string;
  deviceMac: string;
  deviceConnection: string;
  deviceFunction: string;
};
export const DevicesConnected = ({
  device,
  deviceName,
  deviceMac,
  deviceConnection,
  deviceFunction,
}: DevicesConnectedProps) => {
  return (
    <div className="flex flex-col gap-1 bg-white p-4 rounded-2xl w-full border">
      <div className="flex flex-row gap-2 items-center">
        {deviceConnection === "bluetooth" ? (
          <div className="bg-blue-500 p-1 rounded-full text-white">
            <Bluetooth />
          </div>
        ) : deviceConnection === "wifi" ? (
          <div className="bg-blue-500 p-1 rounded-full text-white">
            <Wifi />
          </div>
        ) : (
          <div className="bg-blue-500 p-1 rounded-full text-white">
            <EthernetPort />
          </div>
        )}
        {/* {
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
        } */}
        <p className="font-bold">{deviceConnection}</p>
      </div>
      <div className="flex flex-col h-full justify-between mt-4">
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-2">
            <p className="font-bold text-sm">{device}</p>
          </div>
          <p className="font-semibold text-sm text-gray-500">{deviceMac}</p>
          <p className="font-bold text-xl">{deviceName}</p>
        </div>
        <div className="mt-4 flex flex-row justify-end">
          <p
            className="text-sm bg-blue-200 text-blue-800 px-3 py-2 rounded-lg font-bold cursor-pointer hover:bg-blue-300"
            onClick={() => {
              window.location.href = `/device/${deviceFunction}/${deviceMac}`;
            }}
          >
            Measurement
          </p>
        </div>
      </div>
    </div>
  );
};
