import { useAuth } from "@/context/AuthContext";
import { TensiOneModel } from "@/models/Devices/TensiOneModel";
import { useEffect, useRef, useState } from "react";
import { SocketManager } from "../SocketManager";
import { TensiOneHandler } from "../handlers/TensiOneHandler";

type Props = {
  gatewayId: string;
  macDevice: string;
};

export const useSocketTensiOne = ({ gatewayId, macDevice }: Props) => {
  const { user } = useAuth();
  const [data, setData] = useState<TensiOneModel | null>(null);

  const socketManagerRef = useRef<SocketManager | null>(null);
  const handlerRef = useRef<TensiOneHandler | null>(null);

  useEffect(() => {
    if (!macDevice || macDevice === "") return;

    const manager = new SocketManager(
      import.meta.env.VITE_SOCKET_URL,
      gatewayId ? gatewayId : user?.gateway?.id!
    );

    const handler = new TensiOneHandler(
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
