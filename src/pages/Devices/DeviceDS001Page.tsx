import DopplerChart from "@/components/charts/chart-digit-pro-baby-realtime";
import MainLayout from "../../components/layouts/main-layout";
import {
  Activity,
  ArrowLeft,
  AudioLines,
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  HeartPulse,
  Icon,
  PersonStanding,
  Thermometer,
  Weight,
} from "lucide-react";
import { PatientInfo } from "@/components/ui/patient-info";
import { ChartHeartPulse } from "@/components/chart-heart-pusle";

import nibpIcon from "@/assets/icons/nibp.png";
import spo2Icon from "@/assets/icons/spo2.png";
import respIcon from "@/assets/icons/resp.png";
import rrIcon from "@/assets/icons/lungs.png";

// import { HeartRateDoppler } from "@/components/ui/chart-doppler-realtime";
import { useEffect, useState } from "react";
import { Patients } from "@/models/PatientModel";
import { HistoryDS001 } from "@/components/tables/history-ds001";

const historiesData = [
  {
    timestamp: "2023-09-01 10:00:00",
    systolic: 120,
    diastolic: 80,
    map: 100,
    pulseRate: 60,
  },
  {
    timestamp: "2023-09-01 10:00:00",
    systolic: 120,
    diastolic: 80,
    map: 100,
    pulseRate: 60,
  },
  {
    timestamp: "2023-09-01 10:00:00",
    systolic: 120,
    diastolic: 80,
    map: 100,
    pulseRate: 60,
  },
  {
    timestamp: "2023-09-01 10:00:00",
    systolic: 120,
    diastolic: 80,
    map: 100,
    pulseRate: 60,
  },
  {
    timestamp: "2023-09-01 10:00:00",
    systolic: 120,
    diastolic: 80,
    map: 100,
    pulseRate: 60,
  },
  {
    timestamp: "2023-09-01 10:00:00",
    systolic: 120,
    diastolic: 80,
    map: 100,
    pulseRate: 60,
  },
  {
    timestamp: "2023-09-01 10:00:00",
    systolic: 120,
    diastolic: 80,
    map: 100,
    pulseRate: 60,
  },
];

const DeviceDS001Page = () => {
  const [patient, setPatient] = useState<Patients>({
    id: "",
    barcode_image: "",
    name: "",
    gender: "",
    address: "",
    phone: "",
    work: "",
    last_education: "",
    place_of_birth: "",
    date_of_birth: "",
    religion: "",
    height: 0,
    age: 0,
  });

  // Get patient from local storage
  useEffect(() => {
    const storedPatient = localStorage.getItem("patient");
    if (storedPatient) {
      setPatient(JSON.parse(storedPatient));
    }
  }, []);

  return (
    <MainLayout title="DS 001" state="Patient Monitor">
      <div className="flex flex-col gap-2 pb-5">
        <div className="w-full">
          <div className="w-full">
            <p className="font-bold text-2xl">Patient Info</p>
            <PatientInfo patient={patient} isPatientMonitor />
          </div>
        </div>
        <p className="font-bold text-2xl mt-4">Result</p>
        <div className="w-full flex flex-row gap-6 ">
          <div className="w-1/2 flex flex-col gap-4">
            <ChartHeartPulse className="h-full" />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <div className="flex flex-row gap-4 rounded-2xl">
              {/* NIBP */}
              <div className="bg-red-100 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-full h-full justify-between gap-2">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-3 items-center font-semibold">
                    <div className="bg-[#ededf9] text-red-600 rounded-xl p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                      <img src={nibpIcon} className="w-8 h-8" />
                    </div>
                    <p>NIBP</p>
                  </div>
                  <div className="flex flex-row items-end gap-4">
                    <div className="flex flex-row items-center text-6xl gap-2">
                      <p className="">120</p>/<p>80</p>
                    </div>
                    <p className="text-sm pb-2">mmHg</p>
                  </div>
                  <div className="ml-4 flex flex-row gap-4 mt-2">
                    <div className="flex flex-row w-fit text-white items-center gap-2 bg-red-400 px-3 py-1 rounded-full h-fit">
                      <Activity className="w-6 h-6" />
                      <p className="text-sm">310 bpm</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* PR */}
              <div className="bg-red-100 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-fit justify-between gap-2">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold mx-auto">PR</p>
                    <p className="mx-auto text-2xl flex justify-center items-center h-full">
                      80
                    </p>
                  </div>
                </div>
              </div>
              {/* TEMP */}
              <div className="bg-yellow-100 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-fit justify-between gap-2">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-3 items-center font-semibold">
                      <div className="bg-[#ededf9] text-yellow-500 rounded-xl p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                        <Thermometer className="w-8 h-8" />
                      </div>
                      <p>Temp</p>
                    </div>
                    <div className="flex flex-row items-end">
                      <div className="flex flex-row items-center justify-center text-6xl h-full px-4 py-2">
                        <p>80</p>
                      </div>
                      <p className="text-lg pb-4">°C</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-4 rounded-2xl mt-2">
              {/* SPO2 */}
              <div className="bg-blue-200 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-full h-full justify-between gap-2">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-3 items-center font-semibold">
                      <div className="bg-[#ededf9] text-blue-800 rounded-xl p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                        <img src={spo2Icon} className="w-8 h-8" />
                      </div>
                      <p>
                        Sp0<sub>2</sub>
                      </p>
                    </div>
                    <div className="flex flex-row items-end ">
                      <div className="flex flex-row items-center text-5xl px-4 py-2 rounded-4xl gap-2">
                        <p className="">120</p>
                      </div>
                      <p className="text-sm pb-4">%</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* RR - Sp02 */}
              <div className="bg-blue-200 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-1/3 h-fit justify-between gap-2">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-3 items-center font-semibold">
                      <div className="bg-[#ededf9] text-blue-800 rounded-xl p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                        <img src={respIcon} className="w-8 h-8" />
                      </div>
                      <p>
                        PR - Sp0<sub>2</sub>
                      </p>{" "}
                    </div>
                    <div className="flex flex-row items-end">
                      <div className="flex flex-row items-center text-5xl px-4 py-2 rounded-4xl">
                        <p>120</p>
                      </div>
                      <p className="text-sm pb-4">bpm</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* RR */}
              <div className="bg-green-200 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-1/3 h-fit justify-between gap-2">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-3 items-center font-semibold">
                      <div className="bg-[#ededf9] text-yellow-500 rounded-xl p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                        <img src={rrIcon} className="w-8 h-8" />
                      </div>
                      <p>RR</p>
                    </div>
                    <div className="flex flex-row items-end">
                      <div className="flex flex-row items-center text-5xl px-4 py-2 rounded-4xl">
                        <p>120</p>
                      </div>
                      <p className="text-sm pb-4">rpm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-2xl mt-4">
          <HistoryDS001 historiesData={historiesData.slice(0, 5)} />
        </div>
      </div>
    </MainLayout>
  );
};

export default DeviceDS001Page;
