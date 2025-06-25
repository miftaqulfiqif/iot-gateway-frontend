import {
  Activity,
  EllipsisVertical,
  SquareArrowOutUpRight,
  Thermometer,
} from "lucide-react";
import nibpIcon from "@/assets/icons/nibp.png";
import spo2Icon from "@/assets/icons/spo2.png";
import respIcon from "@/assets/icons/resp.png";
import rrIcon from "@/assets/icons/lungs.png";

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
        <button className="flex items-center gap-1 cursor-pointer transition duration-150 ">
          <EllipsisVertical className="w-6 h-6" />
        </button>
      </div>
      <p className="text-xl">{patientName} </p>
      <div className="flex flex-col gap-2 w-full mt-4">
        <div className="flex flex-row gap-4 rounded-2xl">
          {/* NIBP */}
          <div className="bg-red-100 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-full h-full justify-between gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-3 items-center font-semibold">
                <div className="bg-[#ededf9] text-red-600 rounded-lg p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                  <img src={nibpIcon} className="w-5 h-5" />
                </div>
                <p>NIBP</p>
              </div>
              <div className="flex flex-row items-end gap-4">
                <div className="flex flex-row items-center text-4xl gap-2">
                  <p className="">{systolic}</p>/<p>{diastolic}</p>
                </div>
                <p className="text-sm pb-2">mmHg</p>
              </div>
              <div className="ml-4 flex flex-row gap-4 mt-2">
                <div className="flex flex-row w-fit text-white items-center gap-2 bg-red-400 px-3 py-1 rounded-full h-fit">
                  <Activity className="w-4 h-4" />
                  <p className="text-xs">{mean} bpm</p>
                </div>
              </div>
            </div>
          </div>
          {/* PR */}
          <div className="bg-red-100 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-fit justify-between gap-2">
            <div className="flex flex-row gap-2">
              <div className="flex flex-col gap-2">
                <p className="font-semibold mx-auto">PR</p>
                <p className="mx-auto text-2xl flex justify-center items-center h-full">
                  {pulse_rate}
                </p>
              </div>
            </div>
          </div>
          {/* TEMP */}
          <div className="bg-yellow-100 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-fit justify-between gap-2">
            <div className="flex flex-row gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-3 items-center font-semibold">
                  <div className="bg-[#ededf9] text-yellow-500 rounded-lg p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                    <Thermometer className="w-5 h-5" />
                  </div>
                  <p>Temp</p>
                </div>
                <div className="flex flex-row items-end">
                  <div className="flex flex-row items-center justify-center text-4xl h-full px-4 py-2">
                    <p>{temp}</p>
                  </div>
                  <p className="text-lg pb-4">°C</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-4 rounded-2xl mt-2">
          {/* SPO2 */}
          <div className="bg-blue-200 text-black rounded-2xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-1/2 h-full justify-between gap-2">
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
                    <p className="">{spo2}</p>
                  </div>
                  <p className="text-sm pb-4">%</p>
                </div>
              </div>
            </div>
          </div>
          {/* RR - Sp02 */}
          <div className="bg-blue-200 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-1/3 h-fit justify-between gap-2">
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
                    <p>{pr_spo2}</p>
                  </div>
                  <p className="text-sm pb-4">bpm</p>
                </div>
              </div>
            </div>
          </div>
          {/* RR */}
          <div className="bg-green-200 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-1/3 h-fit justify-between gap-2">
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
                    <p>{rr}</p>
                  </div>
                  <p className="text-sm pb-4">rpm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
