import { DopplerModel } from "@/models/Devices/DopplerModel";
import { useEffect, useRef, useState } from "react";
import { SocketManager } from "../SocketManager";
import { DopplerHandler } from "../handlers/DopplerHandler";

export const useSocketDoppler = (macDevice: string) => {
  const [data, setData] = useState<DopplerModel>({
    heart_rate: 0,
    sound_quality: "",
    battery_level: 0,
  });

  const [realtime, setRealtime] = useState<
    { index: number; heart_rate: number; heart_rate_avg: number }[]
  >([]);

  const socketManagerRef = useRef<SocketManager | null>(null);
  const handlerRef = useRef<DopplerHandler | null>(null);

  useEffect(() => {
    if (!macDevice || macDevice === "") return;

    const manager = new SocketManager(
      import.meta.env.VITE_SOCKET_URL,
      "UserTest"
    );

    const handler = new DopplerHandler(
      manager.getSocket(),
      macDevice,
      setData,
      setRealtime
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
  }, [macDevice]);

  return {
    data,
    realtime,
  };
};
