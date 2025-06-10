import DopplerChart from "@/components/chart-digit-pro-baby-realtime";
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
  Weight,
} from "lucide-react";
import { PatientInfo } from "@/components/ui/patient-info";
import { IdaChart } from "@/components/chart-ida";
import { babyPacifier } from "@lucide/lab";

import weighingIcon from "@/assets/icons/pediatrics.png";
import heartBeatImg from "@/assets/imgs/hear-beat.png";
import DopplerHeartRateChart from "@/components/ui/chart-doppler-realtime";

import battery25Icon from "@/assets/icons/battery-25.png";
import battery50Icon from "@/assets/icons/battery-50.png";
import battery75Icon from "@/assets/icons/battery-75.png";
import battery100Icon from "@/assets/icons/battery-100.png";

import { useSocketHandler } from "@/hooks/socket/SocketHandler";
import { Patients } from "@/models/PatientModel";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DeviceDopplerPage = () => {
  const { mac } = useParams();
  const { dataDopplerChartData, dataDoppler } = useSocketHandler({
    macDevice: mac,
  });

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
    weight: 0,
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
    <MainLayout title="Doppler" state="Measurement">
      <div className="flex flex-row h-full gap-6 ">
        <div className="w-1/2">
          <div className="w-full">
            <p className="font-bold text-2xl">Patient Info</p>
            <PatientInfo patient={patient} />
          </div>
        </div>

        <div className="w-1/2">
          <div className="flex flex-row gap-4 items-center">
            <p className="font-bold text-2xl">Result</p>
            {/* <div
              className="flex flex-row items-center gap-2 bg-white w-fit font-bold px-5 py-2 rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] cursor-pointer"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              <ArrowLeft />
              <p>Back</p>
            </div> */}
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-gradient-to-t from-[#6e79f4] to-[#3062E5] rounded-2xl text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-8 w-full h-fit mt-3 justify-between gap-2">
              <div className="flex flex-col gap-4 items-baseline-last">
                <div className="flex flex-col items-baseline-last w-54">
                  <img src={heartBeatImg} alt="" className="w-12 absolute" />
                  <p className="text-8xl">
                    {dataDoppler.heart_rate}{" "}
                    <span className="text-sm">bpm</span>
                  </p>
                </div>
              </div>
              {/* <div className="flex flex-col justify-end">
                <div className="flex flex-row items-center gap-2 bg-blue-400 px-3 py-1 rounded-full h-fit">
                  <Activity className="w-6 h-6" />
                  <p className="text-sm">310 bpm</p>
                </div>
              </div> */}

              <div className="flex flex-gap gap-8">
                <AudioLines
                  className={`w-8 h-8 ${
                    dataDoppler.sound_quality === "poor"
                      ? "text-red-500"
                      : dataDoppler.sound_quality === "medium"
                      ? "text-yellow-300"
                      : "text-green-400"
                  }`}
                />
                <img
                  src={
                    {
                      100: battery100Icon,
                      75: battery75Icon,
                      50: battery50Icon,
                      25: battery25Icon,
                    }[dataDoppler.battery_level]
                  }
                  alt=""
                  className="w-8 h-8"
                />
              </div>
            </div>
            <div className="w-full space-y-6 pt-3 ">
              <DopplerHeartRateChart chartData={dataDopplerChartData} />
              {/* <div className="flex flex-row gap-4">
              Square 1
              <div className="flex-1 aspect-square bg-[#3062E5] rounded-2xl text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-col justify-center items-center gap-3 p-5">
                <div className="aspect-square w-full border-2 rounded-full flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <Weight className="w-full h-full" />
                    <p className="bg-blue-400 px-4 rounded-full text-center w-20">
                      83 Kg
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <PersonStanding className="w-6 h-6" />
                  <p>Adult Weights</p>
                </div>
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DeviceDopplerPage;
