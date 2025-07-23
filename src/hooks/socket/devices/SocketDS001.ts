import { useEffect, useRef, useState } from "react";
import { SocketManager } from "../SocketManager";
import { DS001Handler } from "../handlers/DS001Handler";

type DS001Data = {
  systolic: number;
  diastolic: number;
  mean: number;
  pulse_rate: number;
  temp: number;
  spo2: number;
  pr_spo2: number;
  rr: number;
};

export const useSocketDS001 = (ipAddress: string) => {
  const [data, setData] = useState<DS001Data>();
  const [dataNibp, setDataNibp] = useState({});

  const socketManagerRef = useRef<SocketManager | null>(null);
  const handlerRef = useRef<DS001Handler | null>(null);

  useEffect(() => {
    if (!ipAddress || ipAddress === "") return;
    const manager = new SocketManager(
      import.meta.env.VITE_SOCKET_URL,
      "UserTest"
    );

    const handler = new DS001Handler(
      manager.getSocket(),
      ipAddress,
      setData,
      setDataNibp
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
  }, [ipAddress]);

  return {
    data,
    dataNibp,
  };
};
