import { Mars, Venus } from "lucide-react";
import { use, useEffect, useRef, useState } from "react";
import { TableHistoryDigitProBaby } from "@/components/tables/history-digit-pro-baby";
import { TableHistoryDigitProIDA } from "@/components/tables/history-digit-pro-ida";
import { TableHistoryBMI } from "@/components/tables/history-digit-pro-bmi";
import { useDigitProIDA } from "@/hooks/api/devices/use-digit-pro-ida";
import { useDigitProBaby } from "@/hooks/api/devices/use-digit-pro-baby";
import { useDigitProBMI } from "@/hooks/api/devices/use-digit-pro-bmi";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layouts/main-layout";
import { TableHistoryDoppler } from "@/components/tables/history-doppler";
import { useDoppler } from "@/hooks/api/devices/use-doppler";
import { usePatient } from "@/hooks/api/use-patient";

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

const dummyPatient = {
  id: "PATL230000000000001",
  nik: "3517172100000000",
  barcode_img:
    "data:image/png;base64,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",
  name: "Abdulloh Khasimiri",
  gender: "male",
  address: "Surabaya",
  phone: "01281023018291",
  work: "Software Engineer",
  last_education: "S1",
  place_of_birth: "Surabaya",
  date_of_birth: "2001-09-21",
  religion: null,
  height: null,
  age: 23,
};

const dummyListBaby = [
  {
    id: "35b29da2-e59e-43d3-9486-8668c916acb6",
    name: "Test",
    gender: "male",
    date_of_birth: "2001-09-01",
    place_of_birth: null,
    patient_id: "PATL230000000000001",
  },
  {
    id: "35b29da2-e59e-43d3-9416-86686916acb6",
    name: "Prabowo Sinegar",
    gender: "female",
    date_of_birth: "2001-09-01",
    place_of_birth: null,
    patient_id: "PATL230000000000001",
  },
  {
    id: "35b29da2-e59e-43d3-9486-866y6916acb6",
    name: "Prabowo Sinegar",
    gender: "female",
    date_of_birth: "2001-09-01",
    place_of_birth: null,
    patient_id: "PATL230000000000001",
  },
  {
    id: "35b29da2-e59e-43d3-9486-866c86916acb6",
    name: "Prabowo Sinegar",
    gender: "female",
    date_of_birth: "2001-09-01",
    place_of_birth: null,
    patient_id: "PATL230000000000001",
  },
  {
    id: "35b29da2-e59e-43d3-9486-866g6916acb6",
    name: "Prabowo Sinegar",
    gender: "female",
    date_of_birth: "2001-09-01",
    place_of_birth: null,
    patient_id: "PATL230000000000001",
  },
];

const dummyRecentDoctor = [
  {
    id: "35b29da2-e59e-43d3-9486-86a86916acb6",
    doctor_name: "Dr. Prabowo Sinegar",
    speciality: "Dokter Umum",
    date: "2023-06-01",
  },
  {
    id: "35b29da2-e59e-43d3-9486-86686916acb1",
    doctor_name: "Dr. Prabowo Sinegar",
    speciality: "Dokter Umum",
    date: "2023-06-01",
  },
  {
    id: "35b29da2-e59e-43d3-9486-86686916acb2",
    doctor_name: "Dr. Prabowo Sinegar",
    speciality: "Dokter Umum",
    date: "2023-06-01",
  },
  {
    id: "35b29da2-e59e-43d3-9486-86686916acb9",
    doctor_name: "Dr. Prabowo Sinegar",
    speciality: "Dokter Umum",
    date: "2023-06-01",
  },
];

const dummyMedicalActivity = [
  {
    id: "35b29da2-e59e-43d3-9486-86686916acb6",
    title: "Pemeriksaan Fisik",
    date: "2023-06-01",
    note: "Pemeriksaan fisik dengan hasil normal",
  },
  {
    id: "35b29da2-e59e-43d3-9486-86686916ac16",
    title: "Pemeriksaan Fisik",
    date: "2023-06-01",
    note: "Pemeriksaan fisik dengan hasil normal",
  },
  {
    id: "35b29da2-e59e-43d3-9486-8668691gacb6",
    title: "Pemeriksaan Fisik",
    date: "2023-06-01",
    note: "Pemeriksaan fisik dengan hasil normal",
  },
  {
    id: "35b29da2-e59e-43d3-9486-866869x6acb6",
    title: "Pemeriksaan Fisik",
    date: "2023-06-01",
    note: "Pemeriksaan fisik dengan hasil normal",
  },
];
const DetailPatientPage = () => {
  const { patientId } = useParams();

  const { getDetailPatient, detailPatient } = usePatient({});

  const { historiesDigitProIDA, fetchDataIDA, currentPageIDA } =
    useDigitProIDA();
  const { dataDigitProBaby, fetchDataDigitProBaby, currentPageDigitProBaby } =
    useDigitProBaby();
  const { dataDigitProBMI, fetchDataBMI, currentPageBMI } = useDigitProBMI();
  const { historiesDoppler, fetchDataDoppler, currentPageDoppler } =
    useDoppler();

  const stateRef = useRef(state);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(
    "digit-pro-baby"
  );

  useEffect(() => {
    if (patientId) {
      getDetailPatient(patientId);
    }
  }, [patientId, getDetailPatient]);

  useEffect(() => {
    if (detailPatient) {
      console.log("DETAIL PATIENT UPDATED: ", detailPatient);
    }
  }, [detailPatient]);

  useEffect(() => {
    if (selectedDevice === "digit-pro-ida") {
      fetchDataIDA({
        page: 1,
        patient_id: patientId,
      });
    }
    if (selectedDevice === "digit-pro-baby") {
      fetchDataDigitProBaby({
        page: 1,
        patient_id: patientId,
      });
    }
    if (selectedDevice === "bmi") {
      fetchDataBMI({
        page: 1,
        patient_id: patientId,
      });
    }
    if (selectedDevice === "doppler") {
      fetchDataDoppler({
        page: 1,
        patient_id: patientId,
      });
    }
  }, [selectedDevice, patientId]);

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
  useEffect(() => {
    const { page, limit, search } =
      paginationState[selectedDevice ?? "digit-pro-ida"];

    if (selectedDevice === "digit-pro-ida") {
      fetchDataIDA({ page, limit, search }).then((res) => {
        setTotalPageState((prev) => ({
          ...prev,
          "digit-pro-ida": res?.total_pages ?? 0,
        }));
      });
    }
    if (selectedDevice === "digit-pro-baby") {
      fetchDataDigitProBaby({ page, limit, search }).then((res) => {
        setTotalPageState((prev) => ({
          ...prev,
          "digit-pro-baby": res?.total_pages ?? 0,
        }));
      });
    }
    if (selectedDevice === "bmi") {
      fetchDataBMI({ page, limit, search }).then((res) => {
        setTotalPageState((prev) => ({
          ...prev,
          bmi: res?.total_pages ?? 0,
        }));
      });
    }
    if (selectedDevice === "doppler") {
      fetchDataDoppler({ page, limit, search }).then((res) => {
        setTotalPageState((prev) => ({
          ...prev,
          doppler: res?.total_pages ?? 0,
        }));
      });
    }
  }, [paginationState, selectedDevice]);
  const [totalPageState, setTotalPageState] = useState<{
    [key: string]: number;
  }>({
    "digit-pro-ida": 0,
    "digit-pro-baby": 0,
    bmi: 0,
    doppler: 0,
  });
  const totalPage = totalPageState[selectedDevice ?? "digit-pro-ida"];
  const currentPagination = paginationState[selectedDevice ?? "digit-pro-ida"];

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

  console.log("PATIENT ROOM : ", detailPatient?.detail?.patient_room?.room);

  return (
    <MainLayout title="Patients" state="Patients">
      <div className="flex flex-col gap-6 w-full pb-5">
        <div className="flex gap-4">
          {/* Patient Info */}
          <div className="flex flex-col gap-2 w-1/1 p-6 rounded-xl bg-gradient-to-b from-[#4956F4] to-[#6e79f4] text-white shadow-lg">
            <div className="flex flex-row justify-between">
              <div className="flex gap-4">
                <div className="rounded-full bg-gray-200 w-20 h-20"></div>
                <div className="flex flex-col gap-2 justify-end">
                  <p className="text-2xl font-bold">
                    {detailPatient?.detail.name}
                  </p>
                  <p className="text-sm">{detailPatient?.detail.id} </p>
                </div>
              </div>
              {detailPatient?.detail?.patient_room?.room && (
                <div className="flex gap-2 rounded-xl border items-center h-fit px-3 py-1 cursor-pointer bg-white text-black shadow-[inset_6px_6px_5px_rgba(0,0,0,0.16),inset_-6px_-6px_5px_rgba(255,255,255,1)]">
                  <p className="w-full font-bold text-lg">
                    {detailPatient?.detail.patient_room?.room?.name ?? "--"}
                  </p>
                  <p className="font-bold">
                    {detailPatient?.detail.patient_room?.room?.number ?? "--"}
                  </p>
                  <p>-</p>
                  <p className="bg-green-200 text-green-900 rounded-2xl p-2 w-20 text-center">
                    {detailPatient?.detail.patient_room?.room?.type ?? "--"}
                  </p>
                </div>
              )}
            </div>
            <p className="mt-4 font-bold">Last Measurement</p>
            <div className="flex flex-row gap-6">
              {/* NIBP */}
              <div className="flex flex-col gap-4 w-80 p-4 bg-[#EDEDF9] rounded-2xl shadow-[inset_6px_6px_5px_rgba(0,0,0,0.16),inset_-6px_-6px_5px_rgba(255,255,255,1)] text-black">
                <div className="flex justify-between items-end">
                  <p className="font-bold">NIBP</p>
                  <p className="text-sm">23 September 2023 23:59</p>
                </div>
                <div className="flex gap-2 items-end">
                  <div className="flex gap-2 items-end bg-[#EDEDF9] rounded-2xl p-2 shadow-[6px_6px_5px_rgba(0,0,0,0.16),-6px_-6px_5px_rgba(255,255,255,1)]">
                    <p className="text-5xl font-semibold">120</p>
                    <p className="text-5xl">/</p>
                    <p className="text-5xl font-semibold">80</p>
                    <p className="text-sm">mmHg</p>
                  </div>
                </div>
              </div>
              {/* BMI */}
              <div className="flex flex-col gap-4 w-90 p-4 bg-[#EDEDF9] rounded-2xl shadow-[inset_6px_6px_5px_rgba(0,0,0,0.16),inset_-6px_-6px_5px_rgba(255,255,255,1)] text-black">
                <div className="flex justify-between items-end">
                  <p className="font-bold">BMI</p>
                  <p className="text-sm">23 September 2023 23:59</p>
                </div>
                <div className="flex gap-2 items-end">
                  <div className="flex gap-5">
                    <div className="flex flex-col bg-[#EDEDF9] rounded-2xl p-3 shadow-[6px_6px_5px_rgba(0,0,0,0.16),-6px_-6px_5px_rgba(255,255,255,1)]">
                      <p className="text-sm">Weight</p>
                      <div className="flex items-end gap-2">
                        <p className="text-4xl font-semibold">120</p>
                        <p className="text-sm">Kg</p>
                      </div>
                    </div>
                    <div className="flex flex-col bg-[#EDEDF9] rounded-2xl p-3 shadow-[6px_6px_5px_rgba(0,0,0,0.16),-6px_-6px_5px_rgba(255,255,255,1)]">
                      <p className="text-sm">BMI</p>
                      <div className="flex items-end gap-2">
                        <p className="text-4xl font-semibold">120</p>
                        {/* <p className="text-sm">Kg</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Detail Info */}
          <div className="bg-white w-full min-h-full rounded-2xl shadow-lg p-4">
            <p className="text-lg font-bold">Detail info patient</p>
            <div className="mt-4">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <p className="font-semibold">IHS Number :</p>
                  <p>{detailPatient?.detail.ihs_number ?? " -- "}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">NIK :</p>
                  <p>{detailPatient?.detail.nik}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Name :</p>
                  <p>{detailPatient?.detail.name}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Age :</p>
                  <p>{detailPatient?.detail.age} years</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Gender :</p>
                  <p>
                    {detailPatient?.detail.gender
                      ? dummyPatient.gender.charAt(0).toUpperCase() +
                        dummyPatient.gender.slice(1)
                      : "Unknown"}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Place of Birth :</p>
                  <p>{detailPatient?.detail.place_of_birth}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Date of Birth :</p>
                  <p>
                    {detailPatient?.detail.date_of_birth
                      ? new Intl.DateTimeFormat("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }).format(new Date(detailPatient.detail.date_of_birth))
                      : "Unknown"}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Phone :</p>
                  <p>{detailPatient?.detail.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 h-[350px]">
          {/* List Baby */}
          <div className="flex flex-col bg-gradient-to-l from-[#4956F4] to-[#6e79f4] w-1/3 h-full rounded-2xl border-3 border-gray-200 p-4 text-white">
            <p className="font-semibold text-lg">List baby</p>
            <div className="flex flex-col gap-4 mt-4 overflow-y-auto max-h-[260px] pr-2">
              {detailPatient?.babies.length === 0 ? (
                <p className="text-center text-sm text-white">
                  No data available
                </p>
              ) : (
                detailPatient?.babies.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border rounded-3xl items-center px-4 py-2"
                  >
                    {item.gender === "male" ? (
                      <Mars className="w-6 h-6" />
                    ) : (
                      <Venus className="w-6 h-6" />
                    )}
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm">
                        {new Date(item.date_of_birth).toLocaleDateString(
                          "en-GB",
                          { day: "2-digit", month: "long", year: "numeric" }
                        )}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          {/* Recent Doctor */}
          <div className="flex flex-col p-4 bg-white w-1/3 h-full rounded-2xl border-3 border-gray-200">
            <div className="flex justify-between">
              <p className="font-semibold">Recent Doctor</p>
              <p className="text-blue-500 hover:underline cursor-pointer">
                See all
              </p>
            </div>
            {/* List doctor */}
            <div className="flex flex-col gap-4 mt-4 overflow-y-auto max-h-[260px] pr-2">
              {detailPatient?.recent_doctor.length === 0 ? (
                <p className="text-center text-sm text-gray-500">
                  No data available
                </p>
              ) : (
                detailPatient?.recent_doctor.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-18 h-18 rounded-full bg-gray-400"></div>
                    <div className="flex flex-col">
                      <p className="font-semibold font-sm">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.speciality ? item.speciality : " -- "}
                      </p>
                      <div className="border px-2 py-1 rounded-full flex items-center mt-1">
                        <p className="text-xs">
                          {new Intl.DateTimeFormat("en-GB", {
                            year: "2-digit",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          }).format(new Date(item.recorded_at))}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          {/* Medical Activity */}
          <div className="bg-white w-1/3 h-full rounded-2xl border-3 border-gray-200 p-4">
            <div className="flex justify-between">
              <p className="font-semibold">Medical Activity</p>
              <p className="text-blue-500 hover:underline cursor-pointer">
                See all
              </p>
            </div>
            {/* List */}
            <div className="flex flex-col gap-4 mt-4 overflow-y-auto max-h-[270px] pr-2">
              {detailPatient?.medical_activities.length === 0 ? (
                <p className="text-center text-sm text-gray-500">
                  No data available
                </p>
              ) : (
                detailPatient?.medical_activities.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center border p-4 rounded-2xl"
                  >
                    <div className="flex flex-col w-full">
                      <div className="flex justify-between">
                        <p className="text-base font-semibold">{item.title}</p>
                        <p className="text-xs">
                          {new Intl.DateTimeFormat("en-GB", {
                            year: "2-digit",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          }).format(new Date(item.recorded_at))}
                        </p>
                      </div>
                      <p className="text-sm font-normal">{item.description}</p>
                    </div>
                    <div className="flex flex-col"></div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <p className="text-2xl font-semibold">History measurement</p>
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
        {/* Table */}
        {selectedDevice === "digit-pro-baby" && (
          <TableHistoryDigitProBaby
            data={dataDigitProBaby}
            goToPreviousPage={goToPreviousPage}
            goToNextPage={goToNextPage}
            goToPage={goToPage}
            currentPage={currentPageDigitProBaby}
            totalPage={totalPage}
            isDetailPatient
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
            isDetailPatient
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
            isDetailPatient
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
            isDetailPatient
          />
        )}
      </div>
    </MainLayout>
  );
};

export default DetailPatientPage;
