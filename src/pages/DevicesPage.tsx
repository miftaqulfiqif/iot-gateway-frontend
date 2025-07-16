import { useEffect, useState } from "react";
import type { Devices } from "../models/DeviceModel";
import MainLayout from "../components/layouts/main-layout";
import { Cpu, Plus, ScanBarcode, ScanSearch } from "lucide-react";
import { AddDeviceModal } from "@/components/modals/add-device-modal";
import { AddDeviceBluetooth } from "@/components/modals/add-device-bluetooth-modal";
import { AddDeviceLan } from "@/components/modals/add-device-lan-modal";
import { DevicesConnected } from "@/components/ui/devices-connected";
import { useDevices } from "@/hooks/api/use-device";
import { ConnectingDeviceModal } from "@/components/modals/connecting-device-modal";

function Devices() {
  const {
    devices,
    getAllDevices,
    deleteDeviceBluetooth,
    deleteDeviceTcpIP,
    updateDeviceBluetooth,
    updateDeviceTcpIP,
  } = useDevices();

  const [modalAddDevice, setModalAddDevice] = useState(false);
  const [modalAddDeviceBluetooth, setModalAddDeviceBluetooth] = useState(false);
  const [modalAddDeviceWifiOrLan, setModalAddDeviceWifiOrLan] = useState(false);

  // Get devices on mount
  useEffect(() => {
    getAllDevices();
  }, [getAllDevices]);

  return (
    <MainLayout title="Devices" state="Devices">
      <div className="flex flex-col mb-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <p className="font-bold text-2xl">Devices connected</p>
            {/* Button Add Device */}
            <div
              className="flex flex-row items-center bg-[#2B7FFF] rounded-2xl text-white font-bold py-2 px-4 shadow-[0_4px_4px_rgba(0,0,0,0.25)] gap-2 cursor-pointer"
              onClick={() => setModalAddDevice(true)}
            >
              <Plus className="w-8 h-8" />
              <p>Add Device</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-bold text-lg">Bluetooth</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {devices.filter((d) => d.connection === "bluetooth").length >
              0 ? (
                devices
                  .filter((d) => d.connection === "bluetooth")
                  .map((device) => (
                    <DevicesConnected
                      key={device.id}
                      deviceMac={device.id}
                      device={device.device}
                      deviceName={device.name || device.device}
                      deviceConnection={device.connection}
                      deviceFunction={device.device_function}
                      onDelete={() => deleteDeviceBluetooth(device.id)}
                      onUpdate={() => updateDeviceBluetooth}
                    />
                  ))
              ) : (
                <p className="text-gray-500 mx-auto">
                  No Bluetooth device connected
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-8">
            <p className="font-bold text-lg">TCP / IP</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {devices.filter((d) => d.connection !== "bluetooth").length >
              0 ? (
                devices
                  .filter((d) => d.connection !== "bluetooth")
                  .map((device) => (
                    <DevicesConnected
                      key={device.id}
                      deviceMac={device.id}
                      device={device.device}
                      deviceName={device.name || device.device}
                      deviceConnection={device.connection}
                      deviceFunction={device.device_function}
                      onDelete={() => deleteDeviceTcpIP(device.id)}
                      onUpdate={() => updateDeviceBluetooth}
                    />
                  ))
              ) : (
                <p className="text-gray-500 mx-auto">
                  No TCP / IP device connected
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <AddDeviceModal
        isActive={modalAddDevice}
        setInactive={() => setModalAddDevice(false)}
        setBluetoothActive={() => {
          setModalAddDeviceBluetooth(true);
          setModalAddDevice(false);
        }}
        setWifiOrLANActive={() => {
          setModalAddDeviceWifiOrLan(true);
          setModalAddDevice(false);
        }}
      />
      <AddDeviceBluetooth
        isActive={modalAddDeviceBluetooth}
        setInactive={() => setModalAddDeviceBluetooth(false)}
        getAllDevices={getAllDevices}
      />
      <AddDeviceLan
        isActive={modalAddDeviceWifiOrLan}
        setInactive={() => setModalAddDeviceWifiOrLan(false)}
        getAllDevices={getAllDevices}
      />
    </MainLayout>
  );
}

export default Devices;
