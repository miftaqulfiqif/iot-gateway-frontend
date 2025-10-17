import { Mars, Venus } from "lucide-react";
import { useState } from "react";
import babyImg from "@/assets/imgs/baby.png";

type Props = {
  patient?: any;
  patientImage?: string | null;
};

export const PatientInfoMeasurement = ({ patient, patientImage }: Props) => {
  if (!patient) {
    return (
      <div className="flex flex-col gap-2 w-1/1 p-4 rounded-xl bg-gradient-to-b from-[#4956F4] to-[#6e79f4] text-white shadow-lg">
        <p className="text-center text-white opacity-70">No patient selected</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-1/1 p-4 rounded-xl bg-gradient-to-b from-[#4956F4] to-[#6e79f4] text-white shadow-lg">
      <div className="flex flex-row justify-between">
        <div className="flex gap-4 w-full">
          {/* Profile Picture */}
          <div className="w-18 h-18 rounded-full overflow-hidden border-2 flex items-center justify-center bg-gray-200">
            {patientImage ? (
              <img
                src={patientImage}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xl font-semibold text-gray-700">
                {patient?.name
                  ? patient.name
                      .split(" ")
                      .map((word: string) => word[0])
                      .join("")
                      .substring(0, 3)
                      .toUpperCase()
                  : "?"}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold flex items-center gap-1">
              {patient?.name ?? "--"}
              {patient?.gender === "male" ? (
                <span className="inline-flex items-center justify-center w-6 h-6 text-blue-300">
                  <Mars className="w-5 h-5" />
                </span>
              ) : (
                <span className="inline-flex items-center justify-center w-6 h-6 text-pink-300">
                  <Venus className="w-5 h-5" />
                </span>
              )}
            </p>

            {/* Detail Info */}
            <div className="flex gap-6 w-full text-sm">
              <p>{patient?.id ?? "--"}</p>
              {patient?.age && <p>{`${patient.age} years old`}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
