import {
  ArrowDownToLine,
  ArrowLeft,
  Icon,
  Square,
  Triangle,
} from "lucide-react";
import { PersonStanding, Weight } from "lucide-react";
import { babyPacifier } from "@lucide/lab";
import MainLayout from "../../components/layouts/main-layout";
import { PatientInfo } from "@/components/ui/patient-info";

import weighingIcon from "@/assets/icons/pediatrics.png";
import tareIcon from "@/assets/icons/tare.png";
import { useSocketHandler } from "@/hooks/socket/SocketHandler";
import { useEffect, useState } from "react";
import { SelectBaby } from "@/components/modals/select-baby-modal";
import { Patients } from "@/models/PatientModel";
import { useParams } from "react-router-dom";
import DigitProBabyRealtimeChart from "@/components/charts/chart-digit-pro-baby-realtime";
import HistoriesDigitProBaby from "@/components/charts/chart-histories-digitpro-baby";
import { useDigitProBaby } from "@/hooks/api/devices/use-digit-pro-baby";
import { SaveMeasurementDigitProBaby } from "@/components/modals/save_measurement/save-measurement-digit-pro-baby";

const historiesData = [
  { weight: 3.2, timestamp: "2025-06-05 01:46:33.803" },
  { weight: 3.5, timestamp: "2025-06-05 01:46:33.803" },
  { weight: 3.8, timestamp: "2025-06-05 01:46:33.803" },
  { weight: 3.1, timestamp: "2025-06-05 01:46:33.803" },
  { weight: 3.4, timestamp: "2025-06-05 01:46:33.803" },
  { weight: 3.6, timestamp: "2025-06-05 01:46:33.803" },
  { weight: 3.3, timestamp: "2025-06-05 01:46:33.803" },
  { weight: 3.7, timestamp: "2025-06-05 01:46:33.803" },
  { weight: 3.9, timestamp: "2025-06-05 01:46:33.803" },
  { weight: 3.0, timestamp: "2025-06-05 01:46:33.803" },
];

const DeviceDigitProBabyPage = () => {
  const { mac } = useParams<{ mac: string }>();
  const { createDigitProBabyHistory, fetchDataDigitProBabyByPatientId } =
    useDigitProBaby();

  const {
    eventTareDigitProBaby,
    weightDigitProBaby,
    weightDigitProBabyChartData,
  } = useSocketHandler({ macDevice: mac });

  const [showHistories, setShowHistories] = useState(false);
  const [saveModal, setSaveModal] = useState(false);

  const [patient, setPatient] = useState<Patients>({
    id: "",
    nik: "",
    barcode_image: "",
    name: "",
    gender: "",
    address: "",
    phone: "",
    work: "",
    last_education: "",
    place_of_birth: "",
    date_of_birth: "",
    religion: "",
    height: 0,
    age: 0,
  });
  const [baby, setBaby] = useState({
    id: "",
    name: "",
  });

  // Create baby
  const handleCreateBaby = () => {
    if (
      !mac ||
      !patient.id ||
      !patient.name ||
      !weightDigitProBaby.weight ||
      !baby
    )
      return;
    createDigitProBabyHistory({
      patient_id: patient.id,
      baby_id: baby.id,
      device_id: mac,
      weight: weightDigitProBaby.weight,
    });
  };

  // Get patient from local storage
  useEffect(() => {
    const storedPatient = localStorage.getItem("patient");
    if (storedPatient) {
      setPatient(JSON.parse(storedPatient));
    }
  }, []);

  return (
    <MainLayout title="Digit Pro Baby" state="Measurement">
      <div className="flex flex-col pb-5">
        <div className="flex flex-row h-full gap-6">
          <div className="w-1/2">
            {/* <div
              className="flex flex-row items-center gap-2 bg-white w-fit font-bold px-5 py-2 rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] cursor-pointer"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              <ArrowLeft />
              <p>Back</p>
            </div> */}
            <div className="w-full">
              <p className="font-bold text-2xl">Patient Info</p>
              <PatientInfo
                patient={patient}
                baby={baby}
                setShowHistories={setShowHistories}
              />
              {showHistories && (
                <div className="mt-6">
                  <HistoriesDigitProBaby chartData={historiesData} />
                </div>
              )}
            </div>
          </div>

          <div className="w-1/2 flex flex-col">
            <p className="font-bold text-2xl">Result</p>
            <div className="w-full space-y-6 pt-3">
              <div className="bg-gradient-to-t from-[#6e79f4] to-[#3062E5] rounded-2xl text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-col gap-4 p-4 w-full h-fit">
                <div className="flex flex-row gap-3 items-center font-semibold">
                  <div className="bg-[#ededf9] text-blue-800 rounded-xl p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                    <Icon iconNode={babyPacifier} className="w-8 h-8" />
                  </div>
                  <p className="text-xl">Baby Weights</p>
                </div>
                <div className="flex flex-row gap-10 px-4 pb-2">
                  <div className="aspect-square border-2 rounded-full flex items-center justify-center w-1/4">
                    <div className="flex flex-col items-center gap-4">
                      <img src={weighingIcon} alt="" className="w-16 h-16" />
                    </div>
                  </div>
                  <div className="flex w-full justify-center">
                    <div className="flex flex-row gap-10 my-auto items-end">
                      <p className="text-8xl">
                        {weightDigitProBaby.weight
                          ? weightDigitProBaby.weight
                          : "--"}
                      </p>
                      <p className="text-3xl">kg</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Chart Realtime */}
              <DigitProBabyRealtimeChart
                chartData={weightDigitProBabyChartData}
              />
              <div className="flex flex-row gap-2 items-center">
                <div
                  className="flex flex-row border-2 bg-white border-[#3062E5] text-[#3062E5] w-[250px] items-center mx-auto px-6 py-2 font-bold rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] text-2xl cursor-pointer"
                  onClick={eventTareDigitProBaby}
                >
                  <div className="flex flex-row gap-3 mx-auto">
                    <img src={tareIcon} alt="" className="w-8 h-8" />
                    <p>Tare</p>
                  </div>
                </div>
                <div
                  className="flex flex-row border-2 bg-white border-[#09d03e] text-[#09d03e] w-[250px] items-center mx-auto px-6 py-2 font-bold rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] text-2xl cursor-pointer"
                  onClick={() => setSaveModal(true)}
                >
                  <div className="flex flex-row gap-3 mx-auto items-center">
                    <ArrowDownToLine />
                    <p>Save</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {baby.id === "" && (
        <SelectBaby
          isActive={true}
          baby={baby}
          babySelected={(baby) => setBaby(baby)}
          patientId={patient.id}
        />
      )}
      <SaveMeasurementDigitProBaby
        isActive={saveModal}
        setInactive={() => setSaveModal(false)}
        baby={baby}
        result={weightDigitProBaby.weight}
      />
    </MainLayout>
  );
};

export default DeviceDigitProBabyPage;
