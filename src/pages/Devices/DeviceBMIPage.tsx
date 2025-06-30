import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowLeftCircle,
  Icon,
  PersonStanding,
  RotateCcw,
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
import { useParams } from "react-router-dom";
import { useToast } from "@/context/ToastContext";
import { HistoryBMI } from "@/components/tables/history-bmi";
import { InputSelect } from "@/components/ui/input-select";
import HistoriesDigitProBMI from "@/components/charts/chart-histories-digitpro-bmi";
import { InputMultiSelect } from "@/components/ui/input-multi-select";

const historiesData = [
  {
    weight: 65.4,
    bmi: 23.2,
    age: 25,
    bodyFat: 18.5,
    muscleMass: 38.2,
    water: 55.0,
    visceralFat: 7,
    boneMass: 2.8,
    metabolism: 1420,
    protein: 15.3,
    obesity: 12.1,
    bodyAge: 24,
    lbm: 54.2,
    timestamp: "2025-06-01 08:15:00",
  },
  {
    weight: 66.0,
    bmi: 23.5,
    age: 25,
    bodyFat: 18.7,
    muscleMass: 38.5,
    water: 55.3,
    visceralFat: 7,
    boneMass: 2.8,
    metabolism: 1430,
    protein: 15.4,
    obesity: 12.3,
    bodyAge: 24,
    lbm: 54.6,
    timestamp: "2025-06-02 08:15:00",
  },
  {
    weight: 66.3,
    bmi: 23.6,
    age: 25,
    bodyFat: 18.9,
    muscleMass: 38.6,
    water: 55.5,
    visceralFat: 7,
    boneMass: 2.9,
    metabolism: 1435,
    protein: 15.6,
    obesity: 12.5,
    bodyAge: 24,
    lbm: 54.9,
    timestamp: "2025-06-03 08:15:00",
  },
  {
    weight: 66.5,
    bmi: 23.7,
    age: 25,
    bodyFat: 19.0,
    muscleMass: 38.8,
    water: 55.7,
    visceralFat: 7,
    boneMass: 2.9,
    metabolism: 1440,
    protein: 15.7,
    obesity: 12.7,
    bodyAge: 25,
    lbm: 55.1,
    timestamp: "2025-06-04 08:15:00",
  },
  {
    weight: 67.0,
    bmi: 24.0,
    age: 25,
    bodyFat: 19.3,
    muscleMass: 39.0,
    water: 56.0,
    visceralFat: 8,
    boneMass: 3.0,
    metabolism: 1450,
    protein: 15.9,
    obesity: 13.0,
    bodyAge: 25,
    lbm: 55.4,
    timestamp: "2025-06-05 08:15:00",
  },
  {
    weight: 67.4,
    bmi: 24.2,
    age: 25,
    bodyFat: 19.6,
    muscleMass: 39.2,
    water: 56.3,
    visceralFat: 8,
    boneMass: 3.0,
    metabolism: 1455,
    protein: 16.0,
    obesity: 13.2,
    bodyAge: 25,
    lbm: 55.7,
    timestamp: "2025-06-06 08:15:00",
  },
  {
    weight: 67.8,
    bmi: 24.5,
    age: 25,
    bodyFat: 19.9,
    muscleMass: 39.4,
    water: 56.5,
    visceralFat: 8,
    boneMass: 3.1,
    metabolism: 1460,
    protein: 16.2,
    obesity: 13.4,
    bodyAge: 26,
    lbm: 56.0,
    timestamp: "2025-06-07 08:15:00",
  },
  {
    weight: 68.0,
    bmi: 24.7,
    age: 25,
    bodyFat: 20.1,
    muscleMass: 39.5,
    water: 56.7,
    visceralFat: 9,
    boneMass: 3.1,
    metabolism: 1465,
    protein: 16.3,
    obesity: 13.6,
    bodyAge: 26,
    lbm: 56.2,
    timestamp: "2025-06-08 08:15:00",
  },
  {
    weight: 68.0,
    bmi: 24.7,
    age: 25,
    bodyFat: 20.1,
    muscleMass: 39.5,
    water: 56.7,
    visceralFat: 9,
    boneMass: 3.1,
    metabolism: 1465,
    protein: 16.3,
    obesity: 13.6,
    bodyAge: 26,
    lbm: 56.2,
    timestamp: "2025-06-08 08:15:00",
  },
  {
    weight: 68.0,
    bmi: 24.7,
    age: 25,
    bodyFat: 20.1,
    muscleMass: 39.5,
    water: 56.7,
    visceralFat: 9,
    boneMass: 3.1,
    metabolism: 1465,
    protein: 16.3,
    obesity: 13.6,
    bodyAge: 26,
    lbm: 56.2,
    timestamp: "2025-06-08 08:15:00",
  },
];

const DeviceBMIPage = () => {
  const { mac } = useParams();
  const { weightBMI, setWeightBMI } = useSocketHandler({ macDevice: mac });

  const [variabel, setVariabel] = useState<string[]>([]);
  const [showHistories, setShowHistories] = useState(false);
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
      <div className="flex flex-col">
        <div className="flex flex-row gap-6">
          <div className="w-1/2">
            <div className="w-full">
              <p className="font-bold text-2xl">Patient Info</p>
              <PatientInfo
                patient={patient}
                setShowHistories={setShowHistories}
              />
              {showHistories && (
                <div className="overflow-x-auto mt-6 rounded-2xl shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                  <div className="flex justify-end mb-2">
                    <div className="w-fit">
                      <InputMultiSelect
                        name="histories"
                        placeholder="Select variable"
                        option={[
                          { value: "weight", label: "Weight" },
                          { value: "bmi", label: "BMI" },
                          { value: "bodyFat", label: "Body Fat" },
                          { value: "muscleMass", label: "Muscle Mass" },
                          { value: "water", label: "Water" },
                          { value: "visceralFat", label: "Visceral Fat" },
                          { value: "boneMass", label: "Bone Mass" },
                          { value: "metabolism", label: "Metabolism" },
                          { value: "protein", label: "Protein" },
                          { value: "obesity", label: "Obesity" },
                          { value: "bodyAge", label: "Body Age" },
                          { value: "lbm", label: "LBM" },
                        ]}
                        onChange={(e) => setVariabel(e)}
                        value={variabel}
                      />
                    </div>
                  </div>
                  <HistoryBMI historiesData={historiesData.slice(0, 10)} />
                  {variabel.length > 0 && (
                    <HistoriesDigitProBMI
                      chartData={historiesData.slice(0, 10)}
                      selectedVariables={variabel}
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="w-1/2">
            <p className="font-bold text-2xl">Result</p>
            <div className="flex flex-col gap-4 w-full pt-3 h-full">
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
              <div className="flex flex-row gap-2 items-center">
                <div
                  className="flex flex-row border-2 bg-white border-[#3062E5] text-[#3062E5] w-[250px] items-center mx-auto px-6 py-2 font-bold rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] text-2xl cursor-pointer"
                  onClick={() =>
                    setWeightBMI({
                      ...weightBMI,
                      weight: 0,
                      impedence: 0,
                      bmi: 0,
                    })
                  }
                >
                  <div className="flex flex-row gap-3 mx-auto items-center">
                    <RotateCcw />
                    <p>Reset</p>
                  </div>
                </div>
                <div
                  className="flex flex-row border-2 bg-white border-[#09d03e] text-[#09d03e] w-[250px] items-center mx-auto px-6 py-2 font-bold rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] text-2xl cursor-pointer"
                  onClick={() => alert("save")}
                >
                  <div className="flex flex-row gap-3 mx-auto items-center">
                    <ArrowDownToLine />
                    <p>Save</p>
                  </div>
                </div>
              </div>
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
