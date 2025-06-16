import DopplerChart from "@/components/charts/chart-digit-pro-baby-realtime";
import MainLayout from "../../components/layouts/main-layout";
import {
  Activity,
  ArrowLeft,
  AudioLines,
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  HeartPulse,
  Icon,
  PersonStanding,
  Thermometer,
  Weight,
} from "lucide-react";
import { PatientInfo } from "@/components/ui/patient-info";

import nibpIcon from "@/assets/icons/nibp.png";
import spo2Icon from "@/assets/icons/spo2.png";
import respIcon from "@/assets/icons/resp.png";
import rrIcon from "@/assets/icons/lungs.png";

// import { HeartRateDoppler } from "@/components/ui/chart-doppler-realtime";
import { useEffect, useState } from "react";
import { Patients } from "@/models/PatientModel";

const DeviceDS001Page = () => {
  const [patient, setPatient] = useState<Patients>({
    id: "",
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

  // Get patient from local storage
  useEffect(() => {
    const storedPatient = localStorage.getItem("patient");
    if (storedPatient) {
      setPatient(JSON.parse(storedPatient));
    }
  }, []);

  return (
    <MainLayout title="DS 001" state="Measurement">
      <div className="flex flex-col h-full gap-6 ">
        <div className="w-full">
          <div className="w-full">
            <p className="font-bold text-2xl">Patient Info</p>
            <PatientInfo patient={patient} />
          </div>
        </div>
    
        <div className="w-full">
          <p className="font-bold text-2xl">Result</p>
          <div className="flex flex-row">
            <div className="flex flex-col"></div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DeviceDS001Page;
