import { BMIModel } from "@/models/Devices/BMIModel";
import { useEffect, useRef, useState } from "react";
import { SocketManager } from "../SocketManager";
import { BMIHandler } from "../handlers/BMIHandler";
import { useAuth } from "@/context/AuthContext";

export const useSocketDigitProBMI = (macDevice: string) => {
  const { user } = useAuth();
  const [data, setData] = useState<BMIModel>();

  const socketManagerRef = useRef<SocketManager | null>(null);
  const handlerRef = useRef<BMIHandler | null>(null);

  useEffect(() => {
    if (!macDevice || macDevice === "") return;

    const manager = new SocketManager(
      import.meta.env.VITE_SOCKET_URL,
      user?.gateway?.id!
    );

    const handler = new BMIHandler(manager.getSocket(), macDevice, setData);

    socketManagerRef.current = manager;
    handlerRef.current = handler;

    manager.registerHandler(handler);

    return () => {
      if (handlerRef.current) {
        manager.unregisterHandler(handlerRef.current);
      }
      manager.disconnect();
    };
  }, [macDevice]);

  return {
    data,
  };
};
