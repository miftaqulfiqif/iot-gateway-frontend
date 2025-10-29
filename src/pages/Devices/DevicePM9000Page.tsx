import MainLayout from "../../components/layouts/main-layout";
import { Activity, Thermometer } from "lucide-react";
import { PatientInfo } from "@/components/ui/patient-info";

import spo2Icon from "@/assets/icons/spo2.png";
import respIcon from "@/assets/icons/resp.png";
import nibpIcon from "@/assets/icons/nibp.png";

import { HeartPulseChart } from "@/components/chart-heart-pusle";
import { ECGChart } from "@/components/heart-beat-chart";
import { useEffect, useState } from "react";
import { Patients } from "@/models/PatientModel";
import { useParams } from "react-router-dom";
import HeartRateChart from "@/components/heart-rate-chart";
import { HistoryPM9000Nibp } from "@/components/tables/history-pm9000-nibp";
import { HistoriesPm900NibpChart } from "@/components/charts/histories-pm900-nibp-chart";
import { TableHistoryPM9000 } from "@/components/tables/history-pm9000";
import { useSocketPM9000 } from "@/hooks/socket/devices/SocketPM9000";

const historiesDataNibp = [
  {
    systolic: 118,
    diastolic: 76,
    mean: 90,
    recorded_at: "2023-09-01 08:00:00",
  },
  {
    systolic: 122,
    diastolic: 78,
    mean: 92,
    recorded_at: "2023-09-02 08:00:00",
  },
  {
    systolic: 125,
    diastolic: 80,
    mean: 95,
    recorded_at: "2023-09-03 08:00:00",
  },
  {
    systolic: 130,
    diastolic: 82,
    mean: 98,
    recorded_at: "2023-09-04 08:00:00",
  },
  {
    systolic: 128,
    diastolic: 79,
    mean: 95,
    recorded_at: "2023-09-05 08:00:00",
  },
  {
    systolic: 115,
    diastolic: 75,
    mean: 88,
    recorded_at: "2023-09-06 08:00:00",
  },
  {
    systolic: 119,
    diastolic: 77,
    mean: 90,
    recorded_at: "2023-09-07 08:00:00",
  },
  {
    systolic: 124,
    diastolic: 81,
    mean: 96,
    recorded_at: "2023-09-08 08:00:00",
  },
  {
    systolic: 127,
    diastolic: 83,
    mean: 97,
    recorded_at: "2023-09-09 08:00:00",
  },
  {
    systolic: 140,
    diastolic: 92,
    mean: 97,
    recorded_at: "2023-09-09 08:00:00",
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
    ecg: 100,
    spo2: 98,
    resp: 18,
    systolic: 120,
    diastolic: 80,
    mean: 93,
    temp1: 36.5,
    temp2: 36.8,
    delta_temp: 0.3,
    recorded_at: "2023-09-01T08:30:00Z",
  },
  {
    id: "2",
    patient_handler: {
      patient: {
        name: "Siti Aminah",
      },
    },
    ecg: 92,
    spo2: 95,
    resp: 22,
    systolic: 135,
    diastolic: 88,
    mean: 104,
    temp1: 37.2,
    temp2: 37.4,
    delta_temp: 0.2,
    recorded_at: "2023-09-02T09:00:00Z",
  },
  {
    id: "3",
    patient_handler: {
      patient: {
        name: "Budi Santoso",
      },
    },
    ecg: 92,
    spo2: 97,
    resp: 16,
    systolic: 110,
    diastolic: 72,
    mean: 85,
    temp1: 36.9,
    temp2: 37.1,
    delta_temp: 0.2,
    recorded_at: "2023-09-03T09:45:00Z",
  },
  {
    id: "4",
    patient_handler: {
      patient: {
        name: "Rina Marlina",
      },
    },
    ecg: 102,
    spo2: 99,
    resp: 19,
    systolic: 125,
    diastolic: 84,
    mean: 98,
    temp1: 37.0,
    temp2: 36.9,
    delta_temp: -0.1,
    recorded_at: "2023-09-04T10:15:00Z",
  },
  {
    id: "5",
    patient_handler: {
      patient: {
        name: "Dewi Lestari",
      },
    },
    ecg: 102,
    spo2: 96,
    resp: 20,
    systolic: 118,
    diastolic: 79,
    mean: 92,
    temp1: 36.8,
    temp2: 37.0,
    delta_temp: 0.2,
    recorded_at: "2023-09-05T11:00:00Z",
  },
  {
    id: "6",
    patient_handler: {
      patient: {
        name: "Agus Pratama",
      },
    },
    ecg: 92,
    spo2: 97,
    resp: 17,
    systolic: 122,
    diastolic: 82,
    mean: 95,
    temp1: 36.7,
    temp2: 36.9,
    delta_temp: 0.2,
    recorded_at: "2023-09-06T08:30:00Z",
  },
  {
    id: "7",
    patient_handler: {
      patient: {
        name: "Lina Rahmawati",
      },
    },
    ecg: 130,
    spo2: 94,
    resp: 21,
    systolic: 130,
    diastolic: 85,
    mean: 100,
    temp1: 37.5,
    temp2: 37.8,
    delta_temp: 0.3,
    recorded_at: "2023-09-07T09:00:00Z",
  },
  {
    id: "8",
    patient_handler: {
      patient: {
        name: "Joko Hermawan",
      },
    },
    ecg: 92,
    spo2: 98,
    resp: 18,
    systolic: 117,
    diastolic: 78,
    mean: 91,
    temp1: 36.6,
    temp2: 36.8,
    delta_temp: 0.2,
    recorded_at: "2023-09-08T09:45:00Z",
  },
  {
    id: "9",
    patient_handler: {
      patient: {
        name: "Yuni Arlina",
      },
    },
    ecg: 108,
    spo2: 93,
    resp: 23,
    systolic: 140,
    diastolic: 90,
    mean: 107,
    temp1: 38.1,
    temp2: 38.3,
    delta_temp: 0.2,
    recorded_at: "2023-09-09T10:15:00Z",
  },
  {
    id: "10",
    patient_handler: {
      patient: {
        name: "Rangga Saputra",
      },
    },
    ecg: 92,
    spo2: 96,
    resp: 16,
    systolic: 108,
    diastolic: 70,
    mean: 83,
    temp1: 36.4,
    temp2: 36.6,
    delta_temp: 0.2,
    recorded_at: "2023-09-10T11:00:00Z",
  },
  {
    id: "11",
    patient_handler: {
      patient: {
        name: "Fitri Nuraini",
      },
    },
    ecg: 108,
    spo2: 99,
    resp: 18,
    systolic: 124,
    diastolic: 80,
    mean: 95,
    temp1: 36.9,
    temp2: 36.9,
    delta_temp: 0.0,
    recorded_at: "2023-09-11T08:30:00Z",
  },
  {
    id: "12",
    patient_handler: {
      patient: {
        name: "Arif Hidayat",
      },
    },
    ecg: 108,
    spo2: 97,
    resp: 20,
    systolic: 126,
    diastolic: 82,
    mean: 97,
    temp1: 37.0,
    temp2: 37.1,
    delta_temp: 0.1,
    recorded_at: "2023-09-12T09:00:00Z",
  },
];

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

const DevicePM9000Page = () => {
  const { ip } = useParams();
  // const { dataPM9000, dataPM9000Nibp } = useSocketHandler({ ipDevice: ip });
  const { data, dataNibp } = useSocketPM9000(ip!);

  const [patient, setPatient] = useState<Patients>();

  // Get patient from local storage
  useEffect(() => {
    const storedPatient = localStorage.getItem("patient");
    if (storedPatient) {
      setPatient(JSON.parse(storedPatient));
    }
  }, []);

  return (
    <MainLayout title="PM 9000" state="Patient Monitor">
      <div className="flex flex-col h-full gap-6 ">
        {/* Result */}
        <div className="w-full">
          <div className="flex flex-row gap-6">
            <div className="flex flex-col gap-2 mt-3 w-1/2">
              <div className="w-full">
                <p className="font-semibold text-xl">Patient Info</p>
                <PatientInfo patient={patient} isPatientMonitor />
              </div>
              <p className="text-xl mt-4">Result</p>
              <div className="flex flex-row gap-4 rounded-2xl ">
                {/* ECG */}
                <div className="bg-green-200 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-1/3 h-fit justify-between gap-2">
                  <div className="flex flex-row gap-2">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row gap-3 items-center font-semibold">
                        <div className="bg-[#ededf9] text-green-700 rounded-lg p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                          <Activity className="w-5 h-5" />
                        </div>
                        <p>ECG</p>
                      </div>
                      <div className="flex flex-row items-end">
                        <div className="flex flex-row items-center text-5xl px-4 py-2 rounded-4xl">
                          <p>{data?.ecg_bpm ? data?.ecg_bpm : "--"}</p>
                        </div>
                        <p className="text-lg pb-4">rpm</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* SPO2 */}
                <div className="bg-blue-200 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-1/3 h-fit justify-between gap-2">
                  <div className="flex flex-row gap-2">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row gap-2 items-center">
                        <div className="flex flex-row gap-3 items-center font-semibold">
                          <div className="bg-[#ededf9] text-blue-800 rounded-lg p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                            <img src={spo2Icon} className="w-5 h-5" />
                          </div>
                          <p>
                            Sp0<sub>2</sub>
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row items-end ">
                        <div className="flex flex-row items-center text-5xl px-4 py-2 rounded-4xl gap-2">
                          <p className="">
                            {data?.ecg_bpm_spo2 ? data?.ecg_bpm_spo2 : "--"}
                          </p>
                        </div>
                        <p className="text-lg pb-4">%</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* RESP */}
                <div className="bg-blue-200 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-1/3 h-fit justify-between gap-2">
                  <div className="flex flex-row gap-2">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row gap-3 items-center font-semibold">
                        <div className="bg-[#ededf9] text-blue-800 rounded-lg p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                          <img src={respIcon} className="w-5 h-5" />
                        </div>
                        <p>RESP </p>
                      </div>
                      <div className="flex flex-row items-end">
                        <div className="flex flex-row items-center text-5xl px-4 py-2 rounded-4xl">
                          <p>{data?.resp ? data?.resp : "--"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-4 rounded-2xl mt-2">
                {/* NIBP */}
                <div className="bg-red-100 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-full justify-between gap-2">
                  <div className="flex flex-row gap-2 w-full">
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex flex-row gap-3 items-center font-semibold justify-between w-full">
                        <div className="flex flex-row items-center gap-4">
                          <div className="bg-[#ededf9] text-red-600 rounded-lg p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                            <img src={nibpIcon} className="w-6 h-6" />
                          </div>
                          <p>NIBP</p>
                        </div>
                        <div className="ml-4 flex flex-row gap-4">
                          <div className="flex flex-row w-fit text-white items-center gap-2 bg-red-400 px-3 py-1 rounded-full h-fit">
                            <Activity className="w-6 h-6" />
                            <p className="text-sm">
                              {dataNibp?.mean ? dataNibp?.mean : "--"} bpm
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row items-end gap-4 mt-4">
                        <div className="flex flex-row items-center text-7xl gap-2">
                          <p className="">
                            {dataNibp?.systolic ? dataNibp?.systolic : "--"}
                          </p>
                          /
                          <p>
                            {" "}
                            {dataNibp?.diastolic ? dataNibp?.diastolic : "--"}
                          </p>
                        </div>
                        <p className="text-lg pb-2">mmHg</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* TEMP */}
                <div className="bg-yellow-100 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-4 w-fit justify-between gap-2">
                  <div className="flex flex-row gap-2">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row gap-3 items-center font-semibold">
                        <div className="bg-[#ededf9] text-yellow-500 rounded-lg p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                          <Thermometer className="w-6 h-6" />
                        </div>
                        <p>Temp</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-row items-center gap-6">
                          <p className="w-8">T1</p>
                          <div className="flex flex-row items-end gap-1">
                            <p className="text-3xl w-14 text-end">
                              {data?.temp1 ? data?.temp1 : "--"}
                            </p>
                            <p className="text-lg pb-0.5">°C</p>
                          </div>
                        </div>
                        <div className="flex flex-row items-center gap-6">
                          <p className="w-8">T2</p>
                          <div className="flex flex-row items-end gap-1">
                            <p className="text-3xl w-14 text-end">
                              {" "}
                              {data?.temp2 ? data?.temp2 : "--"}
                            </p>
                            <p className="text-lg pb-0.5">°C</p>
                          </div>
                        </div>
                        <div className="flex flex-row items-center gap-6">
                          <p className="w-8">TD</p>
                          <div className="flex flex-row items-end gap-1">
                            <p className="text-3xl w-14 text-end">
                              {" "}
                              {data?.delta_temp ? data?.delta_temp : "--"}
                            </p>
                            <p className="text-lg pb-0.5">°C</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/2 space-y-2">
              <p className="text-xl mt-3"> Realtime Chart</p>
              <div className="flex flex-col gap-4 pt-1">
                <ECGChart className="h-54" />
                <HeartPulseChart className="h-54" />
                <HeartRateChart chartData={chartData} />
              </div>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="w-full pb-5 ">
          {/* NIBP */}
          <p className="text-xl mb-2">History NIBP</p>
          <div className="flex flex-row gap-6 items-stretch min-h-[450px]">
            <div className="w-1/2">
              <div className="h-full">
                <HistoryPM9000Nibp historiesData={historiesDataNibp} />
              </div>
            </div>
            <div className="w-1/2">
              <div className="h-full">
                <HistoriesPm900NibpChart chartData={historiesDataNibp} />
              </div>
            </div>
          </div>

          {/* NIBP */}
          <p className="text-xl mt-10 mb-2">History</p>
          <div className="flex flex-row gap-6">
            <div className="flex w-full">
              <TableHistoryPM9000
                data={historiesDataPM9000}
                goToPreviousPage={() => {}}
                goToNextPage={() => {}}
                goToPage={() => {}}
                currentPage={1}
                totalPage={2}
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

export default DevicePM9000Page;
