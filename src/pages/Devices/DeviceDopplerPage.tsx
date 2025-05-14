import DopplerChart from "@/components/chart-doppler";
import MainLayout from "../../components/layouts/main-layout";
import {
  ArrowLeft,
  AudioLines,
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  HeartPulse,
  Icon,
  PersonStanding,
  Weight,
} from "lucide-react";
import { PatientInfo } from "@/components/ui/patient-info";
import { IdaChart } from "@/components/chart-ida";
import { babyPacifier } from "@lucide/lab";

import weighingIcon from "@/assets/icons/pediatrics.png";

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

const DeviceDopplerPage = () => {
  return (
    <MainLayout title="Doppler" state="Measurement">
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

        <div className="w-1/2 flex flex-col">
          <p className="font-bold text-2xl">Result</p>
          <div className="bg-[#3062E5] rounded-2xl text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row gap-10 p-8 w-full h-[200px] mt-3">
            <HeartPulse className="w-8 h-8" />
            <BatteryLow className="w-8 h-8" />
            <BatteryMedium className="w-8 h-8" />
            <BatteryFull className="w-8 h-8" />
            <AudioLines className="w-8 h-8" />
          </div>
          <div className="w-full max-w-[600px] space-y-6 pt-3 ">
            <DopplerChart />
            {/* <div className="flex flex-row gap-4">
              Square 1
              <div className="flex-1 aspect-square bg-[#3062E5] rounded-2xl text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-col justify-center items-center gap-3 p-5">
                <div className="aspect-square w-full border-2 rounded-full flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <Weight className="w-full h-full" />
                    <p className="bg-blue-400 px-4 rounded-full text-center w-20">
                      83 Kg
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <PersonStanding className="w-6 h-6" />
                  <p>Adult Weights</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DeviceDopplerPage;
