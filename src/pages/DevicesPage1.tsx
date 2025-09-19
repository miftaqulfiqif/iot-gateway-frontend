import { useEffect, useState } from "react";
import type { Devices } from "../models/DeviceModel";
import MainLayout from "../components/layouts/main-layout";
import {
  CircleAlert,
  CircleCheck,
  CircleX,
  MonitorDot,
  Plus,
  Users,
} from "lucide-react";
import { AddDeviceModal } from "@/components/modals/add-device-modal";
import { AddDeviceBluetooth } from "@/components/modals/add-device-bluetooth-modal";
import { AddDeviceLan } from "@/components/modals/add-device-lan-modal";
import { DevicesConnected } from "@/components/ui/devices-connected";
import { useDevices } from "@/hooks/api/use-device";
import { AddDeviceUsb } from "@/components/modals/add-device-usb";

function Devices1() {
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
  const [modalAddDeviceUsb, setModalAddDeviceUsb] = useState(false);

  // Get devices on mount
  useEffect(() => {
    getAllDevices();
  }, [getAllDevices]);

  return (
    <MainLayout title="Devices" state="Devices">
      <div className="flex flex-col mb-5">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 mb-4">
            <div className="w-full flex items-center justify-between p-6 rounded-xl bg-white border gap-2">
              <div className="">
                <p className="">Total Devices</p>
                <p className="font-semibold text-3xl text-blue-500">6</p>
              </div>
              <MonitorDot className="w-10 h-10 text-blue-500" />
            </div>
            <div className="w-full flex items-center justify-between p-6 rounded-xl bg-white border gap-2">
              <div className="">
                <p className="">Online</p>
                <p className="font-semibold text-3xl text-green-500">4</p>
              </div>
              <CircleCheck className="w-10 h-10 text-green-500" />
            </div>
            <div className="w-full flex items-center justify-between p-6 rounded-xl bg-white border gap-2">
              <div className="">
                <p className="">Offline</p>
                <p className="font-semibold text-3xl text-red-500">2</p>
              </div>
              <CircleX className="w-10 h-10 text-red-500" />
            </div>
            <div className="w-full flex items-center justify-between p-6 rounded-xl bg-white border gap-2">
              <div className="">
                <p className="">Maintenance</p>
                <p className="font-semibold text-3xl text-orange-500">2</p>
              </div>
              <CircleAlert className="w-10 h-10 text-orange-500" />
            </div>
          </div>
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

          {/* Bluetooth */}
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
                      deviceId={device.id}
                      deviceMacAddress={device.mac_address}
                      device={device.model}
                      deviceName={device.name || device.model}
                      deviceConnection={device.connection}
                      deviceFunction={device.device_function}
                      deviceIsConnected={device.is_connected}
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

          {/* TCP / IP */}
          <div className="flex flex-col gap-2 mt-8">
            <p className="font-bold text-lg">TCP / IP</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {devices.filter((d) => d.connection === "tcpip").length > 0 ? (
                devices
                  .filter((d) => d.connection === "tcpip")
                  .map((device) => (
                    <DevicesConnected
                      key={device.id}
                      deviceId={device.id}
                      deviceIpAddress={device.ip_address}
                      device={device.model}
                      deviceName={device.name || device.model}
                      deviceConnection={device.connection}
                      deviceFunction={device.device_function}
                      deviceIsConnected={device.is_connected}
                      onDelete={() => deleteDeviceTcpIP(device.ip_address)}
                      onUpdate={() => updateDeviceTcpIP}
                    />
                  ))
              ) : (
                <p className="text-gray-500 mx-auto">
                  No TCP / IP device connected
                </p>
              )}
            </div>
          </div>

          {/* USB */}
          <div className="flex flex-col gap-2 mt-8">
            <p className="font-bold text-lg">USB</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {devices.filter(
                (d) => d.connection === "usb_hid" || d.connection === "usb_vcp"
              ).length > 0 ? (
                devices
                  .filter(
                    (d) =>
                      d.connection === "usb_hid" || d.connection === "usb_vcp"
                  )
                  .map((device) => (
                    <DevicesConnected
                      key={device.id}
                      deviceId={device.id}
                      device={device.model}
                      deviceName={device.name || device.model}
                      deviceConnection={device.connection}
                      deviceFunction={device.device_function}
                      deviceIsConnected={device.is_connected}
                      onDelete={() => deleteDeviceTcpIP(device.id)}
                      onUpdate={() => updateDeviceTcpIP}
                    />
                  ))
              ) : (
                <p className="text-gray-500 mx-auto">No USB device connected</p>
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
        setUsbActive={() => {
          setModalAddDeviceUsb(true);
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
      <AddDeviceUsb
        isActive={modalAddDeviceUsb}
        setInactive={() => setModalAddDeviceUsb(false)}
        getAllDevices={getAllDevices}
      />
    </MainLayout>
  );
}

export default Devices1;
