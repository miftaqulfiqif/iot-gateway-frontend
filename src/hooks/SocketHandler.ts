import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Devices } from "../models/DeviceModel";

const userId = "UserTest";

const data = {
  user_id: userId, // konsisten camelCase sesuai backend
  data: {
    topic: "ble/start",
    payload: "1",
  },
};

export const useSocketHandler = () => {
  const socketRef = useRef<Socket | null>(null);

  const [devices, setDevices] = useState<Devices[]>([]);

  const startSocket = (userId: string) => {
    if (socketRef.current) {
      console.log("⚠️ Socket already running.");
      return;
    }

    try {
      const socket = io("http://localhost:3000");

      socket.on("connect", () => {
        console.log("✅ Socket connected:", socket.id);
        socket.emit("join", userId);
      });

      socket.on("found-devices", (payload: { devices: Devices[] }) => {
        console.log("📡 Device found:", payload.devices);
        setDevices(payload.devices);
      });

      socketRef.current = socket;
    } catch (error) {
      console.error("❌ Error starting socket:", error);
    }
  };

  const eventScan = () => {
    socketRef.current?.emit("scan", data);
  };

  useEffect(() => {
    startSocket(userId);

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  return { startSocket, eventScan, userId, devices };
};
