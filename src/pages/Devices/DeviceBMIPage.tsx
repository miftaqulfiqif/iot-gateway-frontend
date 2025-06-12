import {
  ArrowLeft,
  ArrowLeftCircle,
  Icon,
  PersonStanding,
  Weight,
} from "lucide-react";
import MainLayout from "../../components/layouts/main-layout";
import { PatientInfo } from "@/components/ui/patient-info";
import { BMIResult } from "@/components/ui/bmi/bmi-result";
import weighingIcon from "@/assets/icons/weighing-white.png";
import bmiIcon from "@/assets/icons/bmi-white.png";
import { useSocketHandler } from "@/hooks/socket/SocketHandler";
import { useEffect, useState } from "react";
import { InputHeightModal } from "@/components/modals/input-height-modal";
import { Patients } from "@/models/PatientModel";
import { useParams } from "react-router-dom";
import { useToast } from "@/context/ToastContext";

const DeviceBMIPage = () => {
  const { mac } = useParams();
  const { weightBMI } = useSocketHandler({ macDevice: mac });

  const { showToast } = useToast();

  console.log("weightBMI", weightBMI);

  const [patient, setPatient] = useState(null);
  // Get patient from local storage
  useEffect(() => {
    const storedPatient = localStorage.getItem("patient");
    if (storedPatient) {
      setPatient(JSON.parse(storedPatient));
    }
  }, []);

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

          <div className="w-1/2 flex flex-col">
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
                          {weightBMI.weight ? weightBMI.weight : "--"}
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
                          {weightBMI.bmi ? weightBMI.bmi : "--"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {weightBMI.impedence !== 0 && (
                <BMIResult
                  BMI={weightBMI.bmi}
                  age={weightBMI.age}
                  bodyFat={weightBMI.bodyFat}
                  muscleMass={weightBMI.muscleMass}
                  water={weightBMI.water}
                  visceralFat={weightBMI.visceralFat}
                  boneMass={weightBMI.boneMass}
                  metabolism={weightBMI.metabolism}
                  protein={weightBMI.protein}
                  obesity={weightBMI.obesity}
                  bodyAge={weightBMI.bodyAge}
                  lbm={weightBMI.lbm}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {!patient?.height && (
        <InputHeightModal
          patientId={patient?.id}
          isActive={true}
          setPatient={setPatient}
        />
      )}
    </MainLayout>
  );
};

export default DeviceBMIPage;
