import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Devices } from "../../models/DeviceModel";
import { Data } from "../../models/DataModel";
import { DigitProIDAModel } from "../../models/Devices/DigitProIDAModel";
import { DopplerModel } from "@/models/Devices/DopplerModel";
import { DigitProBabyModel } from "@/models/Devices/DigitProBabyModel";
import { BMIModel } from "@/models/Devices/BMIModel";
import { useAuth } from "@/context/AuthContext";
import { PM9000Model } from "@/models/Devices/PM9000Model";

const { user } = useAuth();

// const userId = user?.gateway?.id || null;
const userId = "UserTest";
const socketUrl = import.meta.env.VITE_SOCKET_URL;

console.log("Socket URL : ", socketUrl);

interface Props {
  macDevice?: string;
  ipDevice?: string;
}

export const useSocketHandler = ({ macDevice, ipDevice }: Props = {}) => {
  const { user } = useAuth();

  const socketRef = useRef<Socket | null>(null);
  const scanTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [devices, setDevices] = useState<Devices[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  //Digit Pro IDA
  const [weightDigitProIDA, setWeightDigitProIDA] = useState<DigitProIDAModel>({
    weight_mother: 0,
    weight_child: 0,
  });
  const [weightDigitProIDARealtime, setWeightDigitProIDARealtime] = useState<
    {
      index: number;
      weight_mother: number;
      weight_child: number;
    }[]
  >([]);

  //Digit Pro Baby
  const [weightDigitProBaby, setWeightDigitProBaby] =
    useState<DigitProBabyModel>({
      mac: "",
      weight: 0,
    });
  const [weightDigitProBabyChartData, setWeightDigitProBabyChartData] =
    useState<{ index: number; weight: number }[]>([]);

  //BMI
  const [weightBMI, setWeightBMI] = useState<BMIModel>({
    weight: 0,
    age: 0,
    impedence: 0,
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
    heart_rate: 0,
    sound_quality: "",
    battery_level: 0,
  });
  const [dataDopplerChartData, setDataDopplerChartData] = useState<
    { index: number; heart_rate: number; heart_rate_avg: number }[]
  >([]);

  //PM9000
  const [dataPM9000, setDataPM9000] = useState<PM9000Model>({
    ecg_bpm: 0,
    ecg_bpm_spo2: 0,
    spo2: 0,
    resp: 0,
    temp1: 0,
    temp2: 0,
    delta_temp: 0,
  });
  const [dataPM9000Nibp, setDataPM9000Nibp] = useState({
    systolic: 0,
    diastolic: 0,
    mean: 0,
  });

  //DS001
  const [dataDS001, setDataDS001] = useState({
    systolic: 0,
    diastolic: 0,
    mean: 0,
    pulse_rate: 0,
    temp: 0,
    spo2: 0,
    pr_spo2: 0,
    rr: 0,
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

            const existingMacs = new Set(prevDevices.map((d) => d.id));
            const filteredNew = newDevices.filter(
              (d) => !existingMacs.has(d.id)
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
        "listen_digitproida_result",
        (payload: { data_digitproida?: DigitProIDAModel[] }) => {
          if (
            payload?.data_digitproida &&
            Array.isArray(payload.data_digitproida)
          ) {
            if (macDevice === payload.data_digitproida[0].mac) {
              console.log("DigitProIDA(s) received:", payload.data_digitproida);
              setWeightDigitProIDA({
                weight_mother: payload.data_digitproida[0].weight_mother,
                weight_child: payload.data_digitproida[0].weight_child,
              });
            }
          }
        }
      );
      socket.on(
        "listen_digitproida_realtime",
        (payload: { data_digitproida?: DigitProIDAModel[] }) => {
          if (
            payload?.data_digitproida &&
            Array.isArray(payload.data_digitproida)
          ) {
            const latest = payload.data_digitproida[0];

            if (macDevice === payload.data_digitproida[0].mac) {
              console.log("DigitProIDA(s) received:", payload.data_digitproida);
              setWeightDigitProIDARealtime((prev) => {
                const next = [
                  ...prev,
                  {
                    index: prev.length,
                    weight_mother: latest.weight_mother,
                    weight_child: latest.weight_child,
                  },
                ];
                return next.slice(-100);
              });
            }
          }
        }
      );

      //Digit Pro Baby
      socket.on(
        "listen_digitprobaby",
        (payload: { data_digitprobaby?: DigitProBabyModel[] }) => {
          if (
            payload?.data_digitprobaby &&
            Array.isArray(payload.data_digitprobaby)
          ) {
            if (macDevice === payload.data_digitprobaby[0].mac) {
              setWeightDigitProBaby({
                mac: payload.data_digitprobaby[0].mac,
                weight: payload.data_digitprobaby[0].weight,
              });
            }
          }
        }
      );
      socket.on(
        "listen_digitprobaby_realtime",
        (payload: { data_digitprobaby_realtime?: DigitProBabyModel[] }) => {
          if (
            payload?.data_digitprobaby_realtime &&
            Array.isArray(payload.data_digitprobaby_realtime)
          ) {
            const latest = payload.data_digitprobaby_realtime[0];

            if (latest.mac === macDevice) {
              setWeightDigitProBabyChartData((prev) => {
                const next = [
                  ...prev,
                  { index: prev.length, weight: latest.weight },
                ];
                return next.slice(-100); // Keep the last 100 entries
              });
            }
          }
        }
      );

      //BMI
      socket.on("listen_bmi", (payload: { data_bmi?: BMIModel[] }) => {
        if (payload?.data_bmi && Array.isArray(payload.data_bmi)) {
          console.log("BMI(s) received:", payload);

          try {
            const patient = JSON.parse(localStorage.getItem("patient") || "{}");
            const height = patient.height || 0;
            const age = patient.age || 0;
            const gender = patient.gender || "";
            const impedence = payload.data_bmi[0].impedence;
            const bmiWeight = payload.data_bmi[0].weight;

            const bmiData = calculateHealthMetrics({
              height,
              age,
              gender,
              bmiWeight,
              impedence,
            });

            console.log("BMI DATA : ", macDevice);

            const latest = payload.data_bmi[0];

            if (latest.mac === macDevice) {
              const newBMI = {
                weight: bmiData.weight,
                age: bmiData.age,
                impedence: bmiData.impedence,
                bmi: bmiData.bmi,
                bodyFat: bmiData.bodyFat,
                muscleMass: bmiData.muscleMass,
                water: bmiData.water,
                visceralFat: bmiData.visceralFat,
                boneMass: bmiData.boneMass,
                metabolism: bmiData.metabolism,
                protein: bmiData.protein,
                obesity: bmiData.obesity,
                bodyAge: bmiData.bodyAge,
                lbm: bmiData.lbm,
              };

              setWeightBMI((prev) => {
                const isEqual = JSON.stringify(prev) === JSON.stringify(newBMI);
                return isEqual ? prev : newBMI;
              });
            }
          } catch (error) {
            console.error("Error calculating BMI:", error);
          }
        }
      });

      //Doppler
      socket.on(
        "listen_doppler",
        (payload: { data_doppler?: DopplerModel[] }) => {
          if (payload?.data_doppler && Array.isArray(payload.data_doppler)) {
            const latest = payload.data_doppler[0];
            if (latest.mac === macDevice) {
              setDataDoppler({
                heart_rate: payload.data_doppler[0].heart_rate,
                sound_quality: payload.data_doppler[0].sound_quality,
                battery_level: payload.data_doppler[0].battery_level,
              });
              setDataDopplerChartData((prev) => {
                //Calucate heart rate average
                let heartRateSum = 0;
                let heartRateCount = 0;
                prev.forEach((entry) => {
                  heartRateSum += entry.heart_rate;
                  heartRateCount += 1;
                });
                const heartRateAvg =
                  heartRateCount > 0 ? heartRateSum / heartRateCount : 0;

                const next = [
                  ...prev,
                  {
                    index: prev.length,
                    heart_rate: latest.heart_rate,
                    heart_rate_avg: parseFloat(heartRateAvg.toFixed(1)),
                  },
                ];
                // return next.slice(-100); // Keep the last 100 entries
                return next; // Keep the last 100 entries
              });
            }
          }
        }
      );

      //PM-9000
      socket.on("listen_pm9000", (payload: { data_pm9000?: PM9000Model[] }) => {
        if (payload?.data_pm9000 && Array.isArray(payload.data_pm9000)) {
          const latest = payload.data_pm9000[0];
          if (latest.ip === ipDevice) {
            setDataPM9000({
              ecg_bpm: latest.ecg_bpm,
              ecg_bpm_spo2: latest.ecg_bpm_spo2,
              spo2: latest.spo2,
              resp: latest.resp,
              temp1: latest.temp1,
              temp2: latest.temp2,
              delta_temp: latest.delta_temp,
            });
          }
        }
      });
      socket.on("listen_pm9000_nibp", (payload: { data_pm9000_nibp?: any }) => {
        if (
          payload?.data_pm9000_nibp &&
          Array.isArray(payload.data_pm9000_nibp)
        ) {
          const latest = payload.data_pm9000_nibp[0];
          if (latest.ip === ipDevice) {
            setDataPM9000Nibp({
              systolic: latest.systolic,
              diastolic: latest.diastolic,
              mean: latest.mean,
            });
          }
        }
      });

      // DS-001
      socket.on("listen_ds001", (payload: { data_ds001?: any }) => {
        if (payload?.data_ds001 && Array.isArray(payload.data_ds001)) {
          const latest = payload.data_ds001[0];
          if (latest.mac === macDevice) {
            setDataDS001({
              systolic: latest.systolic,
              diastolic: latest.diastolic,
              mean: latest.mean,
              pulse_rate: latest.pulse_rate,
              temp: latest.temp,
              spo2: latest.spo2,
              pr_spo2: latest.pr_spo2,
              rr: latest.rr,
            });
          }
        }
      });

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
      data: { topic: "iotgateway/{id-unik}/bluetooth/scan", payload: "start" },
    });
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
      data: {
        topic: "iotgateway/{id-unik}/bluetooth/digitpro_baby_tare",
        payload: "tare",
      },
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
  const eventConnectDevice = (displayName: string, device: Devices) => {
    socketRef.current?.emit("connect_device", {
      user_id: userId,
      hospital_id: user?.hospital?.id,
      display_name: displayName,
      data: {
        topic: "iotgateway/{id-unik}/bluetooth/add_device",
        payload: device,
      },
    });
  };
  const eventConnectDeviceByIP = (
    displayName: string,
    ip: string,
    device: string,
    device_function: string,
    connection: string,
    type: string
  ) => {
    socketRef.current?.emit("connect_device_tcpip", {
      user_id: userId,
      hospital_id: user?.hospital?.id,
      display_name: displayName,
      data: {
        topic: "iotgateway/{id-unik}/tcpip/add_device",
        payload: {
          ip,
          device,
          device_function,
          connection,
          type,
        },
      },
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
    startSocket(userId!);

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
    eventConnectDeviceByIP,
    deleteDevice,

    //Digit Pro IDA
    startDigitProIDA,
    weightDigitProIDA,

    //Digit Pro Baby
    eventStartDigitProBaby,
    eventStopDigitProBaby,
    eventTareDigitProBaby,
    weightDigitProBaby,
    weightDigitProBabyChartData,

    //BMI
    startBmi,
    weightBMI,
    setWeightBMI,

    //Doppler
    startDoppler,
    stopDoppler,
    dataDoppler,
    dataDopplerChartData,

    //PM-9000
    dataPM9000,
    dataPM9000Nibp,

    //DS-001
    dataDS001,
  };
};

function calculateAvgHeartRateDoppler(heart_rate: number[]) {
  return heart_rate.reduce((a, b) => a + b, 0) / heart_rate.length;
}

export function calculateHealthMetrics(data: any) {
  const { height, age, gender, bmiWeight, impedence } = data;

  const heightM = height / 100;

  const isMale = gender.toLowerCase() === "male";

  const BMI = bmiWeight / (heightM * heightM);

  // Estimasi menggunakan rumus dasar atau pendekatan umum
  const bodyFat = isMale
    ? 1.2 * BMI + 0.23 * age - 16.2
    : 1.2 * BMI + 0.23 * age - 5.4;

  const muscleMass = isMale
    ? bmiWeight * 0.8 - (bodyFat * bmiWeight) / 100
    : bmiWeight * 0.75 - (bodyFat * bmiWeight) / 100;

  const waterPercentage = isMale ? 0.6 : 0.5;
  const water = bmiWeight * waterPercentage;

  const visceralFat = Math.max(1, Math.min(30, bodyFat / 2 - age / 20));

  const boneMass = isMale ? bmiWeight * 0.045 : bmiWeight * 0.035;

  const bmr = isMale
    ? 88.36 + 13.4 * bmiWeight + 4.8 * height - 5.7 * age
    : 447.6 + 9.2 * bmiWeight + 3.1 * height - 4.3 * age;

  const protein = bmiWeight * 0.16; // gram

  const obesity = (bodyFat / 40) * 100; // % estimasi dari max fat 40%
  const bodyAge = age + (BMI - 22) * 0.5;
  const lbm = bmiWeight - (bmiWeight * bodyFat) / 100;

  return {
    age: age,
    impedence: impedence,
    bmi: parseFloat(BMI.toFixed(1)),
    weight: parseFloat(bmiWeight.toFixed(1)),
    bodyFat: parseFloat(bodyFat.toFixed(1)),
    muscleMass: parseFloat(muscleMass.toFixed(1)),
    water: parseFloat(water.toFixed(1)),
    visceralFat: parseFloat(visceralFat.toFixed(1)),
    boneMass: parseFloat(boneMass.toFixed(1)),
    metabolism: parseFloat(bmr.toFixed(0)),
    protein: parseFloat(protein.toFixed(1)),
    obesity: parseFloat(obesity.toFixed(1)),
    bodyAge: parseFloat(bodyAge.toFixed(1)),
    lbm: parseFloat(lbm.toFixed(1)),
  };
}
