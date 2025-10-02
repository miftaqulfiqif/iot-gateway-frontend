import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MainLayout from "../components/layouts/main-layout";
import { Funnel, Search } from "lucide-react";
import { RecentMeasurementsPatientTable } from "@/components/tables/recent-measurements-patient-table";
import { useState } from "react";

const dummyRecentPatientMeasurements = [
  {
    id: "1",
    parameter: "Weight",
    value: "70 kg",
    device: "Digit Pro Baby",
    room: "ICU-101",
    timestamp: "2023-01-10T08:00:00.000Z",
  },
  {
    id: "2",
    parameter: "Height",
    value: "170 cm",
    device: "Digit Pro BMI",
    room: "ICU-102",
    timestamp: "2023-01-11T08:00:00.000Z",
  },
  {
    id: "3",
    parameter: "Body Temperature",
    value: "36.4 C",
    device: "Digit Pro Doppler",
    room: "ICU-103",
    timestamp: "2023-01-12T08:00:00.000Z",
  },
  {
    id: "4",
    parameter: "Blood Pressure",
    value: "120/80 mmHg",
    device: "Digit Pro Doppler",
    room: "ICU-104",
    timestamp: "2023-01-13T08:00:00.000Z",
  },
  {
    id: "5",
    parameter: "Heart Rate",
    value: "120 bpm",
    device: "Digit Pro BMI",
    room: "ICU-105",
    timestamp: "2023-01-14T08:00:00.000Z",
  },
  {
    id: "6",
    parameter: "Oxygen Saturation",
    value: "99%",
    device: "Digit Pro Doppler",
    room: "ICU-106",
    timestamp: "2023-01-15T08:00:00.000Z",
  },
  {
    id: "7",
    parameter: "Respiratory Rate",
    value: "16 breaths/min",
    device: "Digit Pro BMI",
    room: "ICU-107",
    timestamp: "2023-01-16T08:00:00.000Z",
  },
  {
    id: "8",
    parameter: "Body Fat",
    value: "18.5%",
    device: "Digit Pro Doppler",
    room: "ICU-108",
    timestamp: "2023-01-17T08:00:00.000Z",
  },
  {
    id: "9",
    parameter: "Muscle Mass",
    value: "45.0 kg",
    device: "Digit Pro BMI",
    room: "ICU-109",
    timestamp: "2023-01-18T08:00:00.000Z",
  },
  {
    id: "10",
    parameter: "Visceral Fat",
    value: "10",
    device: "Digit Pro Doppler",
    room: "ICU-110",
    timestamp: "2023-01-19T08:00:00.000Z",
  },
];

const MeasurementHistoriesPage1 = () => {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [showFilter, setShowFilter] = useState(false);

  const handleLimitChange = (value: string) => {
    setLimit(Number(value));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <MainLayout title="Histories Measurement" state="Histories Measurement">
      <div className="flex flex-col">
        <div className="sticky top-0 z-10 bg-[#ededf9] mb-2">
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
              <RecentMeasurementsPatientTable
                data={dummyRecentPatientMeasurements}
                goToPreviousPage={() => {}}
                goToNextPage={() => {}}
                goToPage={() => {}}
                currentPage={1}
                totalPage={2}
                isDetailPatient
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MeasurementHistoriesPage1;
