import { useEffect } from "react";


import Sidebar from "../layouts/sidebar";

import { useBabies } from "@/hooks/api/use-baby";

type Props = {
  isActive: boolean;
  baby: any;
  babySelected: (baby: any) => void;
  patientId: string;
};

export const CreateBaby = ({ isActive, babySelected, patientId }: Props) => {
  const { getBabiesByPatientId, babies } = useBabies(patientId);

  // Fetch babies by patient id
  useEffect(() => {
    if (isActive && patientId) {
      getBabiesByPatientId();
    }
  }, [isActive, patientId]);

  return (
    <div
      className={`fixed right-0 top-0 w-full h-full bg-transparent bg-opacity-50 z-40 transition-opacity duration-300  ${
        isActive ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ backdropFilter: "blur(5px)", background: "rgba(0, 0, 0, 0.2)" }}
    >
      <div className="w-full h-full p-4">
        {/* Component Sidebar */}
        <Sidebar state="Measurement" />
      </div>

      {/* Show Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-1/2 left-3/5 transform bg-white rounded-xl p-8 z-50 w-4xl h-fit transition-all duration-300 ease-in-out
        ${
          isActive
            ? "opacity-100 scale-100 translate-x-[-50%] translate-y-[-50%]"
            : "opacity-0 scale-95 translate-x-[-50%] translate-y-[-40%]"
        }
      `}
      >
        <div className="flex flex-col gap-4 h-[600px]">
          {/* Option Select Baby */}
          <div className="flex flex-row items-center justify-between">
            <p className="font-bold text-xl">Create Baby</p>
          </div>

          {/* Show Content */}
          <div className="w-full h-full">
            <p>Content create Baby</p>
          </div>
        </div>
      </div>
    </div>
  );
};
