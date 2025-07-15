import {
  Activity,
  EllipsisVertical,
  SquareArrowOutUpRight,
  SquarePen,
  Thermometer,
} from "lucide-react";
import nibpIcon from "@/assets/icons/nibp.png";
import spo2Icon from "@/assets/icons/spo2.png";
import respIcon from "@/assets/icons/resp.png";
import rrIcon from "@/assets/icons/lungs.png";
import prIcon from "@/assets/icons/pr-red.png";

import { HeartPulseChart } from "@/components/chart-heart-pusle";

type Props = {
  id_device: string;
  patientName: string;
  room: string;
  systolic: number;
  diastolic: number;
  mean: number;
  pulse_rate: number;
  temp: number;
  spo2: number;
  pr_spo2: number;
  rr: number;
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
}: Props) => {
  return (
    <div className="bg-[#EDEDF9] flex flex-col gap-2 p-5 rounded-4xl w-full h-fit shadow-[4px_4px_4px_rgba(0,0,0,0.16),-4px_-4px_4px_rgba(255,255,255,1)] text-sm">
      <div className="flex items-center justify-between">
        <p className="font-bold">{room}</p>
        <div className="relative">
          <button
            className="flex items-center gap-1 cursor-pointer transition duration-150"
            onClick={() => {
              const optionsMenu = document.getElementById(
                `options-${id_device}`
              );
              if (optionsMenu) {
                optionsMenu.classList.toggle("hidden");
              }
            }}
          >
            <EllipsisVertical className="w-6 h-6" />
          </button>
          <div
            id={`options-${id_device}`}
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg hidden"
          >
            <ul className="py-1">
              <li
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  window.location.href = `/device/diagnostic_station_001/${id_device}`;
                }}
              >
                <div className="flex items-center gap-2">
                  <SquarePen className="w-5 h-5" />
                  Detail
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="text-xl">{patientName} </p>
      <div className="flex flex-col gap-2 w-full mt-4">
        <div className="flex flex-row gap-4 rounded-2xl">
          {/* NIBP */}
          <div className="bg-red-100 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-3 w-full h-full justify-between gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-3 items-center font-semibold">
                <div className="bg-[#ededf9] text-red-600 rounded-lg p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                  <img src={nibpIcon} className="w-5 h-5" />
                </div>
                <p className="text-lg">NIBP</p>
              </div>
              <div className="flex flex-row items-end gap-4 ml-4">
                <div className="flex flex-row items-center text-4xl gap-2">
                  <p className="">{systolic}</p>/<p>{diastolic}</p>
                </div>
                <p className="text-sm pb-2">mmHg</p>
              </div>
              <div className="ml-4 flex flex-row gap-4 mt-2">
                <div className="flex flex-row w-fit text-white items-center gap-2 bg-red-400 px-3 py-1 rounded-full h-fit">
                  <Activity className="w-6 h-6" />
                  <p className="text-sm">{mean} bpm</p>
                </div>
              </div>
            </div>
            <div className="w-1/3 h-34 bg-white text-red-700 rounded-2xl shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)] p-4">
              <div className="flex flex-row justify-center gap-4 items-center">
                <img src={prIcon} alt="" className="w-6 h-6" />
                <p className=" font-bold text-xl">PR</p>
              </div>
              <div className="flex h-2/3 items-end justify-self-center gap-2">
                <p className="text-5xl">{pulse_rate ? pulse_rate : "--"}</p>
                <p>bpm</p>
              </div>
            </div>
          </div>
          {/* TEMP */}
          <div className="bg-yellow-100 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-3 w-1/4 justify-between gap-2">
            <div className="flex flex-row gap-2 w-full">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-row gap-3 items-center font-semibold">
                  <div className="bg-[#ededf9] text-yellow-500 rounded-lg p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                    <Thermometer className="w-5 h-5" />
                  </div>
                  <p className="text-lg">Temp</p>
                </div>
                <div className="flex flex-row w-full items-center justify-center h-full">
                  <div className="flex flex-row items-center justify-center text-5xl h-full px-4 py-2">
                    <p>{temp}</p>
                  </div>
                  <div className="h-full flex items-end">
                    <p className="text-lg pb-4">°C</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-4 rounded-2xl mt-2">
          {/* SPO2 */}
          <div className="bg-blue-200 text-black rounded-2xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-3 w-1/2 h-full justify-between gap-2">
            <div className="flex flex-row gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-3 items-center font-semibold">
                  <div className="bg-[#ededf9] text-blue-800 rounded-lg p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                    <img src={spo2Icon} className="w-5 h-5" />
                  </div>
                  <p>
                    Sp0<sub>2</sub>
                  </p>
                </div>
                <div className="flex flex-row items-end ">
                  <div className="flex flex-row items-center text-2xl px-4 py-2 rounded-4xl gap-2">
                    <p className="text-4xl">{spo2}</p>
                  </div>
                  <p className="text-sm pb-4">%</p>
                </div>
              </div>
            </div>
          </div>
          {/* RR - Sp02 */}
          <div className="bg-blue-200 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-3 w-1/3 h-fit justify-between gap-2">
            <div className="flex flex-row gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-3 items-center font-semibold">
                  <div className="bg-[#ededf9] text-blue-800 rounded-lg p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                    <img src={respIcon} className="w-5 h-5" />
                  </div>
                  <p>
                    PR - Sp0<sub>2</sub>
                  </p>
                </div>
                <div className="flex flex-row items-end">
                  <div className="flex flex-row items-center text-2xl px-4 py-2 rounded-4xl">
                    <p className="text-4xl">{pr_spo2}</p>
                  </div>
                  <p className="text-sm pb-4">bpm</p>
                </div>
              </div>
            </div>
          </div>
          {/* RR */}
          <div className="bg-green-200 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-3 w-1/3 h-fit justify-between gap-2">
            <div className="flex flex-row gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-3 items-center font-semibold">
                  <div className="bg-[#ededf9] text-yellow-500 rounded-lg p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                    <img src={rrIcon} className="w-5 h-5" />
                  </div>
                  <p>RR</p>
                </div>
                <div className="flex flex-row items-end">
                  <div className="flex flex-row items-center text-2xl px-4 py-2 rounded-4xl">
                    <p className="text-4xl">{rr}</p>
                  </div>
                  <p className="text-sm pb-4">rpm</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <HeartPulseChart className="mt-2" />
      </div>
    </div>
  );
};
