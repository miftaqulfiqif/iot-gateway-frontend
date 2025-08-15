import MainLayout from "@/components/layouts/main-layout";
import { SettingTcpIpDeviceModal } from "@/components/modals/setting-tcpip-device-modal";
import { TableHistoryDS001 } from "@/components/tables/history-ds001";
import { TableHistoryPM9000 } from "@/components/tables/history-pm9000";
import { useDevices } from "@/hooks/api/use-device";
import { format } from "date-fns";
import { RotateCcw, Settings, Unplug } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

const historiesDataDS001 = [
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
    recorded_at: "2025-07-14T08:30:00Z",
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
    recorded_at: "2025-07-14T09:45:00Z",
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
    recorded_at: "2025-07-14T10:15:00Z",
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
    recorded_at: "2025-07-14T11:10:00Z",
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
    recorded_at: "2025-07-14T12:00:00Z",
  },
];

const dummyRecentDoctor = [
  {
    id: "35b29da2-e59e-43d3-9486-86686916acb1",
    doctor_name: "Dr. Prabowo Sinegar",
    speciality: "Dokter Umum",
    date: "2023-06-01",
  },
  {
    id: "35b29da2-e59e-43d3-9486-86686916acb2",
    doctor_name: "Dr. Prabowo Budi",
    speciality: "Dokter Umum",
    date: "2023-06-01",
  },
  {
    id: "35b29da2-e59e-43d3-9486-86686916acb3",
    doctor_name: "Dr. Changcuters",
    speciality: "Dokter Umum",
    date: "2023-06-01",
  },
  {
    id: "35b29da2-e59e-43d3-9486-86686916acb4",
    doctor_name: "Dr. Gunawan Dapit",
    speciality: "Dokter Umum",
    date: "2023-06-01",
  },
];

const dummyMedicalActivity = [
  {
    id: "35b29da2-e59e-43d3-9486-86686916acb1",
    title: "Budi Sudarso",
    date: "2023-06-01",
    note: "Pemeriksaan fisik dengan hasil normal",
  },
  {
    id: "35b29da2-e59e-43d3-9486-86686916acb2",
    title: "Dapit Gunawan",
    date: "2023-06-01",
    note: "Pemeriksaan fisik dengan hasil normal",
  },
  {
    id: "35b29da2-e59e-43d3-9486-86686916acb3",
    title: "Ryan D'masive",
    date: "2023-06-01",
    note: "Pemeriksaan fisik dengan hasil normal",
  },
  {
    id: "35b29da2-e59e-43d3-9486-86686916acb4",
    title: "Farelia Budiarto",
    date: "2023-06-01",
    note: "Pemeriksaan fisik dengan hasil normal",
  },
];

const device = {
  name: "PM 9000",
  ip: "ip_baby",
  type: "bluetooth",
  status: "Connected",
  device: "PM 9000",
  device_function: "diagnostic_station_001",
};

export const DetailTcpIpDevice = () => {
  const { device_id } = useParams();
  const { detailDevice, getDetailDevice } = useDevices();
  const [settingModal, setSettingModal] = useState(false);

  useEffect(() => {
    if (device_id) {
      getDetailDevice(device_id);
    }
    console.log("DETAIL DEVICE : ", detailDevice);
  }, [device_id, getDetailDevice]);

  return (
    <MainLayout title="Detail Bluetooth Device" state="Devices">
      <div className="flex flex-col gap-6 w-full pb-5">
        <div className="flex gap-4">
          <div className="bg-gradient-to-b from-[#4956F4] to-[#6e79f4] w-1/2 h-fit p-6 rounded-2xl shadow-[4px_4px_4px_rgba(0,0,0,0.16)]">
            <div className="flex w-fit gap-4 text-white">
              <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
              <div className="flex flex-col gap-2 justify-end">
                <p className="font-bold text-2xl">{device.name}</p>
                <p className="text-sm">{detailDevice?.detail.ip_address}</p>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <div className="w-full flex flex-col gap-2 p-3 bg-[#EDEDF9] rounded-xl shadow-[inset_6px_6px_5px_rgba(0,0,0,0.16)]">
                <p className="font-semibold">Count Measurement</p>
                <div className="flex gap-2 w-full justify-end">
                  <p className="font-bold text-6xl">
                    {detailDevice?.detail.count_used}
                  </p>
                  <p className="text-sm flex justify-end items-end">Times</p>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2 p-3 bg-[#EDEDF9] rounded-xl shadow-[inset_6px_6px_5px_rgba(0,0,0,0.16)]">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">Last Measurement</p>
                  <p className="text-sm">29/02/25</p>
                </div>
                <div className="flex w-full border p-2 rounded-2xl border-blue-500 text-blue-500 justify-between">
                  <div className="flex gap-2 text-5xl">
                    <p>120</p>
                    <p>/</p>
                    <p>80</p>
                  </div>
                  <p className="text-2xl">60</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white h-full shadow-[4px_4px_4px_rgba(0,0,0,0.16)] w-1/2 rounded-2xl p-4">
            <p className="font-semibold">Detail Device</p>
            <div className="flex flex-col gap-1 mt-2">
              <div className="flex">
                <p className="w-28">Device Name</p>
                <p className="w-3">:</p>
                <p>{detailDevice?.detail.name}</p>
              </div>
              <div className="flex">
                <p className="w-28">ip Address</p>
                <p className="w-3">:</p>
                <p>{detailDevice?.detail.ip_address}</p>
              </div>
              <div className="flex">
                <p className="w-28">Model</p>
                <p className="w-3">:</p>
                <p>{detailDevice?.detail.model}</p>
              </div>
              <div className="flex items-center">
                <p className="w-28">Status</p>
                <p className="w-3">:</p>
                <p className="text-green-900 bg-green-200 rounded-2xl px-3 font-semibold">
                  {detailDevice?.detail.is_connected
                    ? "Connected"
                    : "Disconnected"}
                </p>
              </div>
              <div className="flex">
                <p className="w-28">Connected At</p>
                <p className="w-3">:</p>
                <p>
                  {new Intl.DateTimeFormat("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(
                    new Date(detailDevice?.detail?.created_at || new Date())
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 h-[350px]">
          {/* Recent Doctor */}
          <div className="flex flex-col p-4 bg-white w-1/3 h-full rounded-2xl border-3 border-gray-200">
            <div className="flex justify-between">
              <p className="font-semibold">Recent Doctor Use</p>
              <p className="text-blue-500 hover:underline cursor-pointer">
                See all
              </p>
            </div>
            {/* List doctor */}
            <div className="flex flex-col gap-4 mt-4 overflow-y-auto max-h-[260px] pr-2">
              {detailDevice?.recent_users.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-18 h-18 rounded-full bg-gray-400"></div>
                  <div className="flex flex-col">
                    <p className="font-semibold font-sm">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.speciality}</p>
                    <div className="border px-2 py-1 rounded-full flex items-center mt-1">
                      <p className="text-xs">{item.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Medical Activity */}
          <div className="bg-white w-1/3 h-full rounded-2xl border-3 border-gray-200 p-4">
            <div className="flex justify-between">
              <p className="font-semibold">Recent Patient Use</p>
              <p className="text-blue-500 hover:underline cursor-pointer">
                See all
              </p>
            </div>
            {/* List */}
            <div className="flex flex-col gap-4 mt-4 overflow-y-auto max-h-[270px] pr-2">
              {detailDevice?.recent_patient_use.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border p-4 rounded-2xl"
                >
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between">
                      <p className="text-base font-semibold">
                        {item.patient_name}
                      </p>
                      <p className="text-xs">
                        {format(new Date(item.recorded_at), "dd/MM/yy")}
                      </p>
                    </div>
                    <p className="text-sm font-normal">{item.description}</p>
                  </div>
                  <div className="flex flex-col"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white w-1/3 h-full rounded-2xl border-3 border-gray-200 p-4">
            <p className="font-semibold">Control Device</p>
            <div className="flex flex-col gap-4 mt-4 overflow-y-auto max-h-[270px] pr-2">
              <div className="flex items-center border border-red-500 text-red-500 p-4 rounded-2xl gap-2 cursor-pointer hover:bg-red-50">
                <Unplug className="w-6 h-6" />
                <p>Disconnect</p>
              </div>
              <div className="flex items-center border border-green-500 text-green-500 p-4 rounded-2xl gap-2 cursor-pointer hover:bg-green-50">
                <RotateCcw className="w-6 h-6" />
                <p>Reconnect</p>
              </div>
              <div
                className="flex items-center border border-blue-500 text-blue-500 p-4 rounded-2xl gap-2 cursor-pointer hover:bg-blue-50"
                onClick={() => setSettingModal(true)}
              >
                <Settings className="w-6 h-6" />
                <p>Setting</p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-2xl font-semibold">History measurement</p>

        {detailDevice?.detail?.device_function === "pasien_monitor_9000" && (
          <TableHistoryPM9000
            data={historiesDataPM9000}
            goToPreviousPage={() => {}}
            goToNextPage={() => {}}
            goToPage={() => {}}
            currentPage={1}
            totalPage={6}
          />
        )}
        {detailDevice?.detail?.device_function === "diagnostic_station_001" && (
          <TableHistoryDS001
            data={historiesDataDS001}
            goToPreviousPage={() => {}}
            goToNextPage={() => {}}
            goToPage={() => {}}
            currentPage={1}
            totalPage={6}
          />
        )}
      </div>
      <SettingTcpIpDeviceModal
        isActive={settingModal}
        setInactive={() => {
          setSettingModal(false);
        }}
      />
    </MainLayout>
  );
};
