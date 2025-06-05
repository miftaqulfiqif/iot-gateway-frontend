import { PatientInfo } from "@/components/ui/patient-info";
import MainLayout from "../components/layouts/main-layout";
import DeviceConnected from "@/components/ui/device-connected";
import { useEffect, useState } from "react";
import { SelectPatient } from "@/components/modals/select-patient-modal";
import { BarcodePatient } from "@/components/modals/barcode-patient-model";
import { UsePatientPage } from "@/hooks/pages/UsePatientPage";
import { stat } from "fs";
import { useDevices } from "@/hooks/api/use-device";

const devices = [
  {
    icon: "",
    id: "F1:Q1:G4:NT:EE:66",
    device: "Digit Pro IDA",
    device_function: "digitpro_ida",
    connection: "bluetooth",
    type: "measurement",
    name: null,
  },
  {
    icon: "",
    id: "F1:Q1:G4:NT:EE:66",
    device: "Digit Pro Baby",
    device_function: "digitpro_baby",
    connection: "bluetooth",
    type: "measurement",
    name: null,
  },
  {
    icon: "",
    id: "F1:Q1:G4:NT:EE:12",
    device: "Doppler",
    device_function: "ultrasonic_pocket_doppler",
    connection: "bluetooth",
    type: "measurement",
    name: "Doppler 1",
  },
  {
    icon: "",
    id: "F1:Q1:G4:NT:EE:66",
    device: "Doppler",
    device_function: "ultrasonic_pocket_doppler",
    connection: "bluetooth",
    type: "measurement",
    name: "Doppler 2",
  },
  {
    icon: "",
    id: "192.168.1.1",
    device: "PM 9000",
    device_function: "pasien_monitor_9000",
    connection: "lan",
    type: "patient_monitor",
    name: "PM 9000",
  },
  {
    icon: "",
    id: "192.168.1.2",
    device: "DS 001",
    device_function: "diagnostic_station_001",
    connection: "wifi",
    type: "patient_monitor",
    name: "DS 001",
  },
];

const MeasurementPage = () => {
  const { getAllDevices, devices } = useDevices();

  useEffect(() => {
    getAllDevices();
  }, []);

  const [state, setState] = useState("barcode");
  const [patient, setPatient] = useState(null);
  const [baby, setBaby] = useState(null);

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
                localStorage.removeItem("patient");
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
                    key={devices.id}
                    deviceIcon={devices.icon}
                    deviceName={devices.name ? devices.name : devices.device}
                    deviceMac={devices.id}
                    deviceConnection={devices.connection}
                    url={`/device/${devices.device_function}/${devices.id}`}
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
