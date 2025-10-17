import { useAuth } from "@/context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { SocketManager } from "../SocketManager";
import { PTBDigiModel } from "@/models/Devices/PTBDigiModel";
import { PTBDigiHandler } from "../handlers/PTBDigiHandler";

type Props = {
  gatewayId: string;
  macDevice: string;
};

export const useSocketPTBDigi = ({ gatewayId, macDevice }: Props) => {
  const { user } = useAuth();
  const [data, setData] = useState<PTBDigiModel | null>(null);

  const socketManagerRef = useRef<SocketManager | null>(null);
  const handlerRef = useRef<PTBDigiHandler | null>(null);

  useEffect(() => {
    if (!macDevice || macDevice === "") return;

    const manager = new SocketManager(
      import.meta.env.VITE_SOCKET_URL,
      gatewayId ? gatewayId : user?.gateway?.id!
    );

    const handler = new PTBDigiHandler(manager.getSocket(), macDevice, setData);

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
