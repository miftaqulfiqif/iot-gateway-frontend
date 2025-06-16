import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MainLayout from "../components/layouts/main-layout";
import { useRef, useState } from "react";
import {
  Activity,
  Funnel,
  Plus,
  Search,
  SquareArrowOutUpRight,
  Thermometer,
  UserRoundPlus,
} from "lucide-react";
import spo2Icon from "@/assets/icons/spo2.png";
import respIcon from "@/assets/icons/resp.png";

const PatientMonitorPage = () => {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [limit, setLimit] = useState(10);

  const filterRef = useRef<HTMLDivElement>(null);
  return (
    <MainLayout title="Patient Monitor" state="Patient Monitor">
      <div className="flex flex-col gap-4 pb-20">
        {/* Sticky Top */}
        <div className="sticky top-0 z-50 bg-[#ededf9] mb-2">
          <div className="flex flex-col w-full gap-4">
            <div className="flex gap-6 w-full justify-between">
              <div className="flex items-center gap-2">
                <p>Showing</p>
                <Select
                  value={limit.toString()}
                  onValueChange={(value) => setLimit(Number(value))}
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
                    className="flex bg-[#3885FD] items-center gap-2 px-4 py-2 rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.3)] cursor-pointer text-white "
                    onClick={(e) => {
                      e.stopPropagation();
                      alert("Add Device");
                    }}
                  >
                    <Plus className="w-5 h-5" />
                    <p className="text-white">Add Device</p>
                  </div>
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
                        onChange={(e) => setSearch(e.target.value)}
                        className="px-2 focus:outline-none"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {/* PM-9000 */}
        <div className="flex flex-col gap-2 px-1">
          <p className="font-bold">PM 9000</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-[#EDEDF9] flex flex-col gap-2 p-4 rounded-3xl w-full h-fit shadow-[4px_4px_4px_rgba(0,0,0,0.16),-4px_-4px_4px_rgba(255,255,255,1)] text-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="font-bold">ACB-421</p>
                  <button className="flex items-center gap-1 bg-blue-500 text-white justify-center py-1 px-2 rounded-sm cursor-pointer transition duration-150 hover:bg-blue-600 text-xs">
                    <SquareArrowOutUpRight className="w-4 h-4" />
                    <p>Detail</p>
                  </button>
                </div>
                <p>Patient Name Banget </p>
                <div className="flex flex-row w-full h-40 space-x-2 mt-4">
                  <div className="flex flex-col w-full gap-2">
                    {/* ECG */}
                    <div className="bg-green-200 text-black rounded-xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-2 w-full justify-between gap-2">
                      <div className="flex flex-row gap-2">
                        <div className="flex flex-col">
                          <div className="flex flex-row gap-2">
                            <div className="bg-[#ededf9] text-green-700 rounded-sm p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                              <Activity className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col">
                              {/* <p className="text-xs">ECG</p> */}
                              <div className="flex flex-row gap-1">
                                <div className="flex flex-row items-center text-2xl rounded-4xl">
                                  <p>200</p>
                                </div>
                                <p className="text-[10px]">rpm</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* SPO-2 */}
                    <div className="bg-blue-200 text-black rounded-xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-2 w-full justify-between gap-2">
                      <div className="flex flex-row gap-2">
                        <div className="flex flex-col">
                          <div className="flex flex-row gap-2">
                            <div className="bg-[#ededf9] text-green-700 rounded-sm p-1 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                              <img src={spo2Icon} className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col">
                              {/* <p className="text-xs">ECG</p> */}
                              <div className="flex flex-row gap-1">
                                <div className="flex flex-row items-center text-2xl rounded-4xl">
                                  <p>100</p>
                                </div>
                                <p className="text-xs pb-4">%</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* RESP */}
                    <div className="bg-blue-200 text-black rounded-xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-2 w-full justify-between gap-2">
                      <div className="flex flex-row gap-2 w-full">
                        <div className="bg-[#ededf9] text-green-700 rounded-sm p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                          <img src={respIcon} className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          {/* <p className="text-xs">ECG</p> */}
                          <div className="flex flex-row gap-1 ">
                            <div className="flex flex-row items-end text-2xl rounded-4xl">
                              <p>90</p>
                            </div>
                            <p className="text-[10px]">rpm</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-100 text-black rounded-2xl  shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row p-2 w-full justify-between gap-2">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row gap-3 items-center font-semibold">
                        <div className="bg-[#ededf9] text-yellow-500 rounded-sm p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                          <Thermometer className="w-4 h-4" />
                        </div>
                        <p>Temp</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-row items-center gap-6">
                          <p className="w-1">T1</p>
                          <div className="flex flex-row items-end gap-1">
                            <p className="text-xl w-10 text-end">80</p>
                            <p className="text-sm pb-0.5">°C</p>
                          </div>
                        </div>
                        <div className="flex flex-row items-center gap-6">
                          <p className="w-1">T2</p>
                          <div className="flex flex-row items-end gap-1">
                            <p className="text-xl w-10 text-end">80</p>
                            <p className="text-sm pb-0.5">°C</p>
                          </div>
                        </div>
                        <div className="flex flex-row items-center gap-6">
                          <p className="w-1">TD</p>
                          <div className="flex flex-row items-end gap-1">
                            <p className="text-xl w-10 text-end">80</p>
                            <p className="text-sm pb-0.5">°C</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* DS-001 */}
        <div className="flex flex-col gap-2 px-1">
          <p className="font-bold">DS 001</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="bg-white flex flex-col p-4 rounded-lg w-full h-60 shadow-[0px_2px_4px_rgba(0,0,0,0.2)] text-sm"
              >
                <p>Patient Name</p>
                <p>Device Name</p>
                <p>Device IP</p>
                <div className="w-full h-40 bg-gray-200 rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
        {/* OTHER */}
        <div className="flex flex-col gap-2 px-1">
          <p className="font-bold">OTHER</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="bg-white flex flex-col p-4 rounded-lg w-full h-60 shadow-[0px_2px_4px_rgba(0,0,0,0.2)] text-sm"
              >
                <p>Patient Name</p>
                <p>Device Name</p>
                <p>Device IP</p>
                <div className="w-full h-40 bg-gray-200 rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default PatientMonitorPage;
