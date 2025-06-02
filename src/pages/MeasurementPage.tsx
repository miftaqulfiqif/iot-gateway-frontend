import { PatientInfo } from "@/components/ui/patient-info";
import MainLayout from "../components/layouts/main-layout";
import DeviceConnected from "@/components/ui/device-connected";
import { useEffect, useState } from "react";
import { SelectPatient } from "@/components/modals/select-patient-modal";
import { BarcodePatient } from "@/components/modals/barcode-patient-model";
import { UsePatientPage } from "@/hooks/pages/UsePatientPage";
import { stat } from "fs";

const baby = {
  name: "Alexandra Gustofano",
  gender: "male",
  place_of_birth: "Surabaya",
  date_of_birth: "2025-09-20 17:00:00.000",
};
const devices = [
  {
    icon: "",
    name: "Digit Pro IDA",
    mac: "F1:Q1:G4:NT:EE:66",
    connection: "bluetooth",
    url: "digit-pro-ida",
  },
  {
    icon: "",
    name: "Digit Pro Baby",
    mac: "F1:Q1:G4:NT:EE:66",
    connection: "bluetooth",
    url: "digit-pro-baby",
  },
  {
    icon: "",
    name: "Doppler",
    mac: "F1:Q1:G4:NT:EE:66",
    connection: "bluetooth",
    url: "doppler",
  },
  {
    icon: "",
    name: "BMI",
    mac: "F1:Q1:G4:NT:EE:66",
    connection: "bluetooth",
    url: "bmi",
  },
  {
    icon: "",
    name: "PM 9000",
    mac: "F1:Q1:G4:NT:EE:66",
    connection: "lan",
    url: "pm-9000",
  },
  {
    icon: "",
    name: "DS 001",
    mac: "F1:Q1:G4:NT:EE:66",
    connection: "wifi",
    url: "ds-001",
  },
];

const MeasurementPage = () => {
  const [state, setState] = useState("barcode");
  const [barcodeModal, setBarcodeModal] = useState(false);
  const [selectModal, setSelectModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);

  const [patient, setPatient] = useState(null);

  const [baby, setBaby] = useState(null);
  // const [devices, setDevices] = useState([]);

  // Get patient from local storage
  useEffect(() => {
    const storedPatient = localStorage.getItem("patient");
    if (storedPatient) {
      setPatient(JSON.parse(storedPatient));
    }
  }, []);

  // Save patient to local storage
  useEffect(() => {
    if (patient !== null) {
      localStorage.setItem("patient", JSON.stringify(patient));
    }
  }, [patient]);

  // Handle state change
  useEffect(() => {
    setBarcodeModal(state === "barcode");
    setSelectModal(state === "select");
    setCreateModal(state === "create");
  }, [state]);

  return (
    <MainLayout title="Measurement" state="Measurement">
      <div className="flex flex-col pb-20">
        <div className="flex flex-row gap-6">
          <div className="w-1/2">
            <p className="font-bold text-2xl">Patient Info</p>
            <PatientInfo patient={patient} baby={baby} />
            <button
              onClick={() => {
                setPatient(null);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Edit patient
            </button>
          </div>
          <div className="w-1/2">
            <p className="font-bold text-2xl">Devices already to use</p>
            <div className="flex flex-col gap-4 mt-3">
              {devices.length > 0 ? (
                devices.map((devices) => (
                  <DeviceConnected
                    deviceIcon={devices.icon}
                    deviceName={devices.name}
                    deviceMac={devices.mac}
                    deviceConnection={devices.connection}
                    url={`/device/${devices.url}`}
                  />
                ))
              ) : (
                <p className="text-gray-500">Nothing device connected</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {patient === null && (
        <SelectPatient
          isActive={patient === null}
          state={state}
          openBarcodeModal={() => setState("barcode")}
          openSelectModal={() => setState("select")}
          openCreateModal={() => setState("create")}
          patientSelected={(patient) => setPatient(patient)}
        />
      )}
    </MainLayout>
  );
};

export default MeasurementPage;
