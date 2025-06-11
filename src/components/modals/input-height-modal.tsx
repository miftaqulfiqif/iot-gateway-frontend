import { UsePatient } from "@/hooks/api/use-patient";
import Sidebar from "../layouts/sidebar";
import { useEffect, useRef, useState } from "react";

type Props = {
  isActive: boolean;
  patientId: string;
  setPatient: (e: any) => void;
};

export const InputHeightModal = ({
  isActive,
  patientId,
  setPatient,
}: Props) => {
  const { updatePatientHeight } = UsePatient({});
  const [height, setHeight] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Patient Id:", patientId);
    console.log("Height:", height);
    updatePatientHeight(patientId, height);
    setPatient({ height: height });
  };

  return (
    <div
      className={`fixed inset-0 z-40 transition-opacity duration-300 ${
        isActive ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ backdropFilter: "blur(5px)", background: "rgba(0, 0, 0, 0.2)" }}
    >
      <div className="w-full h-full p-4">
        <Sidebar state="Measurement" />
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        bg-white rounded-xl p-8 z-50 w-[400px] h-fit transition-all duration-300 ease-in-out
        ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
      >
        <p className="font-bold text-xl mb-4">Input Height</p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="number"
            value={height || ""}
            onChange={(e) => setHeight(Number(e.target.value))}
            placeholder="Enter height (cm)"
            className="bg-gray-100 text-sm px-4 py-2 rounded-lg w-full focus:outline-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-xl w-full hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
