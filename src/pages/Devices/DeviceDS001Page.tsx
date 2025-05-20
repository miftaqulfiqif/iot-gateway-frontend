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

import nibpIcon from "@/assets/icons/nibp.png";
import spo2Icon from "@/assets/icons/spo2.png";
import respIcon from "@/assets/icons/resp.png";
import rrIcon from "@/assets/icons/lungs.png";

import weighingIcon from "@/assets/icons/pediatrics.png";
import heartBeatImg from "@/assets/imgs/hear-beat.png";
import { HeartRateDoppler } from "@/components/ui/heart-rate-doppler";

const patient = {
  name: "Miftaqul Fiqi Firmansyah",
  age: "23",
  gender: "male",
  place_of_birth: "Surabaya",
  date_of_birth: "2001-09-20 17:00:00.000",
  address: "Jl. Kebon Jeruk, Surabaya",
  religion: "Islam",
  marital_status: "Single",
  education: "S1",
  work: "Mahasiswa",
  phone_number: "081234567890",
};
const baby = {
  name: "Alexandra Gustofano",
  gender: "male",
  place_of_birth: "Surabaya",
  date_of_birth: "2025-09-20 17:00:00.000",
};

const DeviceDS001Page = () => {
  return (
    <MainLayout title="DS 001" state="Measurement">
      <div className="flex flex-row h-full gap-6 ">
        <div className="w-1/2">
          <div className="w-full">
            <p className="font-bold text-2xl">Patient Info</p>
            <PatientInfo patient={patient} />
          </div>
        </div>

        <div className="w-1/2">
          <p className="font-bold text-2xl">Result</p>
          <div className="flex flex-col gap-2 pb-20">
            <div className="flex flex-row gap-4 rounded-2xl mt-2">
              {/* NIBP */}
              <div className="bg-red-100 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-full h-full justify-between gap-2">
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
                    <div className="ml-4 flex flex-row gap-4 mt-2">
                      <div className="flex flex-row w-fit text-white items-center gap-2 bg-red-400 px-3 py-1 rounded-full h-fit">
                        <Activity className="w-6 h-6" />
                        <p className="text-sm">310 bpm</p>
                      </div>
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
                    <div className="flex flex-row items-end">
                      <div className="flex flex-row items-center text-8xl px-4 py-2">
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
                      <div className="flex flex-row items-center text-7xl px-4 py-2 rounded-4xl gap-2">
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
                        RR - Sp0<sub>2</sub>
                      </p>{" "}
                    </div>
                    <div className="flex flex-row items-end">
                      <div className="flex flex-row items-center text-7xl px-4 py-2 rounded-4xl">
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
                      <div className="flex flex-row items-center text-7xl px-4 py-2 rounded-4xl">
                        <p>120</p>
                      </div>
                      <p className="text-sm pb-4">rpm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full space-y-6 pt-3 ">
              <HeartRateDoppler />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DeviceDS001Page;
