import { SetCurrentGateway } from "@/components/dropdown/header-set-current-gateway";
import MainLayout from "@/components/layouts/main-layout";
import { TableHistoryDigitProBaby } from "@/components/tables/history-digit-pro-baby";
import { TableHistoryBMI } from "@/components/tables/history-digit-pro-bmi";
import { TableHistoryDigitProIDA } from "@/components/tables/history-digit-pro-ida";
import { TableHistoryDoppler } from "@/components/tables/history-doppler";
import { useDigitProBaby } from "@/hooks/api/devices/use-digit-pro-baby";
import { useDigitProBMI } from "@/hooks/api/devices/use-digit-pro-bmi";
import { useDigitProIDA } from "@/hooks/api/devices/use-digit-pro-ida";
import { useDoppler } from "@/hooks/api/devices/use-doppler";
import { useDevices } from "@/hooks/api/use-device";
import { format } from "date-fns";
import { RotateCcw, Settings, Unplug } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const dummyData = [
  {
    id: "1",
    patient_handler: {
      patient: { name: "Siti Aisyah" },
      baby: {
        name: "Alya",
        gender: "Female",
        date_of_birth: "2023-05-12T00:00:00Z",
      },
    },
    weight: 3.2,
    timestamp: "2025-07-17T10:30:00Z",
  },
  {
    id: "2",
    patient_handler: {
      patient: { name: "Dewi Lestari" },
      baby: {
        name: "Rafi",
        gender: "Male",
        date_of_birth: "2023-06-02T00:00:00Z",
      },
    },
    weight: 3.5,
    timestamp: "2025-07-17T11:00:00Z",
  },
  {
    id: "3",
    patient_handler: {
      patient: { name: "Nina Kartika" },
      baby: {
        name: "Zahra",
        gender: "Female",
        date_of_birth: "2023-04-18T00:00:00Z",
      },
    },
    weight: 2.9,
    timestamp: "2025-07-17T11:30:00Z",
  },
  {
    id: "4",
    patient_handler: {
      patient: { name: "Rina Mulyani" },
      baby: {
        name: "Adam",
        gender: "Male",
        date_of_birth: "2023-05-01T00:00:00Z",
      },
    },
    weight: 3.1,
    timestamp: "2025-07-17T12:00:00Z",
  },
  {
    id: "5",
    patient_handler: {
      patient: { name: "Linda Hartati" },
      baby: {
        name: "Tiara",
        gender: "Female",
        date_of_birth: "2023-07-10T00:00:00Z",
      },
    },
    weight: 3.6,
    timestamp: "2025-07-17T12:30:00Z",
  },
  {
    id: "6",
    patient_handler: {
      patient: { name: "Wulan Sari" },
      baby: {
        name: "Bima",
        gender: "Male",
        date_of_birth: "2023-06-25T00:00:00Z",
      },
    },
    weight: 3.3,
    timestamp: "2025-07-17T13:00:00Z",
  },
  {
    id: "7",
    patient_handler: {
      patient: { name: "Sari Dewi" },
      baby: {
        name: "Kayla",
        gender: "Female",
        date_of_birth: "2023-05-20T00:00:00Z",
      },
    },
    weight: 3.0,
    timestamp: "2025-07-17T13:30:00Z",
  },
  {
    id: "8",
    patient_handler: {
      patient: { name: "Maya Putri" },
      baby: {
        name: "Rizki",
        gender: "Male",
        date_of_birth: "2023-06-15T00:00:00Z",
      },
    },
    weight: 3.4,
    timestamp: "2025-07-17T14:00:00Z",
  },
  {
    id: "9",
    patient_handler: {
      patient: { name: "Yulia Kurnia" },
      baby: {
        name: "Nayla",
        gender: "Female",
        date_of_birth: "2023-07-01T00:00:00Z",
      },
    },
    weight: 3.7,
    timestamp: "2025-07-17T14:30:00Z",
  },
  {
    id: "10",
    patient_handler: {
      patient: { name: "Dina Amelia" },
      baby: {
        name: "Farhan",
        gender: "Male",
        date_of_birth: "2023-05-30T00:00:00Z",
      },
    },
    weight: 3.2,
    timestamp: "2025-07-17T15:00:00Z",
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
  name: "Digit Pro Baby",
  mac: "mac_baby",
  type: "bluetooth",
  status: "Connected",
  device_function: "digitpro_bmi",
};

export const DetailBluetoothDevice = () => {
  const { device_id } = useParams();
  const { detailDevice, getDetailDevice } = useDevices();

  const {
    dataDigitProBMI,
    currentPageBMI,
    setCurrentPageBMI,
    totalItemsBMI,
    totalPageBMI,
    getDataDigitProBmiByDevice,
  } = useDigitProBMI();
  const {
    dataDigitProBaby,
    currentPageDigitProBaby,
    setCurrentPageDigitProBaby,
    totalItemsDigitProBaby,
    totalPageDigitProBaby,
    getDataDigitProBabyByDevice,
  } = useDigitProBaby();
  const {
    historiesDigitProIDA,
    currentPageIDA,
    setCurrentPageIDA,
    totalItemsIDA,
    totalPageIDA,
    getDataDigitProIDAByDevice,
  } = useDigitProIDA();
  const {
    historiesDoppler,
    currentPageDoppler,
    setCurrentPageDoppler,
    totalItemsDoppler,
    totalPageDoppler,
    getDataDopplerByDevice,
  } = useDoppler();

  useEffect(() => {
    if (device_id) {
      getDetailDevice(device_id);
      getDataDigitProBmiByDevice(device_id);
      getDataDigitProBabyByDevice(device_id);
      getDataDigitProIDAByDevice(device_id);
      getDataDopplerByDevice(device_id);
    }
  }, [device_id, getDetailDevice, currentPageBMI]);

  const [showAllRecentDoctor, setShowAllRecentDoctor] = useState(false);

  return (
    <MainLayout title="Detail Bluetooth Device" state="Devices">
      <div className="flex flex-col gap-6 w-full pb-5">
        <div className="flex gap-4">
          <div className="bg-gradient-to-b from-[#4956F4] to-[#6e79f4] w-1/2 h-fit p-6 rounded-2xl shadow-[4px_4px_4px_rgba(0,0,0,0.16)]">
            <div className="flex w-fit gap-4 text-white">
              <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
              <div className="flex flex-col gap-2 justify-end">
                <p className="font-bold text-2xl">
                  {detailDevice?.detail?.name}
                </p>
                <p className="text-sm">{detailDevice?.detail?.mac_address}</p>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <div className="w-full flex flex-col gap-2 p-3 bg-[#EDEDF9] rounded-xl shadow-[inset_6px_6px_5px_rgba(0,0,0,0.16)]">
                <p className="font-semibold">Count Measurement</p>
                <div className="flex gap-2 w-full justify-end">
                  <p className="font-bold text-6xl">
                    {detailDevice?.detail?.count_used}
                  </p>
                  <p className="text-sm flex justify-end items-end">Times</p>
                </div>
              </div>
              {detailDevice?.detail?.device_function === "digitpro_baby" && (
                <div className="w-full flex flex-col gap-2 p-3 bg-[#EDEDF9] rounded-xl shadow-[inset_6px_6px_5px_rgba(0,0,0,0.16)]">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">Last Measurement</p>
                    <p className="text-sm">29/02/25</p>
                  </div>
                  <div className="flex gap-2 w-full justify-end">
                    <p className="font-bold text-4xl">1,23</p>
                    <p className="text-sm flex justify-end items-end">Kg</p>
                  </div>
                </div>
              )}
              {detailDevice?.detail?.device_function === "digitpro_ida" && (
                <div className="w-full flex flex-col gap-2 p-3 bg-[#EDEDF9] rounded-xl shadow-[inset_6px_6px_5px_rgba(0,0,0,0.16)]">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">Last Measurement</p>
                    <p className="text-sm">29/02/25</p>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-1/2 border p-2 rounded-2xl border-blue-500 text-blue-500">
                      <p className="text-sm">Mother</p>
                      <div className="flex gap-2 w-full justify-end">
                        <p className="font-bold text-4xl">45</p>
                        <p className="text-sm flex justify-end items-end">Kg</p>
                      </div>
                    </div>
                    <div className="w-1/2 border p-2 rounded-2xl border-blue-500 text-blue-500">
                      <p className="text-sm">Baby</p>
                      <div className="flex gap-2 w-full justify-end">
                        <p className="font-bold text-4xl">1,23</p>
                        <p className="text-sm flex justify-end items-end">Kg</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {detailDevice?.detail?.device_function === "digitpro_bmi" && (
                <div className="w-full flex flex-col gap-2 p-3 bg-[#EDEDF9] rounded-xl shadow-[inset_6px_6px_5px_rgba(0,0,0,0.16)]">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">Last Measurement</p>
                    <p className="text-sm">29/02/25</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-1/2 border p-2 rounded-2xl border-blue-500 text-blue-500">
                      <p className="text-sm">Weight</p>
                      <div className="flex gap-2 w-full justify-end">
                        <p className="font-bold text-4xl">45</p>
                        <p className="text-sm flex justify-end items-end">Kg</p>
                      </div>
                    </div>
                    <div className="w-1/2 border p-2 rounded-2xl border-blue-500 text-blue-500">
                      <p className="text-sm">BMI</p>
                      <div className="flex gap-2 w-full justify-end">
                        <p className="font-bold text-4xl">1,23</p>
                        <p className="text-sm flex justify-end items-end">Kg</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white h-full shadow-[4px_4px_4px_rgba(0,0,0,0.16)] w-1/2 rounded-2xl p-4">
            <p className="font-semibold">Detail Device</p>
            <div className="flex flex-col gap-1 mt-2">
              <div className="flex">
                <p className="w-28">Device Name</p>
                <p className="w-3">:</p>
                <p>{detailDevice?.detail?.name}</p>
              </div>
              <div className="flex">
                <p className="w-28">MAC Address</p>
                <p className="w-3">:</p>
                <p>{detailDevice?.detail?.mac_address}</p>
              </div>
              <div className="flex">
                <p className="w-28">Model</p>
                <p className="w-3">:</p>
                <p>{detailDevice?.detail?.model}</p>
              </div>
              <div className="flex items-center">
                <p className="w-28">Status</p>
                <p className="w-3">:</p>
                <p
                  className={`rounded-2xl px-3 font-semibold  ${
                    detailDevice?.detail?.is_connected
                      ? "bg-green-200 text-green-900"
                      : "bg-red-200 text-red-900"
                  }`}
                >
                  {detailDevice?.detail?.is_connected
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
              <p
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => setShowAllRecentDoctor(!showAllRecentDoctor)}
              >
                See all
              </p>
            </div>
            {/* List doctor */}
            <div
              className={`flex flex-col gap-4 mt-4 overflow-y-auto  pr-2  ${
                showAllRecentDoctor ? "max-h-fit" : "max-h-[260px]"
              }`}
            >
              {detailDevice?.recent_users.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-18 h-18 rounded-full bg-gray-400"></div>
                  <div className="flex flex-col">
                    <p className="font-semibold font-sm">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.speciality}</p>
                    <div className="border px-2 py-1 rounded-full flex items-center mt-1">
                      <p className="text-xs">
                        {format(new Date(item.timestamp), "dd/MM/yy")}
                      </p>
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
              {detailDevice?.detail?.connection === "tcpip" && (
                <div className="flex items-center border border-blue-500 text-blue-500 p-4 rounded-2xl gap-2 cursor-pointer hover:bg-blue-50">
                  <Settings className="w-6 h-6" />
                  <p>Setting</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <p className="text-2xl font-semibold">History measurement</p>

        {detailDevice?.detail?.device_function === "digitpro_baby" && (
          <TableHistoryDigitProBaby
            data={dataDigitProBaby}
            goToPreviousPage={() => {
              if (currentPageDigitProBaby > 1) {
                setCurrentPageDigitProBaby(currentPageDigitProBaby - 1);
              }
            }}
            goToNextPage={() => {
              if (currentPageDigitProBaby < totalPageDigitProBaby) {
                setCurrentPageDigitProBaby(currentPageDigitProBaby + 1);
              }
            }}
            goToPage={(page: number) => {
              if (page > 0 && page <= totalPageDigitProBaby) {
                setCurrentPageDigitProBaby(page);
              }
            }}
            currentPage={currentPageDigitProBaby}
            totalPage={totalPageDigitProBaby}
          />
        )}
        {detailDevice?.detail?.device_function === "digitpro_ida" && (
          <TableHistoryDigitProIDA
            data={historiesDigitProIDA}
            goToPreviousPage={() => {
              if (currentPageDigitProBaby > 1) {
                setCurrentPageDigitProBaby(currentPageDigitProBaby - 1);
              }
            }}
            goToNextPage={() => {
              if (currentPageDigitProBaby < totalPageDigitProBaby) {
                setCurrentPageDigitProBaby(currentPageDigitProBaby + 1);
              }
            }}
            goToPage={(page: number) => {
              if (page > 0 && page <= totalPageDigitProBaby) {
                setCurrentPageDigitProBaby(page);
              }
            }}
            currentPage={currentPageIDA}
            totalPage={totalPageIDA}
          />
        )}
        {detailDevice?.detail?.device_function === "digitpro_bmi" && (
          <TableHistoryBMI
            data={dataDigitProBMI}
            goToPreviousPage={() => {
              if (currentPageBMI > 1) {
                setCurrentPageBMI(currentPageBMI - 1);
              }
            }}
            goToNextPage={() => {
              if (currentPageBMI < totalPageBMI) {
                setCurrentPageBMI(currentPageBMI + 1);
              }
            }}
            goToPage={(page: number) => {
              if (page > 0 && page <= totalPageBMI) {
                setCurrentPageBMI(page);
              }
            }}
            currentPage={currentPageBMI}
            totalPage={totalPageBMI}
          />
        )}
        {detailDevice?.detail?.device_function ===
          "ultrasonic_pocket_doppler" && (
          <TableHistoryDoppler
            data={historiesDoppler}
            goToPreviousPage={() => {
              if (currentPageDoppler > 1) {
                setCurrentPageDoppler(currentPageDoppler - 1);
              }
            }}
            goToNextPage={() => {
              if (currentPageDoppler < totalPageDoppler) {
                setCurrentPageDoppler(currentPageDoppler + 1);
              }
            }}
            goToPage={(page: number) => {
              if (page > 0 && page <= totalPageDoppler) {
                setCurrentPageDoppler(page);
              }
            }}
            currentPage={currentPageDoppler}
            totalPage={totalPageDoppler}
          />
        )}
      </div>
    </MainLayout>
  );
};
