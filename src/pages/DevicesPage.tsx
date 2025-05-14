import { useState } from "react";
import { useSocketHandler } from "../hooks/SocketHandler";
import type { Devices } from "../models/DeviceModel";
import MainLayout from "../components/layouts/main-layout";
import { Cpu, Plus, ScanBarcode, ScanSearch } from "lucide-react";
import { AddDeviceModal } from "@/components/add-device-modal";
import { AddDeviceBluetooth } from "@/components/ui/add-device-bluetooth-modal";

function Devices() {
  const [modalAddDevice, setModalAddDevice] = useState(false);
  const [modalAddDeviceBluetooth, setModalAddDeviceBluetooth] = useState(false);
  const [modalAddDeviceWifiOrLan, setModalAddDeviceWifiOrLan] = useState(false);

  const showAddDevice = () => {
    setModalAddDevice(true);
  };

  return (
    <MainLayout title="Devices" state="Devices">
      <div className="flex flex-col">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <p className="font-bold text-2xl">Devices connected</p>
            {/* Button Add Device */}
            <div
              className="flex flex-row items-center bg-[#2B7FFF] rounded-2xl text-white font-bold py-2 px-4 shadow-[0_4px_4px_rgba(0,0,0,0.25)] gap-2 cursor-pointer"
              onClick={showAddDevice}
            >
              <Plus className="w-8 h-8" />
              <p>Add Device</p>
            </div>
          </div>
          <div className="flex flex-row gap-4 ">
            <div className="flex flex-col gap-1 bg-white p-4 rounded-2xl">
              <p className="font-bold text-xl mb-2">Digit Pro IDA</p>
              <p>MAC Address : </p>
              <p className="font-bold">F1:Q1:GA:NT:3N:GG</p>
              <p>Serial number : </p>
              <p className="font-bold">1S3CB03BB2DF2CC</p>
            </div>
            <div className="flex flex-col gap-1 bg-white p-4 rounded-2xl">
              <p className="font-bold text-xl mb-2">Digit Pro Baby</p>
              <p>MAC Address : </p>
              <p className="font-bold">F1:Q1:GA:NT:3N:GG</p>
              <p>Serial number : </p>
              <p className="font-bold">1S3CB03BB2DF2CC</p>
            </div>
            <div className="flex flex-col gap-1 bg-white p-4 rounded-2xl">
              <p className="font-bold text-xl mb-2">Doppler</p>
              <p>MAC Address : </p>
              <p className="font-bold">F1:Q1:GA:NT:3N:GG</p>
              <p>Serial number : </p>
              <p className="font-bold">1S3CB03BB2DF2CC</p>
            </div>
            <div className="flex flex-col gap-1 bg-white p-4 rounded-2xl">
              <p className="font-bold text-xl mb-2">BMI</p>
              <p>MAC Address : </p>
              <p className="font-bold">F1:Q1:GA:NT:3N:GG</p>
              <p>Serial number : </p>
              <p className="font-bold">1S3CB03BB2DF2CC</p>
            </div>
          </div>
        </div>

        {/* DELETE DEVICE */}
        {/* <div className="flex flex-row gap-4 mt-20">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            onClick={startDigitProIDA}
          >
            Start Digit Pro IDA
          </button>

          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            onClick={() => {
              deleteDevice(selectedDevice?.mac || "");
              console.log(
                "Device deleted successfully, mac : ",
                selectedDevice?.mac
              );
            }}
          >
            Delete Digit Pro IDA
          </button>
        </div> */}
      </div>
      <AddDeviceModal
        isActive={modalAddDevice}
        setInactive={() => setModalAddDevice(false)}
        setBluetoothActive={() => {
          setModalAddDeviceBluetooth(true);
          setModalAddDevice(false);
        }}
      />
      <AddDeviceBluetooth
        isActive={modalAddDeviceBluetooth}
        setInactive={() => setModalAddDeviceBluetooth(false)}
      />
    </MainLayout>
  );
}

export default Devices;
