import { PatientInfo } from "@/components/ui/patient-info";
import MainLayout from "../components/layouts/main-layout";
import DeviceConnected from "@/components/ui/device-connected";
import { useEffect, useState } from "react";
import { SelectPatient } from "@/components/modals/select-patient-modal";
import { useDevices } from "@/hooks/api/use-device";

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
            <PatientInfo
              patient={patient}
              baby={baby}
              setPatient={setPatient}
            />
          </div>
          <div className="w-1/2">
            <p className="font-bold text-2xl">Devices already to use</p>
            <div className="flex flex-col gap-4 mt-3">
              {devices.length > 0 ? (
                devices.map(
                  (device) =>
                    device.connection === "bluetooth" && (
                      <DeviceConnected
                        key={device.id}
                        deviceIcon={device.icon}
                        deviceName={device.name ? device.name : device.device}
                        deviceMac={device.id}
                        deviceConnection={device.connection}
                        url={`/device/${device.device_function}/${device.id}`}
                      />
                    )
                )
              ) : (
                <p className="text-gray-500">No devices connected</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {patient === null && (
        <SelectPatient
          isActive={patient === null}
          setNonactive={() => setPatient(null)}
          state={state}
          openBarcodeModal={() => setState("barcode")}
          openSelectModal={() => setState("select")}
          openCreateModal={() => setState("create")}
          patientSelected={(patient) => setPatient(patient)}
          stateSidebar="Measurement"
        />
      )}
    </MainLayout>
  );
};

export default MeasurementPage;
