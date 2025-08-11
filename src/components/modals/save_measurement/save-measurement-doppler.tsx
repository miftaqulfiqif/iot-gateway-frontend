import { useState } from "react";
import { formatDate } from "date-fns";
import { useToast } from "@/context/ToastContext";

type Props = {
  isActive: boolean;
  setInactive: () => void;
  patient: any;
  result: any;
};

export const SaveMeasurementDoppler = ({
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
          <p>Result</p>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Heart Rate</p>
            <p className="text-6xl font-bold text-blue-600">
              {result ?? "--"} <span className="text-xl font-normal">bpm</span>
            </p>
          </div>

          {/* Note */}
          <div className="">
            <p>Note :</p>
            <textarea
              maxLength={150}
              className="border w-full h-20 border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
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
