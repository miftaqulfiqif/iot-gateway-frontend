import DopplerChart from "@/components/chart-doppler";
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
import { IdaChart } from "@/components/chart-ida";
import { babyPacifier } from "@lucide/lab";

import weighingIcon from "@/assets/icons/pediatrics.png";
import spo2Icon from "@/assets/icons/spo2.png";
import respIcon from "@/assets/icons/resp.png";
import nibpIcon from "@/assets/icons/nibp.png";

import heartBeatImg from "@/assets/imgs/hear-beat.png";
import { HeartRateDoppler } from "@/components/ui/heart-rate-doppler";
import { ChartHeartPulse } from "@/components/chart-heart-pusle";
import { HeartbeatChart } from "@/components/heart-beat-chart";
import { useEffect, useState } from "react";
import { Patients } from "@/models/PatientModel";

const DevicePM9000Page = () => {
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
    weight: 0,
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
    <MainLayout title="PM 9000" state="Measurement">
      <div className="flex flex-row h-full gap-6 ">
        <div className="w-1/2">
          {/* <div
              className="flex flex-row items-center gap-2 bg-white w-fit font-bold px-5 py-2 rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] cursor-pointer"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              <ArrowLeft />
              <p>Back</p>
            </div> */}
          <div className="w-full">
            <p className="font-bold text-2xl">Patient Info</p>
            <PatientInfo patient={patient} />
          </div>
        </div>

        <div className="w-1/2">
          <p className="font-bold text-2xl">Result</p>
          <div className="flex flex-col gap-4 pb-20 mt-3">
            <div className="flex flex-row gap-4 rounded-2xl ">
              {/* ECG */}
              <div className="bg-green-200 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-full justify-between gap-2">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-3 items-center font-semibold">
                      <div className="bg-[#ededf9] text-green-700 rounded-xl p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                        <Activity className="w-8 h-8" />
                      </div>
                      <p>ECG</p>
                    </div>
                    <div className="flex flex-row items-end">
                      <div className="flex flex-row items-center text-6xl px-4 py-2 rounded-4xl">
                        <p>120</p>
                      </div>
                      <p className="text-sm pb-4">rpm</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* SPO2 */}
              <div className="bg-blue-200 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-1/3 justify-between gap-2">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2 items-center">
                      <div className="flex flex-row gap-3 items-center font-semibold">
                        <div className="bg-[#ededf9] text-blue-800 rounded-xl p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                          <img src={spo2Icon} className="w-8 h-8" />
                        </div>
                        <p>
                          Sp0<sub>2</sub>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row items-end ">
                      <div className="flex flex-row items-center text-6xl px-4 py-2 rounded-4xl gap-2">
                        <p className="">120</p>
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
                      <div className="bg-[#ededf9] text-blue-800 rounded-xl p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                        <img src={respIcon} className="w-8 h-8" />
                      </div>
                      <p>RESP </p>
                    </div>
                    <div className="flex flex-row items-end">
                      <div className="flex flex-row items-center text-6xl px-4 py-2 rounded-4xl">
                        <p>120</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-4 rounded-2xl">
              {/* NIBP */}
              <div className="bg-red-100 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-full justify-between gap-2">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-3 items-center font-semibold">
                      <div className="bg-[#ededf9] text-red-600 rounded-xl p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                        <img src={nibpIcon} className="w-8 h-8" />
                      </div>
                      <p>NIBP</p>
                    </div>
                    <div className="flex flex-row items-end gap-4">
                      <div className="flex flex-row items-center text-7xl gap-2">
                        <p className="">120</p>/<p>80</p>
                      </div>
                      <p className="text-sm pb-2">mmHg</p>
                    </div>
                    <div className="ml-4 flex flex-row gap-4">
                      <div className="flex flex-row w-fit text-white items-center gap-2 bg-red-400 px-3 py-1 rounded-full h-fit">
                        <Activity className="w-6 h-6" />
                        <p className="text-sm">310 bpm</p>
                      </div>
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
                          <p className="text-3xl w-14 text-end">80</p>
                          <p className="text-sm pb-0.5">°C</p>
                        </div>
                      </div>
                      <div className="flex flex-row items-center gap-6">
                        <p className="w-8">T2</p>
                        <div className="flex flex-row items-end gap-1">
                          <p className="text-3xl w-14 text-end">80</p>
                          <p className="text-sm pb-0.5">°C</p>
                        </div>
                      </div>
                      <div className="flex flex-row items-center gap-6">
                        <p className="w-8">TD</p>
                        <div className="flex flex-row items-end gap-1">
                          <p className="text-3xl w-14 text-end">80</p>
                          <p className="text-sm pb-0.5">°C</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full space-y-6 pt-3 ">
              <HeartRateDoppler />
              <ChartHeartPulse />
              <HeartbeatChart />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DevicePM9000Page;
