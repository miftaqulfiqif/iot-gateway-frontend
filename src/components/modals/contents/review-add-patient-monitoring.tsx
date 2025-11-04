import { format, differenceInYears } from "date-fns";
import { useState } from "react";

type Props = {
  patientSelected: any;
};

export const ReviewAddPatientMonitoring = ({ patientSelected }: Props) => {
  const [patientImage, setPatientImage] = useState("");

  return (
    <div>
      {/* PATIENT INFO */}
      <div className="flex flex-col gap-2 w-1/1 p-6 rounded-xl bg-gradient-to-b from-[#4956F4] to-[#6e79f4] text-white shadow-lg">
        <div className="flex flex-row justify-between">
          <div className="flex gap-4 w-full">
            {/* Profile Picture */}
            <div className="w-26 h-26 rounded-full overflow-hidden border-2 flex items-center justify-center bg-gray-200">
              {patientImage ? (
                <img
                  src={patientImage}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xl font-semibold text-gray-700">
                  {patientSelected.name
                    ? patientSelected.name
                        .split(" ")
                        .map((word: string) => word[0])
                        .join("")
                        .substring(0, 3)
                        .toUpperCase()
                    : "?"}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 justify-between">
              <p className="text-2xl font-bold">{patientSelected.name}</p>
              {/* Detail Info */}
              <div className="flex flex-wrap gap-6 w-full">
                <div className="flex flex-col gap-1 min-w-[220px]">
                  <p className="text-sm">Patient ID</p>
                  <p className="font-bold">{patientSelected.id}</p>
                </div>

                <div className="flex flex-col gap-1 min-w-[220px]">
                  <p className="text-sm">Age / Gender</p>
                  {patientSelected.date_of_birth && (
                    <span className="font-bold">
                      {differenceInYears(
                        new Date(),
                        new Date(patientSelected.date_of_birth)
                      )}{" "}
                      yrs /{" "}
                      {patientSelected.gender === "male" ? "Male" : "Female"}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1 min-w-[260px]">
                  <p className="text-sm">Place / Date of birth</p>
                  {patientSelected.date_of_birth && (
                    <p className="font-bold">{`${
                      patientSelected.place_of_birth
                    }, ${format(
                      patientSelected?.date_of_birth,
                      "dd MMMM yyyy"
                    )}`}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1 min-w-[120px]">
                  <p className="text-sm">Admission</p>
                  {patientSelected.created_at && (
                    <p className="font-bold">
                      {format(patientSelected?.created_at, "dd MMMM yyyy")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {patientSelected?.patient_room?.room && (
            <div className="flex gap-2 rounded-xl border items-center h-fit px-3 py-1 cursor-pointer bg-white text-black shadow-[inset_6px_6px_5px_rgba(0,0,0,0.16),inset_-6px_-6px_5px_rgba(255,255,255,1)]">
              <p className="w-full font-bold text-lg">
                {patientSelected.patient_room?.room?.name ?? "--"}
              </p>
              <p className="font-bold">
                {patientSelected.patient_room?.room?.number ?? "--"}
              </p>
              <p>-</p>
              <p className="bg-green-200 text-green-900 rounded-2xl p-2 w-20 text-center">
                {patientSelected.patient_room?.room?.type ?? "--"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
