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
import { useDigitProBaby } from "@/hooks/api/devices/use-digit-pro-baby";
import { useDigitProBMI } from "@/hooks/api/devices/use-digit-pro-bmi";
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

const MeasurementHistoriesPage = () => {
  const { historiesDigitProIDA, fetchDataIDA, currentPageIDA } =
    useDigitProIDA();
  const { dataDigitProBaby, fetchDataDigitProBaby, currentPageDigitProBaby } =
    useDigitProBaby();
  const { dataDigitProBMI, fetchDataBMI, currentPageBMI } = useDigitProBMI();
  const { historiesDoppler, fetchDataDoppler, currentPageDoppler } =
    useDoppler();

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [showFilter, setShowFilter] = useState(false);

  const stateRef = useRef(state);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(
    "digit-pro-baby"
  );
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
    setLimit(10);
    setSearch("");
    setShowFilter(false);
  }, [selectedDevice]);

  useEffect(() => {
    if (selectedDevice === "digit-pro-ida") {
      fetchDataIDA({
        page: 1,
        limit,
        search,
      });
    }
    if (selectedDevice === "digit-pro-baby") {
      fetchDataDigitProBaby({
        page: 1,
        limit,
        search,
      });
    }
    if (selectedDevice === "bmi") {
      fetchDataBMI({
        page: 1,
        limit,
        search,
      });
    }
    if (selectedDevice === "doppler") {
      fetchDataDoppler({
        page: 1,
        limit,
        search,
      });
    }
  }, [limit, search, selectedDevice]);

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

  const handleLimitChange = (value: string) => {
    updatePagination({ limit: Number(value), page: 1 });
    setLimit(Number(value));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePagination({ search: e.target.value, page: 1 });
    setSearch(e.target.value);
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
                <div className="flex flex-col gap-2">
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
                  <div className="bg-white rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.3)]">
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
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MeasurementHistoriesPage;
