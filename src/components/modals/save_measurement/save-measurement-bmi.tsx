import { useState } from "react";
import { Bluetooth, EthernetPort, Key, LandPlot, Wifi } from "lucide-react";
import { PatientInfo } from "../../ui/patient-info";
import { InputText } from "../../ui/input-text";
import { formatDate } from "date-fns";
import { useToast } from "@/context/ToastContext";
import { BMIModel } from "@/models/Devices/BMIModel";

const ResultItem = ({
  label,
  value,
  unit,
}: {
  label: string;
  value?: number;
  unit?: string;
}) => (
  <div className="flex flex-col bg-gray-100 p-3 rounded-lg">
    <span className="text-xs text-gray-500">{label}</span>
    <span className="text-base font-semibold">
      {value !== undefined && value !== null ? `${value} ${unit ?? ""}` : "--"}
    </span>
  </div>
);

type Props = {
  isActive: boolean;
  setInactive: () => void;
  patient: any;
  result: BMIModel;
};

export const SaveMeasurementBMI = ({
  isActive,
  setInactive,
  patient,
  result,
}: Props) => {
  const { showToast } = useToast();

  const [note, setNote] = useState("");

  const handleSave = () => {
    setInactive();
    showToast(null, "Measurement saved successfully", "success");
  };

  return (
    <div
      onClick={setInactive}
      className={`fixed top-0 left-0 w-full h-full bg-transparent bg-opacity-50 z-40 transition-opacity duration-300 ${
        isActive ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ backdropFilter: "blur(5px)", background: "rgba(0, 0, 0, 0.2)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-1/2 left-1/2 transform bg-white rounded-xl p-8 z-50 w-2xl h-fit transition-all duration-300 ease-in-out
        ${
          isActive
            ? "opacity-100 scale-100 translate-x-[-50%] translate-y-[-50%]"
            : "opacity-0 scale-95 translate-x-[-50%] translate-y-[-40%]"
        }
      `}
      >
        <p className="font-semibold text-xl mb-2">Save Measurement</p>
        <div className="flex flex-col gap-3">
          {/* Patient Info */}
          <p>Patient info : </p>
          <div className="flex flex-col gap-2 w-full rounded-lg p-4  bg-gradient-to-b from-[#4956F4] to-[#6e79f4] text-white">
            <div className="flex justify-between">
              <p>Patient ID</p>
              <p className="font-semibold">{patient?.id}</p>
            </div>
            <div className="flex justify-between">
              <p>Name</p>
              <p className="font-semibold">{patient?.name}</p>
            </div>
            <div className="flex justify-between">
              <p>Date of Birth</p>
              <p className="font-semibold">
                {patient?.date_of_birth
                  ? formatDate(new Date(patient.date_of_birth), "dd MMMM yyyy")
                  : ""}
              </p>
            </div>
          </div>

          {/* Result */}
          {/* Result */}
          <div>
            <p className="text-gray-700 font-semibold mb-1">Result:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <ResultItem label="Weight" value={result?.weight} unit="kg" />
              <ResultItem label="BMI" value={result?.bmi} />
              <ResultItem label="Age" value={result?.age} unit="yrs" />
              <ResultItem label="Body Fat" value={result?.bodyFat} unit="%" />
              <ResultItem
                label="Muscle Mass"
                value={result?.muscleMass}
                unit="kg"
              />
              <ResultItem label="Water" value={result?.water} unit="%" />
              <ResultItem label="Visceral Fat" value={result?.visceralFat} />
              <ResultItem
                label="Bone Mass"
                value={result?.boneMass}
                unit="kg"
              />
              <ResultItem
                label="Metabolism"
                value={result?.metabolism}
                unit="kcal"
              />
              <ResultItem label="Protein" value={result?.protein} unit="%" />
              <ResultItem label="Obesity" value={result?.obesity} unit="%" />
              <ResultItem label="Body Age" value={result?.bodyAge} unit="yrs" />
              <ResultItem label="LBM" value={result?.lbm} unit="kg" />
            </div>
          </div>

          {/* Note */}
          <div className="">
            <p>Note :</p>
            <textarea
              maxLength={150}
              className="border w-full h-20 border-gray-300 rounded-lg p-2 resize-none"
              placeholder="Input Note Here (max 150 characters)"
              onChange={(e) => setNote(e.target.value)}
            />
            <div className="flex justify-end">
              <p>{note.length}/150</p>
            </div>
          </div>
          <button
            className="w-full h-12 bg-blue-500 text-white py-2 rounded-lg cursor-pointer font-semibold"
            onClick={handleSave}
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};
