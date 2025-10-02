import {
  Activity,
  EllipsisVertical,
  SquarePen,
  Thermometer,
} from "lucide-react";
import spo2Icon from "@/assets/icons/spo2.png";
import respIcon from "@/assets/icons/resp.png";
import { ECGChart } from "@/components/heart-beat-chart";
import { HeartPulseChart } from "@/components/chart-heart-pusle";
import HeartRateChart from "@/components/heart-rate-chart";

const chartData: { heart_rate: number }[] = [
  { heart_rate: 75 },
  { heart_rate: 80 },
  { heart_rate: 78 },
  { heart_rate: 82 },
  { heart_rate: 85 },
  { heart_rate: 79 },
  { heart_rate: 81 },
  { heart_rate: 77 },
  { heart_rate: 83 },
  { heart_rate: 80 },
];

type Props = {
  id_device: string;
  patientName: string;
  room: {
    id: string;
    number: string;
    type: string;
  };
  ecg: number;
  spo2: number;
  resp: number;
  hr: number;
  temp1: number;
  temp2: number;
  tempD: number;
  isCrysis?: boolean;
};

export const PatientMonitorPM9000Section = ({
  id_device,
  patientName,
  room,
  ecg,
  spo2,
  resp,
  temp1,
  temp2,
  tempD,
  isCrysis,
}: Props) => {
  return (
    <>
      <div
        className={`bg-white flex flex-col gap-2 p-4 rounded-xl w-full h-fit text-sm
    ${isCrysis ? "shadow-[0_0_10px_2px_rgba(239,68,68,0.7)]" : "border"}`}
      >
        {/* Header */}
        <div className="flex flex-row sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1 items-center text-sm">
            <p>Merpati</p>
            <p>|</p>
            <p>{room.number}</p>
            <p>-</p>
            <p>{room.type}</p>
          </div>

          {/* Button Action */}
          <div className="relative self-end sm:self-auto">
            <button
              className="flex items-center gap-1 cursor-pointer transition duration-150"
              onClick={() => {
                const optionsMenu = document.getElementById(
                  `options-${id_device}`
                );
                if (optionsMenu) optionsMenu.classList.toggle("hidden");
              }}
            >
              <EllipsisVertical className="w-5 h-5" />
            </button>
            <div
              id={`options-${id_device}`}
              className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg hidden"
            >
              <ul className="py-1 text-sm">
                <li
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    window.location.href = `/device/pasien_monitor_9000/${id_device}`;
                  }}
                >
                  <div className="flex items-center gap-2">
                    <SquarePen className="w-4 h-4" />
                    Detail
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Patient name */}
        <p className="text-base sm:text-lg font-bold">{patientName}</p>
        <hr
          className={`border-t my-2 ${
            isCrysis ? "border-red-500" : "border-gray-400"
          }`}
        />

        {/* Main content */}
        <div className="flex flex-col flex-1 gap-2">
          {/* SPO2 */}
          <div className="bg-white rounded-lg flex items-center justify-between p-2 border-2">
            <img src={spo2Icon} className="w-5 h-5" />
            <p className="text-sm sm:text-base font-semibold text-blue-600">
              {spo2} %
            </p>
          </div>
          <div className="flex flex-col md:flex-col lg:flex-row w-full gap-2">
            {/* Left column */}
            <div className="flex flex-row lg:flex-col flex-1 gap-2">
              {/* ECG */}
              <div className="bg-white rounded-lg flex flex-col p-2 border-2 w-full">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-500" />
                  <p className="text-xs sm:text-sm">ECG</p>
                </div>
                <div className="flex gap-1 items-end">
                  <p className="text-lg sm:text-xl font-bold text-green-500">
                    {ecg}
                  </p>
                  <span className="text-xs sm:text-base">rpm</span>
                </div>
              </div>

              {/* RESP */}
              <div className="bg-white rounded-lg flex flex-col p-2 border-2 w-full">
                <div className="flex items-center gap-2">
                  <img src={respIcon} className="w-4 h-4" />
                  <p className="text-xs sm:text-sm">RESP</p>
                </div>
                <div className="flex gap-1 items-end">
                  <p className="text-lg sm:text-xl font-bold text-blue-600">
                    {resp}
                  </p>
                  <span className="text-xs sm:text-base">rpm</span>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col flex-1 gap-2">
              {/* TEMP */}
              <div className="bg-white rounded-lg p-2 border-2">
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="w-6 h-6 text-yellow-500" />
                  <p className="text-xs sm:text-sm">Temp</p>
                </div>
                <div className="flex flex-col w-full gap-1">
                  <div className="flex flex-row items-center justify-between">
                    <p className="w-6 text-xs sm:text-sm">T1</p>
                    <div className="flex flex-row items-end gap-1">
                      <p className="text-sm sm:text-lg font-semibold text-yellow-500">
                        {temp1}
                      </p>
                      <p className="text-xs sm:text-sm pb-0.5">°C</p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <p className="w-6 text-xs sm:text-sm">T2</p>
                    <div className="flex flex-row items-end gap-1">
                      <p className="text-sm sm:text-lg font-semibold text-yellow-500">
                        {temp2}
                      </p>
                      <p className="text-xs sm:text-sm pb-0.5">°C</p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <p className="w-6 text-xs sm:text-sm">TD</p>
                    <div className="flex flex-row items-end gap-1">
                      <p className="text-sm sm:text-lg font-semibold text-yellow-500">
                        {tempD}
                      </p>
                      <p className="text-xs sm:text-sm pb-0.5">°C</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer icons */}
        <hr
          className={`border-t my-2 ${
            isCrysis ? "border-red-500" : "border-gray-400"
          }`}
        />
        <div className="flex flex-wrap gap-2">
          <Activity
            className={`w-5 h-5 ${isCrysis ? "text-red-500" : "text-gray-300"}`}
          />
          <img src={respIcon} className="w-5 h-5" />
          <img src={spo2Icon} className="w-5 h-5" />
          <Thermometer
            className={`w-5 h-5 ${isCrysis ? "text-red-500" : "text-gray-300"}`}
          />
        </div>
      </div>
    </>
  );
};
