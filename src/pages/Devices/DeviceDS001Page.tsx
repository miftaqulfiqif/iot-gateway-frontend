import MainLayout from "../../components/layouts/main-layout";
import { Activity, Thermometer } from "lucide-react";
import { PatientInfo } from "@/components/ui/patient-info";
import { HeartPulseChart } from "@/components/chart-heart-pusle";

import nibpIcon from "@/assets/icons/nibp.png";
import spo2Icon from "@/assets/icons/spo2.png";
import prSpo2Icon from "@/assets/icons/resp.png";
import prIcon from "@/assets/icons/pr-red.png";
import rrIcon from "@/assets/icons/lungs.png";

// import { HeartRateDoppler } from "@/components/ui/chart-doppler-realtime";
import { useEffect, useState } from "react";
import { Patients } from "@/models/PatientModel";
import { HistoryDS001Nibp } from "@/components/tables/history-ds001-nibp";
import { useParams } from "react-router-dom";
import { TableHistoryDS001 } from "@/components/tables/history-ds001";
import { useSocketDS001 } from "@/hooks/socket/devices/SocketDS001";

const historiesData = [
  {
    timestamp: "2023-09-01 10:00:00",
    systolic: 120,
    diastolic: 80,
    map: 100,
    pulseRate: 60,
  },
  {
    timestamp: "2023-09-01 10:00:00",
    systolic: 120,
    diastolic: 80,
    map: 100,
    pulseRate: 60,
  },
  {
    timestamp: "2023-09-01 10:00:00",
    systolic: 120,
    diastolic: 80,
    map: 100,
    pulseRate: 60,
  },
  {
    timestamp: "2023-09-01 10:00:00",
    systolic: 120,
    diastolic: 80,
    map: 100,
    pulseRate: 60,
  },
  {
    timestamp: "2023-09-01 10:00:00",
    systolic: 120,
    diastolic: 80,
    map: 100,
    pulseRate: 60,
  },
  {
    timestamp: "2023-09-01 10:00:00",
    systolic: 120,
    diastolic: 80,
    map: 100,
    pulseRate: 60,
  },
  {
    timestamp: "2023-09-01 10:00:00",
    systolic: 120,
    diastolic: 80,
    map: 100,
    pulseRate: 60,
  },
  {
    timestamp: "2023-09-01 10:00:00",
    systolic: 120,
    diastolic: 80,
    map: 100,
    pulseRate: 60,
  },
  {
    timestamp: "2023-09-01 10:00:00",
    systolic: 120,
    diastolic: 80,
    map: 100,
    pulseRate: 60,
  },
  {
    timestamp: "2023-09-01 10:00:00",
    systolic: 120,
    diastolic: 80,
    map: 100,
    pulseRate: 60,
  },
  {
    timestamp: "2023-09-01 10:00:00",
    systolic: 120,
    diastolic: 80,
    map: 100,
    pulseRate: 60,
  },
];

const historiesDataPM9000 = [
  {
    id: "1",
    patient_handler: {
      patient: {
        name: "Andi Wijaya",
      },
    },
    systolic: 120,
    diastolic: 80,
    mean: 93,
    pulse_rate: 75,
    temp: 36.8,
    spo2: 98,
    pr_spo2: 75,
    rr: 15,
    timestamp: "2025-07-14T08:30:00Z",
  },
  {
    id: "2",
    patient_handler: {
      patient: {
        name: "Siti Handayani",
      },
    },
    systolic: 130,
    diastolic: 85,
    mean: 100,
    pulse_rate: 82,
    temp: 37.1,
    spo2: 96,
    pr_spo2: 82,
    rr: 15,
    timestamp: "2025-07-14T09:45:00Z",
  },
  {
    id: "3",
    patient_handler: {
      patient: {
        name: "Budi Santoso",
      },
    },
    systolic: 110,
    diastolic: 70,
    mean: 83,
    pulse_rate: 68,
    temp: 36.5,
    spo2: 99,
    pr_spo2: 68,
    rr: 15,
    timestamp: "2025-07-14T10:15:00Z",
  },
  {
    id: "4",
    patient_handler: {
      patient: {
        name: "Dewi Lestari",
      },
    },
    systolic: 145,
    diastolic: 95,
    mean: 112,
    pulse_rate: 90,
    temp: 38.2,
    spo2: 94,
    pr_spo2: 90,
    rr: 15,
    timestamp: "2025-07-14T11:10:00Z",
  },
  {
    id: "5",
    patient_handler: {
      patient: {
        name: "Agus Pramono",
      },
    },
    systolic: 125,
    diastolic: 78,
    mean: 94,
    pulse_rate: 72,
    temp: 36.9,
    spo2: 97,
    pr_spo2: 72,
    rr: 15,
    timestamp: "2025-07-14T12:00:00Z",
  },
];

const DeviceDS001Page = () => {
  const { ip } = useParams();
  // const { dataDS001 } = useSocketHandler({ ipDevice: ip });
  const { data, dataPleth, dataNibp } = useSocketDS001(ip!);

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

  // Get patient from local storage
  useEffect(() => {
    const storedPatient = localStorage.getItem("patient");
    if (storedPatient) {
      setPatient(JSON.parse(storedPatient));
    }
  }, []);

  return (
    <MainLayout title="DS 001" state="Patient Monitor">
      <div className="flex flex-col gap-2 pb-5">
        <div className="w-full flex flex-row gap-6 ">
          <div className="w-1/2 h-full flex flex-col">
            <p className="font-semibold text-xl">Patient Info</p>
            <PatientInfo patient={patient} isPatientMonitor />
            <p className="text-xl mt-7">History NIBP</p>
            <div className="shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-2xl mt-2">
              <HistoryDS001Nibp historiesData={historiesData.slice(0, 10)} />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <p className="text-xl"> Realtime Chart</p>

            <div className="flex flex-row gap-4 rounded-2xl">
              {/* NIBP */}
              <div className="bg-red-100 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-full h-full justify-between gap-2">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-3 items-center font-semibold">
                    <div className="bg-[#ededf9] text-red-600 rounded-xl p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                      <img src={nibpIcon} className="w-8 h-8" />
                    </div>
                    <p>NIBP</p>
                  </div>
                  <div className="flex flex-row items-end gap-4">
                    <div className="flex flex-row items-center text-5xl gap-2 pl-6">
                      <p className="">
                        {data?.systolic ? data.systolic : "--"}
                      </p>
                      /<p>{data?.diastolic ? data.diastolic : "--"}</p>
                    </div>
                    <p className="text-lg pb-2">mmHg</p>
                  </div>
                  <div className="ml-4 flex flex-row gap-4 mt-2">
                    <div className="flex flex-row w-fit text-white items-center gap-2 bg-red-400 px-3 py-1 rounded-full h-fit">
                      <Activity className="w-6 h-6" />
                      <p className="text-sm">
                        {data?.mean ? data.mean : "--"} bpm
                      </p>
                    </div>
                    {/* <div className="flex flex-row w-fit text-red-900 items-center gap-2 bg-red-300 px-3 py-1 rounded-full h-fit">
                      <img src={prIcon} alt="" className="w-6 h-6" />
                      <p className="text-sm">
                        {dataDS001?.pulse_rate ? dataDS001.pulse_rate : "-- "}
                        bpm
                      </p>
                    </div> */}
                  </div>
                </div>
                <div className="w-1/3 h-full  bg-white text-red-700 rounded-2xl shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)] p-4">
                  <div className="flex flex-row justify-center gap-4 items-center">
                    <img src={prIcon} alt="" className="w-6 h-6" />
                    <p className=" font-bold text-xl">PR</p>
                  </div>
                  <div className="flex h-2/3 items-end justify-self-center gap-2">
                    <p className="text-5xl">
                      {data?.pulse_rate ? data.pulse_rate : "--"}
                    </p>
                    <p>bpm</p>
                  </div>
                </div>
              </div>

              {/* TEMP */}
              <div className="bg-yellow-100 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-1/3 justify-between gap-2">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-3 items-center font-semibold">
                      <div className="bg-[#ededf9] text-yellow-500 rounded-xl p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                        <Thermometer className="w-8 h-8" />
                      </div>
                      <p>Temp</p>
                    </div>
                    <div className="flex flex-row items-end">
                      <div className="flex flex-row items-center justify-center text-6xl h-full px-4 py-2">
                        <p>{data?.temp ? data.temp : "--"}</p>
                      </div>
                      <p className="text-lg pb-4">°C</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-4 rounded-2xl mt-2">
              {/* SPO2 */}
              <div className="bg-blue-200 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-1/3 h-full justify-between gap-2">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-3 items-center font-semibold">
                      <div className="bg-[#ededf9] text-blue-800 rounded-xl p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                        <img src={spo2Icon} className="w-8 h-8" />
                      </div>
                      <p>
                        Sp0<sub>2</sub>
                      </p>
                    </div>
                    <div className="flex flex-row items-end ">
                      <div className="flex flex-row items-center text-5xl px-4 py-2 rounded-4xl gap-2">
                        <p className="">{data?.spo2 ? data.spo2 : "--"}</p>
                      </div>
                      <p className="text-lg pb-4">%</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* PR - Sp02 */}
              <div className="bg-blue-200 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-1/3 h-fit justify-between gap-2">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-3 items-center font-semibold">
                      <div className="bg-[#ededf9] text-blue-800 rounded-xl p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                        <img src={prSpo2Icon} className="w-8 h-8" />
                      </div>
                      <p>
                        PR - Sp0<sub>2</sub>
                      </p>{" "}
                    </div>
                    <div className="flex flex-row items-end">
                      <div className="flex flex-row items-center text-5xl px-4 py-2 rounded-4xl">
                        <p>{data?.pr_spo2 ? data.pr_spo2 : "--"}</p>
                      </div>
                      <p className="text-lg pb-4">bpm</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* RR */}
              <div className="bg-green-200 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-1/3 h-fit justify-between gap-2">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-3 items-center font-semibold">
                      <div className="bg-[#ededf9] text-yellow-500 rounded-xl p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                        <img src={rrIcon} className="w-8 h-8" />
                      </div>
                      <p>RR</p>
                    </div>
                    <div className="flex flex-row items-end">
                      <div className="flex flex-row items-center text-5xl px-4 py-2 rounded-4xl">
                        <p>{data?.rr ? data.rr : "--"}</p>
                      </div>
                      <p className="text-lg pb-4">rpm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <HeartPulseChart
              title="Plethysmogram"
              className="h-[410px] mt-2"
              pleth_data={dataPleth}
            />
          </div>
        </div>
        <div className="w-full pb-5 ">
          {/* NIBP */}
          <p className="text-xl mt-10 mb-2">History</p>
          <div className="flex flex-row gap-6">
            <div className="w-full">
              <TableHistoryDS001
                data={historiesDataPM9000}
                goToPreviousPage={() => {}}
                goToNextPage={() => {}}
                goToPage={() => {}}
                currentPage={1}
                totalPage={1}
                limit={10}
                isDetailPatient
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DeviceDS001Page;
