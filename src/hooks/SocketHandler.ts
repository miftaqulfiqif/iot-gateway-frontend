import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Devices } from "../models/DeviceModel";
import { Data } from "../models/DataModel";
import { DigitProIDAModel } from "../models/Devices/DigitProIDAModel";
import { DopplerModel } from "@/models/Devices/DopplerModel";
import { DigitProBabyModel } from "@/models/Devices/DigitProBabyModel";
import { BMIModel } from "@/models/Devices/BMIModel";

const userId = "UserTest";
const socketUrl = "http://localhost:3001";

export const useSocketHandler = () => {
  const socketRef = useRef<Socket | null>(null);
  const scanTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [devices, setDevices] = useState<Devices[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  //Digit Pro IDA
  const [weightDigitProIDA, setWeightDigitProIDA] = useState<DigitProIDAModel>({
    babyWeight: 0,
    adultWeight: 0,
  });

  //Digit Pro Baby
  const [weightDigitProBaby, setWeightDigitProBaby] =
    useState<DigitProBabyModel>({
      weight: 0,
    });

  //BMI
  const [weightBMI, setWeightBMI] = useState<BMIModel>({
    weight: 0,
    age: 0,
    bmi: 0,
    bodyFat: 0,
    muscleMass: 0,
    water: 0,
    visceralFat: 0,
    boneMass: 0,
    metabolism: 0,
    protein: 0,
    obesity: 0,
    bodyAge: 0,
    lbm: 0,
  });

  //Doppler
  const [dataDoppler, setDataDoppler] = useState<DopplerModel>({
    fhr: 0,
    soundQuality: "",
    batteryLevel: "",
  });

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
            setWeightDigitProIDA({
              babyWeight: payload.data_digitproida[0].babyWeight,
              adultWeight: payload.data_digitproida[0].adultWeight,
            });
          }
        }
      );

      //Digit Pro Baby
      socket.on(
        "listen_digitprobaby",
        (payload: { data_digitprobaby?: DigitProBabyModel[] }) => {
          console.log("DigitProBaby(s) received:", payload);
          if (
            payload?.data_digitprobaby &&
            Array.isArray(payload.data_digitprobaby)
          ) {
            setWeightDigitProBaby({
              weight: payload.data_digitprobaby[0].weight,
            });
          }
        }
      );

      //BMI
      socket.on("listen_bmi", (payload: { data_bmi?: BMIModel[] }) => {
        if (payload?.data_bmi && Array.isArray(payload.data_bmi)) {
          console.log("BMI(s) received:", payload.data_bmi);
          setWeightBMI({
            weight: payload.data_bmi[0].weight,
            age: payload.data_bmi[0].age,
            bmi: payload.data_bmi[0].bmi,
            bodyFat: payload.data_bmi[0].bodyFat,
            muscleMass: payload.data_bmi[0].muscleMass,
            water: payload.data_bmi[0].water,
            visceralFat: payload.data_bmi[0].visceralFat,
            boneMass: payload.data_bmi[0].boneMass,
            metabolism: payload.data_bmi[0].metabolism,
            protein: payload.data_bmi[0].protein,
            obesity: payload.data_bmi[0].obesity,
            bodyAge: payload.data_bmi[0].bodyAge,
            lbm: payload.data_bmi[0].lbm,
          });
        }
      });

      //Doppler
      socket.on(
        "listen_doppler",
        (payload: { data_doppler?: DopplerModel[] }) => {
          if (payload?.data_doppler && Array.isArray(payload.data_doppler)) {
            console.log("Doppler(s) received:", payload.data_doppler);
            setDataDoppler({
              fhr: payload.data_doppler[0].fhr,
              soundQuality: payload.data_doppler[0].soundQuality,
              batteryLevel: payload.data_doppler[0].batteryLevel,
            });
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
      data: {
        topic: "ble/start_doppler",
        payload: "1",
      },
    });
  };
  const stopDoppler = () => {
    socketRef.current?.emit("stop_doppler", <Data>{
      user_id: userId,
      data: { topic: "ble/stop_doppler", payload: "1" },
    });
  };

  //BMI
  const startBmi = (
    patientHeight: number,
    patientAge: number,
    patientGender: string
  ) => {
    socketRef.current?.emit("start_bmi", <Data>{
      user_id: userId,
      data: {
        topic: "ble/start_bmi",
        payload: "1",
        patient: {
          height: patientHeight,
          age: patientAge,
          gender: patientGender,
        },
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
