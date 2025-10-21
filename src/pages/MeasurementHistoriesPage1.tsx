import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MainLayout from "../components/layouts/main-layout";
import { CircleAlert, CircleCheck, Funnel, Search, Users } from "lucide-react";
import { RecentMeasurementsPatientTable } from "@/components/tables/recent-measurements-patient-table";
import { useEffect, useState } from "react";
import { useHistoriesMeasurement } from "@/hooks/api/devices/use-histories-measurement";

const MeasurementHistoriesPage1 = () => {
  const { getHistoriesMeasurement, historiesMeasurement } =
    useHistoriesMeasurement();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    getHistoriesMeasurement({
      page: page,
      limit: limit,
      query: search,
    });
  }, [page, limit, search]);

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
            <div className="flex gap-4 mb-4">
              <div className="w-full flex items-center justify-between p-6 rounded-xl bg-white border gap-2">
                <div className="">
                  <p className="">Total Patient </p>
                  <p className="font-semibold text-3xl text-blue-500">
                    {historiesMeasurement.total_patient}
                  </p>
                </div>
                <Users className="w-10 h-10 text-blue-500" />
              </div>
              <div className="w-full flex items-center justify-between p-6 rounded-xl bg-white border gap-2">
                <div className="">
                  <p className="">Total Measurement Today</p>
                  <p className="font-semibold text-3xl text-green-500">
                    {historiesMeasurement.total_today}
                  </p>
                </div>
                <CircleCheck className="w-10 h-10 text-green-500" />
              </div>
              {/* <div className="w-full flex items-center justify-between p-6 rounded-xl bg-white border gap-2">
                <div className="">
                  <p className="">Critical</p>
                  <p className="font-semibold text-3xl text-red-500">{1}</p>
                </div>
                <CircleAlert className="w-10 h-10 text-red-500" />
              </div> */}
            </div>
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
                data={historiesMeasurement}
                goToPreviousPage={() => setPage((prev) => prev - 1)}
                goToNextPage={() => setPage((prev) => prev + 1)}
                goToPage={setPage}
                currentPage={1}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MeasurementHistoriesPage1;
