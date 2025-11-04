import { ArrowLeft, BedSingle, Save, User, X } from "lucide-react";

import barcodeImg from "@/assets/gif/scan-barcode.gif";
import { SelectPatientContent } from "../contents/select-patient-content";
import React, { useEffect, useState } from "react";
import { useRooms } from "@/hooks/api/use-room";
import { BedsModel, RoomsModel } from "@/models/RoomModel";
import { InputSelect } from "../../ui/input-select";
import { useDevices } from "@/hooks/api/use-device";
import { useCentralMonitor } from "@/hooks/api/use-central-monitor";
import { SelectRoomContent } from "../contents/select-room-content";
import { SelectDeviceContent } from "../contents/select-device-content";
import refreshIcon from "@/assets/icons/refresh.png";
import { useToast } from "@/context/ToastContext";
import { ReviewAddPatientMonitoring } from "../contents/review-add-patient-monitoring";
import { SelectBedContent } from "../contents/select-bed-content";

const step = [
  { id: 1, title: "Select Patient" },
  { id: 2, title: "Select Bed" },
];
type Props = {
  isActive: boolean;
  setNonactive: () => void;
  roomId: string;
};

export const AddmissionPatientModal = ({
  isActive,
  setNonactive,
  roomId,
}: Props) => {
  const { showToast } = useToast();

  const [indexStep, setIndexStep] = useState(0);
  const { getBeds, beds, addPatientRoom } = useRooms();
  const [state, setState] = useState<string>("barcode");
  const [patientSelected, setPatientSelected] = useState<any>(null);
  const [bedSelected, setBedSelected] = useState<any>(null);
  const [mobile, setMobile] = useState(false);

  // Handle responsive
  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 768); // Example breakpoint for mobile
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Log step changes
  useEffect(() => {
    if (indexStep === 1) {
      getBeds(roomId, "true");
    }
  }, [indexStep]);

  // Validate step before proceeding
  const validateStep = () => {
    if (indexStep === 0 && !patientSelected) {
      showToast(
        "Select Patient First",
        "Please select a patient before continuing.",
        "info"
      );
      return false;
    }
    if (indexStep === 1 && !bedSelected) {
      showToast(
        "Select Room First",
        "Please select a room before continuing.",
        "info"
      );
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (indexStep === 0) {
      console.log("Step 1: Select Patient");
      setBedSelected(null);
      setBedSelected(null);
    } else if (indexStep === 1) {
      console.log("Step 2: Select Bed");
      getBeds(roomId, "true");
    }
  }, [indexStep]);

  const handleSubmit = () => {
    addPatientRoom({
      room_id: roomId,
      patient_id: patientSelected.id,
      bed_id: bedSelected.id,
    });
    setNonactive();
  };

  return (
    <div
      className={`fixed right-0 top-0 w-full h-full bg-transparent bg-opacity-50 z-50 transition-opacity duration-300  ${
        isActive ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ backdropFilter: "blur(5px)", background: "rgba(0, 0, 0, 0.2)" }}
    >
      {/* Show Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-1/2 left-1/2 transform bg-white rounded-xl p-8 z-50 w-7xl h-[920px] transition-all duration-300 ease-in-out
        ${
          isActive
            ? "opacity-100 scale-100 translate-x-[-50%] translate-y-[-50%]"
            : "opacity-0 scale-95 translate-x-[-50%] translate-y-[-40%]"
        }
      `}
      >
        <div className="flex flex-col gap-2 h-fit w-full max-w-full">
          <div className="flex flex-row items-center justify-between">
            <p className="w-6"></p>
            <p className="font-bold text-xl">Add Patient Monitor</p>
            <X className="cursor-pointer w-6" onClick={setNonactive} />
          </div>
          <div className="flex gap-4 items-center mx-auto">
            {step.map((item, index) => (
              <React.Fragment key={item.id}>
                {stepForm(index < indexStep + 1, item.title, item.id)}
                {/* Progress line */}
                {index !== step.length - 1 && (
                  <div
                    className={`w-40 border-t-2 ${
                      index < indexStep ? "border-blue-500" : "border-gray-300"
                    }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* CONTENT */}
          <div className="w-full h-20 mt-10">
            {indexStep === 0 && (
              <div className="flex flex-col gap-4 h-full">
                {/* Option Select Patient */}
                <div className="flex flex-row items-center justify-between gap-4 px-2">
                  <p className="font-bold text-sm md:text-lg lg:text-lg">
                    Select patient
                  </p>
                  {!mobile ? (
                    <div className="flex gap-2 bg-gray-100 px-2 md:px-4 py-2 rounded-xl text-sm">
                      {["barcode", "select"].map((opt) => (
                        <div
                          key={opt}
                          className={`px-3 py-1 rounded-lg cursor-pointer text-center ${
                            state === opt
                              ? "bg-white shadow-md text-blue-700 font-semibold"
                              : "hover:bg-gray-200"
                          }`}
                          onClick={() => setState(opt as any)}
                        >
                          {opt === "barcode"
                            ? "Scan Barcode"
                            : opt === "select"
                            ? "Select Patient"
                            : "Create Patient"}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="w-1/2">
                      <InputSelect
                        name="select_patient"
                        placeholder="Select Patient"
                        option={[
                          { value: "barcode", label: "Barcode" },
                          { value: "select", label: "Select Patient" },
                        ]}
                        value={state}
                        onChange={(value: string) =>
                          setState(value as "barcode" | "select")
                        }
                      />
                    </div>
                  )}
                </div>

                {/* Show Content */}
                <div className="flex-1 w-full">
                  {state === "barcode" && (
                    <div className="h-[400px] lg:h-[500px] flex items-center justify-center">
                      <img
                        src={barcodeImg}
                        alt="Scan barcode"
                        className="max-h-80"
                      />
                    </div>
                  )}
                  {state === "select" && (
                    <SelectPatientContent
                      patientSelected={patientSelected}
                      setPatientSelected={setPatientSelected}
                    />
                  )}
                </div>
              </div>
            )}
            {indexStep === 1 && (
              <div className="flex flex-col gap-4 h-full">
                {/* Select Bed */}
                <div className="flex flex-row items-center justify-between gap-4 px-2">
                  <p className="font-bold text-sm md:text-lg lg:text-lg">
                    Select Bed
                  </p>
                </div>

                {/* Show Content */}
                <div className="flex-1 w-full">
                  <SelectBedContent
                    beds={beds}
                    bedSelected={bedSelected}
                    setBedSelected={setBedSelected}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute bottom-0 left-0 w-full border-t p-4 flex justify-between">
          {indexStep >= 1 ? (
            <>
              <button
                className="flex items-center gap-2 px-4 py-2 border bg-gray-50 rounded-lg cursor-pointer disabled:bg-gray-300 text-sm hover:bg-gray-100"
                onClick={() => {
                  setIndexStep(0);
                  setPatientSelected(null);
                  setBedSelected(null);
                }}
              >
                <img src={refreshIcon} alt="refresh" className="w-5 h-5" />
                Previous
              </button>
              <button
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg disabled:bg-gray-300 text-sm text-white ${
                  bedSelected
                    ? "cursor-pointer bg-gradient-to-b from-[#4956F4] to-[#6e79f4]"
                    : ""
                }`}
                onClick={handleSubmit}
                disabled={!bedSelected}
              >
                <Save className="w-5 h-5" />
                Save
              </button>
            </>
          ) : (
            <>
              {indexStep > 0 ? (
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer disabled:bg-gray-300"
                  onClick={() => setIndexStep(indexStep - 1)}
                  disabled={indexStep === 0}
                >
                  Previous
                </button>
              ) : (
                <div />
              )}
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer disabled:bg-gray-300"
                onClick={() => {
                  if (!validateStep()) return;
                  setIndexStep(indexStep + 1);
                }}
              >
                {indexStep === step.length - 1 ? "Measure" : "Next"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const stepForm = (isActive: boolean, title: string, number: number) => {
  return (
    <div className="space-y-2">
      <p
        className={`w-6 h-6 text-center mx-auto rounded-full ${
          isActive ? "bg-blue-500" : "bg-gray-300"
        } text-white `}
      >
        {number}
      </p>
      <p
        className={`text-sm text-gray-700 ${
          isActive ? "font-semibold" : "font-normal"
        }`}
      >
        {title}
      </p>
    </div>
  );
};
