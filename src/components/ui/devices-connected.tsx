import {
  Bluetooth,
  EllipsisVertical,
  EthernetPort,
  SquarePen,
  Trash,
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
  deviceName: string;
  deviceMac: string;
  deviceConnection: string;
  deviceFunction: string;
  onDelete: () => void;
  onUpdate: () => void;
};
export const DevicesConnected = ({
  device,
  deviceName,
  deviceMac,
  deviceConnection,
  deviceFunction,
  onDelete,
  onUpdate,
}: DevicesConnectedProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-1 bg-white p-4 rounded-2xl w-full border">
      <div className="flex flex-row gap-2 items-center justify-between">
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
          <p className="font-bold">
            {deviceConnection === "bluetooth" ? "Bluetooth" : "TCP / IP"}
          </p>
        </div>
        {/* Button Action */}
        <div className="relative">
          <button
            className="flex items-center gap-1 cursor-pointer transition duration-150"
            onClick={() => {
              const optionsMenu = document.getElementById(
                `options-${deviceMac}`
              );
              if (optionsMenu) {
                optionsMenu.classList.toggle("hidden");
              }
            }}
          >
            <EllipsisVertical className="w-6 h-6" />
          </button>
          <div
            id={`options-${deviceMac}`}
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg hidden"
          >
            <ul className="py-1">
              <li
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  deviceConnection === "bluetooth"
                    ? navigate("/device/bluetooth/" + deviceMac)
                    : null;

                  deviceConnection !== "bluetooth"
                    ? navigate("/device/tcpip/" + deviceMac)
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
                      This action cannot be undone. This will permanently delete
                      this item.
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
        </div>
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
