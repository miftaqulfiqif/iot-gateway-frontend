import { PM9000Model } from "@/models/Devices/PM9000Model";
import { useEffect, useRef, useState } from "react";
import { SocketManager } from "../SocketManager";
import { PM9000Handler } from "../handlers/PM9000Handler";

export const useSocketPM9000 = (ipAddress: string) => {
  const [data, setData] = useState<PM9000Model>();
  const [dataNibp, setDataNibp] = useState({
    mean: 0,
    systolic: 0,
    diastolic: 0,
  });

  const socketManagerRef = useRef<SocketManager | null>(null);
  const handlerRef = useRef<PM9000Handler | null>(null);

  useEffect(() => {
    if (!ipAddress || ipAddress === "") return;

    const manager = new SocketManager(
      import.meta.env.VITE_SOCKET_URL,
      "UserTest"
    );

    const handler = new PM9000Handler(
      manager.getSocket(),
      ipAddress,
      setData,
      setDataNibp
    );

    socketManagerRef.current = manager;
    handlerRef.current = handler;

    manager.registerHandler(handler);

    return () => {
      if (handlerRef.current) {
        manager.unregisterHandler(handlerRef.current);
      }
      manager.disconnect;
    };
  }, [ipAddress]);

  return {
    data,
    dataNibp,
  };
};
