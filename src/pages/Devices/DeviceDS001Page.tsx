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
import { HeartPulseChart } from "@/components/chart-heart-pusle";

import nibpIcon from "@/assets/icons/nibp.png";
import spo2Icon from "@/assets/icons/spo2.png";
import prSpo2Icon from "@/assets/icons/resp.png";
import prIcon from "@/assets/icons/pr-red.png";
import rrIcon from "@/assets/icons/lungs.png";

// import { HeartRateDoppler } from "@/components/ui/chart-doppler-realtime";
import { useEffect, useState } from "react";
import { Patients } from "@/models/PatientModel";
import { HistoryDS001 } from "@/components/tables/history-ds001";
import { useSocketHandler } from "@/hooks/socket/SocketHandler";
import { useParams } from "react-router-dom";

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
  const { ip } = useParams();
  const { dataDS001 } = useSocketHandler({ ipDevice: ip });
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

  console.log("dataDS001 : ", dataDS001);

  return (
    <MainLayout title="DS 001" state="Patient Monitor">
      <div className="flex flex-col gap-2 pb-5">
        <div className="w-full flex flex-row gap-6 ">
          <div className="w-1/2 h-full flex flex-col">
            <p className="font-semibold text-xl">Patient Info</p>
            <PatientInfo patient={patient} isPatientMonitor />
            <p className="text-xl mt-7">History NIBP</p>
            <div className="shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-2xl mt-2">
              <HistoryDS001 historiesData={historiesData.slice(0, 8)} />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <p className="text-xl"> Realtime Chart</p>

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
                    <div className="flex flex-row items-center text-6xl gap-2 pl-6">
                      <p className="">
                        {dataDS001?.systolic ? dataDS001.systolic : "--"}
                      </p>
                      /
                      <p>{dataDS001?.diastolic ? dataDS001.diastolic : "--"}</p>
                    </div>
                    <p className="text-lg pb-2">mmHg</p>
                  </div>
                  <div className="ml-4 flex flex-row gap-4 mt-2">
                    <div className="flex flex-row w-fit text-white items-center gap-2 bg-red-400 px-3 py-1 rounded-full h-fit">
                      <Activity className="w-6 h-6" />
                      <p className="text-sm">
                        {dataDS001?.mean ? dataDS001.mean : "--"} bpm
                      </p>
                    </div>
                    <div className="flex flex-row w-fit text-red-900 items-center gap-2 bg-red-300 px-3 py-1 rounded-full h-fit">
                      <img src={prIcon} alt="" className="w-6 h-6" />
                      <p className="text-sm">
                        {dataDS001?.pulse_rate ? dataDS001.pulse_rate : "-- "}
                        bpm
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-1/3 h-full  bg-white text-red-700 rounded-2xl shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)] p-4">
                  <div className="flex flex-row justify-center gap-4 items-center">
                    <img src={prIcon} alt="" className="w-6 h-6" />
                    <p className=" font-bold text-xl">PR</p>
                  </div>
                  <div className="flex h-2/3 items-end justify-self-center">
                    <p className="text-7xl">
                      {dataDS001?.pulse_rate ? dataDS001.pulse_rate : "99"}
                    </p>
                    <p>bpm</p>
                  </div>
                </div>
              </div>

              {/* TEMP */}
              <div className="bg-yellow-100 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-1/3 justify-between gap-2">
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
                        <p>{dataDS001?.temp ? dataDS001.temp : "--"}</p>
                      </div>
                      <p className="text-lg pb-4">°C</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-4 rounded-2xl mt-2">
              {/* SPO2 */}
              <div className="bg-blue-200 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-1/3 h-full justify-between gap-2">
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
                        <p className="">
                          {dataDS001?.spo2 ? dataDS001.spo2 : "--"}
                        </p>
                      </div>
                      <p className="text-lg pb-4">%</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* PR - Sp02 */}
              <div className="bg-blue-200 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-1/3 h-fit justify-between gap-2">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-3 items-center font-semibold">
                      <div className="bg-[#ededf9] text-blue-800 rounded-xl p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                        <img src={prSpo2Icon} className="w-8 h-8" />
                      </div>
                      <p>
                        PR - Sp0<sub>2</sub>
                      </p>{" "}
                    </div>
                    <div className="flex flex-row items-end">
                      <div className="flex flex-row items-center text-5xl px-4 py-2 rounded-4xl">
                        <p>{dataDS001?.pr_spo2 ? dataDS001.pr_spo2 : "--"}</p>
                      </div>
                      <p className="text-lg pb-4">bpm</p>
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
                        <p>{dataDS001?.rr ? dataDS001.rr : "--"}</p>
                      </div>
                      <p className="text-lg pb-4">rpm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <HeartPulseChart className="h-84 mt-2" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DeviceDS001Page;
