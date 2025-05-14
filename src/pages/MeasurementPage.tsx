import { PatientInfo } from "@/components/ui/patient-info";
import MainLayout from "../components/layouts/main-layout";
import DeviceConnected from "@/components/ui/device-connected";
import { url } from "inspector";
import { SelectPatient } from "@/components/select-patient-modal";
import { useState } from "react";
import { BarcodePatient } from "@/components/barcode-patient-model";

const patient = {
  name: "Miftaqul Fiqi Firmansyah",
  age: "23",
  gender: "male",
  place_of_birth: "Surabaya",
  date_of_birth: "2001-09-20 17:00:00.000",
  address: "Jl. Kebon Jeruk, Surabaya",
  religion: "Islam",
  marital_status: "Single",
  education: "S1",
  work: "Mahasiswa",
  phone_number: "081234567890",
};
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
];

const MeasurementPage = () => {
  const [state, setState] = useState("barcode");
  const [barcodeModal, setBarcodeModal] = useState(false);
  const [selectModal, setSelectModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);

  return (
    <MainLayout title="Measurement" state="Measurement">
      <div className="flex flex-col pb-20">
        <div className="flex flex-row gap-6">
          <div className="w-1/2">
            <p className="font-bold text-2xl">Patient Info</p>
            {patient && <PatientInfo patient={patient} baby={baby} />}
          </div>
          <div className="w-1/2">
            <p className="font-bold text-2xl">Devices already to use</p>
            <div className="flex flex-col gap-4 mt-3">
              {devices.map((device) => {
                return (
                  <DeviceConnected
                    deviceIcon={device.icon}
                    deviceName={device.name}
                    deviceMac={device.mac}
                    deviceConnection={device.connection}
                    url={`/device/${device.url}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {!patient && (
        <SelectPatient
          isActive={patient !== undefined && patient !== null}
          state={state}
          openBarcodeModal={() => {
            setState("barcode");
          }}
          openSelectModal={() => {
            setState("select");
          }}
          openCreateModal={() => {
            setState("create");
          }}
        />
      )}
    </MainLayout>
  );
};

export default MeasurementPage;
