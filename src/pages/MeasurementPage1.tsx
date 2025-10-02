import { ArrowLeft } from "lucide-react";
import barcodeImg from "@/assets/gif/scan-barcode.gif";
import React, { useEffect, useState } from "react";
import { useRooms } from "@/hooks/api/use-room";
import { SelectPatientContent } from "@/components/modals/contents/select-patient-content";
import { CreatePatientContent } from "@/components/modals/contents/create-patient-content";
import { InputSelect } from "@/components/ui/input-select";
import MainLayout from "@/components/layouts/main-layout";

const steps = [
  { id: 1, title: "Select Patient" },
  { id: 2, title: "Select Room" },
  { id: 3, title: "Select Device" },
];

const MeasurementPage1 = () => {
  const [indexStep, setIndexStep] = useState(0);
  const { getAllRooms } = useRooms();
  const [state, setState] = useState<"barcode" | "select" | "create">(
    "barcode"
  );
  const [patientSelected, setPatientSelected] = useState<any>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 768); // Example breakpoint for mobile
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (indexStep === 0) {
      console.log("Step 1: Select Patient");
    } else if (indexStep === 1) {
      console.log("Step 2: Select Room");
      getAllRooms();
    } else if (indexStep === 2) {
      console.log("Step 3: Select Device", patientSelected);
    }
  }, [indexStep]);

  const handleSelectPatient = (patient: any) => {
    setPatientSelected(patient);
    if (patient?.patient_room) {
      setIndexStep(2);
    } else {
      setIndexStep(1);
    }
  };

  return (
    <MainLayout title="New Measurement" state="Measurement">
      <div className="w-full h-full flex mb-5">
        {/* Main content */}
        <div className="flex bg-white rounded-xl p-6 md:p-8 flex-col gap-6 h-full w-full">
          {/* Header */}
          <div className="flex justify-center relative">
            {indexStep > 0 && (
              <button
                className="absolute left-0 top-0 flex items-center gap-2 w-fit px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                onClick={() => {
                  if (patientSelected?.patient_room) {
                    setIndexStep(0);
                  } else {
                    setIndexStep((prev) => Math.max(prev - 1, 0));
                  }
                }}
              >
                <ArrowLeft className="w-4 h-4" />
                {indexStep === 1 && "Change Patient"}
                {indexStep === 2 && "Change Room"}
              </button>
            )}
            <p className="font-bold text-lg md:text-xl hidden md:block lg:block">
              Add New Measurement
            </p>
          </div>

          {/* Stepper */}
          <div className="flex flex-row items-center justify-center gap-4">
            {steps.map((item, index) => (
              <React.Fragment key={item.id}>
                {stepForm(index < indexStep + 1, item.title, item.id)}
                {index !== steps.length - 1 && (
                  <div
                    className={`w-10 md:w-40 border-t-2 ${
                      index < indexStep ? "border-blue-500" : "border-gray-300"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 mt-6">
            {indexStep === 0 && (
              <SelectPatientSection
                state={state}
                setState={setState}
                onPatientSelect={handleSelectPatient}
                isMobile={mobile}
              />
            )}
            {indexStep === 1 && <p>Room selection content here...</p>}
            {indexStep === 2 && <p>Device selection content here...</p>}
          </div>
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

// Select Patient Section
const SelectPatientSection = ({
  state,
  setState,
  onPatientSelect,
  isMobile,
}: {
  state: "barcode" | "select" | "create";
  setState: React.Dispatch<
    React.SetStateAction<"barcode" | "select" | "create">
  >;
  onPatientSelect: (patient: any) => void;
  isMobile: boolean;
}) => {
  return (
    <div className="flex flex-col gap-4 h-[500px] md:h-[600px]">
      {/* Option Select Patient */}
      <div className="flex flex-row items-center justify-between gap-4">
        <p className="font-bold text-sm md:text-lg lg:text-lg">
          Select patient
        </p>
        {!isMobile ? (
          <div className="flex gap-2 bg-gray-100 px-2 md:px-4 py-2 rounded-xl text-sm">
            {["barcode", "select", "create"].map((opt) => (
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
          <InputSelect
            name="select_patient"
            placeholder="Select Patient"
            option={[
              { value: "barcode", label: "Barcode" },
              { value: "select", label: "Select Patient" },
              { value: "create", label: "Create Patient" },
            ]}
            value={state}
            onChange={(value) =>
              setState(value as "barcode" | "select" | "create")
            }
          />
        )}
      </div>

      {/* Show Content */}
      <div className="flex-1 w-full">
        {state === "barcode" && (
          <div className="h-full flex items-center justify-center">
            <img src={barcodeImg} alt="Scan barcode" className="max-h-80" />
          </div>
        )}
        {state === "select" && (
          <SelectPatientContent patientSelected={onPatientSelect} />
        )}
        {state === "create" && (
          <CreatePatientContent patientSelected={onPatientSelect} />
        )}
      </div>
    </div>
  );
};

export default MeasurementPage1;
