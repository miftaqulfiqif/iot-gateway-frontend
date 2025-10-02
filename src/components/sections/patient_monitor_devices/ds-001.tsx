import {
  Activity,
  EllipsisVertical,
  SquarePen,
  Thermometer,
} from "lucide-react";
import nibpIcon from "@/assets/icons/nibp.png";
import spo2Icon from "@/assets/icons/spo2.png";
import respIcon from "@/assets/icons/resp.png";
import rrIcon from "@/assets/icons/lungs.png";
import prIcon from "@/assets/icons/pr-red.png";

type Props = {
  id_device: string;
  patientName: string;
  room: { id: string; number: string; type: string };
  systolic: number;
  diastolic: number;
  mean: number;
  pulse_rate: number;
  temp: number;
  spo2: number;
  pr_spo2: number;
  rr: number;
  isCrysis?: boolean;
};

export const PatientMonitorDS001Section = ({
  id_device,
  patientName,
  room,
  systolic,
  diastolic,
  mean,
  pulse_rate,
  temp,
  spo2,
  pr_spo2,
  rr,
  isCrysis,
}: Props) => {
  return (
    <div
      className={`bg-white flex flex-col gap-2 p-4 rounded-xl w-full h-fit text-sm
      ${isCrysis ? "shadow-[0_0_10px_2px_rgba(239,68,68,0.7)]" : "border"}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1 items-center text-xs sm:text-sm">
          <p>Merpati</p>
          <p>|</p>
          <p>{room.number}</p>
          <p>-</p>
          <p>{room.type}</p>
        </div>

        {/* Button Action */}
        <div className="relative self-end sm:self-auto">
          <button
            className="flex items-center gap-1 cursor-pointer"
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
                onClick={() =>
                  (window.location.href = `/device/diagnostic_station_001/${id_device}`)
                }
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
          isCrysis ? "border-red-500" : "border-gray-300"
        }`}
      />

      {/* Main Content */}
      {/* NIBP */}
      <div className="bg-white rounded-lg flex flex-row justify-between p-3 border-2">
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex flex-row gap-2 items-center">
            <img src={nibpIcon} className="w-5 h-5" />
            <p className="text-sm font-medium">NIBP</p>
          </div>
          <div className="flex flex-row items-end gap-2 ml-2 text-red-500">
            <p className="text-xl sm:text-2xl font-bold">{systolic}</p>
            <span className="text-xl sm:text-2xl font-bold">/</span>
            <p className="text-xl sm:text-2xl font-bold">{diastolic}</p>
            <span className="text-xs sm:text-sm pb-1">mmHg</span>
          </div>
          <div className="ml-2 flex flex-row gap-2 mt-1">
            <div className="flex items-center gap-1 bg-red-400 text-white px-3 py-1 rounded-full">
              <Activity className="w-4 h-4" />
              <p className="text-xs sm:text-sm">{mean} bpm</p>
            </div>
          </div>
        </div>
        <div className="mt-2 sm:mt-0 sm:w-1/3 bg-white text-red-700 rounded-xl shadow-inner p-3 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2">
            <img src={prIcon} className="w-6 h-6" />
            <p className="font-bold text-sm">PR</p>
          </div>
          <div className="flex gap-1 items-end">
            <p className="text-xl sm:text-2xl font-bold">
              {pulse_rate || "--"}
            </p>
            <span className="text-xs sm:text-sm">bpm</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {/* Temp */}
        <div className="bg-white rounded-lg flex justify-between p-3 border-2">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center">
              <Thermometer className="w-5 h-5 text-yellow-500" />
              <p className="text-sm sm:text-base">Temp</p>
            </div>
            <div className="flex items-end gap-1">
              <p className="text-xl sm:text-2xl font-bold text-yellow-500">
                {spo2}
              </p>
              <span className="text-xs sm:text-sm pb-1">°C</span>
            </div>
          </div>
        </div>

        {/* SpO2 */}
        <div className="bg-white rounded-lg flex justify-between p-3 border-2">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center">
              <img src={spo2Icon} className="w-5 h-5" />
              <p>
                SpO<sub>2</sub>
              </p>
            </div>
            <div className="flex items-end gap-1">
              <p className="text-xl sm:text-2xl font-bold text-blue-500">
                {spo2}
              </p>
              <span className="text-xs sm:text-sm pb-1">%</span>
            </div>
          </div>
        </div>

        {/* PR-SpO2 */}
        <div className="bg-white rounded-lg flex justify-between p-3 border-2">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center">
              <img src={respIcon} className="w-5 h-5" />
              <p>
                PR - SpO<sub>2</sub>
              </p>
            </div>
            <div className="flex items-end gap-1">
              <p className="text-xl sm:text-2xl font-bold text-blue-500">
                {pr_spo2}
              </p>
              <span className="text-xs sm:text-sm pb-1">bpm</span>
            </div>
          </div>
        </div>

        {/* RR */}
        <div className="bg-white rounded-lg flex justify-between p-3 border-2">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center">
              <img src={rrIcon} className="w-5 h-5" />
              <p>RR</p>
            </div>
            <div className="flex items-end gap-1">
              <p className="text-xl sm:text-2xl font-bold text-green-500">
                {rr}
              </p>
              <span className="text-xs sm:text-sm pb-1">rpm</span>
            </div>
          </div>
        </div>
      </div>

      <hr
        className={`border-t my-2 ${
          isCrysis ? "border-red-500" : "border-gray-300"
        }`}
      />

      {/* Footer icons */}
      <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
        <img src={nibpIcon} className="w-6 h-6" />
        <Activity
          className={`w-5 h-5 ${isCrysis ? "text-red-500" : "text-gray-300"}`}
        />
        <img src={prIcon} className="w-6 h-6" />
        <Thermometer
          className={`w-5 h-5 ${isCrysis ? "text-red-500" : "text-gray-300"}`}
        />
        <img src={spo2Icon} className="w-6 h-6" />
        <img src={respIcon} className="w-6 h-6" />
        <img src={rrIcon} className="w-6 h-6" />
      </div>
    </div>
  );
};
