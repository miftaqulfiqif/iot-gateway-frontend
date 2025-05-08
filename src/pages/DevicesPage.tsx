import { useState } from "react";
import { useSocketHandler } from "../hooks/SocketHandler";
import type { Devices } from "../models/DeviceModel";
import MainLayout from "../components/layouts/main-layout";
import { Cpu, ScanBarcode, ScanSearch } from "lucide-react";

function Devices() {
  const {
    userId,
    eventScan,
    devices,
    deleteDevice,
    isScanning,
    eventConnectDevice,
    startDigitProIDA,
    dummyScan,
  } = useSocketHandler();
  const [selectedDevice, setSelectedDevice] = useState<Devices | null>(null);

  const handleSelectDevice = (device: Devices) => {
    setSelectedDevice(device);
    console.log("Device selected:", device);
  };

  return (
    <MainLayout title="Devices" state="Devices">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row items-center justify-between">
          <p className="font-bold text-3xl">Connection devices</p>
          <button
            className="flex flex-row items-center gap-3 bg-blue-500 text-white font-bold py-3 px-5 rounded-2xl disabled:opacity-50 text-xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] cursor-pointer"
            disabled={isScanning}
            onClick={dummyScan}
          >
            <ScanSearch className="w-10 h-10" />
            Scan Devices
          </button>
        </div>
        <ul className="mt-4 space-y-2">
          <div className="flex flex-row bg-white rounded-2xl p-6 gap-4 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <div className="flex flex-col w-full gap-4">
              <p className="font-bold text-xl">Available Devices</p>
              {devices.length > 0 ? (
                <ul className="space-y-3">
                  {devices.map((device) => (
                    <div
                      key={device.mac}
                      onClick={() => handleSelectDevice(device)}
                      className={`flex px-4 py-2 items-center rounded-2xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] pl-4 cursor-pointer justify-between ${
                        selectedDevice?.mac === device.mac
                          ? "bg-blue-100 font-semibold"
                          : "bg-blue-100 "
                      }`}
                    >
                      <div className="flex flex-row gap-3 items-center">
                        <Cpu className="w-10 h-10" />
                        <div className="flex flex-col">
                          <p className="text-lg">{device.name}</p>
                          <p className="text-sm">{device.mac}</p>
                        </div>
                      </div>
                      <div className="flex flex-row gap-2 bg-green-300 px-4 py-2 rounded-full">
                        <p>ONLINE</p>
                      </div>
                    </div>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 mx-auto my-10">
                  {isScanning
                    ? "Scanning..."
                    : "No devices found, press scan button"}
                </p>
              )}
            </div>

            {selectedDevice && (
              <div className="flex flex-col w-1/2 gap-2">
                <div className="flex flex-col gap-4 p-4 rounded bg-gray-50">
                  <p className="font-bold text-xl">Device selected</p>
                  <div className="">
                    <div className="flex flex-row">
                      <p className="font-bold w-18">Name</p>:
                      <p className="ml-2">{selectedDevice.name}</p>
                    </div>
                    <div className="flex flex-row">
                      <p className="font-bold w-18">MAC</p>:
                      <p className="ml-2">{selectedDevice.mac}</p>
                    </div>
                    <div className="flex flex-row">
                      <p className="font-bold w-18">RSSI</p>:
                      <p className="ml-2">{selectedDevice.rssi}</p>
                    </div>
                    <div className="flex flex-row">
                      <p className="font-bold w-18">Distance</p>:
                      <p className="ml-2">
                        {selectedDevice.distance.toFixed(2)} m
                      </p>
                    </div>
                  </div>
                  {devices && devices.length > 0 && (
                    <button
                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer w-full"
                      onClick={() => {
                        selectedDevice && eventConnectDevice(selectedDevice);
                      }}
                    >
                      Connect Device
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </ul>

        <div className="flex flex-col gap-4 mt-10">
          <p className="font-bold text-3xl">Devices connected</p>
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
    </MainLayout>
  );
}

export default Devices;
