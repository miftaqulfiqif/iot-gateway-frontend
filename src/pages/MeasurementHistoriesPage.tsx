import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MainLayout from "../components/layouts/main-layout";
import {
  CircleArrowLeft,
  Download,
  Funnel,
  Search,
  SquarePen,
  Trash2,
  User2Icon,
  UserRoundPlus,
} from "lucide-react";
import { InputDate } from "@/components/ui/input-date";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import type { Patients } from "@/models/PatientModel";
import { useHistoryMeasurement } from "@/hooks/UseHistoryMeasurement";
import axios from "axios";
import { CreateNewPatient } from "@/components/modals/create-new-patient";
import { UsePatientPage } from "@/hooks/pages/UsePatientPage";
import { TablePatients } from "@/components/tables/patients";
import { TableHistoryDigitProBaby } from "@/components/tables/history-digit-pro-baby";
import { TableHistoryDigitProIDA } from "@/components/tables/history-digit-pro-ida";
import { TableHistoryBMI } from "@/components/tables/history-digit-pro-bmi";
import { TableHistoryDoppler } from "@/components/tables/history-doppler";
import { useDigitProIDA } from "@/hooks/api/devices/use-digit-pro-ida";

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

// Dummy Data
const dummyProBaby = [
  {
    id: "baby-001",
    name: "Aisyah Putri",
    gender: "Female",
    date_of_birth: "2023-11-10",
    weight: "3.2 kg",
    timestamp: "2025-06-24 09:15",
  },
  {
    id: "baby-002",
    name: "Rizki Ramadhan",
    gender: "Male",
    date_of_birth: "2024-01-05",
    weight: "3.6 kg",
    timestamp: "2025-06-24 09:20",
  },
  {
    id: "baby-003",
    name: "Nadia Lestari",
    gender: "Female",
    date_of_birth: "2024-05-18",
    weight: "3.0 kg",
    timestamp: "2025-06-24 09:25",
  },
  {
    id: "baby-004",
    name: "Ahmad Fadil",
    gender: "Male",
    date_of_birth: "2023-12-22",
    weight: "3.4 kg",
    timestamp: "2025-06-24 09:30",
  },
  {
    id: "baby-005",
    name: "Siti Nurjanah",
    gender: "Female",
    date_of_birth: "2024-03-30",
    weight: "2.9 kg",
    timestamp: "2025-06-24 09:35",
  },
];
const dummyProIDA = [
  {
    id: "m-001",
    mother_name: "Ayu Lestari",
    baby_name: "Rafi Hidayat",
    baby_gender: "Male",
    date_of_birth: "2024-09-15",
    mother_weight: "58 kg",
    baby_weight: "3.4 kg",
    timestamp: "2025-06-24 08:30",
  },
  {
    id: "m-002",
    mother_name: "Siti Aminah",
    baby_name: "Putri Anjani",
    baby_gender: "Female",
    date_of_birth: "2024-12-01",
    mother_weight: "60 kg",
    baby_weight: "3.0 kg",
    timestamp: "2025-06-24 08:45",
  },
  {
    id: "m-003",
    mother_name: "Dewi Sartika",
    baby_name: "Farhan Aditya",
    baby_gender: "Male",
    date_of_birth: "2025-01-10",
    mother_weight: "62 kg",
    baby_weight: "3.5 kg",
    timestamp: "2025-06-24 09:00",
  },
  {
    id: "m-004",
    mother_name: "Nur Aini",
    baby_name: "Zahra Laila",
    baby_gender: "Female",
    date_of_birth: "2025-02-25",
    mother_weight: "59 kg",
    baby_weight: "3.2 kg",
    timestamp: "2025-06-24 09:15",
  },
  {
    id: "m-005",
    mother_name: "Mega Wulandari",
    baby_name: "Reyhan Pratama",
    baby_gender: "Male",
    date_of_birth: "2024-11-07",
    mother_weight: "61 kg",
    baby_weight: "3.3 kg",
    timestamp: "2025-06-24 09:30",
  },
];
const dummyBMI = [
  {
    id: "ida-001",
    name: "Rizky Maulana",
    gender: "Male",
    age: 28,
    height: "170 cm",
    weight: "68 kg",
    bmi: 23.5,
    fat: "17.2%",
    muscle: "42.1%",
    water: "56.8%",
    visceral_fat: 8,
    bone_mass: "3.1 kg",
    metabolism: "1450 kcal",
    protein: "17.0%",
    obesity: "0%",
    body_age: 26,
    lbm: "56.3 kg",
    timestamp: "2025-06-24 09:00",
  },
  {
    id: "ida-002",
    name: "Anisa Putri",
    gender: "Female",
    age: 32,
    height: "160 cm",
    weight: "54 kg",
    bmi: 21.1,
    fat: "25.5%",
    muscle: "36.5%",
    water: "50.3%",
    visceral_fat: 6,
    bone_mass: "2.7 kg",
    metabolism: "1350 kcal",
    protein: "16.5%",
    obesity: "0%",
    body_age: 30,
    lbm: "47.5 kg",
    timestamp: "2025-06-24 09:05",
  },
  {
    id: "ida-003",
    name: "Budi Santoso",
    gender: "Male",
    age: 40,
    height: "175 cm",
    weight: "80 kg",
    bmi: 26.1,
    fat: "20.3%",
    muscle: "38.8%",
    water: "55.1%",
    visceral_fat: 10,
    bone_mass: "3.5 kg",
    metabolism: "1600 kcal",
    protein: "17.8%",
    obesity: "10%",
    body_age: 43,
    lbm: "63.7 kg",
    timestamp: "2025-06-24 09:10",
  },
  {
    id: "ida-004",
    name: "Citra Lestari",
    gender: "Female",
    age: 29,
    height: "158 cm",
    weight: "59 kg",
    bmi: 23.7,
    fat: "27.0%",
    muscle: "35.0%",
    water: "49.5%",
    visceral_fat: 7,
    bone_mass: "2.8 kg",
    metabolism: "1380 kcal",
    protein: "16.9%",
    obesity: "5%",
    body_age: 31,
    lbm: "50.4 kg",
    timestamp: "2025-06-24 09:15",
  },
  {
    id: "ida-005",
    name: "Eko Wijaya",
    gender: "Male",
    age: 35,
    height: "172 cm",
    weight: "75 kg",
    bmi: 25.3,
    fat: "18.9%",
    muscle: "40.2%",
    water: "54.0%",
    visceral_fat: 9,
    bone_mass: "3.2 kg",
    metabolism: "1550 kcal",
    protein: "17.2%",
    obesity: "8%",
    body_age: 36,
    lbm: "61.0 kg",
    timestamp: "2025-06-24 09:20",
  },
];
const dummyDoppler = [
  {
    id: "baby-001",
    name: "Aisyah Putri",
    gender: "Female",
    date_of_birth: "2023-11-10",
    heart_rate: "132 bpm",
    timestamp: "2025-06-24 09:15",
  },
  {
    id: "baby-002",
    name: "Rizki Ramadhan",
    gender: "Male",
    date_of_birth: "2024-01-05",
    heart_rate: "148 bpm",
    timestamp: "2025-06-24 09:20",
  },
  {
    id: "baby-003",
    name: "Nadia Lestari",
    gender: "Female",
    date_of_birth: "2024-05-18",
    heart_rate: "125 bpm",
    timestamp: "2025-06-24 09:25",
  },
  {
    id: "baby-004",
    name: "Ahmad Fadil",
    gender: "Male",
    date_of_birth: "2023-12-22",
    heart_rate: "138 bpm",
    timestamp: "2025-06-24 09:30",
  },
  {
    id: "baby-005",
    name: "Siti Nurjanah",
    gender: "Female",
    date_of_birth: "2024-03-30",
    heart_rate: "142 bpm",
    timestamp: "2025-06-24 09:35",
  },
];
const MeasurementHistoriesPage = () => {
  const {
    isVisible,
    limit,
    handleLimitChange,
    filterRef,
    setShowFilter,
    showFilter,
    search,
    handleSearchChange,
    openDetail,
    animateRows,
    goToNextPage,
    goToPreviousPage,
    currentPage,
    totalPage,
    goToPage,
    buttonAction,
  } = UsePatientPage();

  const stateRef = useRef(state);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(
    "digit-pro-baby"
  );

  const { historiesDigitProIDA, getAllHistories } = useDigitProIDA();

  return (
    <MainLayout title="Measurement Histories" state="Measurement Histories">
      <div className="flex flex-col">
        {/* Filter by device */}
        <div className="flex flex-row mb-10 gap-6">
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
        <div className="sticky top-0 z-50 bg-[#ededf9] mb-2">
          <div className="flex flex-col w-full gap-4">
            <div className="flex gap-6 w-full justify-between">
              <div className="flex items-center gap-2">
                <p>Showing</p>
                <Select
                  value={limit.toString()}
                  onValueChange={handleLimitChange}
                >
                  <SelectTrigger className="w-fit bg-[rgba(117,195,255,0.5)]">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10" className="hover:bg-[#ECECEC]">
                      10
                    </SelectItem>
                    <SelectItem value="20" className="hover:bg-[#ECECEC]">
                      20
                    </SelectItem>
                    <SelectItem value="30" className="hover:bg-[#ECECEC]">
                      30
                    </SelectItem>
                    <SelectItem value="50" className="hover:bg-[#ECECEC]">
                      50
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4 items-center">
                <div ref={filterRef} className="flex flex-col gap-2">
                  <div
                    className="flex cursor-pointer bg-white items-center gap-2 px-4 py-2 rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.3)]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowFilter((prev) => !prev);
                    }}
                  >
                    <Funnel className="w-5 h-5" />
                    <p className="text-sm">Filter</p>
                  </div>
                  {/* Filter Dropdown */}
                  {showFilter && (
                    <div
                      className="absolute z-10 bg-white p-4  rounded-xl mt-12 min-w-[200px] text-sm"
                      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.3)" }}
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-row justify-between">
                          <span title="Filter users by role">
                            Filter contents
                          </span>
                          {/* <p
                          className="cursor-pointer text-red-500"
                          onClick={() => {}}
                        >
                          Reset filter
                        </p> */}
                        </div>
                        <button
                          className="text-white bg-[#0D00FF] px-4 py-1.5 rounded-lg"
                          onClick={() => {
                            alert("OK");
                          }}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <div
                    className="bg-white rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.3)]"
                    style={{ opacity: isVisible ? 0.5 : 1 }}
                  >
                    <label
                      htmlFor="search"
                      className="flex items-center gap-2 px-4 py-2"
                    >
                      <Search className="w-6 h-6" />
                      <input
                        type="text"
                        id="search"
                        placeholder="Search"
                        value={search}
                        onChange={handleSearchChange}
                        className="px-2 focus:outline-none"
                        disabled={isVisible}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 pb-20 mt-4 px-2 h-full">
          <div className="flex flex-row gap-4">
            <div className="w-full">
              {/* Table */}
              {selectedDevice === "digit-pro-baby" && (
                <TableHistoryDigitProBaby
                  patients={dummyProBaby}
                  animateRows={animateRows}
                  buttonAction={buttonAction}
                  openDetail={openDetail}
                  goToPreviousPage={goToPreviousPage}
                  goToNextPage={goToNextPage}
                  goToPage={goToPage}
                  currentPage={currentPage}
                  totalPage={totalPage}
                />
              )}
              {selectedDevice === "digit-pro-ida" && (
                <TableHistoryDigitProIDA
                  data={historiesDigitProIDA}
                  fetchData={getAllHistories}
                  animateRows={animateRows}
                  buttonAction={buttonAction}
                  openDetail={openDetail}
                  goToPreviousPage={goToPreviousPage}
                  goToNextPage={goToNextPage}
                  goToPage={goToPage}
                  currentPage={currentPage}
                  totalPage={totalPage}
                />
              )}
              {selectedDevice === "bmi" && (
                <TableHistoryBMI
                  patients={dummyBMI}
                  animateRows={animateRows}
                  buttonAction={buttonAction}
                  openDetail={openDetail}
                  goToPreviousPage={goToPreviousPage}
                  goToNextPage={goToNextPage}
                  goToPage={goToPage}
                  currentPage={currentPage}
                  totalPage={totalPage}
                />
              )}
              {selectedDevice === "doppler" && (
                <TableHistoryDoppler
                  patients={dummyDoppler}
                  animateRows={animateRows}
                  buttonAction={buttonAction}
                  openDetail={openDetail}
                  goToPreviousPage={goToPreviousPage}
                  goToNextPage={goToNextPage}
                  goToPage={goToPage}
                  currentPage={currentPage}
                  totalPage={totalPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MeasurementHistoriesPage;
