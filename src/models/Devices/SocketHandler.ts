import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Devices } from "../models/DeviceModel";
import { Data } from "../models/DataModel";
import { DigitProIDAModel } from "../models/Devices/DigitProIDAModel";
import { DopplerModel } from "@/models/Devices/DopplerModel";
import { DigitProBabyModel } from "@/models/Devices/DigitProBabyModel";

const userId = "UserTest";
const socketUrl = "http://localhost:3000";

export const useSocketHandler = () => {
  const socketRef = useRef<Socket | null>(null);
  const scanTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [devices, setDevices] = useState<Devices[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  //Digit Pro IDA
  const [weightDigitProIDA, setWeightDigitProIDA] = useState<
    DigitProIDAModel[]
  >([]);

  //Digit Pro Baby
  const [weightDigitProBaby, setWeightDigitProBaby] = useState<
    DigitProBabyModel[]
  >([]);

  //BMI
  const [weightBMI, setWeightBMI] = useState(0);

  //Doppler
  const [dataDoppler, setDataDoppler] = useState<DopplerModel[]>([]);

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

      //Digit Pro IDA
      socket.on(
        "listen_digitproida",
        (payload: { data_digitproida?: DigitProIDAModel[] }) => {
          if (
            payload?.data_digitproida &&
            Array.isArray(payload.data_digitproida)
          ) {
            console.log("DigitProIDA(s) received:", payload.data_digitproida);
            setWeightDigitProIDA(payload.data_digitproida);
          }
        }
      );

      //Digit Pro Baby
      socket.on("listen_digitprobaby", (payload: { weight?: number }) => {
        if (payload?.weight && Array.isArray(payload.weight)) {
          setWeightDigitProBaby(payload.weight);
        }
      });

      //BMI
      socket.on("listen_bmi", (payload: { bmiWeight?: number }) => {
        if (payload?.bmiWeight) {
          console.log("BMI(s) received:", payload.bmiWeight);
          setWeightBMI(payload.bmiWeight);
        }
      });

      //Doppler
      socket.on(
        "listen_doppler",
        (payload: { data_doppler?: DopplerModel }) => {
          if (payload?.data_doppler && Array.isArray(payload.data_doppler)) {
            console.log("Doppler(s) received:", payload.data_doppler);
            setDataDoppler(payload.data_doppler);
          }
        }
      );

      socketRef.current = socket;
    } catch (error) {
      console.error("❌ Error starting socket:", error);
    }
  };

  //Scan BLE
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
    }, 5000);
  };

  //Digit Pro Baby
  const eventStartDigitProBaby = () => {
    socketRef.current?.emit("scan", <Data>{
      user_id: userId,
      data: { topic: "ble/start_digitprobaby", payload: "1" },
    });
  };
  const eventStopDigitProBaby = () => {
    socketRef.current?.emit("stop_digit_pro_baby", <Data>{
      user_id: userId,
      data: { topic: "ble/stop_digitprobaby", payload: "1" },
    });
  };
  const eventTareDigitProBaby = () => {
    socketRef.current?.emit("tare_digit_pro_baby", <Data>{
      user_id: userId,
      data: { topic: "ble/tare_digitprobaby", payload: "1" },
    });
  };

  //Start Digit Pro IDA
  const startDigitProIDA = () => {
    socketRef.current?.emit("start_digit_pro_ida", <Data>{
      user_id: userId,
      data: { topic: "ble/start_digitproidanew", payload: "1" },
    });
  };

  //Doppler
  const startDoppler = () => {
    socketRef.current?.emit("start_doppler", <Data>{
      user_id: userId,
      data: { topic: "ble/start_doppler", payload: "1" },
    });
  };
  const stopDoppler = () => {
    socketRef.current?.emit("stop_doppler", <Data>{
      user_id: userId,
      data: { topic: "ble/stop_doppler", payload: "1" },
    });
  };

  //BMI
  const startBmi = () => {
    socketRef.current?.emit("start_bmi", <Data>{
      user_id: userId,
      data: {
        topic: "ble/start_bmi",
        payload: "1",
      },
    });
  };

  //Connect Device
  const eventConnectDevice = (device: Devices) => {
    socketRef.current?.emit("connect_device", {
      user_id: userId,
      data: { topic: "ble/input", payload: device },
    });
  };

  //Delete Device
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
    userId,
    devices,
    isScanning,
    eventConnectDevice,
    deleteDevice,
    dummyScan,

    //Digit Pro IDA
    startDigitProIDA,
    weightDigitProIDA,

    //Digit Pro Baby
    eventStartDigitProBaby,
    eventStopDigitProBaby,
    eventTareDigitProBaby,
    weightDigitProBaby,

    //BMI
    startBmi,
    weightBMI,

    //Doppler
    startDoppler,
    stopDoppler,
    dataDoppler,
  };
};
