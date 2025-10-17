import { Mars, Save, Venus } from "lucide-react";
import barcodeImg from "@/assets/gif/scan-barcode.gif";
import React, { useEffect, useState } from "react";
import { useRooms } from "@/hooks/api/use-room";
import { SelectPatientContent } from "@/components/modals/contents/select-patient-content";
import { InputSelect } from "@/components/ui/input-select";
import MainLayout from "@/components/layouts/main-layout";
import { SelectRoomContent } from "@/components/modals/contents/select-room-content";
import { SelectDeviceContent } from "@/components/modals/contents/select-device-content";
import { useToast } from "@/context/ToastContext";
import { MeasurementSection } from "@/components/measurement/measurment-section";
import refreshIcon from "@/assets/icons/refresh.png";
import { SaveMeasurementBMI } from "@/components/modals/save_measurement/save-measurement-bmi";
import { save } from "@lucide/lab";

const steps = [
  { id: 1, title: "Select Patient" },
  { id: 2, title: "Select Room" },
  { id: 3, title: "Select Device" },
];

const MeasurementPage1 = () => {
  const { showToast } = useToast();
  const [indexStep, setIndexStep] = useState(0);
  const { getAllRooms } = useRooms();
  const [state, setState] = useState<"barcode" | "select">("barcode");
  const [patientSelected, setPatientSelected] = useState<any>(null);
  const [roomSelected, setRoomSelected] = useState<any>(null);
  const [deviceSelected, setDeviceSelected] = useState<any>(null);
  const [mobile, setMobile] = useState(false);
  const [patientImage, setPatientImage] = useState<string | null>(null);
  const [saveModal, setSaveModal] = useState(false);
  const [dataMeasurement, setDataMeasurement] = useState<any>();
  const [clearTrigger, setClearTrigger] = useState(false);
  const [saveTrigger, setSaveTrigger] = useState(false);

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
    if (indexStep === 0) {
      console.log("Step 1: Select Patient");
    } else if (indexStep === 1) {
      console.log("Step 2: Select Room", patientSelected);
      getAllRooms();
    } else if (indexStep === 2) {
      console.log("Step 3: Select Device", roomSelected);
    } else {
      console.log("Measurement setup complete", deviceSelected);
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

  // Handle Select Patient
  const handleSelectPatient = (patient: any) => {
    setPatientSelected(patient);
    // setIndexStep(1);
  };

  // Handle Select Room
  const handleSelectRoom = (room: any) => {
    setRoomSelected(room);
  };

  // Handle Select Device
  const handleSelectDevice = (device: any) => {
    setDeviceSelected(device);
  };

  const handleRestartMeasurement = () => {
    setClearTrigger(true);
    setTimeout(() => setClearTrigger(false), 100); // reset ke false
  };

  const handleSaveMeasurement = () => {
    setSaveTrigger(true);
    setTimeout(() => setSaveTrigger(false), 100); // reset ke false
  };

  console.log("dataMeasurement", dataMeasurement);

  return (
    <MainLayout title="New Measurement" state="Measurement">
      <div className="w-full md:w-3/4 lg:w-3/5 mx-auto h-full flex mb-20 md:mb-5 lg:mb-5">
        {/* Main content */}
        <div className="flex bg-white rounded-xl p-2 md:p-8 flex-col gap-6 h-fit w-full max-w-full mx-auto">
          {/* Header */}
          <div className="flex justify-center relative">
            <p className="font-bold text-lg md:text-xl hidden md:block lg:block">
              Add New Measurement
            </p>
          </div>

          {indexStep !== 3 ? (
            <div className="flex flex-col gap-6">
              {/* Stepper */}
              <div className="flex flex-row items-center justify-center gap-4">
                {steps.map((item, index) => (
                  <React.Fragment key={item.id}>
                    {stepForm(index < indexStep + 1, item.title, item.id)}
                    {index !== steps.length - 1 && (
                      <div
                        className={`w-10 md:w-40 border-t-2 ${
                          index < indexStep
                            ? "border-blue-500"
                            : "border-gray-300"
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1">
                {/* Select Patient */}
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
                          setPatientSelected={handleSelectPatient}
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Select Rooom */}
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
                        setRoomSelected={handleSelectRoom}
                      />
                    </div>
                  </div>
                )}

                {/* Select Device */}
                {indexStep === 2 && (
                  <div className="flex flex-col gap-4 h-full">
                    {/* Show Content */}
                    <div className="flex-1 w-full">
                      <SelectDeviceContent
                        gatewayId={roomSelected ? roomSelected.iot_gateway : []}
                        deviceSelected={deviceSelected}
                        setDeviceSelected={handleSelectDevice}
                        isBaby={!patientSelected.nik}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6 h-fit">
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
                    <div className="flex flex-col gap-1">
                      <p className="text-lg font-bold">
                        {patientSelected.name}
                        <span className="items-center justify-start">
                          {patientSelected.gender === "male" ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 text-blue-300">
                              <Mars className="w-5 h-5" />
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-6 h-6 text-pink-300">
                              <Venus className="w-5 h-5" />
                            </span>
                          )}
                        </span>
                      </p>

                      {/* Detail Info */}
                      <div className="flex gap-6 w-full text-sm">
                        <p>{patientSelected.id}</p>
                        {patientSelected.age && (
                          <p>{`${patientSelected.age} years old`}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {roomSelected && (
                  <div className="flex gap-2 rounded-lg border items-center h-fit px-3 py-1 cursor-pointer bg-white text-black shadow-[inset_6px_6px_5px_rgba(0,0,0,0.16),inset_-6px_-6px_5px_rgba(255,255,255,1)] mt-2">
                    <p className="font-bold text-sm">
                      {roomSelected.name ? roomSelected.name : "--"}
                    </p>
                    <p className="font-bold">
                      {roomSelected.number ? roomSelected.number : "--"}
                    </p>
                    <p>-</p>
                    <p className="bg-green-200 text-green-900 rounded-2xl px-2 py-1 w-fit text-center text-sm font-bold">
                      {roomSelected.type ? roomSelected.type : "--"}
                    </p>
                  </div>
                )}
              </div>

              <p>{deviceSelected.mac_address}</p>

              {/* Content for measurement process */}
              <MeasurementSection
                patientSelected={patientSelected}
                deviceSelected={deviceSelected}
                roomSelected={roomSelected}
                setDataMeasurement={setDataMeasurement}
                clearTrigger={clearTrigger}
                saveTrigger={saveTrigger}
              />
            </div>
          )}
          {/* Navigation Buttons */}
          {indexStep >= 3 ? (
            <div className="flex justify-between items-center">
              <button
                className="flex items-center gap-2 px-4 py-2 border bg-gray-50  rounded-lg cursor-pointer disabled:bg-gray-300 text-sm hover:bg-gray-100"
                onClick={handleRestartMeasurement}
              >
                <img src={refreshIcon} alt="refresh" className="w-5 h-5" />
                Restart Measurement
              </button>
              <button
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg disabled:bg-gray-300 text-sm text-white ${
                  dataMeasurement
                    ? "cursor-pointer bg-gradient-to-b from-[#4956F4] to-[#6e79f4]"
                    : ""
                }`}
                onClick={handleSaveMeasurement}
                disabled={!dataMeasurement}
              >
                <Save className="w-5 h-5" />
                Save
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              {indexStep > 0 ? (
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer disabled:bg-gray-300 "
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
                {indexStep === steps.length - 1 ? "Measure" : "Next"}
              </button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

// Step form component
const stepForm = (isActive: boolean, title: string, number: number) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <p
        className={`w-6 h-6 flex items-center justify-center rounded-full ${
          isActive ? "bg-blue-500" : "bg-gray-300"
        } text-white text-sm`}
      >
        {number}
      </p>
      <p
        className={`text-xs md:text-sm text-center ${
          isActive ? "font-semibold text-blue-600" : "text-gray-500"
        }`}
      >
        {title}
      </p>
    </div>
  );
};

export default MeasurementPage1;
