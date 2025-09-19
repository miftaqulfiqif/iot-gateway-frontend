import { Devices } from "@/models/DeviceModel";
import { useEffect, useRef, useState } from "react";
import { SocketManager } from "../SocketManager";
import { DeviceManagementHandler } from "../handlers/DeviceManagementHandler";
import { useAuth } from "@/context/AuthContext";

export const useSocketDeviceManagement = () => {
  const { user } = useAuth();
  // const gatewayId = "gateway1";
  const gatewayId = user?.gateway?.id;

  const [devices, setDevices] = useState<Devices[]>([]);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const socketManagerRef = useRef<SocketManager | null>(null);
  const handlerRef = useRef<DeviceManagementHandler | null>(null);

  useEffect(() => {
    const manager = new SocketManager(
      import.meta.env.VITE_SOCKET_URL,
      gatewayId!
    );

    const handler = new DeviceManagementHandler(
      manager.getSocket(),
      setDevices,
      setIsScanning,
      gatewayId!
    );

    socketManagerRef.current = manager;
    handlerRef.current = handler;

    manager.registerHandler(handler);

    return () => {
      if (handlerRef.current) {
        manager.unregisterHandler(handlerRef.current);
      }
      manager.disconnect();
    };
  }, []);

  const eventScanBluetoothDevice = () => {
    setIsScanning(true);
    handlerRef.current?.handleScan();
  };

  const evetGetIpAddressIotGateway = () => {
    handlerRef.current?.handleGetIpAddressIotGateway();
  };

  return {
    devices,
    isScanning,
    eventScanBluetoothDevice,
    evetGetIpAddressIotGateway,
  };
};
