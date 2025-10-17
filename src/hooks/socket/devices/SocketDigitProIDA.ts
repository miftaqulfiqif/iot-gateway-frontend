import { useState, useEffect, useRef } from "react";
import { DigitProIDAHandler } from "../handlers/DigitProIDAHandler";
import { DigitProIDAModel } from "@/models/Devices/DigitProIDAModel";
import { SocketManager } from "../SocketManager";
import { useAuth } from "@/context/AuthContext";

type Props = {
  gatewayId?: string;
  macDevice: string;
};

export const useSocketDigitProIDA = ({ gatewayId, macDevice }: Props) => {
  const { user } = useAuth();
  const [data, setData] = useState<DigitProIDAModel | null>(null);

  const socketManagerRef = useRef<SocketManager | null>(null);
  const handlerRef = useRef<DigitProIDAHandler | null>(null);

  useEffect(() => {
    if (!macDevice || macDevice === "") return;

    const manager = new SocketManager(
      import.meta.env.VITE_SOCKET_URL,
      gatewayId ? gatewayId : user?.gateway?.id!
    );

    const handler = new DigitProIDAHandler(
      manager.getSocket(),
      macDevice,
      setData
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
    setData,
  };
};
