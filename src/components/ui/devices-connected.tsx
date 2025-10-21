import {
  Bluetooth,
  EllipsisVertical,
  EthernetPort,
  Settings2,
  Trash,
  Usb,
  Wifi,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useNavigate } from "react-router-dom";

type DevicesConnectedProps = {
  device: string;
  deviceId: string;
  deviceName: string;
  deviceMacAddress?: string;
  deviceIpAddress?: string;
  deviceConnection: string;
  deviceFunction: string;
  deviceIsConnected: boolean;
  onDelete: () => void;
  onUpdate: () => void;
};
export const DevicesConnected = ({
  device,
  deviceId,
  deviceName,
  deviceMacAddress,
  deviceIpAddress,
  deviceConnection,
  deviceFunction,
  deviceIsConnected,
  onDelete,
  onUpdate,
}: DevicesConnectedProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-1 bg-white p-4 rounded-2xl w-full border">
      <div className="flex flex-row gap-2 items-center justify-between">
        <div className="flex flex-row gap-2 items-center">
          {deviceConnection === "bluetooth" ? (
            <Bluetooth className="text-white bg-blue-500 p-1 rounded-full" />
          ) : deviceConnection === "wifi" ? (
            <Wifi className="text-white bg-blue-500 p-1 rounded-full" />
          ) : deviceConnection === "usb_hid" || deviceFunction === "usb_vcp" ? (
            <Usb className="text-white bg-blue-500 p-1 rounded-full" />
          ) : (
            <EthernetPort className="text-white bg-blue-500 p-1 rounded-full" />
          )}
          <p className="font-bold">
            {deviceConnection === "bluetooth" && "Bluetooth"}
            {deviceConnection === "tcpip" && "TCP / IP"}
            {deviceConnection === "usb_hid" && "USB HID"}
            {deviceConnection === "usb_vcp" && "USB VCP"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {deviceIsConnected === true ? (
            <p className="bg-green-100 text-green-900 px-2 py-1 rounded-full font-bold text-sm">
              Connected
            </p>
          ) : (
            <p className="bg-red-100 text-red-900 px-2 py-1 rounded-full font-bold text-sm">
              Disconnect
            </p>
          )}
          {/* Button Action
          <div className="relative">
            <button
              className="flex items-center gap-1 cursor-pointer transition duration-150"
              onClick={() => {
                const optionsMenu = document.getElementById(
                  `options-${deviceId}`
                );
                if (optionsMenu) {
                  optionsMenu.classList.toggle("hidden");
                }
              }}
            >
              <EllipsisVertical className="w-6 h-6" />
            </button>
            <div
              id={`options-${deviceId}`}
              className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg hidden"
            >
              <ul className="py-1">
                <li
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    deviceConnection === "bluetooth"
                      ? navigate("/device/bluetooth/" + deviceId)
                      : null;

                    deviceConnection !== "bluetooth"
                      ? navigate("/device/tcpip/" + deviceId)
                      : null;
                  }}
                >
                  <div className="flex items-center gap-2">Detail</div>
                </li>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                      <div className="flex items-center gap-2 text-red-500">
                        <Trash className="w-5 h-5" />
                        Delete
                      </div>
                    </li>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this item.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="text-black border">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={onDelete}
                        className="bg-red-500 text-white"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </ul>
            </div>
          </div> */}
        </div>
      </div>
      <div className="flex flex-col h-full justify-between mt-4">
        <div className="flex flex-col gap-1">
          {deviceConnection === "usb_hid" ||
            (deviceConnection === "usb_vcp" ? (
              ""
            ) : (
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2">
                  <p className="font-bold text-sm">{device}</p>
                </div>
                <p className="font-semibold text-sm text-gray-500">
                  {deviceMacAddress ?? deviceIpAddress}
                </p>
              </div>
            ))}
          <p className="font-bold text-xl">{deviceName}</p>
        </div>
        <div className="mt-4 flex flex-row justify-between items-center">
          <div
            className="flex items-center bg-gray-200 rounded-lg px-3 py-1 mr-4 cursor-pointer hover:bg-gray-300"
            onClick={() => {
              deviceConnection === "bluetooth"
                ? navigate("/device/bluetooth/" + deviceId)
                : null;

              deviceConnection !== "bluetooth"
                ? navigate("/device/tcpip/" + deviceId)
                : null;
            }}
          >
            <Settings2 className="w-5 h-5 mr-2" />
            <p>Manage</p>
          </div>
          <p
            className="text-sm bg-blue-200 text-blue-800 px-3 py-2 rounded-lg font-bold cursor-pointer hover:bg-blue-300"
            onClick={() => {
              window.location.href = `/device/${deviceFunction}/${
                deviceMacAddress || deviceIpAddress
              }`;
            }}
          >
            Measurement
          </p>
        </div>
      </div>
    </div>
  );
};
