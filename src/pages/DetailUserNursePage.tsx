import { useParams } from "react-router-dom";
import MainLayout from "@/components/layouts/main-layout";
import { Mars, PenSquare, Search, Venus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TableHistoryDigitProIDA } from "@/components/tables/history-digit-pro-ida";
import { TableHistoryBMI } from "@/components/tables/history-digit-pro-bmi";
import { TableHistoryDoppler } from "@/components/tables/history-doppler";
import { TableHistoryDigitProBaby } from "@/components/tables/history-digit-pro-baby";
import { useDigitProIDA } from "@/hooks/api/devices/use-digit-pro-ida";
import { useDigitProBaby } from "@/hooks/api/devices/use-digit-pro-baby";
import { useDigitProBMI } from "@/hooks/api/devices/use-digit-pro-bmi";
import { useDoppler } from "@/hooks/api/devices/use-doppler";
import { format } from "date-fns";

const state = [
  {
    value: "digit-pro-baby",
    label: "Digit Pro Baby",
  },
  {
    value: "bmi",
    label: "BMI",
  },
  {
    value: "doppler",
    label: "Doppler",
  },
  {
    value: "digit-pro-ida",
    label: "Digit Pro IDA",
  },
];

const dummyUser = {
  id: "DOC-001",
  name: "Miftaqul Fiqi Firmansyah",
  username: "miftaqulFiqiFs",
  email: "miftaqulfiqifirmansyah@gmail.com",
  phone: "081515808598",
  place_of_birth: "Nganjuk",
  date_of_birth: "2002-01-09",
  address: "Jl. Patimura, No 21, Jolotundo, Semarang, Jawa Timur",
  experience_years: 14,
  status: "Aktif",
  profile_picture: null,
};

const dummyRecentPatient = [
  {
    id: "e7a3c5d2-bf84-4f4b-a3dc-1b2e9bcb7a12",
    patient_name: "Andi Prasetyo",
    date: "2025-07-10T08:32:00Z",
  },
  {
    id: "f2130e9a-92d0-4820-b6a5-665d87028b7a",
    patient_name: "Siti Maesaroh",
    date: "2025-07-09T09:15:00Z",
  },
  {
    id: "a192b7b4-8f52-4050-b16c-4b13d49e52a1",
    patient_name: "Budi Santoso",
    date: "2025-07-09T13:47:00Z",
  },
  {
    id: "34c6a17b-032f-4172-a264-3d4c1f4c6d5f",
    patient_name: "Dewi Kartika",
    date: "2025-07-08T10:02:00Z",
  },
  {
    id: "8a5f48b7-9f7d-4d02-a69d-e8e1bbdcaf59",
    patient_name: "Agus Firmansyah",
    date: "2025-07-07T14:20:00Z",
  },
];

const dummyMeasurementActivity = [
  {
    id: "8c5d9a23-7b21-4d84-bb9f-f798e21c1c32",
    patient_name: "Andi Prasetyo",
    title: "Pemeriksaan Berat Badan",
    date: "2025-07-14",
    note: "Berat badan: 65.2 kg, dalam batas normal",
  },
  {
    id: "f6a31d8b-bd0c-41ef-b105-8d53d99a452a",
    patient_name: "Siti Maesaroh",
    title: "Pemeriksaan Tekanan Darah",
    date: "2025-07-13",
    note: "Tekanan darah: 118/78 mmHg, stabil",
  },
  {
    id: "d9b7e5cd-46f7-4952-a93f-e49e0dc0620c",
    patient_name: "Budi Santoso",
    title: "Pemeriksaan Detak Jantung (Doppler)",
    date: "2025-07-13",
    note: "Detak jantung janin rata-rata 143 BPM",
  },
  {
    id: "21c0aee4-9303-4b4d-98a3-f2589c86c5a2",
    patient_name: "Dewi Kartika",
    title: "Pemeriksaan BMI",
    date: "2025-07-12",
    note: "BMI: 24.8 (Normal)",
  },
  {
    id: "43e5c6a7-1b2d-4f60-a870-b9cf9f1fd0f7",
    patient_name: "Agus Firmansyah",
    title: "Pemeriksaan Lemak Tubuh",
    date: "2025-07-11",
    note: "Persentase lemak: 22.5%, dalam batas sehat",
  },
];

const DetailUserNursePage = () => {
  const { userId } = useParams();
  const stateRef = useRef(state);
  const { historiesDigitProIDA, fetchDataIDAByDoctorId, currentPageIDA } =
    useDigitProIDA();
  const {
    dataDigitProBaby,
    fetchDataDigitProBabyByDoctorId,
    currentPageDigitProBaby,
  } = useDigitProBaby();
  const { dataDigitProBMI, fetchDataBMIByDoctorId, currentPageBMI } =
    useDigitProBMI();
  const { historiesDoppler, fetchDataDopplerByDoctorId, currentPageDoppler } =
    useDoppler();

  const [selectedDevice, setSelectedDevice] = useState<string | null>(
    "digit-pro-baby"
  );
  const [totalPageState, setTotalPageState] = useState<{
    [key: string]: number;
  }>({
    "digit-pro-ida": 0,
    "digit-pro-baby": 0,
    bmi: 0,
    doppler: 0,
  });
  const [paginationState, setPaginationState] = useState<{
    [key: string]: {
      page: number;
      limit: number;
      search: string;
    };
  }>({
    "digit-pro-ida": { page: 1, limit: 10, search: "" },
    "digit-pro-baby": { page: 1, limit: 10, search: "" },
    bmi: { page: 1, limit: 10, search: "" },
    doppler: { page: 1, limit: 10, search: "" },
  });
  const totalPage = totalPageState[selectedDevice ?? "digit-pro-ida"];
  const currentPagination = paginationState[selectedDevice ?? "digit-pro-ida"];
  useEffect(() => {
    if (selectedDevice === "digit-pro-ida") {
      fetchDataIDAByDoctorId(userId!, 1);
    }
    if (selectedDevice === "digit-pro-baby") {
      fetchDataDigitProBabyByDoctorId(userId!, 1);
    }
    if (selectedDevice === "bmi") {
      fetchDataBMIByDoctorId(userId!, 1);
    }
    if (selectedDevice === "doppler") {
      fetchDataDopplerByDoctorId(userId!, 1);
    }
  }, [selectedDevice]);
  const updatePagination = (
    updates: Partial<{ page: number; limit: number; search: string }>
  ) => {
    setPaginationState((prev) => ({
      ...prev,
      [selectedDevice ?? "digit-pro-ida"]: {
        ...prev[selectedDevice ?? "digit-pro-ida"],
        ...updates,
      },
    }));
  };

  const goToPage = (page: number) => {
    updatePagination({ page });
  };

  const goToNextPage = () => {
    if (currentPagination.page < totalPage) {
      updatePagination({ page: currentPagination.page + 1 });
    }
  };

  const goToPreviousPage = () => {
    if (currentPagination.page > 1) {
      updatePagination({ page: currentPagination.page - 1 });
    }
  };

  return (
    <MainLayout title="Detail Doctor" state="Users">
      <div className="flex flex-col gap-2 w-full pb-5">
        <p className="font-bold">User information</p>
        <div className="flex gap-4">
          <div className="w-1/2 flex flex-col gap-4 bg-gradient-to-b from-[#4956F4] to-[#6e79f4]  rounded-2xl text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] h-fit p-4">
            <div className="flex justify-between">
              <div className="flex flex-row gap-4 items-center">
                <div className="w-30 h-30 rounded-full bg-gray-400"></div>
                <div className="flex flex-col gap-2">
                  <p className="text-xl font-bold">{dummyUser.name}</p>
                  <p>{userId}</p>
                  <div className="flex items-center gap-2">
                    <p>username : </p>
                    <p className="bg-blue-400 rounded-full w-fit px-4 py-2">
                      {dummyUser.username}
                    </p>
                  </div>
                </div>
              </div>

              <div className=" h-full">
                <button className="flex flex-row gap-2 bg-blue-400 px-4 py-2 rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] cursor-pointer">
                  <PenSquare className="w-6 h-6" />
                  Edit
                </button>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div className="w-full bg-white shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)] rounded-2xl p-4 text-black">
                <p>Experience</p>
                <p className="font-bold">{dummyUser.experience_years} Years</p>
              </div>
              <div className="w-full bg-white shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)] rounded-2xl p-4 text-black">
                <p>Status</p>
                <p className="font-bold bg-green-200 text-green-900 w-fit px-4 rounded-full">
                  {dummyUser.status}
                </p>
              </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col gap-2 bg-white rounded-2xl max-h-full p-4 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <p className="font-bold">Detail information :</p>
            <div className="flex flex-col gap-1 w-full ">
              <div className="flex">
                <p className="w-30">Email</p>
                <p className="w-3 ">:</p>
                <p>{dummyUser.email}</p>
              </div>
              <div className="flex">
                <p className="w-30">Phone</p>
                <p className="w-3 ">:</p>
                <p>{dummyUser.phone}</p>
              </div>
              <div className="flex">
                <p className="w-30">Place of Birth</p>
                <p className="w-3 ">:</p>
                <p>{dummyUser.place_of_birth}</p>
              </div>
              <div className="flex">
                <p className="w-30">Date of Birth</p>
                <p className="w-3 ">:</p>
                <p>
                  {format(new Date(dummyUser.date_of_birth), "dd MMMM yyyy")}
                </p>
              </div>
              <div className="flex h-14">
                <p className="w-30">Address</p>
                <p className="w-3 ">:</p>
                <p className="w-[490px]">{dummyUser.address}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 h-[420px] mt-4">
          {/* Recent Patient */}
          <div className="flex flex-col p-4 bg-white w-1/2 h-full rounded-2xl border-3 border-gray-200">
            <div className="flex justify-between">
              <p className="font-semibold">Recent Patient</p>
              <p className="text-blue-500 hover:underline cursor-pointer">
                See all
              </p>
            </div>
            {/* List patient */}
            <div className="flex flex-col gap-4 mt-4 overflow-y-auto max-h-[350px] pr-2">
              {dummyRecentPatient.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-18 h-18 rounded-full bg-gray-400"></div>
                  <div className="flex flex-col">
                    <p className="font-semibold font-sm">{item.patient_name}</p>
                    <div className="border px-2 py-1 rounded-full flex items-center mt-1 w-fit">
                      <p className="text-xs">
                        {format(new Date(item.date), "dd-MM-yyyy")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Measurement Activity */}
          <div className="bg-white w-full h-full rounded-2xl border-3 border-gray-200 p-4">
            <div className="flex justify-between">
              <p className="font-semibold">Measurement Activity</p>
              <p className="text-blue-500 hover:underline cursor-pointer">
                See all
              </p>
            </div>
            {/* List */}
            <div className="flex flex-col gap-4 mt-4 overflow-y-auto max-h-[350px] pr-2">
              {dummyMeasurementActivity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border p-4 rounded-2xl"
                >
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <p className="text-base font-semibold">
                          {item.patient_name}
                        </p>
                        <p>-</p>
                        <p className="text-base">{item.title}</p>
                      </div>
                      <p className="text-xs">{item.date}</p>
                    </div>
                    <p className="text-sm font-normal">{item.note}</p>
                  </div>
                  <div className="flex flex-col"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="text-2xl font-semibold mt-4">History measurement</p>
        <div className="flex flex-row gap-6">
          {stateRef.current.map((item, index) => {
            const isSelected = selectedDevice === item.value;
            return (
              <div
                key={index}
                onClick={() => setSelectedDevice(item.value)}
                className={`flex flex-col gap-2 items-center justify-center px-4 py-2 rounded-2xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] cursor-pointer transition duration-200 ${
                  isSelected
                    ? "bg-blue-500 text-white"
                    : "bg-white hover:bg-[#f0f0f0] text-black"
                }`}
              >
                <div className="flex flex-row gap-2 items-center justify-center">
                  <p className="text-sm">{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
        {/* Search */}
        <div className="flex w-full items-end justify-end mb-2">
          <div className="flex flex-row gap-2 w-70 items-center">
            <Search className="w-6 h-6" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-white rounded-2xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] focus:outlien-2 focus:outline-blue-500 px-4 py-1"
            />
          </div>
        </div>
        {/* Table */}
        {selectedDevice === "digit-pro-baby" && (
          <TableHistoryDigitProBaby
            data={dataDigitProBaby}
            goToPreviousPage={goToPreviousPage}
            goToNextPage={goToNextPage}
            goToPage={goToPage}
            currentPage={currentPageDigitProBaby}
            totalPage={totalPage}
          />
        )}
        {selectedDevice === "digit-pro-ida" && (
          <TableHistoryDigitProIDA
            data={historiesDigitProIDA}
            goToPreviousPage={goToPreviousPage}
            goToNextPage={goToNextPage}
            goToPage={goToPage}
            currentPage={currentPageIDA}
            totalPage={totalPage}
          />
        )}
        {selectedDevice === "bmi" && (
          <TableHistoryBMI
            data={dataDigitProBMI}
            goToPreviousPage={goToPreviousPage}
            goToNextPage={goToNextPage}
            goToPage={goToPage}
            currentPage={currentPageBMI}
            totalPage={totalPage}
          />
        )}
        {selectedDevice === "doppler" && (
          <TableHistoryDoppler
            data={historiesDoppler}
            goToPreviousPage={goToPreviousPage}
            goToNextPage={goToNextPage}
            goToPage={goToPage}
            currentPage={currentPageDoppler}
            totalPage={totalPage}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default DetailUserNursePage;
