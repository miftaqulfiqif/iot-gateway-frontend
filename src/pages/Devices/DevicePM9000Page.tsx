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
import { babyPacifier } from "@lucide/lab";

import weighingIcon from "@/assets/icons/pediatrics.png";
import spo2Icon from "@/assets/icons/spo2.png";
import respIcon from "@/assets/icons/resp.png";
import nibpIcon from "@/assets/icons/nibp.png";

import heartBeatImg from "@/assets/imgs/hear-beat.png";
import { ChartHeartPulse } from "@/components/chart-heart-pusle";
import { HeartbeatChart } from "@/components/heart-beat-chart";
import { useEffect, useState } from "react";
import { Patients } from "@/models/PatientModel";
import ChartDopplerRealtime from "@/components/charts/chart-doppler-realtime";
import { data, useParams } from "react-router-dom";
import { useSocketHandler } from "@/hooks/socket/SocketHandler";

const chartData: { heart_rate: number }[] = [
  { heart_rate: 75 },
  { heart_rate: 80 },
  { heart_rate: 78 },
  { heart_rate: 82 },
  { heart_rate: 85 },
  { heart_rate: 79 },
  { heart_rate: 81 },
  { heart_rate: 77 },
  { heart_rate: 83 },
  { heart_rate: 80 },
];

const DevicePM9000Page = () => {
  const { ip } = useParams();
  const { dataPM9000, dataPM9000Nibp } = useSocketHandler({ ipDevice: ip });

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

  console.log(dataPM9000Nibp);

  return (
    <MainLayout title="PM 9000" state="Patient Monitor">
      <div className="flex flex-col h-full gap-6">
        <div className="w-full">
          <div className="w-full">
            <p className="font-bold text-2xl">Patient Info</p>
            <PatientInfo patient={patient} isPatientMonitor />
          </div>
        </div>

        {/* Result */}
        <div className="w-full">
          <p className="font-bold text-2xl">Result</p>
          <div className="flex flex-row gap-4">
            <div className="w-1/2 space-y-4 pt-3 ">
              <ChartDopplerRealtime chartData={chartData} />
              {/* <ChartHeartPulse className="h-96" />
              <HeartbeatChart className="h-64" /> */}
            </div>
            <div className="flex flex-col gap-4 pb-5 mt-3 w-1/2">
              <div className="flex flex-row gap-4 rounded-2xl ">
                {/* ECG */}
                <div className="bg-green-200 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-1/3 h-fit justify-between gap-2">
                  <div className="flex flex-row gap-2">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row gap-3 items-center font-semibold">
                        <div className="bg-[#ededf9] text-green-700 rounded-lg p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                          <Activity className="w-5 h-5" />
                        </div>
                        <p>ECG</p>
                      </div>
                      <div className="flex flex-row items-end">
                        <div className="flex flex-row items-center text-5xl px-4 py-2 rounded-4xl">
                          <p>
                            {dataPM9000?.ecg_bpm ? dataPM9000.ecg_bpm : "--"}
                          </p>
                        </div>
                        <p className="text-sm pb-4">rpm</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* SPO2 */}
                <div className="bg-blue-200 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-1/3 h-fit justify-between gap-2">
                  <div className="flex flex-row gap-2">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row gap-2 items-center">
                        <div className="flex flex-row gap-3 items-center font-semibold">
                          <div className="bg-[#ededf9] text-blue-800 rounded-lg p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                            <img src={spo2Icon} className="w-5 h-5" />
                          </div>
                          <p>
                            Sp0<sub>2</sub>
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row items-end ">
                        <div className="flex flex-row items-center text-5xl px-4 py-2 rounded-4xl gap-2">
                          <p className="">
                            {dataPM9000.ecg_bpm_spo2
                              ? dataPM9000.ecg_bpm_spo2
                              : "--"}
                          </p>
                        </div>
                        <p className="text-sm pb-4">%</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* RESP */}
                <div className="bg-blue-200 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-1/3 h-fit justify-between gap-2">
                  <div className="flex flex-row gap-2">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row gap-3 items-center font-semibold">
                        <div className="bg-[#ededf9] text-blue-800 rounded-lg p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                          <img src={respIcon} className="w-5 h-5" />
                        </div>
                        <p>RESP </p>
                      </div>
                      <div className="flex flex-row items-end">
                        <div className="flex flex-row items-center text-5xl px-4 py-2 rounded-4xl">
                          <p>{dataPM9000.resp ? dataPM9000.resp : "--"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-4 rounded-2xl">
                {/* NIBP */}
                <div className="bg-red-100 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-full justify-between gap-2">
                  <div className="flex flex-row gap-2 w-full">
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex flex-row gap-3 items-center font-semibold justify-between w-full">
                        <div className="flex flex-row items-center gap-4">
                          <div className="bg-[#ededf9] text-red-600 rounded-xl p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                            <img src={nibpIcon} className="w-8 h-8" />
                          </div>
                          <p>NIBP</p>
                        </div>
                        <div className="ml-4 flex flex-row gap-4">
                          <div className="flex flex-row w-fit text-white items-center gap-2 bg-red-400 px-3 py-1 rounded-full h-fit">
                            <Activity className="w-6 h-6" />
                            <p className="text-sm">
                              {dataPM9000Nibp.mean ? dataPM9000Nibp.mean : "--"}{" "}
                              bpm
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row items-end gap-4 mt-4">
                        <div className="flex flex-row items-center text-7xl gap-2">
                          <p className="">
                            {dataPM9000Nibp.systolic
                              ? dataPM9000Nibp.systolic
                              : "--"}
                          </p>
                          /
                          <p>
                            {" "}
                            {dataPM9000Nibp.diastolic
                              ? dataPM9000Nibp.diastolic
                              : "--"}
                          </p>
                        </div>
                        <p className="text-sm pb-2">mmHg</p>
                      </div>
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
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-row items-center gap-6">
                          <p className="w-8">T1</p>
                          <div className="flex flex-row items-end gap-1">
                            <p className="text-3xl w-14 text-end">
                              {dataPM9000.temp1 ? dataPM9000.temp1 : "--"}
                            </p>
                            <p className="text-sm pb-0.5">°C</p>
                          </div>
                        </div>
                        <div className="flex flex-row items-center gap-6">
                          <p className="w-8">T2</p>
                          <div className="flex flex-row items-end gap-1">
                            <p className="text-3xl w-14 text-end">
                              {" "}
                              {dataPM9000.temp2 ? dataPM9000.temp2 : "--"}
                            </p>
                            <p className="text-sm pb-0.5">°C</p>
                          </div>
                        </div>
                        <div className="flex flex-row items-center gap-6">
                          <p className="w-8">TD</p>
                          <div className="flex flex-row items-end gap-1">
                            <p className="text-3xl w-14 text-end">
                              {" "}
                              {dataPM9000.delta_temp
                                ? dataPM9000.delta_temp
                                : "--"}
                            </p>
                            <p className="text-sm pb-0.5">°C</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <ChartDopplerRealtime chartData={chartData} /> */}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DevicePM9000Page;
