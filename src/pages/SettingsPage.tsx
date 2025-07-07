import { InputSelect } from "@/components/ui/input-select";
import MainLayout from "../components/layouts/main-layout";
import { useState } from "react";

const data = [
  {
    label: "Gateway 1",
    value: "SN1234567890",
  },
  {
    label: "Gateway 2",
    value: "SN1234567891",
  },
];

const SettingsPage = () => {
  const [gatewayDevices, setGatewayDevices] = useState(data);
  const [gatewaySelected, setGatewaySelected] = useState<string>("");

  return (
    <MainLayout title="Settings" state="Settings">
      <div className="h-full mb-5">
        <p className="text-2xl">Gateway Devices</p>
        <div className="flex flex-col gap-5 p-4 bg-white w-[600px] rounded-2xl shadow-[4px_4px_4px_rgba(0,0,0,0.16)] mt-4 ">
          {/* Header */}
          <div className="flex justify-between items-center">
            <p>List Gateway</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
              Add Device
            </button>
          </div>
          {/* List */}
          <div className="flex flex-col gap-4">
            {gatewayDevices.map((device) => (
              <div className="flex gap-4 items-center">
                <div className="w-20 h-20 bg-gray-500 rounded-2xl"></div>
                <div className="flex flex-col gap-2">
                  <p className="font-bold">{device.label}</p>
                  <p>Serial number : {device.value}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer">
            Save
          </button>
        </div>
      </div>
    </MainLayout>
  );
};
export default SettingsPage;
