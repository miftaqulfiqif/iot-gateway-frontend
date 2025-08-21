import { Devices } from "@/models/DeviceModel";
import { useEffect, useRef, useState } from "react";
import { SocketManager } from "../SocketManager";
import { DeviceManagementHandler } from "../handlers/DeviceManagementHandler";
import { useAuth } from "@/context/AuthContext";

export const useSocketDeviceManagement = () => {
  const { user } = useAuth();
  const [devices, setDevices] = useState<Devices[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const socketManagerRef = useRef<SocketManager | null>(null);
  const handlerRef = useRef<DeviceManagementHandler | null>(null);

  useEffect(() => {
    const manager = new SocketManager(
      import.meta.env.VITE_SOCKET_URL,
      user?.gateway?.id!
    );

    const handler = new DeviceManagementHandler(
      manager.getSocket(),
      setDevices,
      setIsScanning,
      user?.gateway?.id!
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

  return {
    devices,
    isScanning,
    eventScanBluetoothDevice,
  };
};
