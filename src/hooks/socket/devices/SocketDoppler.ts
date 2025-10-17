import { DopplerModel } from "@/models/Devices/DopplerModel";
import { useEffect, useRef, useState } from "react";
import { SocketManager } from "../SocketManager";
import { DopplerHandler } from "../handlers/DopplerHandler";
import { useAuth } from "@/context/AuthContext";

type Props = {
  gatewayId?: string;
  macDevice: string;
  clearTrigger?: boolean;
};

export const useSocketDoppler = ({
  gatewayId,
  macDevice,
  clearTrigger,
}: Props) => {
  const { user } = useAuth();
  const [data, setData] = useState<DopplerModel | null>(null);
  const [realtime, setRealtime] = useState<
    { index: number; heart_rate: number; heart_rate_avg: number }[]
  >([]);

  const socketManagerRef = useRef<SocketManager | null>(null);
  const handlerRef = useRef<DopplerHandler | null>(null);

  useEffect(() => {
    if (!macDevice || macDevice === "") return;

    const manager = new SocketManager(
      import.meta.env.VITE_SOCKET_URL,
      gatewayId ? gatewayId : user?.gateway?.id!
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

  useEffect(() => {
    if (clearTrigger) {
      setData(null);
      setRealtime([]);
    }
  }, [clearTrigger]);

  return {
    data,
    realtime,
    setData,
    setRealtime,
  };
};
