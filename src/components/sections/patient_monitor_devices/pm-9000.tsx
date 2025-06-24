import {
  Activity,
  EllipsisVertical,
  SquareArrowOutUpRight,
  Thermometer,
} from "lucide-react";
import spo2Icon from "@/assets/icons/spo2.png";
import respIcon from "@/assets/icons/resp.png";
import { HeartbeatChart } from "@/components/heart-beat-chart";
import { ChartHeartPulse } from "@/components/chart-heart-pusle";

type Props = {
  id_device: string;
  patientName: string;
  room: string;
  ecg: number;
  spo2: number;
  resp: number;
  hr: number;
  temp1: number;
  temp2: number;
  tempD: number;
};

export const PatientMonitorPM9000Section = ({
  id_device,
  patientName,
  room,
  ecg,
  spo2,
  resp,
  hr,
  temp1,
  temp2,
  tempD,
}: Props) => {
  return (
    <>
      <div className="bg-[#EDEDF9] flex flex-col gap-2 p-4 rounded-3xl w-full h-fit shadow-[4px_4px_4px_rgba(0,0,0,0.16),-4px_-4px_4px_rgba(255,255,255,1)] text-sm">
        <div className="flex items-center justify-between">
          <p className="font-bold">{room}</p>
          <button className="flex items-center gap-1 cursor-pointer transition duration-150 ">
            <EllipsisVertical className="w-6 h-6" />
          </button>
        </div>
        <p className="text-xl">{patientName} </p>
        <div className="flex flex-row w-full h-fit space-x-2 mt-4 gap-2">
          <div className="flex flex-col w-full gap-3">
            {/* ECG */}
            <div className="bg-green-200 text-black rounded-xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-2 w-full justify-between gap-2">
              <div className="flex flex-row gap-2">
                <div className="flex flex-col">
                  <div className="flex flex-row gap-2">
                    <div className="bg-[#ededf9] text-green-700 rounded-sm p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xl">ECG</p>
                      <div className="flex flex-row gap-1">
                        <div className="flex flex-row items-center text-2xl rounded-4xl">
                          <p className="text-5xl">{ecg}</p>
                        </div>
                        <p className="text-[10px]">rpm</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RESP */}
            <div className="bg-blue-200 text-black rounded-xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-2 w-full justify-between gap-2">
              <div className="flex flex-row gap-2 w-full">
                <div className="bg-[#ededf9] text-green-700 rounded-sm p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                  <img src={respIcon} className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl">RESP</p>
                  <div className="flex flex-row gap-1 ">
                    <div className="flex flex-row items-end text-2xl rounded-4xl">
                      <p className="text-5xl">{resp}</p>
                    </div>
                    <p className="text-[10px]">rpm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            {/* SPO-2 */}
            <div className="bg-blue-200 text-black rounded-xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-2 w-full justify-between gap-2">
              <div className="flex flex-row gap-2">
                <div className="flex flex-col">
                  <div className="flex flex-row gap-2">
                    <div className="bg-[#ededf9] text-green-700 rounded-sm p-1 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                      <img src={spo2Icon} className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                      {/* <p className="text-xs">ECG</p> */}
                      <div className="flex flex-row gap-1">
                        <div className="flex flex-row items-center text-2xl rounded-4xl">
                          <p>{spo2}</p>
                        </div>
                        <p className="text-xs pb-4">%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-yellow-100 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-2 w-full justify-between gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-3 items-center font-semibold">
                  <div className="bg-[#ededf9] text-yellow-500 rounded-sm p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                    <Thermometer className="w-4 h-4" />
                  </div>
                  <p>Temp</p>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row items-center gap-6">
                    <p className="w-1">T1</p>
                    <div className="flex flex-row items-end gap-1">
                      <p className="text-xl w-10 text-end">{temp1}</p>
                      <p className="text-sm pb-0.5">°C</p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-6">
                    <p className="w-1">T2</p>
                    <div className="flex flex-row items-end gap-1">
                      <p className="text-xl w-10 text-end">{temp2}</p>
                      <p className="text-sm pb-0.5">°C</p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-6">
                    <p className="w-1">TD</p>
                    <div className="flex flex-row items-end gap-1">
                      <p className="text-xl w-10 text-end">{tempD}</p>
                      <p className="text-sm pb-0.5">°C</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <HeartbeatChart className="mt-4" />
        <ChartHeartPulse className="" />
      </div>
    </>
  );
};
