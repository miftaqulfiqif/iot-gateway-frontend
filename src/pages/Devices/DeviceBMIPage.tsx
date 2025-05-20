import {
  ArrowLeft,
  ArrowLeftCircle,
  Icon,
  PersonStanding,
  Weight,
} from "lucide-react";
import MainLayout from "../../components/layouts/main-layout";
import { PatientInfo } from "@/components/ui/patient-info";
import { BMIResult } from "@/components/ui/bmi-result";
import weighingIcon from "@/assets/icons/weighing-white.png";
import bmiIcon from "@/assets/icons/bmi-white.png";
import { useSocketHandler } from "@/hooks/SocketHandler";

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
  weight: "87",
};
const baby = {
  name: "Alexandra Gustofano",
  gender: "male",
  place_of_birth: "Surabaya",
  date_of_birth: "2025-09-20 17:00:00.000",
};

const DeviceBMIPage = () => {
  const { startBmi, weightBMI } = useSocketHandler();

  return (
    <MainLayout title="BMI" state="Measurement">
      <div className="flex flex-col pb-40">
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

          <div className="w-1/2 flex flex-col justify-between">
            <p className="font-bold text-2xl">Result</p>
            <div className="w-full space-y-6 pt-3">
              <div className="flex flex-row gap-4">
                {/* Square 1 */}
                <div className="flex-1 aspect-square bg-gradient-to-t from-[#6e79f4] to-[#3062E5] rounded-2xl text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-col gap-3 p-5">
                  <div className="flex flex-row gap-3 items-center font-semibold">
                    <div className="bg-[#ededf9] text-blue-800 rounded-xl p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                      <PersonStanding className="w-6 h-6" />
                    </div>
                    <p>Weights</p>
                  </div>
                  <div className="aspect-square w-full border-2 rounded-full flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                      <img src={weighingIcon} alt="" className="w-15 h-15" />
                      <p className="bg-blue-400 px-6 py-2 rounded-full text-center w-fit text-4xl">
                        <span className="pr-2">
                          {weightBMI.bmiWeight ? weightBMI.bmiWeight : "--"}
                        </span>
                        kg
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 aspect-square bg-gradient-to-t from-[#6e79f4] to-[#3062E5] rounded-2xl text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-col gap-3 p-5">
                  <div className="flex flex-row gap-3 items-center font-semibold">
                    <div className="bg-[#ededf9] text-blue-800 rounded-xl p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                      <PersonStanding className="w-6 h-6" />
                    </div>
                    <p>BMI</p>
                  </div>
                  <div className="aspect-square w-full border-2 rounded-full flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                      <img src={bmiIcon} alt="" className="w-15 h-15" />
                      <p className="bg-blue-400 px-6 py-2 rounded-full text-center w-fit text-4xl">
                        <span className="pr-1">
                          {weightBMI.bmiWeight ? weightBMI.bmiWeight : "--"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <BMIResult />
            </div>
            <button
              className="flex flex-row items-center gap-2 bg-white w-fit font-bold px-5 py-2 rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] cursor-pointer"
              onClick={() =>
                startBmi(
                  parseInt(patient.weight),
                  parseInt(patient.age),
                  patient.gender
                )
              }
            >
              START
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DeviceBMIPage;
