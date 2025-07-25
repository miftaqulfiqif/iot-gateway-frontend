import { DigitProBabyModel } from "@/models/Devices/DigitProBabyModel";
import { useEffect, useRef, useState } from "react";
import { SocketManager } from "../SocketManager";
import { DigitProBabyHandler } from "../handlers/DigitProBabyHandler";
import { useToast } from "@/context/ToastContext";

export const useSocketDigitProBaby = (macDevice: string) => {
  const { showToast } = useToast();
  const [data, setData] = useState<DigitProBabyModel>({
    mac: "",
    weight: 0,
  });

  const [realtime, setRealtime] = useState<{ index: number; weight: number }[]>(
    []
  );

  const socketManagerRef = useRef<SocketManager | null>(null);
  const handlerRef = useRef<DigitProBabyHandler | null>(null);

  useEffect(() => {
    if (!macDevice || macDevice === "") return;

    const manager = new SocketManager(
      import.meta.env.VITE_SOCKET_URL,
      "UserTest"
    );

    const handler = new DigitProBabyHandler(
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
      manager.disconnect;
    };
  }, [macDevice]);

  const eventTareDigitProBaby = () => {
    handlerRef.current?.handleTare();
    showToast(null, "Tare successfully", "success");
  };

  return {
    data,
    realtime,
    eventTareDigitProBaby,
  };
};
