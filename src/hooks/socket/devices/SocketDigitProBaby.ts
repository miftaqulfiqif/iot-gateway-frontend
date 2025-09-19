import { DigitProBabyModel } from "@/models/Devices/DigitProBabyModel";
import { useEffect, useRef, useState } from "react";
import { SocketManager } from "../SocketManager";
import { DigitProBabyHandler } from "../handlers/DigitProBabyHandler";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";
import { set } from "lodash";

export const useSocketDigitProBaby = (macDevice: string) => {
  const { user } = useAuth();
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
      user?.gateway?.id!
    );

    const handler = new DigitProBabyHandler(
      manager.getSocket(),
      macDevice,
      setData,
      setRealtime,
      user?.gateway?.id!
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
    setData({
      mac: "",
      weight: 0,
    });
    setRealtime([]);
    handlerRef.current?.handleTare();
    showToast(null, "Tare successfully", "success");
  };

  return {
    data,
    realtime,
    eventTareDigitProBaby,
  };
};
