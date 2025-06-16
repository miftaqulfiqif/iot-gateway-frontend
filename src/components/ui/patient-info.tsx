import {
  ChevronDown,
  FileUser,
  LucideBaby,
  Mars,
  PersonStanding,
  Venus,
} from "lucide-react";
import { Icon } from "lucide-react";
import { babyPacifier } from "@lucide/lab";
import { useState } from "react";

import babyImg from "@/assets/imgs/baby.png";

type Props = {
  patient: any;
  baby?: any;
  setPatient?: (e: any) => void;
  setShowHistories?: (e: any) => void;
  isPatientMonitor?: boolean;
};
export const PatientInfo = ({
  patient,
  baby,
  setPatient,
  setShowHistories,
  isPatientMonitor,
}: Props) => {
  const [showDetail, setShowDetail] = useState(true);

  return (
    <div className="flex flex-row gap-2 bg-gradient-to-b from-[#4956F4] to-[#6e79f4]  rounded-2xl text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] mt-3 h-fit">
      <div className="flex flex-col gap-4 px-8 py-4 w-full">
        <div
          className={`flex gap-4 ${isPatientMonitor ? "flex-row" : "flex-col"}`}
        >
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-row gap-4">
              <p className=" text-3xl">{patient?.name ?? " -- "}</p>
              {patient?.gender === "male" ? (
                <div className="flex flex-row items-center gap-1 bg-blue-200 w-fit font-bold px-4 py-2 rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] text-black h-fit">
                  <p>Male</p>
                  <Mars className="w-6 h-6" />
                </div>
              ) : patient?.gender === "female" ? (
                <div className="flex flex-row items-center gap-1 bg-pink-200 w-fit font-bold px-4 py-2 rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] text-black h-fit">
                  <p>Female</p>
                  <Venus className="w-6 h-6" />
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="flex flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-blue-400 text-white px-2 py-1 rounded-2xl">
                  <PersonStanding className="w-6 h-6" />
                  <p>{patient?.height ?? " -- "} cm</p>
                </div>
                <div className="flex items-center bg-blue-400 text-white px-4 py-1 rounded-2xl">
                  <p>{patient?.age ?? " -- "} years old</p>
                </div>
              </div>
            </div>
          </div>
          {/* Detail info */}
          {showDetail && (
            <div className="flex flex-row gap-2 bg-[#ededf9] text-black px-4 py-2 rounded-xl w-full shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
              <div className="flex flex-col gap-2">
                <p>Place of Birth</p>
                <p>Date of Birh</p>
                <p>Address</p>
                <p>Phone number</p>
              </div>
              <div className="flex flex-col gap-2">
                <p>:</p>
                <p>:</p>
                <p>:</p>
                <p>:</p>
              </div>
              <div className="flex flex-col gap-2">
                <p>
                  {patient?.place_of_birth ? patient?.place_of_birth : " -- "}
                </p>
                <p>
                  {patient?.date_of_birth
                    ? new Date(patient?.date_of_birth).toLocaleDateString(
                        "en-GB",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )
                    : "--"}
                </p>
                <p>{patient?.address ? patient?.address : " -- "}</p>
                <p>{patient?.phone ? patient?.phone : " -- "}</p>
              </div>
            </div>
          )}
        </div>

        <hr className="my-1 border-t-1 border-gray-300" />

        {/* Section baby info */}
        {baby && (
          <div className="flex flex-col">
            <div className="flex flex-row gap-2 items-center">
              <Icon iconNode={babyPacifier} className="w-8 h-8" />

              <p className="text-2xl">Baby info</p>
            </div>
            <div className="flex flex-row gap-2">
              <img src={babyImg} alt="" className="w-50 h-50" />
              <div className="flex flex-col gap-2">
                <p className="text-2xl">{baby.name ? baby.name : " -- "}</p>
                {baby.gender === "male" ? (
                  <div className="flex flex-row items-center gap-1 bg-blue-200 w-fit font-bold px-3 py-1 rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] text-black text-sm">
                    <p>Male</p>
                    <Mars className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="flex flex-row items-center gap-1 bg-pink-200 w-fit font-bold px-4 py-2 rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] text-black">
                    <p>Female</p>
                    <Venus className="w-6 h-6" />
                  </div>
                )}

                <div className="flex flex-row gap-2 text-white px-4 py-2 rounded-xl w-full ">
                  <div className="flex flex-col gap-2">
                    <p>Place of birth</p>
                    <p>Date of birth</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>:</p>
                    <p>:</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>{baby.place_of_birth ? baby.place_of_birth : " -- "} </p>
                    <p>
                      {new Date(baby.date_of_birth).toLocaleDateString(
                        "en-GB",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-row gap-2 w-full">
          {!isPatientMonitor && (
            <button
              onClick={() => {
                setShowDetail((prev) => !prev);
              }}
              className=" text-white px-4 py-2 rounded-lg w-full border-2 border-white cursor-pointer"
            >
              Show detail patient
            </button>
          )}
          {setPatient && (
            <button
              onClick={() => {
                setPatient(null);
                localStorage.removeItem("patient");
              }}
              className="bg-white text-black px-4 py-2 rounded-lg w-full cursor-pointer"
            >
              Change patient
            </button>
          )}
          {setShowHistories && (
            <button
              onClick={() => {
                setShowHistories((prev: any) => !prev);
              }}
              className="bg-white text-black px-4 py-2 rounded-lg w-full cursor-pointer"
            >
              Show Histories
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
