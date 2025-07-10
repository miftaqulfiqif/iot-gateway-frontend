import { Eye, EyeClosed, Mars, Venus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
type Props = {
  patientId: string;
};

const DetailPatientPage = () => {
  const { patientId } = useParams();
  const { historiesDigitProIDA, fetchDataIDA, currentPageIDA } =
    useDigitProIDA();
  const { dataDigitProBaby, fetchDataDigitProBaby, currentPageDigitProBaby } =
    useDigitProBaby();
  const { dataDigitProBMI, fetchDataBMI, currentPageBMI } = useDigitProBMI();
  const { historiesDoppler, fetchDataDoppler, currentPageDoppler } =
    useDoppler();

  const [show, setShow] = useState(false);
  const stateRef = useRef(state);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(
    "digit-pro-baby"
  );

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
  }, [selectedDevice]);

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
                  <p className="text-4xl font-bold">Patient Name</p>
                  <p className="text-sm">{patientId} </p>
                </div>
              </div>
              <div
                className="flex gap-2 rounded-full border items-center h-fit p-4 cursor-pointer"
                onClick={() => setShow(!show)}
              >
                {show ? (
                  <Eye className="w-6 h-6" />
                ) : (
                  <EyeClosed className="w-6 h-6" />
                )}
                <p className="h-fit">Hide Info</p>
              </div>
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
                    <p className="text-6xl font-semibold">120</p>
                    <p className="text-6xl">/</p>
                    <p className="text-6xl font-semibold">80</p>
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
                  <p className="font-semibold">NIK :</p>
                  <p>3517172109010001</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Name :</p>
                  <p>Patient Name</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Age :</p>
                  <p>30 years</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Gender :</p>
                  <p>Male</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Place of Birth :</p>
                  <p>Surabaya</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Date of Birth :</p>
                  <p>21 September 2001</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Phone :</p>
                  <p>123456789</p>
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
              <div className="flex gap-4 border rounded-3xl items-center px-4 py-2">
                <Venus className="w-6 h-6" />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Baby Name</p>
                  <p className="text-sm">23 September 2023</p>
                </div>
              </div>
              <div className="flex gap-4 border rounded-3xl items-center px-4 py-2">
                <Venus className="w-6 h-6" />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Baby Name</p>
                  <p className="text-sm">23 September 2023</p>
                </div>
              </div>
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
              <div className="flex items-center gap-3">
                <div className="w-18 h-18 rounded-full bg-gray-400"></div>
                <div className="flex flex-col">
                  <p className="font-semibold font-sm">Dr. Name</p>
                  <p className="text-sm text-gray-500">Specialist</p>
                  <div className="border px-2 py-1 rounded-full flex items-center mt-1">
                    <p className="text-xs">21 September 2001</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-18 h-18 rounded-full bg-gray-400"></div>
                <div className="flex flex-col">
                  <p className="font-semibold font-sm">Dr. Name</p>
                  <p className="text-sm text-gray-500">Specialist</p>
                  <div className="border px-2 py-1 rounded-full flex items-center mt-1">
                    <p className="text-xs">21 September 2001</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-18 h-18 rounded-full bg-gray-400"></div>
                <div className="flex flex-col">
                  <p className="font-semibold font-sm">Dr. Name</p>
                  <p className="text-sm text-gray-500">Specialist</p>
                  <div className="border px-2 py-1 rounded-full flex items-center mt-1">
                    <p className="text-xs">21 September 2001</p>
                  </div>
                </div>
              </div>
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
            <div className="flex flex-col gap-4 mt-4 overflow-y-auto max-h-[260px] pr-2">
              <div className="flex items-center border p-4 rounded-2xl">
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <p className="font-semibold text-sm">Title</p>
                    <p className="text-xs">23/09/2023</p>
                  </div>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magnam, sit?
                  </p>
                </div>
                <div className="flex flex-col"></div>
              </div>
              <div className="flex items-center border p-4 rounded-2xl">
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <p className="font-semibold text-sm">Title</p>
                    <p className="text-xs">23/09/2023</p>
                  </div>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magnam, sit?
                  </p>
                </div>
                <div className="flex flex-col"></div>
              </div>
              <div className="flex items-center border p-4 rounded-2xl">
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <p className="font-semibold text-sm">Title</p>
                    <p className="text-xs">23/09/2023</p>
                  </div>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magnam, sit?
                  </p>
                </div>
                <div className="flex flex-col"></div>
              </div>
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
