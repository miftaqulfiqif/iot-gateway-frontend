import MainLayout from "../../components/layouts/main-layout";
import {
  Activity,
  ArrowDownToLine,
  AudioLines,
  StopCircle,
} from "lucide-react";
import { PatientInfo } from "@/components/ui/patient-info";

import heartBeatImg from "@/assets/imgs/hear-beat.png";

import battery25Icon from "@/assets/icons/battery-25.png";
import battery50Icon from "@/assets/icons/battery-50.png";
import battery75Icon from "@/assets/icons/battery-75.png";
import battery100Icon from "@/assets/icons/battery-100.png";

import { Patients } from "@/models/PatientModel";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChartDopplerRealtime from "@/components/charts/chart-doppler-realtime";
import HistoriesDoppler from "@/components/charts/chart-histories-doppler";
import { SaveMeasurementDoppler } from "@/components/modals/save_measurement/save-measurement-doppler";
import { useSocketDoppler } from "@/hooks/socket/devices/SocketDoppler";

const historiesData = [
  { heart_rate: 3.2, timestamp: "2025-06-05 01:46:33.803" },
  { heart_rate: 3.5, timestamp: "2025-06-05 01:46:33.803" },
  { heart_rate: 3.8, timestamp: "2025-06-05 01:46:33.803" },
  { heart_rate: 3.1, timestamp: "2025-06-05 01:46:33.803" },
  { heart_rate: 3.4, timestamp: "2025-06-05 01:46:33.803" },
  { heart_rate: 3.6, timestamp: "2025-06-05 01:46:33.803" },
  { heart_rate: 3.3, timestamp: "2025-06-05 01:46:33.803" },
  { heart_rate: 3.7, timestamp: "2025-06-05 01:46:33.803" },
  { heart_rate: 3.9, timestamp: "2025-06-05 01:46:33.803" },
  { heart_rate: 3.0, timestamp: "2025-06-05 01:46:33.803" },
];

const DeviceDopplerPage = () => {
  const { mac } = useParams();
  // const { dataDopplerChartData, dataDoppler } = useSocketHandler({
  //   macDevice: mac,
  // });

  const { data, realtime } = useSocketDoppler(mac!);

  const [patient, setPatient] = useState<Patients>();
  const [showHistories, setShowHistories] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    if (realtime.length > 0) {
      const last = realtime[realtime.length - 1];
      setResult(last.heart_rate_avg);
    } else {
      setResult(0);
    }
  }, [realtime]);

  // Get patient from local storage
  useEffect(() => {
    const storedPatient = localStorage.getItem("patient");
    if (storedPatient) {
      setPatient(JSON.parse(storedPatient));
    }
  }, []);

  return (
    <MainLayout title="Doppler" state="Measurement">
      <div className="flex flex-col">
        <div className="flex flex-row h-full gap-6">
          <div className="w-1/2">
            <div className="w-full">
              <p className="font-bold text-2xl">Patient Info</p>
              <div className="flex flex-col gap-6">
                <PatientInfo
                  patient={patient}
                  setShowHistories={setShowHistories}
                />
                {showHistories && (
                  <HistoriesDoppler chartData={historiesData} />
                )}
              </div>
            </div>
          </div>

          <div className="w-1/2">
            <p className="font-bold text-2xl">Result</p>
            <div className="flex flex-col gap-2 h-full">
              <div className="bg-gradient-to-t from-[#6e79f4] to-[#3062E5] rounded-2xl text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-8 w-full h-fit mt-3 justify-between gap-2">
                <div className="flex flex-row w-54 gap-4">
                  <p className="text-8xl w-38 text-end">{data.heart_rate}</p>
                  <div className="text-8xl">
                    <img src={heartBeatImg} alt="" className="h-6 w-12 " />
                    <span className="text-sm">bpm</span>
                  </div>
                </div>
                <div className="flex flex-col justify-end">
                  <div className="flex flex-row items-center gap-2 bg-blue-400 px-3 py-1 rounded-full h-fit">
                    <Activity className="w-6 h-6" />
                    <p className="text-sm">{`${result} bpm`}</p>
                  </div>
                </div>

                <div className="flex flex-gap gap-8">
                  <AudioLines
                    className={`w-8 h-8 ${
                      data.sound_quality === "poor"
                        ? "text-red-500"
                        : data.sound_quality === "medium"
                        ? "text-yellow-300"
                        : "text-green-400"
                    }`}
                  />
                  {data.battery_level ? (
                    <img
                      src={
                        {
                          100: battery100Icon,
                          75: battery75Icon,
                          50: battery50Icon,
                          25: battery25Icon,
                        }[data.battery_level]
                      }
                      alt=""
                      className="w-8 h-8"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="w-full pt-3 ">
                <ChartDopplerRealtime chartData={realtime} />
              </div>
              <div className="flex flex-row gap-2 items-center h-full">
                <div
                  className="flex flex-row border-2 bg-white border-[#3062E5] text-[#3062E5] w-[250px] items-center mx-auto px-6 py-2 font-bold rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] text-2xl cursor-pointer"
                  onClick={() => alert("stop")}
                >
                  <div className="flex flex-row gap-3 mx-auto items-center">
                    <StopCircle />
                    <p>STOP</p>
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
      <SaveMeasurementDoppler
        isActive={saveModal}
        setInactive={() => setSaveModal(false)}
        patient={patient}
        result={result}
      />
    </MainLayout>
  );
};

export default DeviceDopplerPage;
