import { useAuth } from "@/context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { SocketManager } from "../SocketManager";
import { MTRBaby002Model } from "@/models/Devices/MTRBaby002Model";
import { MTRBaby002Handler } from "../handlers/MTRBaby002Handler";

type Props = {
  gatewayId: string;
  macDevice: string;
};

export const useSocketMTRBaby002 = ({ gatewayId, macDevice }: Props) => {
  const { user } = useAuth();
  const [data, setData] = useState<MTRBaby002Model | null>(null);

  const socketManagerRef = useRef<SocketManager | null>(null);
  const handlerRef = useRef<MTRBaby002Handler | null>(null);

  useEffect(() => {
    if (!macDevice || macDevice === "") return;

    const manager = new SocketManager(
      import.meta.env.VITE_SOCKET_URL,
      gatewayId ? gatewayId : user?.gateway?.id!
    );

    const handler = new MTRBaby002Handler(
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
    };
  }, [macDevice]);

  return { data, setData };
};
