import { ArrowLeft, BedSingle, Save, User, X } from "lucide-react";
import Sidebar from "../layouts/sidebar";

import barcodeImg from "@/assets/gif/scan-barcode.gif";
import { SelectPatientContent } from "./contents/select-patient-content";
import React, { useEffect, useState } from "react";
import { useRooms } from "@/hooks/api/use-room";
import { BedsModel, RoomsModel } from "@/models/RoomModel";
import { InputSelect } from "../ui/input-select";
import { useDevices } from "@/hooks/api/use-device";
import { useCentralMonitor } from "@/hooks/api/use-central-monitor";
import { SelectRoomContent } from "./contents/select-room-content";
import { SelectDeviceContent } from "./contents/select-device-content";
import refreshIcon from "@/assets/icons/refresh.png";
import { useToast } from "@/context/ToastContext";
import { ReviewAddPatientMonitoring } from "./contents/review-add-patient-monitoring";

const step = [
  { id: 1, title: "Select Patient" },
  { id: 2, title: "Select Room" },
  { id: 3, title: "Select Device" },
];
type Props = {
  isActive: boolean;
  setNonactive: () => void;
  stateSidebar: string;
};

export const AddDevicePatientMonitorModal = ({
  isActive,
  setNonactive,
  stateSidebar,
}: Props) => {
  const { patientMonitoringDevices, getPatientMonitoringDevices } =
    useDevices();
  const { showToast } = useToast();

  const [indexStep, setIndexStep] = useState(0);
  const { createCentralMonitor, getAllCentralMonitor } = useCentralMonitor();
  const { rooms, beds, getAllRooms, getBeds } = useRooms();
  const [state, setState] = useState<string>("barcode");
  const [patientSelected, setPatientSelected] = useState<any>(null);
  const [roomSelected, setRoomSelected] = useState<any>(null);
  const [bedSelected, setBedSelected] = useState<any>(null);
  const [deviceSelected, setDeviceSelected] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [deviceFunction, setDeviceFunction] = useState("");
  const [mobile, setMobile] = useState(false);

  console.log("STEP INDEX : ", indexStep);

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
      getAllRooms();
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
    if (indexStep === 1 && !roomSelected) {
      showToast(
        "Select Room First",
        "Please select a room before continuing.",
        "info"
      );
      return false;
    }
    if (indexStep === 2 && !deviceSelected) {
      showToast(
        "Select Device First",
        "Please select a device before continuing.",
        "info"
      );
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (indexStep === 0) {
      console.log("Step 1: Select Patient");
      setRoomSelected(null);
      setBedSelected(null);
    } else if (indexStep === 1) {
      console.log("Step 2: Select Room");
      getAllRooms();
    } else if (indexStep === 2) {
      console.log("Step 3: Select Device");
      console.log("Patient Selected:", patientSelected);
      console.log("Room Selected:", roomSelected);
      console.log("Bed Selected:", bedSelected);
      getPatientMonitoringDevices(search, deviceFunction);
    }
  }, [indexStep, search, deviceFunction]);

  const handleSubmit = () => {
    createCentralMonitor({
      patient_id: patientSelected.id,
      device_id: deviceSelected.id,
      room_id: roomSelected.id,
      bed_id: bedSelected.id,
    });
  };

  return (
    <div
      className={`fixed right-0 top-0 w-full h-full bg-transparent bg-opacity-50 z-50 transition-opacity duration-300  ${
        isActive ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ backdropFilter: "blur(5px)", background: "rgba(0, 0, 0, 0.2)" }}
    >
      <div className="w-full h-full p-4">
        {/* Component Sidebar */}
        <Sidebar state={stateSidebar} cannotHide />
      </div>

      {/* Show Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-1/2 left-3/5 transform bg-white rounded-xl p-8 z-50 w-7xl h-[920px] transition-all duration-300 ease-in-out
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
                        onChange={(value) =>
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
                {/* Select Room */}
                <div className="flex flex-row items-center justify-between gap-4 px-2">
                  <p className="font-bold text-sm md:text-lg lg:text-lg">
                    Select room
                  </p>
                </div>

                {/* Show Content */}
                <div className="flex-1 w-full">
                  <SelectRoomContent
                    roomSelected={roomSelected}
                    setRoomSelected={setRoomSelected}
                  />
                </div>
              </div>
            )}
            {indexStep === 2 && (
              <div className="flex flex-col gap-4 h-full">
                {/* Show Content */}
                <div className="flex-1 w-full">
                  <SelectDeviceContent
                    gatewayId={roomSelected ? roomSelected.iot_gateway : []}
                    deviceSelected={deviceSelected}
                    setDeviceSelected={setDeviceSelected}
                    isBaby={!patientSelected.nik}
                  />
                </div>
              </div>
            )}
            {indexStep === 3 && (
              <div className="flex flex-col gap-4 h-full">
                {/* Show Content */}
                <div className="flex-1 w-full">
                  <ReviewAddPatientMonitoring
                    patientSelected={patientSelected}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute bottom-0 left-0 w-full border-t p-4 flex justify-between">
          {indexStep >= 3 ? (
            <>
              <button
                className="flex items-center gap-2 px-4 py-2 border bg-gray-50 rounded-lg cursor-pointer disabled:bg-gray-300 text-sm hover:bg-gray-100"
                onClick={() => {
                  setIndexStep(0);
                  setPatientSelected(null);
                  setRoomSelected(null);
                  setDeviceSelected(null);
                }}
              >
                <img src={refreshIcon} alt="refresh" className="w-5 h-5" />
                Clear Selection
              </button>
              <button
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg disabled:bg-gray-300 text-sm text-white ${
                  deviceSelected
                    ? "cursor-pointer bg-gradient-to-b from-[#4956F4] to-[#6e79f4]"
                    : ""
                }`}
                onClick={handleSubmit}
                disabled={!deviceSelected}
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
