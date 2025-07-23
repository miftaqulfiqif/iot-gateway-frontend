import { useState, useEffect, useRef } from "react";
import { DigitProIDAHandler } from "../handlers/DigitProIDAHandler";
import { DigitProIDAModel } from "@/models/Devices/DigitProIDAModel";
import { SocketManager } from "../SocketManager";

export const useSocketDigitProIDA = (macDevice: string) => {
  const [data, setData] = useState<DigitProIDAModel>({
    weight_mother: 0,
    weight_child: 0,
  });

  const [realtime, setRealtime] = useState<
    { index: number; weight_mother: number; weight_child: number }[]
  >([]);

  const socketManagerRef = useRef<SocketManager | null>(null);
  const handlerRef = useRef<DigitProIDAHandler | null>(null);

  useEffect(() => {
    if (!macDevice || macDevice === "") return;

    const manager = new SocketManager(
      import.meta.env.VITE_SOCKET_URL,
      "UserTest"
    );

    const handler = new DigitProIDAHandler(
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
