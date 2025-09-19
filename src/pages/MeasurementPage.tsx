import { PatientInfo } from "@/components/ui/patient-info";
import MainLayout from "../components/layouts/main-layout";
import DeviceConnected from "@/components/ui/device-connected";
import { useEffect, useState } from "react";
import { SelectPatient } from "@/components/modals/select-patient-modal";
import { useDevices } from "@/hooks/api/use-device";

const MeasurementPage = () => {
  const { getAllDevicesConnected, devicesConnected } = useDevices();

  useEffect(() => {
    getAllDevicesConnected();
  }, []);

  const [state, setState] = useState("barcode");
  const [patient, setPatient] = useState<any>(null);
  const [baby, setBaby] = useState(null);

  // Get patient from local storage
  useEffect(() => {
    const storedPatient = localStorage.getItem("patient");
    if (storedPatient) {
      setPatient(JSON.parse(storedPatient));
    }
  }, []);

  // Update patient age
  useEffect(() => {
    if (patient) {
      const birthDate = new Date(patient.date_of_birth);
      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();

      // Kurangi umur kalau ulang tahun belum lewat tahun ini
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }

      localStorage.setItem(
        "patient",
        JSON.stringify({
          ...patient,
          age,
        })
      );
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
              {devicesConnected.length > 0 ? (
                devicesConnected.map(
                  (device) =>
                    device.connection !== "tcpip" && (
                      <DeviceConnected
                        key={device.id}
                        deviceIcon={device.icon}
                        deviceName={device.name ? device.name : device.model}
                        deviceMac={
                          device.connection === "bluetooth"
                            ? device.mac_address
                            : device.ip_address
                        }
                        deviceConnection={device.connection}
                        url={`/device/${device.device_function}/${device.mac_address}`}
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
