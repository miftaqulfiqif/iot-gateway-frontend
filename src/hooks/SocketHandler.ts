import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Devices } from "../models/DeviceModel";
import { Data } from "../models/DataModel";
import { DigitProIDA } from "../models/DigitProIDA";

const userId = "UserTest";
const socketUrl = "http://localhost:3000";

export const useSocketHandler = () => {
  const socketRef = useRef<Socket | null>(null);
  const scanTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [devices, setDevices] = useState<Devices[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const startSocket = (userId: string) => {
    const socket = io(socketUrl, {
      // transports: ["websocket"],
      reconnectionAttempts: 3,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnection: true,
      rejectUnauthorized: false,
    });

    if (socketRef.current) {
      console.log("⚠️ Socket already running.");
      return;
    }

    try {
      socket.on("connect", () => {
        console.log("✅ Socket connected:", socket.id);
        socket.emit("join", userId);
      });

      socket.on("found_devices", (payload: { devices?: Devices[] }) => {
        if (payload?.devices && Array.isArray(payload.devices)) {
          console.log("📡 Device(s) received:", payload.devices);

          setDevices((prevDevices) => {
            const newDevices = payload.devices || [];

            const existingMacs = new Set(prevDevices.map((d) => d.mac));
            const filteredNew = newDevices.filter(
              (d) => !existingMacs.has(d.mac)
            );

            return [...prevDevices, ...filteredNew];
          });
        } else {
          console.warn("⚠️ Invalid device payload received:", payload);
        }
        if (scanTimeoutRef.current) {
          clearTimeout(scanTimeoutRef.current);
        }

        scanTimeoutRef.current = setTimeout(() => {
          setIsScanning(false);
          console.log("No device found after 3s, scanning stopped.");
        }, 3000);
      });

      socket.on(
        "listen_digitproida",
        (payload: { data_digitproida?: DigitProIDA[] }) => {
          if (
            payload?.data_digitproida &&
            Array.isArray(payload.data_digitproida)
          ) {
            console.log("DigitProIDA(s) received:", payload.data_digitproida);
          }
        }
      );

      socketRef.current = socket;
    } catch (error) {
      console.error("❌ Error starting socket:", error);
    }
  };

  const eventScan = () => {
    setDevices([]);
    setIsScanning(true);
    socketRef.current?.emit("scan", <Data>{
      user_id: userId,
      data: { topic: "ble/start", payload: "1" },
    });
  };

  const dummyScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setDevices([
        {
          mac: "F1:Q1:GA:NT:3N:GG",
          name: "Digit Pro IDA",
          rssi: -30,
          filteredRSSI: -30,
          distance: 1,
        },
        {
          mac: "F1:Q1:GA:NT:3N:G6",
          name: "Digit Pro Baby",
          rssi: -31,
          filteredRSSI: -31,
          distance: 2,
        },
      ]);
      setIsScanning(false);
    }, 0);
  };
  const startDigitProIDA = () => {
    socketRef.current?.emit("scan", <Data>{
      user_id: userId,
      data: { topic: "ble/start_digitproidanew", payload: "1" },
    });
  };

  const eventConnectDevice = (device: Devices) => {
    socketRef.current?.emit("connect_device", {
      user_id: userId,
      data: { topic: "ble/input", payload: device },
    });
  };

  const deleteDevice = (device_mac: string) => {
    socketRef.current?.emit("delete_device", <Data>{
      user_id: userId,
      data: { topic: "ble/delete_mac", payload: device_mac },
    });
  };

  useEffect(() => {
    startSocket(userId);

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
      }
    };
  }, []);

  return {
    startSocket,
    eventScan,
    startDigitProIDA,
    userId,
    devices,
    isScanning,
    eventConnectDevice,
    deleteDevice,
    dummyScan,
  };
};
