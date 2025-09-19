import { useEffect, useRef, useState } from "react";
import { SocketManager } from "../SocketManager";
import { DS001Handler } from "../handlers/DS001Handler";
import { useAuth } from "@/context/AuthContext";
import { MqttManager } from "../MqttManager";

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

type PlethPoint = { time: number; value: number };

export const useSocketDS001 = (ipAddress: string) => {
  const { user } = useAuth();
  const gatewaySn = user?.gateway?.id;

  const [data, setData] = useState<DS001Data>();
  const [dataNibp, setDataNibp] = useState({});
  const [dataPleth, setDataPleth] = useState<{ pleth_data: PlethPoint[] }>({
    pleth_data: [],
  });

  const bufferRef = useRef<number[]>([]); // Ref to store the buffer

  const socketManagerRef = useRef<SocketManager | null>(null);
  const mqttManagerRef = useRef<MqttManager | null>(null);
  const handlerRef = useRef<DS001Handler | null>(null);

  useEffect(() => {
    if (!ipAddress || ipAddress === "") return;
    const manager = new SocketManager(
      import.meta.env.VITE_SOCKET_URL,
      gatewaySn!
    );
    const mqtt = new MqttManager(import.meta.env.VITE_MQTT_BROKER_URL);

    const handler = new DS001Handler(
      manager.getSocket(),
      mqtt,
      ipAddress,
      setData,
      setDataNibp,
      setDataPleth,
      bufferRef,
      gatewaySn!
    );

    socketManagerRef.current = manager;
    handlerRef.current = handler;

    manager.registerHandler(handler);

    return () => {
      if (handlerRef.current) {
        manager.unregisterHandler(handlerRef.current);
      }
      manager.disconnect;

      if (mqttManagerRef.current) {
        mqttManagerRef.current.disconnect();
      }
    };
  }, [ipAddress]);

  return {
    data,
    dataNibp,
    dataPleth: dataPleth.pleth_data,
  };
};
