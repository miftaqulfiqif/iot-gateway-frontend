import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Data } from "../models/DataModel";

const userId = "UserTest";

export const useSocketHandler = () => {
  const socketRef = useRef<Socket | null>(null);

  const startSocket = (userId: string) => {
    if (socketRef.current) {
      console.log("Socket already running.");
      return;
    }

    try {
      // const socket = io("http://api-gateway-sinko.up.railway.app:3000");
      const socket = io("http://localhost:3000");

      console.log("Socket started at " + socket.id);

      socket.emit("join", userId);

      socketRef.current = socket;
    } catch (error) {
      console.error("Error starting socket:", error);
    }
  };

  const handleMessage = (data: Data) => {
    console.log(`Received message from user ${data.user_id}:`, data);
    socketRef.current?.emit("message", data);
  };

  useEffect(() => {
    startSocket(userId);

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return { startSocket, handleMessage, userId };
};
