import { useAuth } from "@/context/AuthContext";
import { Mft01Model } from "@/models/Devices/Mft01Model";
import { useEffect, useRef, useState } from "react";
import { SocketManager } from "../SocketManager";
import { Mft01Handler } from "../handlers/Mft01Handler";

type Props = {
  gatewayId: string;
  macDevice: string;
};

export const useSocketMft01 = ({ gatewayId, macDevice }: Props) => {
  const { user } = useAuth();
  const [data, setData] = useState<Mft01Model | null>(null);

  const socketManagerRef = useRef<SocketManager | null>(null);
  const handlerRef = useRef<Mft01Handler | null>(null);

  useEffect(() => {
    if (!macDevice || macDevice === "") return;

    const manager = new SocketManager(
      import.meta.env.VITE_SOCKET_URL,
      gatewayId ? gatewayId : user?.gateway?.id!
    );

    const handler = new Mft01Handler(manager.getSocket(), macDevice, setData);

    socketManagerRef.current = manager;
    handlerRef.current = handler;

    manager.registerHandler(handler);

    return () => {
      if (handlerRef.current) {
        manager.unregisterHandler(handlerRef.current);
      }
    };
  }, [macDevice]);

  return { data, setData };
};
