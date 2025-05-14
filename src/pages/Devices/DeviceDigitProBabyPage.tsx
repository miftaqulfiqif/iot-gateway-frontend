import { ArrowLeft, Icon } from "lucide-react";
import { PersonStanding, Weight } from "lucide-react";
import { babyPacifier } from "@lucide/lab";
import MainLayout from "../../components/layouts/main-layout";
import DopplerChart from "@/components/chart-doppler";
import { PatientInfo } from "@/components/ui/patient-info";
import { IdaChart } from "@/components/chart-ida";

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

const DeviceDigitProBabyPage = () => {
  return (
    <MainLayout title="Digit Pro Baby" state="Measurement">
      <div className="flex flex-col">
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
              <PatientInfo patient={patient} baby={baby} />
            </div>
          </div>

          <div className="w-1/2 flex flex-col">
            <p className="font-bold text-2xl">Result</p>
            <div className="w-full max-w-[600px] space-y-6 pt-3">
              <div className="bg-[#3062E5] rounded-2xl text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row gap-10 p-8 w-full h-[200px]">
                <div className="aspect-square border-2 rounded-full flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <img src={weighingIcon} alt="" className="w-16 h-16" />
                  </div>
                </div>
                <div className="flex flex-col gap-6 my-auto">
                  <div className="flex flex-row items-center gap-2">
                    <Icon iconNode={babyPacifier} className="w-10 h-10" />
                    <p className="text-2xl">Baby Weights</p>
                  </div>
                  <p className="bg-blue-400 px-4 py-2 rounded-full text-center text-3xl">
                    3 Kg
                  </p>
                </div>
              </div>
              <DopplerChart />
              <div className="border-2 bg-white border-[#3062E5] text-[#3062E5] w-40 text-center mx-auto px-5 py-2 font-bold rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] text-2xl cursor-pointer">
                <p>TARE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DeviceDigitProBabyPage;
