import { useAuth } from "@/context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { SocketManager } from "../SocketManager";
import { PulseOximeterFox1Handler } from "../handlers/PulseOximeterFox1Handler";
import { PulseOximeterFox1Model } from "@/models/Devices/PulseOximeterFox1Model";

type Props = {
  gatewayId: string;
  macDevice: string;
};

export const useSocketPulseOximeterFox1 = ({ gatewayId, macDevice }: Props) => {
  const { user } = useAuth();
  const [data, setData] = useState<PulseOximeterFox1Model | null>(null);

  const socketManagerRef = useRef<SocketManager | null>(null);
  const handlerRef = useRef<PulseOximeterFox1Handler | null>(null);

  useEffect(() => {
    if (!macDevice || macDevice === "") return;

    const manager = new SocketManager(
      import.meta.env.VITE_SOCKET_URL,
      gatewayId ? gatewayId : user?.gateway?.id!
    );

    const handler = new PulseOximeterFox1Handler(
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
